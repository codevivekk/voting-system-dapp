# Decentralized Voting Application

## 📝 Project Overview
This project is a **Decentralized Voting Application** built using **Ethereum Blockchain, Solidity, Hardhat, React, and Ethers.js**. It allows users to cast votes on the Ethereum testnet securely and transparently.

## 🚀 Features
- **Smart Contracts**: Solidity-based contracts deployed on Ethereum.
- **Voting Mechanism**: Users can vote for candidates on-chain.
- **Candidate List & Results**: Fetch candidates and real-time vote counts.
- **MetaMask Authentication**: Users sign transactions using MetaMask.
- **State Management**: React hooks (`useState`, `useEffect`).
- **Bonus** (Optional): Voter registration & decentralized storage (IPFS).

## 🏗 Tech Stack
- **Blockchain**: Ethereum, Solidity
- **Smart Contract Development**: Hardhat
- **Frontend**: React.js
- **Blockchain Interaction**: Ethers.js
- **Wallet Authentication**: MetaMask
- **Storage (Optional)**: IPFS

## 📌 Setup Instructions
### 1️⃣ Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **Hardhat** (`npm install -g hardhat`)
- **MetaMask** (Browser Extension)
- **Ethereum Testnet (Sepolia)**

### 2️⃣ Clone Repository

### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
PRIVATE_KEY=your_testnet_wallet_private_key
INFURA_API_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
```

### 5️⃣ Compile & Deploy Smart Contract
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```
*Copy the deployed contract address and update it in `src/utils/contract.js`.*

### 6️⃣ Start Frontend
```sh
npm start
```

## 📤 Deployment
2. **Smart Contract**: Deploy on Ethereum testnet (e.g., Sepolia).


