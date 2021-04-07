import { Heading, Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import CompleteVocabs from "../components/CompleteVocabs";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Stack spacing={4}>
      <Heading size="xl">Ontology Search</Heading>
      <Text>
        Use the input below to instantly search your selected ontologies.
      </Text>
      <CompleteVocabs></CompleteVocabs>
    </Stack>
  </Layout>
);

export default IndexPage;
