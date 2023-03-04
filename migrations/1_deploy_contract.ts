import { CastVotesInstance } from "../types/truffle-contracts";

type Network = "development" | "kovan" | "mainnet";

export default function (artifacts: Truffle.Artifacts, web3: Web3) {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    const CastVotes = artifacts.require("cast_votes");

    deployer.deploy(CastVotes, ["Turkey disaster"]);
    CastVotes.deployed().then((instance: CastVotesInstance) => {
      // call contract function here
    });
  };
}
