import Box from "@mui/material/Box/Box";
import React, { PropsWithChildren, useState, useEffect } from "react";
import CustomModal from "./Modal";
import qrCode from "qrcode";
import Image from "next/image";
import Typography from "@mui/material/Typography";

type Props = {
  url: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const QrCode = ({ url, ...otherProps }: PropsWithChildren<Props>) => {
  const [imgSrc, setImgSrc] = useState("src");

  useEffect(() => {
    qrCode.toDataURL(url).then(setImgSrc);

    return () => {
      setImgSrc("src");
    };
  }, [url]);

  return (
    <Box>
      <CustomModal {...otherProps}>
        <Image src={imgSrc} alt="link QR code" fill />
        <Typography textAlign={"center"} sx={{ pt: 2 }}>
          Scan this with your camera to open this page
        </Typography>
      </CustomModal>
    </Box>
  );
};

export default QrCode;
