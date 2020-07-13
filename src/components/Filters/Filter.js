import Vue from 'vue';
import api from '../../connection.js';

const util = require('@polkadot/util-crypto');

export const prefixes = {
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

Vue.filter('prefix', (value, prefix) => {
	if (typeof prefix !== 'number') {
		prefix = prefixes[prefix];
	}

	let decoded = util.decodeAddress(value);

	return util.encodeAddress(value, prefix);
});
