// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract SimpleContract {
    // Here we are declaring global varibale string type
    string[] public name;

    // This function take string input and append to our list that we declar as global variable (write to blockchaine)
    function addName(string memory _name) public {
        name.push(_name);
    }

    // This function pull name form index position we would liek to see and show us on the front end (read from blockchain)
    function returnName(uint256 _index) public view returns (string memory) {
        return name[_index];
    }
}
