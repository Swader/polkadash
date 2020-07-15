<template>
  <card type="user">
    <div class="identity">
        <a href="#">
        <img class="avatar" :src="avatar" alt="..." />
        <h5 class="fullName">{{ user.fullName || address }}</h5>
      </a>
      <p class="address" v-if="user.fullName">
        {{ address }}
      </p>
    </div>
    <p class="card-description" v-if="user.email">
      <a href="mailto:user.email">{{ user.email }}</a>
    </p>
    </div>
  </card>
</template>
<script>
import { Card } from "@/components/index";
import api from "@/connection.js";
import { hexToString } from "@polkadot/util";

const hash = require("blueimp-md5");

export default {
  components: {
    Card
  },
  data() {
    return {
      user: {
          fullName: "Test",
          email: "test@test.com"
      }
    };
  },
  props: {
      address: String
  },
  computed: {
      avatar: function() {
          if (this.user.email) {
              return "https://www.gravatar.com/avatar/" + hash(this.user.email) + "?s=200"
          } else {
              return "../../assets/img/anime6.png";
          }
      }
  },
  watch: {
    address: function(val) {
      this.readIdentity(val);
    },
  },
  methods: {
    readIdentity(address) {
      api.then(async (api) => {
        let id = (await api.query.identity.identityOf(address)).toJSON();
        this.user.fullName = (id.info.legal.Raw) ? hexToString(id.info.legal.Raw) : "";
        this.user.email = (id.info.email.Raw) ? hexToString(id.info.email.Raw) : "";      
      });
    },
  },
};
</script>
