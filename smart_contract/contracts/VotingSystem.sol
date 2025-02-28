// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        bool exists;
        uint256 startTime;
        uint256 endTime;
    }

    address immutable Owner;
    uint256 public candidateCount;

    constructor() {
        Owner = msg.sender;
    }

    mapping(address => bool) public hasVoted;
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public isRegisteredVoter;
    mapping(address => bool) public isRegisteredCandidate;

    modifier onlyRegisteredVoter() {
        require(isRegisteredVoter[msg.sender], "You are not a registered voter");
        _;
    }

    modifier onlyCandidate() {
        require(isRegisteredCandidate[msg.sender], "You are not a registered candidate");
        _;
    }

    modifier preventMultipleVote() {
        require(!hasVoted[msg.sender], "You can only vote once.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == Owner, "Not the owner");
        _;
    }

    modifier stopModification() {
        require(candidateCount == 0, "You cannot modify once candidates are added");
        _;
    }

    function registerVoter(address _voter) public  {
        require(!isRegisteredVoter[_voter], "Voter already registered");
        isRegisteredVoter[_voter] = true;
    }

    function registerCandidate(string memory _name, uint256 _durationInDays) public {
        require(!isRegisteredCandidate[msg.sender], "You are already a candidate");
        candidateCount++;
        candidates[candidateCount] = Candidate(
            candidateCount,
            _name,
            0,
            true,
            block.timestamp,
            block.timestamp + (_durationInDays * 1 days)
        );
        isRegisteredCandidate[msg.sender] = true;
    }

    function castVote(uint256 _candidateId) public preventMultipleVote  {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        require(block.timestamp >= candidates[_candidateId].startTime, "Voting has not started yet");
        require(block.timestamp <= candidates[_candidateId].endTime, "Voting has ended");
        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }

    function getVotes(uint256 _candidateId) public view returns (uint256) {
        return candidates[_candidateId].voteCount;
    }

    function deleteCandidate(uint256 _candidateId) public onlyOwner stopModification {
        require(candidates[_candidateId].exists, "Candidate does not exist");
        delete candidates[_candidateId];
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory candidateArray = new Candidate[](candidateCount);
        for (uint256 i = 1; i <= candidateCount; i++) {
            candidateArray[i - 1] = candidates[i];
        }
        return candidateArray;
    }
}
