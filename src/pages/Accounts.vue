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
            <p v-for="(account, address) in addresses">{{ address }}. Account: {{ account }}</p>
            <hr />
            <p>
              Choose an address to convert to:
              <select
                v-model="onlyChain"
                @change="onSelect(onlyChain)"
              >
                <option v-for="(value, key) in prefixes" :value="key">{{ key }} : {{ value }}</option>
              </select>
            </p>
            <hr />
            <p
              v-if="selected"
              v-for="(account, address) in addresses"
            >{{ address }}. Address on {{ onlyChain }}: {{ account | prefix(onlyChain) }}</p>
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
  components: {
    Card,
    web3Accounts
  },
  data() {
    return {
      selected: false,
      addresses: {},
      onlyChain: "",
      prefixes,
    };
  },
  methods: {
    onSelect: function(selected) {
      this.selected = true;
      this.onlyChain = selected;
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

        let addressOptions = [];
        allAccounts.forEach(element => {
          addressOptions.push(element.address);
        });
        this.addresses = addressOptions;
      }
    }
  },
  created() {
    this.web3Connect();
    this.onSelect();
  }
};
</script>
