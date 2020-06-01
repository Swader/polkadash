<template>
  <div class="content text-left">
    <card>
      <template slot="header">
        <h2 class="title">Home</h2>
      </template>
      <template>
        <div class="row text-left">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
            <p>
              Polkadash is a mobile-friendly starter kit for developing your own
              UI for a Substrate-based chain. This starter kit is based on
              <a href="https://demos.creative-tim.com/vue-white-dashboard"
                >Creative Tim's Vue White Dashboard</a
              >, so any
              <a
                href="https://demos.creative-tim.com/vue-white-dashboard/documentation"
                >documentation</a
              >
              applying to that one applies to this one as well.
            </p>
          </div>
        </div>
      </template>
    </card>
    <card>
      <template slot="header">
        <h2 class="title">Features</h2>
      </template>
      <card>
        <template slot="header">
          <h3>Linting</h3>
        </template>
        <div class="row text-left">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
            <p>
              The project is configured for eslint to give you in-editor
              formatting and syntax corrections and auto-fixes. You'll need
              <a href="https://vuejs.github.io/vetur/setup.html#project-setup"
                >Vetur</a
              >
              and the related extensions in your IDE if you want to use this.
              It's optional but recommended.
            </p>
          </div>
        </div>
      </card>
      <card>
        <template slot="header">
          <h3>Styling</h3>
        </template>
        <div class="row text-left">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
            <p>
              Some minor color scheme customization is possible if you modify
              the colors in <code>src\pages\Layout\DashboardLayout.vue</code>.
              That component listens for the runtime version of the loaded
              chain, and based on the name of the chain switches the style. The
              colors are defined in
              <code
                >src\assets\scss\white-dashboard\custom\_sidebar-and-main-panel.scss</code
              >
              as <code>blue</code>, <code>green</code> and <code>primary</code>,
              but feel free to create your own style. You apply it to the
              sidebar by changing its <code>backgroundColor</code> property to
              the value you defined in the SCSS file.
            </p>
            <p>
              The custom styling is a work in progress and the we intend to make
              this easier and simpler.
            </p>
          </div>
        </div>
      </card>
      <card>
        <template slot="header">
          <h3>Endpoint selector</h3>
        </template>
        <div class="row text-left">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
            <p>
              Clicking the top right connection URL lets you pick another
              endpoint or enter your custom one. To add custom endpoints or
              modify the default list, edit
              <code>pages/Layout/TopNavbar.vue</code>. The default endpoint is
              <code>wss://kusama-rpc.polkadot.io</code> . This can be modified
              in <code>config.js</code> (rename <code>config.example.js</code>).
            </p>
          </div>
        </div>
      </card>
      <card>
        <template slot="header">
          <h3>Connection singleton</h3>
        </template>
        <div class="row text-left">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xs-12">
            <p>
              The file <code>connection.js</code> exports the API object which
              you can import and use in your components to interact with the
              chain. In a Vue component's script part:
            </p>
            <pre><code class="language-js">import api from &quot;../kusama.js&quot;;
</code></pre>
            <p>
              Then use the <code>api</code> promise in your components' methods
              and properties.
            </p>
            <p>
              For more complex but reusable interaction with the chain, it's a
              good idea to abastract such functionality into a separate file
              that consumes this singleton connection, and export that complex
              function instead.
            </p>
          </div>
        </div>
      </card>
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
      blocknumber: 0,
      events: [],
    };
  },
};
</script>
<style></style>
