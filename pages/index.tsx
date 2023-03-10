import { useEffect } from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import { asL2Provider } from "@mantleio/sdk";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/address");
  }, []);

  // useEffect(() => {
  //   const res = l2RpcProvider._getFastBlockNumber();

  //   console.log(res);
  // }, [l2RpcProvider]);

  return (
    <Box>
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
    </Box>
  );
}
