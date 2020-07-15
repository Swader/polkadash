<template>
  <div class="content">
    <card>
      <template slot="header">
        <h5 class="title">Profile</h5>
        <p class="category">A user's on-chain profile - enter an address!</p>
      </template>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xs-12">
          <input
            class="form-control"
            type="text"
            placeholder="PhngluimglwnafhCthulhuRlyehwgahnaglfhtagn"
            id="idlookup"
            v-model="newaddress"
            v-on:keyup.enter="lookup"
          />
          <p>
            {{ error }}
          </p>
        </div>
      </div>
    </card>
    <card>
      <identity :address="address"></identity>
    </card>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import api from "@/connection.js";
import { checkAddress } from "@polkadot/util-crypto";

export default {
  components: {
    Card,
    Identity: () => import("@/components/Cards/Identity"),
  },
  data() {
    return {
      address: "",
      error: "",
      newaddress: "",
      currentPrefix: "",
    };
  },
  methods: {
    lookup: function() {
      if (this.validateAddress(this.newaddress)) {
        this.address = this.newaddress;
      }
    },
    validateAddress: function(address) {
      let check = checkAddress(address, this.currentPrefix);
      console.log(check[1]);
      this.error = check[1];
      return check[0];
    },
  },
  created: function() {
    api.then(async (api) => {
      this.currentPrefix = (
        await api.rpc.system.properties()
      ).toJSON().ss58Format;
    });
  },
};
</script>
<style></style>
