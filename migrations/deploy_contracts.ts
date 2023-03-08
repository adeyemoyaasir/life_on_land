type Network = "testnet" | "mainnet";

module.exports = function (artifacts: Truffle.Artifacts, web3: Web3) {
  return async (
    deployer: Truffle.Deployer,
    network: Network,
    accounts: string[]
  ) => {
    console.log("Not d ");
    const CastVotes = artifacts.require("CastVotes");
    const DonateFunds = artifacts.require("DonateFunds");

    await deployer.deploy(CastVotes);
    await deployer.link(CastVotes, DonateFunds);
    await deployer.deploy(DonateFunds);

    const castVotes = await DonateFunds.deployed();
    const donateFunds = await DonateFunds.deployed();
    console.log(
      `CastVotes deployed at ${castVotes.address} in network: ${network}.`
    );

    console.log(
      `DonateFunds deployed at ${donateFunds.address} in network: ${network}.`
    );
  };
};
