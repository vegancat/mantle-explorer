import React from "react";
import { Box, Button } from "@mui/material";

type Props = {
  currentPage: number;
  isNextActive: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ currentPage, isNextActive, setPage }: Props) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Button
        sx={{ mx: 2 }}
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        Prev
      </Button>
      <Box sx={{ textAlign: "center" }}>{currentPage}</Box>
      <Button
        sx={{ mx: 2 }}
        disabled={!isNextActive}
        onClick={() => setPage(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
