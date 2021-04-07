import { Index } from "flexsearch";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { createVocabIndex, RDFDocument } from "../services/searchVocab";

async function doSearch(
  index?: Index<RDFDocument>,
  query?: string
): Promise<RDFDocument[]> {
  console.log("Doing search", index, query);

  if (!query || !index) {
    return [];
  }
  return await index.search(query);
}

export default function CompleteVocabs() {
  const [index, setIndex] = useState<Index<RDFDocument> | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<any | undefined>(undefined);

  const onChangeHandler = (event) => {
    // console.log(event.target.value);

    setSearch(event.target.value);
  };

  useEffect(() => {
    const makeIndex = async () => {
      const idx = await createVocabIndex(["rdfs"]);
      setIndex(idx);
    };
    makeIndex();
  }, []);

  useEffect(() => {
    if (index) {
      console.log("good");
      doSearch(index, search).then((v) => setResult(v));
    }
  }, [search]);

  //   const status = useAsync(createVocabIndex, [["rdfs"]]);
  //   const [search, setSearch] = useState<string | undefined>(undefined);
  //   const [index, setIndex] = useState<Index<RDFDocument> | undefined>(undefined)

  //   if (status.result?.add) {
  //       setIndex(status.result)
  //   }

  //   const result = useAsync(doSearch, [index, search]);

  return (
    <div>
      <div>
        <input onChange={onChangeHandler} value={search}></input>
        <div>
          <code style={{ whiteSpace: "pre" }}>
            {JSON.stringify(result, undefined, 4)}
          </code>
        </div>
      </div>
    </div>
  );
}
