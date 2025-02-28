"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { projectId, wagmiAdapter } from "../config/wagmiConfig";
import { getContract } from "../constant/constant";
import { useAppKitAccount } from "@reown/appkit/react";

const metadata = {
  name: "Voting Dapp",
  description: "Voting Dapp",
  url: window?.location?.href,
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet , sepolia],
  defaultNetwork: sepolia,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

const queryClient = new QueryClient();
const ContractContext = createContext();
export const useContract = () => useContext(ContractContext);

export default function Provider({ children, cookies }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);
  const { isConnected, address } = useAppKitAccount();
  const [contract, setContract] = useState();


  useEffect(() => {
    const fetchContract = async () => {
      try {
        const contractInstance = await getContract(); 
        setContract(contractInstance);
      } catch (error) {
        console.error("Error loading contract:", error);
      }
    };

    fetchContract();
  } , [])

  return (
    <WagmiProvider
      config={wagmiAdapter?.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <ContractContext.Provider value={{ isConnected, address, contract }}>
          {children}
        </ContractContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
