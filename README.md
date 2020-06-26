# Polkadash

A mobile-friendly starter kit for developing your own UI for a Substrate-based chain. This starter kit is based on [Creative Tim's Vue White Dashboard](https://demos.creative-tim.com/vue-white-dashboard), so any [documentation](https://demos.creative-tim.com/vue-white-dashboard/documentation) applying to that one applies to this one as well.

For tutorials on building different things with this starter UI, please see the [Dot Leap Polkadash category](https://dotleap.com/tag/polkadash):

- [Intro to Polkadash](https://dotleap.com/polkadash-a-vuejs-dashboard-starter-kit-for-your-substrate-chain/)
- [Subscribing to Polkadot Events](https://dotleap.com/how-to-subscribe-to-polkadot-events-2/)
- [Building a VueJS address translation filter for Substrate chains](https://dotleap.com/building-an-address-filter/)

## Getting Started

You'll need a reasonably new NodeJS version installed (preferably via [NVM](https://github.com/nvm-sh/nvm)), and [Yarn Classic](https://classic.yarnpkg.com/en/docs/install) available globally.

```bash
git clone https://github.com/swader/polkadash
cd polkadash
mv src/config.example.js src/config.js # edit this to modify the default endpoint
yarn && yarn serve --port 8081
```

This will run the dashboard so it's accessible at localhost:8081. The serve command uses [vue-cli-service](https://cli.vuejs.org/guide/cli-service.html).

## Features

The template comes with several features bundled.

### Linting

The project is configured for eslint to give you in-editor formatting and syntax corrections and auto-fixes. You'll need [Vetur](https://vuejs.github.io/vetur/setup.html#project-setup) and the related extensions in your IDE if you want to use this. It's optional but recommended.

### Styling

Some minor color scheme customization is possible if you modify the colors in `src\pages\Layout\DashboardLayout.vue`. That component listens for the runtime version of the loaded chain, and based on the name of the chain switches the style. The colors are defined in `src\assets\scss\white-dashboard\custom\_sidebar-and-main-panel.scss` as `blue`, `green` and `primary`, but feel free to create your own style. You apply it to the sidebar by changing its `backgroundColor` property to the value you defined in the SCSS file.

The custom styling is a work in progress and the we intend to make this easier and simpler.

### Endpoint Selector

Clicking the top right connection URL lets you pick another endpoint or enter your custom one. To add custom endpoints or modify the default list, edit `pages/Layout/TopNavbar.vue`. The default endpoint is `wss://kusama-rpc.polkadot.io` . This can be modified in `config.js` (rename `config.example.js`).

### Sidebar and Component Management

To add / remove sections from the sidebar and the global component registry, two files need to be modified:

- `src\pages\Layout\DashboardLayout.vue`
- `src\router.js`

In DashboardLayout, you would add a new sidebar-link component, like so:

```html
<sidebar-link to="/mycomponent">
  <i class="tim-icons icon-atom"></i>
  <p>My component</p>
</sidebar-link>
```

and in router.js you would import and use the new component, like so:

```js
// ..

import MyComponent from "@/pages/MyComponent.vue"; // <--- this is new

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      //...
      {
        // < --- THIS SECTION IS NEW -->
        path: "mycomponent",
        name: "My Component",
        component: MyComponent,
      }, // < --- THIS SECTION IS NEW -->
    ],
  },
];
```

You can also add a translation of the component into `src/locales`.

### Connection Singleton

The file `connection.js` exports the API object which you can import and use in your components to interact with the chain. In a Vue component's script part:

```js
import api from "../connection.js";
```

Then use the `api` promise in your components' methods and properties.

For more complex but reusable interaction with the chain, it's a good idea to abastract such functionality into a separate file that consumes this singleton connection, and export that complex function instead.

## Deployment

To deploy your version of the dashboard as a live site, run `yarn build`. The files in `dist` can then be hosted anywhere from home servers to Github pages or even IPFS.

## Contributing

PRs welcome, especially those that reduce code complexity and remove things from this bootstrap.
