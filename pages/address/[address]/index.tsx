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
import Pagination from "../../../components/Pagination";

type Props = {};

type FetchedToken = {
  balance: string;
  contractAddress: string;
  decimals: string;
  name: string;
  symbol: string;
  type: string;
};

type FetchedTransaction = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  l1Fee: string;
  l1FeeScalar: string;
  l1GasPrice: string;
  l1GasUsed: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};

type FetchedTransfer = {
  value: string;
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  logIndex: string;
  nonce: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: string;
};

const AddressDetails = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [bitBalance, setBitBalance] = useState(0);
  const [listOfTokens, setListOfTokens] = useState<FetchedToken[]>([]);
  // const [listOfTransfers, setListOfTransfers] = useState<FetchedTransfer[]>([]);
  const [listOfTransactions, setListOfTransactions] = useState<
    FetchedTransaction[]
  >([]);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextActive, setIsNextActive] = useState(true);

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

  const [totalGasUsed, totalTransactionsCount, averageGasPerTx] =
    useMemo(() => {
      let totalGasUsed = listOfTransactions.reduce((total, current) => {
        return total + +current.cumulativeGasUsed;
      }, 0);

      let totalTransactionsCount = listOfTransactions.length;

      let averageGasPerTx =
        totalTransactionsCount === 0
          ? 0
          : +(totalGasUsed / totalTransactionsCount).toFixed(2);

      return [totalGasUsed, totalTransactionsCount, averageGasPerTx];
    }, [listOfTransactions]);

  useEffect(() => {
    const fetchBitBalance = async () => {
      const { data } = await mantleExplorerApiInstance.post("", null, {
        params: {
          module: "account",
          action: "eth_get_balance",
          address: address,
        },
      });

      setBitBalance(+(parseInt(data.result, 16) / 10 ** 18).toFixed(2));
    };

    const fetchListOfTokens = async () => {
      const { data } = await mantleExplorerApiInstance.post("", null, {
        params: {
          module: "account",
          action: "tokenlist",
          address: address,
        },
      });

      if (data.status === "1") {
        setListOfTokens(data.result);
      }
    };

    fetchBitBalance();
    fetchListOfTokens();
  }, [address]);

  useEffect(() => {
    const fetchTotalTransactions = async () => {
      const { data: TransactionsData } = await mantleExplorerApiInstance.post(
        "",
        null,
        {
          params: {
            module: "account",
            action: "txlist",
            address: address,
            offset: 10,
            page: currentPage,
          },
        }
      );

      const { data: NextPageTransactionsData } =
        await mantleExplorerApiInstance.post("", null, {
          params: {
            module: "account",
            action: "txlist",
            address: address,
            offset: 10,
            page: currentPage + 1,
          },
        });

      if (NextPageTransactionsData.result.length === 0) {
        setIsNextActive(false);
      } else {
        setIsNextActive(true);
      }

      if (TransactionsData.status === "1") {
        setListOfTransactions(TransactionsData.result);
      }

      // TODO: there is a problem with API for paging results, add this when problem is gone
      // const { data: tokenTransferData } = await mantleExplorerApiInstance.post(
      //   "",
      //   null,
      //   {
      //     params: {
      //       module: "account",
      //       action: "tokentx",
      //       address: address,
      //       offset: 20,
      //       page: 1,
      //     },
      //   }
      // );
      // if (tokenTransferData.status === "1") {
      //   setListOfTransfers(tokenTransferData.result);
      // }
    };

    fetchTotalTransactions();
  }, [address, currentPage]);

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
          <Box>Total Transactions: {totalTransactionsCount}</Box>
          <Box>Total Gas spent: {totalGasUsed}</Box>
          <Box>Average Gas per Tx: {averageGasPerTx}</Box>
        </Box>
        <Box>
          {/* TODO: Add NFT and transfer support when api supports those **/}
          {/* <Box>NFTs</Box> */}
          {/* <Box>Transfers</Box>
          {listOfTransfers.map((transfer) => (
            <Box key={transfer.hash}>
              {transfer.from} -`&gt;` {transfer.to} : {transfer.value}
            </Box>
          ))} */}

          <Box>Transactions</Box>
          <Box>
            {listOfTransactions.map((tx) => (
              <Box key={tx.hash}>
                {tx.from} -&gt; {tx.to} : {tx.value}
              </Box>
            ))}
          </Box>
          <Box>
            <Pagination
              currentPage={currentPage}
              setPage={setCurrentPage}
              isNextActive={isNextActive}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressDetails;
