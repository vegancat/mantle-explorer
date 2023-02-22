import React from "react";
import { Box, Button } from "@mui/material";

type Props = {
  currentPage: number;
  isNextActive: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isTxsLoading: boolean;
};

const Pagination = ({
  currentPage,
  isNextActive,
  setPage,
  isTxsLoading,
}: Props) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Button
        sx={{ mx: 2 }}
        disabled={currentPage === 1 || isTxsLoading}
        onClick={() => setPage(currentPage - 1)}
      >
        Prev
      </Button>
      <Box sx={{ textAlign: "center" }}>{currentPage}</Box>
      <Button
        sx={{ mx: 2 }}
        disabled={!isNextActive || isTxsLoading}
        onClick={() => setPage(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
