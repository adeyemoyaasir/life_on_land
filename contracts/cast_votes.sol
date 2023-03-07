// SPDX-License-Identifier: MIT
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
        address payable recipient_address;
    }
    
    address public chairperson;

    mapping (address => Voter) voters;

    //array of proposals
    proposed_recipient[] public proposals;

     modifier limitAccessToOwner(){
        require(chairperson == msg.sender,'function can only be called by chairperson');
        _;
    }

    event proposalsAdded(
        bool success,
        proposed_recipient[] proposals

    );


    //creating ballot with the recipients to receive the funds
    constructor() {
        chairperson = msg.sender;       
    }

    //giving voters right to vote. chairperson currently has the power to select voters.
    // This can be changed to something that uses a multisig wallet

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

    function addProposals(proposed_recipient[] memory proposals_Structs) public limitAccessToOwner() {

        for(uint i=0; i<proposals_Structs.length; i++){
            proposals.push(      
                proposals_Structs[i]          
            );
        }

        emit proposalsAdded(true, proposals);
    }

    function getArrayofProposals() public view returns( proposed_recipient[] memory){
        return proposals;
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

    function winnerAddress() external view returns (address winnerAddress_){
        winnerAddress_=  proposals[winningProposal()].recipient_address;
        
    }

}
