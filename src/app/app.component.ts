import { Component, NgZone } from '@angular/core';

import { environment } from '../environments/environment';


declare var web3;

enum Role { none, Person, Broker, EscrowAgent, Inspector }

export class User {
  firstname: string;
  lastname: string;
  role: Role;

  constructor(r: any){
    this.firstname = r[0];
    this.lastname = r[1];
    this.role = r[2].toNumber();
   }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  private accounts;
  private currentAccount: any;
  private currentAccountAddress;
  private MyContract: any;
  private myContractInstance: any;

  // roles: string[] = ['none', 'Person', 'Broker', 'EscrowAgent', 'Inspector'];

  constructor(private zone:NgZone){ }

  ngOnInit() {
    if (!this.isMetaMask())
      return;
    this.getAccounts();
    console.log(this.accounts, web3.eth.accounts[0], web3.eth.defaultAccount);
    this.currentAccountAddress = web3.eth.defaultAccount;
    this.connectContract();
    this.test();
  }

  isMetaMask() {
    if (typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask)
      return true;
  }

  connectContract() {
    //setTimeout(()=>{
    this.MyContract = web3.eth.contract(environment.contract_abi);
    this.myContractInstance = this.MyContract.at(environment.contract_address);
    console.log(this.myContractInstance);
    // this.myContractInstance.set(this.currentAccountAddress, 'Alex', 'Ross', 1, (e,r)=>{
    //   console.log(e,r);
    // });
    //})
  }

  test() {
    //setTimeout(()=>{
      //console.log (this.myContractInstance)

      this.myContractInstance.get((e,r)=>{
        //console.log(e,r);
        if (e)
          return;
        this.zone.run(()=>{
          this.currentAccount = new User(r);
          console.log('get', this.currentAccount, this.currentAccount.role === Role.Person);
        });
      });
    //}, 500)

  }

  getAccounts() {
    web3.eth.getAccounts((e, r)=>{
      if (!e)
        this.accounts = r;
    });
  }


}


// window.addEventListener('load', function() {
//   //console.info('web3.eth.accounts[0]', web3.eth.accounts[0])
//   if (typeof web3 !== 'undefined')
//   web3.eth.getAccounts(function(error, result){
//     //web3.eth.accounts = [].concat(result);
//     if (result[0])
//       web3.eth.defaultAccount = result[0];
//   });
// });


