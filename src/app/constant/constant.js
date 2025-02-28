import ABI from "./abi.json";
import { ethers } from "ethers";


export const CONTRACT_ABI = ABI.abi;

export const CONTRACT_ADDRESS = "0xaA9dA44A84Dc081B71f1121Ee74E99401e74C64E"




export const getContract =  () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  }
  return null;
};
