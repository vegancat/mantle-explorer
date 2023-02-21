import { Box, Button } from "@mui/material";
import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "../../../components/Modal";
import { APIUrl, PageUrl } from "../../../constants";
import QrCode from "../../../components/QrCode";

type Props = {};

const AddressDetails = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const {
    asPath,
    query: { address },
  } = useRouter();

  const handleOpen = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const qrCodeUrl = useMemo(() => `${PageUrl}${asPath}`, [asPath]);

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
      {/* <Modal open={openModal} setOpen={setOpenModal} /> */}
      <QrCode open={openModal} setOpen={setOpenModal} url={qrCodeUrl} />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Box>
            <Button onClick={handleOpen}>QR code</Button>
          </Box>
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
