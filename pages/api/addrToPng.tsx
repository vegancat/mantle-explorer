import { ImageResponse } from "@vercel/og";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "edge",
};

let hexChars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const isEthAddressValid = (address: string) => {
  const prefixPart = address.slice(0, 2);
  const isAddressPartValid = address
    .slice(2)
    .split("")
    .every((char) => hexChars.includes(char));

  return address.length === 42 && prefixPart === "0x" && isAddressPartValid;
};

const addrToColors = (address: string) => {
  // Adding "00FF" to make total number of chars a factor of 6
  // since each color is represented by 6 chars
  const charsArr = (address.slice(2) + "0F").split("");

  const resColors: string[] = [];

  for (let i = 0; i < address.length; i = i + 6) {
    resColors.push(
      charsArr[i] +
        charsArr[i + 1] +
        charsArr[i + 2] +
        charsArr[i + 3] +
        charsArr[i + 4] +
        charsArr[i + 5]
    );
  }

  return resColors;
};

const buildCatVariant = (address: string) => {
  const w = 9;
  const h = 6;

  const picMatrix = new Array(h);
  for (let row = 0; row < h; row++) {
    picMatrix[row] = new Array(w).fill(0);
  }

  let resColors = addrToColors(address as string);

  let transparentIndexes = [
    [0, 0],
    [0, 1],
    [0, 7],
    [0, 8],
    [1, 0],
    [1, 8],
    [3, 0],
    [3, 8],
    [4, 0],
    [4, 8],
    [5, 0],
    [5, 1],
    [5, 4],
    [5, 7],
    [5, 8],
  ];

  let borderIndexes = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 1],
    [1, 4],
    [1, 7],
    [2, 0],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 8],
    [3, 1],
    [3, 4],
    [3, 7],
    [4, 1],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 7],
    [5, 2],
    [5, 3],
    [5, 5],
    [5, 6],
  ];

  const addrIndexes = [
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [3, 2],
    [3, 3],
    [4, 2],
  ];

  // transparent ones
  for (let index of transparentIndexes) {
    picMatrix[index[0]][index[1]] = "transparent";
  }
  // border ones
  for (let index of borderIndexes) {
    picMatrix[index[0]][index[1]] = "34803d";
  }
  // pic ones
  for (let i = 0; i < addrIndexes.length; i++) {
    let index = addrIndexes[i];

    picMatrix[index[0]][index[1]] = resColors[i];
    picMatrix[index[0]][w - index[1] - 1] = resColors[i];
  }

  return picMatrix;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url!);
  const address = searchParams.get("address");
  const variant = searchParams.get("variant");

  const isAddressValid = isEthAddressValid(address as string);
  let result;

  if (isAddressValid) {
    switch (variant) {
      case "cat":
        result = buildCatVariant(address as string);
        break;

      default:
        result = buildCatVariant(address as string);
        break;
    }
  } else {
    return new Response("invalid Address");
  }

  return new ImageResponse(
    (
      // <div
      //   style={{
      //     fontSize: 128,
      //     background: "white",
      //     width: "100%",
      //     height: "100%",
      //     display: "flex",
      //     textAlign: "center",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
      // >
      //   Hello world!
      // </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {result.map((row) => {
          return (
            <div style={{ display: "flex" }} key={row[0]}>
              {row.map((pixel: string) => (
                <div
                  style={{
                    backgroundColor:
                      pixel === "transparent" ? pixel : "#" + pixel,
                    width: "10px",
                    height: "10px",
                  }}
                  key={pixel}
                ></div>
              ))}
            </div>
          );
        })}
      </div>
    ),
    {
      width: 90,
      height: 60,
    }
  );
}
