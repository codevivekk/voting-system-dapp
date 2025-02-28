const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners(); // 👈 This is the wallet paying

  console.log("Deploying contracts with the account:", deployer.address);

  
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    
    // Estimate gas required for deployment
    const estimatedGas = await ethers.provider.estimateGas(
        VotingSystem.getDeployTransaction()
    );

    console.log(`Estimated Gas for Deployment: ${estimatedGas.toString()}`);

    const contract = await VotingSystem.deploy();
    await contract.waitForDeployment();
    
    const contractAddress = await contract.getAddress();
    console.log(`Contract deployed at: ${contractAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
