import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

type Props = {};

const AddressPage = (props: Props) => {
  const [address, setAddress] = useState("");
  const { push } = useRouter();

  return (
    <Box component="form">
      <TextField value={address} onChange={(e) => setAddress(e.target.value)} />
      <Button
        onClick={() => {
          push("/address/" + address);
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default AddressPage;
