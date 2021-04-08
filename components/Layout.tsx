import React, { ReactNode } from "react"
import Head from "next/head"
import { Box, Flex, Link, Spacer } from "@chakra-ui/react"

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = "Ontology Search" }: Props) => (
  <Flex direction="column" minH="100vh">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
    </Head>
    <Box p={6}>{children}</Box>
    <Spacer></Spacer>
    <Box backgroundColor="gray.200" p={6}>
      &copy; {new Date().getFullYear()} Alex Kreidler.{" "}
      <Link
        color="blue.300"
        href="https://github.com/alexkreidler/ontologysearch"
      >
        Source code available on Github
      </Link>{" "}
      under the Apache 2.0 License.
    </Box>
  </Flex>
)

export default Layout
