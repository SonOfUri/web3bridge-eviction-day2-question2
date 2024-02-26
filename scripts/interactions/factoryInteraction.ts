import { ethers } from "hardhat";

async function createStakingContract() {
  const stakingFactoryContractAddress = "0x4Ea755a18A2a163E04Fe94c497e5BCce9f70E10D"; // Address of my deployed StakingFactory

  // Connect to the StakingFactory contract
  const StakingFactory = await ethers.getContractAt("StakingFactory", stakingFactoryContractAddress);

  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  console.log("Creating a new StakingContract...");

  // Create a new StakingContract via the StakingFactory
  const stakeTokenAddress = "0xdB08fd7bae554d99aF487d29d6A82d60ae57480A"; // Address of my deployed Stake token
  const createTx = await StakingFactory.connect(signer).createStakingContract(stakeTokenAddress);
}

// MUMBAI SCAN LINKS
// https://mumbai.polygonscan.com/address/0x4Ea755a18A2a163E04Fe94c497e5BCce9f70E10D
// https://mumbai.polygonscan.com/address/0xdb08fd7bae554d99af487d29d6a82d60ae57480a

// https://mumbai.polygonscan.com/address/0xd56ecc2b269acc8e2a989cd71cd4c0e474e92680


createStakingContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
