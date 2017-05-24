pragma solidity ^0.4.4;

contract Users {

  address public owner;
  enum Role { none, Person, Broker, EscrowAgent, Inspector }
  struct User {
    string firstname;
    string lastname;
    Role role;
  }
  mapping (address => User) users;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function Users() {
    owner = msg.sender;
  }

  function set(address _addr, string _firstname, string _lastname, uint _role) restricted {
    users[_addr] = User(_firstname, _lastname, Role(_role));
  }

  function get() constant returns (string, string, Role) {
    if (users[msg.sender].role == Role.none) throw;
    return (
      users[msg.sender].firstname, 
      users[msg.sender].lastname, 
      users[msg.sender].role
    );
  }

  function remove(address _addr) restricted {
    delete users[_addr];
  }
}
