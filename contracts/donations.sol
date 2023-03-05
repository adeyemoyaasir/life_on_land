// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 <0.9.0;

contract DonateFunds {
    uint256 totalDonationsAmount;
    address payable owner;
    uint256 highestDonation;
    address payable  highestDonor;
    

    constructor(){
        owner = payable (msg.sender);
        totalDonationsAmount = 0;
        highestDonation = 0;

    }

    event DonationReceived(
    
    address indexed _donor,
    uint256 _value
    );

    event DonationMade (
        address _recipient_account,
        uint256 _value
    );

    function donate() public payable {
        uint256 donationAmount = msg.value;
        owner.transfer(donationAmount);

        emit DonationReceived(msg.sender, donationAmount);

        totalDonationsAmount += donationAmount;
        if(donationAmount > highestDonation){
            highestDonation = donationAmount;
            highestDonor = payable(msg.sender);
        }
    }

    function getTotalDonations() view public returns(uint256){
        return totalDonationsAmount;
    }

    function payOutDonations(address payable recipientAddress, uint256 donationAmount) public payable {
        recipientAddress.transfer(donationAmount);
        emit DonationMade(recipientAddress, donationAmount);
    }
}

/* 
 TODO: add modifers fot type and condition safety
    : pass recipient address from cast_votes.sol
*/