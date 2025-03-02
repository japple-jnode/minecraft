/*
JustMinecraft/java/templates.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load classes and functions
const { Template } = require('./packet.js');

//export
module.exports = {
	handshake: {
		serverbound: {
			0x00: new Template([
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'UShort' },
				{ type: 'VarInt' }
			])
		}
	},
	status: {
		clientbound: {
			0x00: new Template([
				{ type: 'String' }
			]),
			0x01: new Template([
				{ type: 'Long' }
			])
		},
		serverbound: {
			0x00: new Template([]),
			0x01: new Template([
				{ type: 'Long' }
			])
		}
	},
	login: {
		clientbound: {
			0x00: new Template([
				{ type: 'String' }
			]),
			0x01: new Template([
				{ type: 'String' },
				{ type: 'PrefixedBytes' },
				{ type: 'PrefixedBytes' },
				{ type: 'Boolean' }
			]),
			0x02: new Template([
				{ type: 'UUID' },
				{ type: 'String' },
				{ type: 'PrefixedArray', define: new Template ([
					{ type: 'String' },
					{ type: 'String' },
					{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
				])}
			]),
			0x03: new Template([
				{ type: 'VarInt' }
			]),
			0x04: new Template([
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'PrefixedBytes' }
			]),
			0x05: new Template([
				{ type: 'String' }
			])
		},
		serverbound: {
			0x00: new Template([
				{ type: 'String' },
				{ type: 'UUID' }
			]),
			0x01: new Template([
				{ type: 'PrefixedBytes' },
				{ type: 'PrefixedBytes' }
			]),
			0x02: new Template([
				{ type: 'VarInt' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'PrefixedBytes' }]) }
			]),
			0x03: new Template([]),
			0x04: new Template([
				{ type: 'String' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'PrefixedBytes' }]) }
			])
		}
	}
};