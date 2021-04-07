import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Index } from "flexsearch";
import React, { useState } from "react";
import { RDFDocument } from "../services/searchVocab";

import mock from "../services/example_search.json";
import { Heading, Stack } from "@chakra-ui/react";

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

function WithPrefix({ s }: { s: string }) {
  let a = s.split(":");
  return (
    <>
      <Text as="span" color="gray.400">
        {a[0]}:
      </Text>
      {a[1]}
    </>
  );
}

export default function CompleteVocabs() {
  const [index, setIndex] = useState<Index<RDFDocument> | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [result, setResult] = useState<RDFDocument[]>(mock);

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
        {result.map((v) => (
          <Stack spacing={1} p={6} my={2} borderRadius={4} shadow="md">
            {v.withPrefix && (
              <Heading size="md">
                <WithPrefix s={v.withPrefix}></WithPrefix>
              </Heading>
            )}

            <Text>{v.comment}</Text>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
