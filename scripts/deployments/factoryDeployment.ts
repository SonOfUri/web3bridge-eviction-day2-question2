import { ethers } from "hardhat";

async function main() {

  const stakingFactoryContract = await ethers.deployContract("StakingFactory");
  
  await stakingFactoryContract.waitForDeployment();

  console.log(
    `Staking Factory Contract was deployed to ${stakingFactoryContract.target}`
  );
}

// Deployed to MUMBAI NETWORK
// 0x4Ea755a18A2a163E04Fe94c497e5BCce9f70E10D

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
