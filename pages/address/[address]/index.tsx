import { Box } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

type Props = {};

const AddressDetails = (props: Props) => {
  const router = useRouter();
  const { address } = router.query;

  return <Box>Address Details: address: {`${address}`}</Box>;
};

export default AddressDetails;
