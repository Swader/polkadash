<template>
  <div class="content">
    <card>
      <template slot="header">
        <h5 class="title">Blocknumber</h5>
        <p class="category">Outputs the block number</p>
      </template>
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          {{ blocknumber }}
        </div>
      </div>
    </card>
    <card>
      <template slot="header">
        <h5 class="title">LastBlock</h5>
        <p class="category">Outputs the last block</p>
      </template>
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
          {{ lastblock }}
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import { Card } from "@/components/index";

import api from "../connection.js";

export default {
  components: {
    Card,
  },
  data() {
    return {
      blocknumber: 0,
      lastblock: 0,
      events: [],
    };
  },
  methods: {
    getBlockNumber() {
      api.then((api) => {
        api.rpc.chain.getBlock().then((block) => {
          this.blocknumber = block.block.header.number.toNumber();
        });

        api.rpc.chain.subscribeNewHeads((header) => {
          this.lastblock = header.number;
        });

      });
    },
  },
  created() {
    this.getBlockNumber();
  },
};
</script>
<style></style>
