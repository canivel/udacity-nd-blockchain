// contracts/SampleToken.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("SampleToken", "ST") {
        _mint(msg.sender, initialSupply);
    }
}