import { Input } from "@chakra-ui/input";
import { Box, Code } from "@chakra-ui/layout";
import { Index } from "flexsearch";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { createVocabIndex, RDFDocument } from "../services/searchVocab";

import mock from "../services/example_search.json"

async function doSearch(
  index?: Index<RDFDocument>,
  query?: string
): Promise<RDFDocument[]> {
  //   console.log("Doing search", index, query);

  if (!query || !index) {
    return [];
  }
  return await index.search(query);
}

export default function CompleteVocabs() {
  const [index, setIndex] = useState<Index<RDFDocument> | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<any | undefined>(mock);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // useEffect(() => {
  //   const makeIndex = async () => {
  //     const idx = await createVocabIndex(["rdf","rdfs","schema"]);
  //     setIndex(idx);
  //   };
  //   makeIndex();
  // }, []);

  // useEffect(() => {
  //   if (index) {
  //     doSearch(index, search).then((v) => setResult(v));
  //   }
  // }, [search]);

  return (
    <Box>
      <Input onChange={onChangeHandler} value={search}></Input>
      <Box>
        <Code style={{ whiteSpace: "pre" }}>
          {JSON.stringify(result, undefined, 4)}
        </Code>
      </Box>
    </Box>
  );
}
