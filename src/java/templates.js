/*
JustMinecraft/java/templates.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load classes and functions
const { PacketDataTemplate } = require('./packet.js');

//export
module.exports = {
	handshake: {
		serverbound: {
			handshake: new PacketDataTemplate([
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'UShort' },
				{ type: 'VarInt' }
			])
		}
	},
	status: {
		clientbound: {
			statusResponse: new PacketDataTemplate([
				{ type: 'String' }
			])
		},
		serverbound: {
			statusRequest: new PacketDataTemplate([])
		}
	}
};