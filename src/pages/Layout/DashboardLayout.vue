<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar :background-color="backgroundColor">
      <!-- <mobile-menu slot="content"></mobile-menu> -->
      <sidebar-link to="/home">
        <i class="tim-icons icon-tie-bow"></i>
        <p>Home</p>
      </sidebar-link>
      <sidebar-link to="/dashboard">
        <i class="tim-icons icon-chart-pie-36"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/blocknumber">
        <i class="tim-icons icon-atom"></i>
        <p>Block number</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";

import api from "@/connection.js";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    SideBar,
    SidebarLink,
  },
  data() {
    return {
      colors: {
        kusama: "primary",
        polkadot: "blue",
      },
      backgroundColor: "green",
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  beforeCreate() {
    this.backgroundColor = localStorage.getItem("backgroundColor") || "green";
    // Check the metadata for chain name, modify color
    api.then(
      async function(api) {
        const rtv = await api.rpc.state.getRuntimeVersion();
        const specName = rtv.specName.toHuman();
        if (Object.keys(this.colors).includes(specName)) {
          this.backgroundColor = this.colors[specName];
          localStorage.setItem("backgroundColor", this.colors[specName]);
        }
      }.bind(this)
    );
  },
  mounted: function() {
    this.backgroundColor = localStorage.getItem("backgroundColor") || "green";
  },
};
</script>
