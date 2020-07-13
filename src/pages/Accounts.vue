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
                v-model="currentPrefix"
                @change="onSelect(currentPrefix)"
              >
                <option v-for="(value, key) in prefixes" :value="key">{{ key }} : {{ value }}</option>
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
import { MyFunctions, prefixes } from "../components/Filters/Filter.js";
import api from "../connection.js";
const dappex = require("@polkadot/extension-dapp");

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
      prefixes,
      currentPrefix: {}
    };
  },
  methods: {
    selectDropdown: function() {
      return this.selected;
    },
    onSelect: function(selected) {
      this.selected = true;
      this.onlyChain = selected;
    },
    onChange: function(selected) {
      console.log(this.selectedAddress);
    },
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
