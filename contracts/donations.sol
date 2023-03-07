// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 <0.9.0;

contract DonateFunds {
    uint256 totalDonationsAmount;
    address payable owner;
    uint256 highestDonation;
    address payable  highestDonor;
    address payable[] charities;

    constructor(){
        owner = payable (msg.sender);
        totalDonationsAmount = 0;
        highestDonation = 0;

    }

    modifier restrictedAccessToOwner (){
        require(msg.sender == owner, 'Only owner can call this method');
        _;
    }

    modifier validateRecipient (address payable recipientAddress){
        require(msg.sender != recipientAddress,'sender address cannot be recipient address');
        _;
    }

    modifier validateAmountSent (){
        require( msg.value > 0, 'amount to send has to be greater than 0');
        _;
    }


    modifier validateAmountDonated (){
        require( msg.value > 0, 'amount to donate has to be greater than 0');
        _;
    }


    event DonationReceived(
    
    address indexed _donor,
    uint256 _value
    );

    event DonationMade (
        address _recipient_account,
        uint256 _value
    );

    function donateToGeneralWallet() public validateAmountDonated() payable {
        uint256 donationAmount = msg.value;
        owner.transfer(donationAmount); //can contract hold funds..

        emit DonationReceived(msg.sender, donationAmount);

        totalDonationsAmount += donationAmount;
        if(donationAmount > highestDonation){
            highestDonation = donationAmount;
            highestDonor = payable(msg.sender);
        }
    }

    function donateToSpecificCause() public payable {

    }

    function addCharityAddress() public {

    }

    function removeCharityAddress() public {
        
    }

    function getTotalDonations() view public returns(uint256){
        return totalDonationsAmount;
    }

    function payOutDonations(address payable recipientAddress, uint256 donationAmount) public validateAmountSent() validateRecipient(recipientAddress) payable {
        recipientAddress.transfer(donationAmount);
        emit DonationMade(recipientAddress, donationAmount);
    }

}

/* 
    : pass recipient address from cast_votes.sol
*/