import Vue from 'vue';
import api from '../../connection.js';

const util = require('@polkadot/util-crypto');

const prefixes = {
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
	stafi: 20,
	robonomics: 32,
	centrifuge: 36,
	substrate: 42,
};

let ss58Format = 0;
let chainName = '';

export const MyFunctions = {
	/* returnPrefix: function(value)
	   This takes in the chainname of the selected dropdown
	   if the selected network is the same as the default network
	   then return that default ss58Format prefix
	*/

	returnPrefix: function(value) {
		MyFunctions.prefixSelect();
		if (value == chainName) {
			return ss58Format;
		} else {
			return 42;
		}
	},
	/* prefixSelect: async function()
	   This function connects to the api to grab the current data on 
	   the name of network and the prefix associated with it. It then
	   parses it to be stored into variables. 
    */
	prefixSelect: async function() {
		let myapi = await api;
		let chain = await myapi.rpc.system.chain();
		let properties = await myapi.rpc.system.properties();

		// this parses the chain network name
		let nameObj = JSON.parse(JSON.stringify(chain));
		chainName = nameObj;

		// this parses the ss58Format of the default network
		let prefixObj = JSON.parse(JSON.stringify(properties));
		ss58Format = prefixObj.ss58Format;
	},
};

Vue.filter('prefix', (value, prefix) => {
	if (typeof prefix !== 'number') {
		prefix = prefixes[prefix] || MyFunctions.returnPrefix(value);
		//console.log("Prefix: " + prefix);
	}

	let decoded = util.decodeAddress(value);

	return util.encodeAddress(value, prefix);
});
