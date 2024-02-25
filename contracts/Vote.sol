// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract Vote {
    address public electionCommision;

    address public winner;
    uint public winnerid;
    uint256 winvotes;

    struct Voter {
        string name;
        uint256 age;
        uint256 voterId;
        string gender;
        uint256 voteCandidateId;
        string aadhar;
        address voterAddress;
    }

    struct Candidate {
        string name;
        string party;
        uint256 age;
        string gender;
        uint256 candidateId;
        string aadhar;
        address candidateAddress;
        uint256 votes;
    }

    uint16 nextVoterId = 1;

    uint256 nextCandidateId = 1;

    uint256 startTime;

    uint256 endTime;

    mapping(uint256 => Voter) voterDetails;

    mapping(address => Voter) public Boter;

    mapping(uint256 => Candidate) candidateDetails;

    bool stopVoting; //electionCommision

    constructor() {
        electionCommision = msg.sender; //varaible global
    }

    function candidateRegister(
        string calldata _name,
        string calldata _party,
        uint256 _age,
        string calldata _gender,
        string memory _aadhar,
        address caddress
    ) external {
        require(
            msg.sender != electionCommision,
            "You are from election commision"
        );

        require(
            candidateVerification(msg.sender, _aadhar),
            "You have already registered"
        );

        require(_age >= 18, "You re below 18");

        require(nextCandidateId < 10, "Registration full");

        candidateDetails[nextCandidateId] = Candidate(
            _name,
            _party,
            _age,
            _gender,
            nextCandidateId,
            _aadhar,
            caddress,
            0
        );

        nextCandidateId++;
    }

    function candidateVerification(
        address _person,
        string memory _aadhar
    ) internal view returns (bool) {
        for (uint256 i = 1; i < nextCandidateId; i++) {
            if (
                candidateDetails[i].candidateAddress == _person ||
                keccak256(abi.encodePacked(candidateDetails[i].aadhar)) ==
                keccak256(abi.encodePacked(_aadhar))
            ) {
                return false;
            }
        }

        return true;
    }

    function candidateList() public view returns (Candidate[] memory) {
        Candidate[] memory arr = new Candidate[](nextCandidateId - 1);
        //empty array,length=nextCandidateId-1

        for (uint256 i = 1; i < nextCandidateId; i++) {
            arr[i - 1] = candidateDetails[i];
        }

        return arr;
    }

    function voterRegister(
        string calldata _name,
        uint256 _age,
        string calldata _gender,
        string memory _aadhar
    ) external {
        require(
            voterVerification(msg.sender, _aadhar),
            "You have already registrated"
        );

        require(_age >= 18, "You are not eligbile to vote");

        voterDetails[nextVoterId] = Voter(
            _name,
            _age,
            nextVoterId,
            _gender,
            0,
            _aadhar,
            msg.sender
        );

        Boter[msg.sender] = voterDetails[nextVoterId];

        nextVoterId++;
    }

    function voterVerification(
        address _user,
        string memory _aadhar
    ) internal view returns (bool) {
        for (uint16 i = 1; i < nextVoterId; i++) {
            if (
                voterDetails[i].voterAddress == _user ||
                keccak256(abi.encodePacked(voterDetails[i].aadhar)) ==
                keccak256(abi.encodePacked(_aadhar))
            ) {
                return false;
            }
        }

        return true;
    }

    function voterList() public view returns (Voter[] memory) {
        Voter[] memory arr = new Voter[](nextVoterId - 1);

        for (uint16 i = 1; i < nextVoterId; i++) {
            arr[i - 1] = voterDetails[i];
        }

        return arr;
    }

    function returnId(address p) public view returns (Voter memory) {
        return Boter[p];
    }

    function returncId(uint i) public view returns (Candidate memory) {
        return candidateDetails[i];
    }

    function vote(uint16 _voterId, uint16 _id) external isVotingOver {
        require(
            voterDetails[_voterId].voteCandidateId == 0,
            "You have already voted"
        );

        require(
            voterDetails[_voterId].voterAddress == msg.sender,
            "You are not registered"
        );

        require(block.timestamp > startTime, "Voting has not started");

        require(block.timestamp < endTime, "Voting has ended");

        require(nextCandidateId > 2, "Canidate registration is not done yet");

        require(_id > 0 && _id < 10, "Candidate does not exist");

        voterDetails[_voterId].voteCandidateId = _id;
        Boter[voterDetails[_voterId].voterAddress].voteCandidateId = _id;

        candidateDetails[_id].votes++;
    }

    function voteTime(uint256 _startTime, uint256 _endTime) external {
        require(
            electionCommision == msg.sender,
            "You are not from election commision"
        );

        startTime = block.timestamp + _startTime; //5pm+5 minutes = 5:05 minutes

        endTime = startTime + _endTime; //5:05+20 minute= 5:25 minutes

        stopVoting = false;
    }

    //5:26

    function votingStatus() external view returns (string memory) {
        if (startTime == 0) {
            return "Voting Not Started, Go register Yourself";
        }
        // else if ((startTime != 0 && startTime >= block.timestamp) && stopVoting == false)
        //     {
        //             return "Voting going to start Soon, Go register Yourself";
        //     }
        else if (
            (startTime != 0 && endTime > block.timestamp) && stopVoting == false
        ) {
            return "Voting in progress";
        } else {
            return "Voting Ended";
        }
    }

    function result() external {
        require(
            electionCommision == msg.sender,
            "You are not from election commision"
        );

        Candidate[] memory arr = new Candidate[](nextCandidateId - 1);

        arr = candidateList();
        for (uint i = 0; i < nextCandidateId - 1; i++) {
            if (arr[i].votes >= winvotes) {
                winner = arr[i].candidateAddress;
                winnerid = arr[i].candidateId;
                winvotes = arr[i].votes;
            }
        }

        stopVoting = true;
    }

    function emergency() public {
        require(
            electionCommision == msg.sender,
            "You are not from election commision"
        );

        stopVoting = true;
    }

    modifier isVotingOver() {
        require(endTime > block.timestamp || stopVoting, "Voting is over");

        _;
    }
}
