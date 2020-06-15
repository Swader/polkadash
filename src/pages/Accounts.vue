<template>
  <div class="content">
    <card>
      <template slot="header">
        <h5 class="title">Accounts</h5>
        <p class="category">A component to interact with your accounts</p>
      </template>
      <div class="row">
        <div class="col-lg-12 col-md-3 col-sm-4 col-xs-6 col-xs-6 text-left">
          <card>
            <p v-for="(account, address) in accounts">{{ account }}. Account: {{ address }}</p>
            <hr />
            <p>
              Choose an address to convert to:
              <select
                v-model="selectedChain"
                @change="onSelect($event)"
              >
                <option v-for="chainname in chains" v-bind:value="chainname">{{ chainname }}</option>
              </select>
            </p>
            <hr />
            <p
              v-if="selectDropdown()"
              v-for="(account, address) in accounts"
            >{{ account }}. Address on {{ onlyChain }}: {{ address | prefix(onlyChain) }}</p>
          </card>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import { web3Accounts } from "@polkadot/extension-dapp";
import { MyFunctions } from "../components/Filters/Filter.js";
import api from "../connection.js";
const util = require("@polkadot/util-crypto");
let dappex = require("@polkadot/extension-dapp");

export default {
  el: "#selector",
  components: {
    Card,
    web3Accounts
  },
  data() {
    return {
      selected: false,
      accounts: {},
      address: {},
      onlyAddress: "",
      selectedAddress: "",
      selectedChain: "",
      onlyChain: "",
      chainName: "",
      chains: [
        "polkadot (0)",
        "kusama (2)",
        "plasm (5)",
        "bifrost (6)",
        "edgeware (7)",
        "karura (8)",
        "reynolds (9)",
        "acala (10)",
        "laminar (11)",
        "kulupu (16)",
        "darwinia (18)",
        "stafi (20)",
        "robonomics (32)",
        "centrifuge (36)",
        "substrate (42)"
      ]
    };
  },
  methods: {
    /* selectDropdown: function()
       This ensures that data is only displayed if the 
       dropdown has been selected, else return no data.
    */
    selectDropdown: function() {
      if (this.selected == true) return true;
    },
    /* 
     onSelect: function(event)
     Once a selection of the desired conversion is chosen, 
     it takes the selection directly from the dropdown, 
     splits it into two arrays to separate the name and the 
     prefix attached, then calls returnPrefix()
    */
    onSelect: function(event) {
      this.selected = true;
      //console.log(this.selectedChain);
      this.selectedChain.trim();
      let splitAccount = this.selectedChain.split(" ");
      let network = splitAccount[0];
      let assocPrefix = splitAccount[1];
      this.onlyChain = network;
      //console.log(this.onlyChain);

      // calls the public function to check if the default network
      // is the same as the chosen network to convert address to
      MyFunctions.returnPrefix(this.onlyChain);
    },
    onChange: function(event) {
      console.log(this.selectedAddress);
    },
    /* web3Connect: async function()
       This function connects to the polkadot{js} extension,
       checks if a user is logged in, if so, grabs all accounts from that
       user and prints them out to the screen from an array
    */
    web3Connect: async function() {
      dappex.web3Enable();
      let myapi = await api;
      if (!dappex.isWeb3Injected) {
        alert(
          "You need a Web3 enabled browser to log in with Web3. The easiest solution is probably to install the Polkadot{js} extension."
        );
      } else {
        let allAccounts = await web3Accounts();
        let accountList = allAccounts.map(accounts => {
          return {
            address: accounts.address
          };
        });

        let addressOptions = [];
        allAccounts.forEach(element => {
          addressOptions.push(element.address);
          this.address = addressOptions;
        });

        for (let i = 0; i < addressOptions.length; i++) {
          let account = addressOptions[i];
          this.$set(this.accounts, account, i);
        }
      }
    }
  },
  created() {
    this.web3Connect();
    this.onChange();
    this.onSelect();
    this.selectDropdown();
  }
};
</script>
