// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity  >=0.7.0 <0.9.0;

contract cast_votes {
    
    struct Voter {
        bool voted;
        uint vote;
        uint weight; //index of the proposal voter supports
    }

    struct  proposed_recipient {
        bytes32 name;
        uint voteCount;
    }
    
    address public chairperson;

    mapping (address => Voter) voters;

    //array of proposals
    proposed_recipient[] public proposals;


    //creating ballot with the recipients to receive the funds
    constructor(bytes32[] memory proposalNames) {
        chairperson = msg.sender;
        
        for(uint i=0; i<proposalNames.length; i++){
            proposals.push(proposed_recipient({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    //giving voters right to vote. require that voters be the only ones in original verified list

    function giveVotingRight(address voter)  external {
        require(
            msg.sender == chairperson,
            'Only chairperson can give right to vote'
        );
        require(
            !voters[voter].voted,
            'Voter already cast a ballot'
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;

    }

    function vote(uint proposal) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Sender has no right to vote");
        require(!sender.voted, "Already voted");
        sender.voted = true;
        sender.vote = proposal;
    }

    function winningProposal () public view returns (uint winningProposal_){
        uint winningVoteCounter = 0;
        for(uint p = 0; p<proposals.length; p++){
            if(proposals[p].voteCount > winningVoteCounter){
                winningVoteCounter = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_){
        winnerName_ = proposals[winningProposal()].name;
    }

}