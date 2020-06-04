<template>
  <div class="content">
    <card>
      <template slot="header">
        <h5 class="title">Addresses</h5>
        <p class="category">A utility for converting between address formats</p>
        <p>Original address: {{ address }}</p>
        <hr />
        <p v-for="(prefix, name) in prefixes">
          Address on {{ name }}: {{ address | prefix(prefix) }}
        </p>
      </template>
    </card>
  </div>
</template>
<script>
import { Card } from "@/components/index";

export default {
  components: {
    Card,
  },
  data() {
    return {
      address: "CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp",
      prefixes: {
        polkadot: 0,
        kusama: 2,
        plasm: 5,
        bifrost: 6,
        edgeware: 7,
        karura: 8,
        reynolds: 9,
        acala: 10,
        laminar: 11,
        kulupu: 16,
        darwinia: 18,
        robonomics: 32,
        centrifuge: 36,
        substrate: 42,
      },
    };
  },
};
</script>
