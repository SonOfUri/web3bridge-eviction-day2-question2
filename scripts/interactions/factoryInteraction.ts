import { ethers } from "hardhat";

async function createStakingContract() {
  const stakingFactoryContractAddress = "0x4Ea755a18A2a163E04Fe94c497e5BCce9f70E10D"; // Address of my deployed StakingFactory

  // Connect to the StakingFactory contract
  const StakingFactory = await ethers.getContractAt("StakingFactory", stakingFactoryContractAddress);

  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  console.log("Creating a new StakingContract Instance...");

  // Create a new StakingContract via the StakingFactory
  const stakeTokenAddress = "0xEbbA496ba76378a8c30090C50895017F6f0eaA45"; // Address of my deployed Stake token
  const createTx = await StakingFactory.connect(signer).createStakingContract(stakeTokenAddress);
}

// Factory Contract
// https://mumbai.polygonscan.com/address/0x4ea755a18a2a163e04fe94c497e5bcce9f70e10d

// New Staking Contract
// https://mumbai.polygonscan.com/address/0xe6df23c9d77b6940cf1103ea4d83f27b6c6be4a5


createStakingContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
