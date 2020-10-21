<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="https://dotleap.com"
          ><img src="`${publicPath}/favicon2.png`" /> DotLeap.com</a
        >
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
          <!-- <li class="search-bar input-group"  @click="searchModalVisible = true">
            <button class="btn btn-link" id="search-button" data-toggle="modal" data-target="#searchModal"><i class="tim-icons icon-zoom-split"></i>
              <span class="d-lg-none d-md-block">Search</span>
            </button>
          </li> -->
          <modal
            :show.sync="searchModalVisible"
            class="modal-search"
            id="searchModal"
            :centered="false"
            :show-close="true"
          >
            <input
              slot="header"
              @keyup.enter="toggleEndpoint($event.currentTarget.value)"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              v-bind:placeholder="endpoint"
            />
          </modal>
          <drop-down>
            <a
              href="javascript:void(0)"
              data-toggle="dropdown"
              class="dropdown-toggle nav-link"
            >
              <div class="d-none d-lg-block d-xl-block"></div>
              <i class="tim-icons icon-sound-wave"></i>
              <span>&nbsp;&nbsp;{{ endpoint }}</span>
              <p class="d-lg-none text-left">
                Endpoints
              </p>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li class="nav-link">
                <a
                  href="#"
                  class="nav-item dropdown-item"
                  @click="toggleEndpoint('wss://kusama-rpc.polkadot.io/')"
                  >wss://kusama-rpc.polkadot.io/</a
                >
              </li>
              <li class="nav-link">
                <a
                  href="#"
                  class="nav-item dropdown-item"
                  @click="toggleEndpoint('wss://rpc.polkadot.io')"
                  >wss://rpc.polkadot.io</a
                >
              </li>
              <li class="nav-link">
                <a
                  href="#"
                  class="nav-item dropdown-item"
                  @click="toggleEndpoint('ws://127.0.0.1:9944')"
                  >ws://127.0.0.1:9944</a
                >
              </li>
              <li class="nav-link">
                <a
                  href="#"
                  class="nav-item dropdown-item"
                  @click="searchModalVisible = true"
                  >Custom Endpoint</a
                >
              </li>
            </ul>
          </drop-down>
          <!-- <drop-down>
                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                  <div class="photo">
                    <img src="@/assets/img/anime3.png" alt="Profile Photo">
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">
                    Log out
                  </p>
                </a>
                <ul class="dropdown-menu dropdown-navbar">
                  <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Profile</a></li>
                  <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Settings</a></li>
                  <li class="dropdown-divider"></li>
                  <li class="nav-link"><a href="javascript:void(0)" class="nav-item dropdown-item">Log out</a></li>
                </ul>
              </drop-down> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import DropDown from "@/components/Dropdown.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    DropDown,
    Modal,
  },
  data() {
    return {
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
      endpoint: localStorage.getItem("endpoint"),
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleEndpoint(value) {
      if (value !== this.endpoint) {
        localStorage.setItem("endpoint", value);
        window.location.reload();
      }
    },
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
};
</script>
<style></style>
