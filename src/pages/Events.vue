<template>
  <div class="content">
    <card>
      <template slot="header">
        <h5 class="title">Events</h5>
        <p class="category">Outputs events from new blocks</p>
      </template>
      <div class="row">
        <div class="col-lg-12 col-md-3 col-sm-4 col-xs-6 col-xs-6 text-left">
          <card v-for="(event, block) in events">
            {{ block }}
            <p v-for="e in event">
              {{ e }}
            </p>
          </card>
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
      events: {},
      unsub: null,
    };
  },
  methods: {
    subscribe: async function() {
      let myapi = await api;

      myapi.query.system
        .events(async (events) => {
          let header = await myapi.rpc.chain.getHeader();
          let blockNumber = header.toJSON().number;

          let eventArray = [];
          events.forEach((record) => {
            const { event, phase } = record;
            const types = event.typeDef;
            eventArray.push(
              `\t${event.section}:${
                event.method
              }:: (phase=${phase.toString()}): \t\t${event.meta.documentation.toString()}`
            );
          });
          console.log("Still here");
          this.$set(this.events, blockNumber, eventArray);
        })
        .then((_unsub) => (this.unsub = _unsub));
    },
    unsubscribe: function() {
      if (this.unsub) {
        this.unsub();
        console.log("Unsubbed");
      }
    },
  },
  created() {
    this.subscribe();
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
<style></style>
