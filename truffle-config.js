require("ts-node").register({
  files: true,
});

const HDWalletProvider = require("@truffle/hdwallet-provider");

require("dotenv").config();
const { PRIVATE_KEY,  FTMSCAN_API_KEY } = process.env;

module.exports = {
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    testnet_ftmscan: FTMSCAN_API_KEY,
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          PRIVATE_KEY,
          `https://fantom-testnet.public.blastapi.io`
        ),
      gas: 4000000,
      network_id: 4002,
    },
    mainnet: {
      provider: () =>
        new HDWalletProvider(PRIVATE_KEY, `https://rpc.fantom.network`),
      network_id: 250,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.18",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: "byzantium",
      },
    },
  },

  db: {
    enabled: false,
    host: "127.0.0.1",
    adapter: {
      name: "indexeddb",
      settings: {
        directory: ".db",
      },
    },
  },
};
