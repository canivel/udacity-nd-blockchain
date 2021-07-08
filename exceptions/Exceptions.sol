// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Modifiers {

    uint  public  minimumOffer = 100;

    modifier  minimumAmount(){
        if(msg.value >= minimumOffer){
            _;
        } else {
            /** Throw an exception */
            revert();
        }
    }

    function  bid() payable public minimumAmount returns(bool)  {
        // Code the adding a new bid
        return true;
    }
}