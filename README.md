# Introduction

Mantle Scan is all about better UX!

- View number of Transactions
- Recent Transaction
- Transaction History of an address
- Token holdings of an address
- NFTs of an address

# Demo Website

[MantelScan](https://mantlescan.vercel.app)

# Demo video

[Demo Video/Walkthrough](https://youtu.be/S9H_n-HSg3Q)

## Cool pics instead of raw addresses

We decided to create an API that accepts an ETH address and a variant and produces a unique pic for that address!

We first add "0F" to end of and address, so we have 40 (from eth address) + 2 (added by api) = 42 chars!

42 is a factor of 6, but why 6?! well if we put six hex chars beside each Other we have a unique color!

API is accessible through: `https://mantlescan.vercel.app/api/addrToPng?address={ethAddress}&&variant={variant}`. currently only variant supported is cat but more to be added!

# Tech Used

- [Rainbow wallet Adapter](https://github.com/rainbow-me/rainbowkit)
- [Ens Names and avatars](https://ens.domains/)

# References

- [Mantle Brand Assets](https://www.dropbox.com/scl/fo/8vv0daiepm9fmfufbnwhg/h?dl=0&rlkey=an3ndoj14x5d3rywkd6jfhvmr)

- [Wagmi Docs](https://wagmi.sh/react/getting-started)

- [Mantle Explorer APIs](https://explorer.testnet.mantle.xyz/api-docs)
