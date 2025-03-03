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
	},
	configuration: {
		clientbound: {
			0x00: new Template([
				{ type: 'String' }
			]),
			0x01: new Template([
				{ type: 'String' },
				{ type: 'RemainData' }
			]),
			0x02: new Template([
				{ type: 'String' }
			]),
			0x03: new Template([]),
			0x04: new Template([
				{ type: 'Long' }
			]),
			0x05: new Template([
				{ type: 'Int' }
			]),
			0x06: new Template([]),
			0x07: new Template([
				{ type: 'String' },
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'String' },
					{ type: 'PrefixedOptional', define: new Template([{ type: 'NBT' }]) }
				])}
			]),
			0x08: new Template([
				{ type: 'PrefixedOptional', define: new Template([{ type: 'UUID' }]) }
			]),
			0x09: new Template([
				{ type: 'UUID' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'Boolean' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }])}
			]),
			0x0A: new Template([
				{ type: 'String' },
				{ type: 'PrefixedBytes' }
			]),
			0x0B: new Template([
				{ type: 'String' },
				{ type: 'VarInt' }
			]),
			0x0C: new Template([
				{ type: 'PrefixedArray', define: new Template([{type: 'String'}]) }
			]),
			0x0D: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'String' },
					{ type: 'PrefixedArray', define: new Template([
						{ type: 'String' },
						{ type: 'PrefixedArray', define: new Template([{type: 'RemainData'}]) }
					])}
				])}
			]),
			0x0E: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{type: 'String'},
					{type: 'String'},
					{type: 'String'}
				])}
			]),
			0x0F: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{type: 'String'},
					{type: 'String'}
				])}
			]),
			0x10: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'Boolean' },
					{ type: 'VarInt' },
					{ type: 'String' }
				])}
			]),
		},
		serverbound: {
			0x00: new Template([
				{ type: 'String' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'VarInt' }
			]),
			0x01: new Template([
				{ type: 'String' }
			]),
			0x02: new Template([
				{ type: 'String' },
				{ type: 'RemainData' }
			]),
			0x03: new Template([]),
			0x04: new Template([
				{ type: 'Long' }
			]),
			0x05: new Template([
				{ type: 'Int' }
			]),
			0x06: new Template([
				{ type: 'UUID' },
				{ type: 'VarInt' }
			]),
			0x07: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{type: 'String'},
					{type: 'String'},
					{type: 'String'}
				])}
			])
		}
	}
};