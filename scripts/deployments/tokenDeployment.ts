import { ethers } from "hardhat";

async function main() {

  const Token = await ethers.deployContract("Stake");

  await Token.waitForDeployment();

  console.log(
    `Token was deployed to ${Token.target}`
  );
}

// Deployed to MUMBAI NETWORK
// 0xEbbA496ba76378a8c30090C50895017F6f0eaA45


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
