import { Heading, Text } from "@chakra-ui/layout"
import { Stack } from "@chakra-ui/react"
import React from "react"
import SearchOntologies from "../components/SearchOntologies"
import Layout from "../components/Layout"

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Stack spacing={4}>
      <Heading size="xl">Ontology Search</Heading>
      <Text>
        Use the inputs below to instantly search the selected
        ontologies.
      </Text>
      <SearchOntologies></SearchOntologies>
    </Stack>
  </Layout>
)

export default IndexPage
