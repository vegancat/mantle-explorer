import Head from "next/head";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mantle Scan</title>
        <meta
          name="description"
          content="scan mantle network easily and joyfully"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>Home page</Box>
    </>
  );
}
