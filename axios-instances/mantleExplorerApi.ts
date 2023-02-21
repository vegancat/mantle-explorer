import axios from "axios";

const mantleExplorerApiInstance = axios.create({
  baseURL: "https://explorer.testnet.mantle.xyz/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mantleExplorerApiInstance;
