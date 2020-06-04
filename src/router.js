import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";

import Blocknumber from "@/pages/Blocknumber.vue";
import Home from "@/pages/Home.vue";
import Events from "@/pages/Events.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "home",
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "events",
        name: "Events",
        component: Events,
      },
      {
        path: "blocknumber",
        name: "Block Number",
        component: Blocknumber,
      },
    ],
  },
];

export default routes;
