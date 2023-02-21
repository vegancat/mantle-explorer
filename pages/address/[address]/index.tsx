import { Box } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

type Props = {};

const AddressDetails = (props: Props) => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <Box>
      <Head>
        <title>Address Details</title>
        <meta
          name="description"
          content="scan mantle network easily and joyfully"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Box>Address Details: address: {`${address}`}</Box> */}
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Box>QR code to current page</Box>
          <Box>Address in hex format</Box>
          <Box>Address image icon | possible Ens name or avatar</Box>
          <Box>Bit balance</Box>
          <Box>Other Token Holdings</Box>
          <Box>Total Transactions</Box>
          <Box>Total Gas spent</Box>
          <Box>Average Gas per Tx</Box>
        </Box>
        <Box>
          {/* <Box>NFTs</Box> */}
          <Box>Transactions</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressDetails;
