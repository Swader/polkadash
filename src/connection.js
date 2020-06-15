import { default_endpoint } from "./config.js";

const endpoint = localStorage.getItem("endpoint");
if (!endpoint || typeof endpoint !== "string" || endpoint.indexOf("ws") !== 0) {
  localStorage.setItem("endpoint", default_endpoint);
}

const { ApiPromise, WsProvider } = require("@polkadot/api");
const wsProvider = new WsProvider(localStorage.getItem("endpoint"));
let api = ApiPromise.create({ provider: wsProvider });

//const util = require("@polkadot/util");
export default api;
