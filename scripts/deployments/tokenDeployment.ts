import { ethers } from "hardhat";

async function main() {

  const Token = await ethers.deployContract("StakingFactory");

  await Token.waitForDeployment();

  console.log(
    `Token was deployed to ${Token.target}`
  );
}

// Deployed to MUMBAI NETWORK
// 0xdB08fd7bae554d99aF487d29d6A82d60ae57480A


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
