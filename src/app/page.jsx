"use client";
import { useEffect, useState } from "react";
import { useContract } from "./provider/Provider";
import { BigNumber } from "ethers";

export default function Home() {
  const { address, contract } = useContract();
  const [party, setParty] = useState([]);

  useEffect(() => {
    if(!address) return;
    const fetchData = async () => {
      try {
        if (!contract) return;
        const data = await contract?.getCandidates();
        console.log(data)
        const formattedData = {
          id: BigNumber.from(data[0][0]._hex).toNumber(),
          name: data[0][1],
          votes: BigNumber.from(data[0][2]).toNumber(),
          isActive: data[0][3],
          createdAt: new Date(
            BigNumber.from(data[0][4]).toNumber() * 1000
          ).toLocaleString(),
          updatedAt: new Date(
            BigNumber.from(data[0][5]).toNumber() * 1000
          ).toLocaleString(),
        };
        console.log(formattedData)
        setParty([formattedData]);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [contract , address]);


  const handleVote = async (e, candidate) => {
    e.preventDefault();
    await contract?.castVote(candidate.id);
  }

  if(!address) {
    return(
      <p className="text-center"> Connect wallet to See candidate</p>
    )
  }

  return (
    <p>

      {party?.map((candidate) => (
        <div
          key={candidate.id}
          className="flex justify-between items-center p-4 border-b"
        >
          <div>
            <h1 className="text-xl font-bold">{candidate.name}</h1>
            <p>Votes: {candidate.votes}</p>
            <p>Active: {candidate.isActive ? "Yes" : "No"}</p>
            <p>Created At: {candidate.createdAt}</p>
            <p>Updated At: {candidate.updatedAt}</p>
          </div>
          <div>
            <button type="submit" onClick={(e) => handleVote(e ,candidate)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Vote
            </button>
          </div>
        </div>
      ))}
    </p>
  );
}
