import { Heading, Text } from "@chakra-ui/layout"
import { Stack } from "@chakra-ui/react"
import React from "react"
import CompleteVocabs from "../components/CompleteVocabs"
import Layout from "../components/Layout"

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Stack spacing={4}>
      <Heading size="xl">Ontology Search</Heading>
      <Text>
        Use the inputs below to instantly search the selected
        ontologies.
      </Text>
      <CompleteVocabs></CompleteVocabs>
    </Stack>
  </Layout>
)

export default IndexPage
