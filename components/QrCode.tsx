import React, { PropsWithChildren, useState, useEffect } from "react";
import CustomModal from "./Modal";
import qrCode from "qrcode";
import Image from "next/image";
import { Box } from "@mui/material";

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
      </CustomModal>
    </Box>
  );
};

export default QrCode;
