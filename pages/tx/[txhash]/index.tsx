import { Box } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

type Props = {};

const TransactionDetails = (props: Props) => {
  const router = useRouter();
  const { txhash } = router.query;

  return <Box>Transaction Details: txHash: {`${txhash}`}</Box>;
};

export default TransactionDetails;
