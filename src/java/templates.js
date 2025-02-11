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
			])
		},
		serverbound: {
			0x00: new Template([])
		}
	}
};