type Network = "development" | "kovan" | "mainnet";

export default function (artifacts: Truffle.Artifacts, web3: Web3) {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    const castVotes = artifacts.require("cast_votes");

    // do something here
  };
}
