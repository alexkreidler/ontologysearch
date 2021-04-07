import { Index } from "flexsearch";
import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import { createVocabIndex, RDFDocument } from "../services/searchVocab";

async function doSearch(
  index?: Index<RDFDocument>,
  query?: string
): Promise<RDFDocument[]> {
  if (!query || !index) {
    return [];
  }
  return await index.search(query);
}

export default function CompleteVocabs() {
  const status = useAsync(createVocabIndex, [["rdfs"]]);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [index, setIndex] = useState<Index<RDFDocument> | undefined>(undefined)

  if (status.result) {
      setIndex(status.result)
  }

  const result = useAsync(doSearch, [index, search]);

  return (
    <div>
      {status.loading && <div>Loading</div>}
      {status.error && <div>Error: {status.error.message}</div>}
      {status.result && (
        <div>
          <input onChange={(e) => setSearch(e.target.value)}></input>
          <pre>
              {JSON.stringify(result)}
          </pre>
        </div>
      )}
    </div>
  );
}
