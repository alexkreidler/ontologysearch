import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { Box, Flex, Spacer } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Flex direction="column" minH="100vh">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Box p={6}>{children}</Box>
    <Spacer></Spacer>
    <Box backgroundColor="gray.200" p={6}>
      &copy; {new Date().getFullYear()} Alex Kreidler. Source code available on
      Github under the Apache 2.0 License.
    </Box>
  </Flex>
);

export default Layout;
