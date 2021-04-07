import { Input } from "@chakra-ui/input"
import { Box, Text } from "@chakra-ui/layout"
import { Index } from "flexsearch"
import React, { useEffect, useState } from "react"
import {
  createVocabIndex,
  RDFDocument,
} from "../services/searchVocab"

// import mock from "../services/example_search.json";
import {
  Heading,
  Stack,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react"

import Select from "react-select"
import { prefixes } from "@zazuko/rdf-vocabularies"

async function doSearch(
  index?: Index<RDFDocument>,
  query?: string
): Promise<RDFDocument[]> {
  //   console.log("Doing search", index, query);

  if (!query || !index) {
    return []
  }
  return await index.search(query)
}

function WithPrefix({ s }: { s: string }) {
  const a = s.split(":")
  return (
    <>
      <Text as="span" color="gray.400">
        {a[0]}:
      </Text>
      {a[1]}
    </>
  )
}

const mappedPrefixes = Object.keys(prefixes).map((p) => ({
  value: p,
  label: p,
}))

function VocabItem({ v }: { v: RDFDocument }) {
  const { hasCopied, onCopy } = useClipboard(v.iri || "")

  return (
    <Stack spacing={1} p={6} my={2} borderRadius={4} shadow="md">
      {v.withPrefix && (
        <Box style={{ cursor: "pointer" }} onClick={onCopy}>
          <Tooltip
            isOpen={hasCopied}
            label="Copied IRI to clipboard"
            placement="right-end"
          >
            <Heading size="md" w="fit-content">
              <WithPrefix s={v.withPrefix}></WithPrefix>
            </Heading>
          </Tooltip>
        </Box>
      )}

      <Text>{v.comment}</Text>
    </Stack>
  )
}

export default function CompleteVocabs() {
  const [index, setIndex] = useState<Index<RDFDocument> | undefined>(
    undefined
  )
  const [search, setSearch] = useState<string>("")
  const [result, setResult] = useState<RDFDocument[]>([])

  const [ontologies, setOntologies] = useState(
    ["rdf", "rdfs"].map((p) => ({
      value: p,
      label: p,
    }))
  )

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const makeIndex = async () => {
      const idx = await createVocabIndex(
        ontologies.map((o) => o.value)
      )
      setIndex(idx)
    }
    makeIndex()
  }, [ontologies])

  useEffect(() => {
    if (index) {
      doSearch(index, search).then((v) => setResult(v))
    }
  }, [search])

  return (
    <Box>
      <Select
        value={ontologies}
        onChange={(v: any) => setOntologies(v)}
        isMulti
        options={mappedPrefixes}
      />
      <Input
        mt={4}
        onChange={onChangeHandler}
        value={search}
        placeholder="Search for great things..."
      ></Input>
      <Box>
        {result.map((v) => (
          <VocabItem v={v} key={v.iri}></VocabItem>
        ))}
      </Box>
    </Box>
  )
}
