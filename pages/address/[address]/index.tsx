import { Box, Button } from "@mui/material";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "../../../components/Modal";
import { APIUrl, PageUrl } from "../../../constants";
import QrCode from "../../../components/QrCode";
import { useEnsName, useEnsAvatar } from "wagmi";
import Image from "next/image";
import _ from "lodash";
import { isAddress } from "@ethersproject/address";
import mantleExplorerApiInstance from "../../../axios-instances/mantleExplorerApi";

type Props = {};

type FetchedToken = {
  balance: string;
  contractAddress: string;
  decimals: string;
  name: string;
  symbol: string;
  type: string;
};

const AddressDetails = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [bitBalance, setBitBalance] = useState(0);
  const [listOfTokens, setListOfTokens] = useState<FetchedToken[]>([]);
  const [isAddressValid, setIsAddressValid] = useState(true);

  let {
    asPath,
    query: { address },
  } = useRouter();

  useEffect(() => {
    setIsAddressValid(isAddress(address as string));
  }, [address]);

  const {
    data: ensName,
    isError: ensNameError,
    isLoading: ensNameLoading,
  } = useEnsName({
    // @ts-ignore
    address,
  });

  const {
    data: ensAvatar,
    isError: ensAvatarError,
    isLoading: ensAvatarLoading,
  } = useEnsAvatar({
    // @ts-ignore
    address,
  });

  useEffect(() => {
    const fetchBitBalance = async () => {
      const { data } = await mantleExplorerApiInstance.post("", null, {
        params: {
          module: "account",
          action: "eth_get_balance",
          address: address,
        },
      });

      setBitBalance(+(parseInt(data.result, 16) / 10 ** 18).toPrecision(2));
    };

    const fetchListOfTokens = async () => {
      const { data } = await mantleExplorerApiInstance.post("", null, {
        params: {
          module: "account",
          action: "tokenlist",
          address: address,
        },
      });
      console.log("🚀 ~ file: index.tsx:63 ~ fetchListOfTokens ~ data", data);

      setListOfTokens(data.result);
    };

    const fetchTotalTransactions = async () => {
      const { data } = await mantleExplorerApiInstance.post("", null, {
        params: {
          module: "account",
          action: "tokenlist",
          address: address,
        },
      });
      console.log("🚀 ~ file: index.tsx:63 ~ fetchListOfTokens ~ data", data);

      setListOfTokens(data.result);
    };

    fetchBitBalance();
    fetchListOfTokens();
  }, [address]);

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
          <Box>Address in hex format: {address}</Box>
          <Box>
            {/* TODO: Render ens part conditionally  **/}
            {!_.isNil(ensName) && <Box>{ensName}</Box>}
            {!_.isNil(ensAvatar) && (
              <Box>
                <Image src={ensAvatar!} alt="ENS avatar" />
              </Box>
            )}
          </Box>
          <Box>Bit balance: {bitBalance}</Box>
          <Box>Other Token Holdings</Box>
          <Box>
            {listOfTokens.map((token) => (
              <Box key={token.contractAddress}>
                {token.symbol}: {token.balance}
              </Box>
            ))}
          </Box>
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
