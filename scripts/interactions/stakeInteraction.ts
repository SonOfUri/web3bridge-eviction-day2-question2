import { ethers } from "hardhat";

async function main() {
  const stakingContractAddress = "0xe6DF23c9d77B6940CF1103Ea4D83f27B6C6bE4A5"; // Address of my deployed StakingContract
  const stakeAddress = "0xEbbA496ba76378a8c30090C50895017F6f0eaA45"; // Address of my deployed Stake token
  // const stakeAmount = 100; // Amount of tokens to stake
  const stakeAmount = ethers.parseUnits("100", 18); // Staking 100 units of my token


  const StakingContract = await ethers.getContractAt("StakingContract", stakingContractAddress);
  const stakeContract = await ethers.getContractAt("Stake", stakeAddress);

  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  // Approve the StakingContract to spend tokens on my behalf
  await stakeContract.connect(signer).approve(stakingContractAddress, stakeAmount);

  // Stake tokens in the StakingContract
  await StakingContract.connect(signer).stake(stakeAmount);

  console.log("Staked", stakeAmount.toString(), "tokens successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
