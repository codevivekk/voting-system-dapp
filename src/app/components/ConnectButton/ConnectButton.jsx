"use client";
import React, { useEffect } from "react";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { useContract } from "@/app/provider/Provider";
import Link from "next/link";

const ConnectButton = () => {
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { contract } = useContract();



  const handleRegisterAsVoter = async () => {
    await contract.registerVoter(address);
  }

  const handleConnect = () => {
    disconnect();
    open({ view: "Connect" });
  };
  return (
    <div className="  w-fit ">
      {address !== "undefined" && isConnected && (
        <div className="flex gap-4">
          <button onClick={handleRegisterAsVoter} className="red-btn rounded-lg p-2 bg-red-500">
            Registed as Voter
          </button>
          <Link href="/add-candidate" className="red-btn rounded-lg p-2 bg-red-500"> Add Candidate</Link>
          <button onClick={() => open({ view: "Account" })} className="red-btn rounded-lg p-2 bg-red-500">
            {" "}
            {`${address.slice(0, 4)}...${address.slice(-6)}`}{" "}
          </button>
        </div>
      )}
      {(address === "undefined" || address === undefined) && (
        <button onClick={handleConnect} className="red-btn rounded-lg p-2 bg-red-500">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectButton;
