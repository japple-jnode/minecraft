/*
JustMinecraft/java/client.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load classes and functions
const resolveRsv = require('./resolve-srv.js');
const MinecraftJavaConnection = require('./connection.js');
const templates = require('./templates.js');

//Minecraft Java client
class MinecraftJavaClient {
	constructor(host = 'localhost', port = 25565, options = {}) {
		//Minecraft server original host and port
		this.host = host;
		this.port = port;
		
		//client options
		this.options = options;
	}
	
	//get server status
	getServerStatus() {
		return new Promise(async (resolve, reject) => {
			//check Minecraft SRV record before continue
			if (!this._host) {
				const record = await resolveRsv(this.host, this.port);
				this._host = record.host;
				this._port = record.port;
			}
			
			//create connection
			const connection = new MinecraftJavaConnection(this);
			connection.connect();
			
			//handshake after connected
			connection.on('connect', () => {
				//handshake packet
				connection.sendPacket(0x00, templates.handshake.serverbound.handshake.createData([
					767, //protocol version
					this._host, //server address
					this._port, //server port
					1 //next state (Status)
				]));
				
				//request status
				connection.sendPacket(0x00);
			});
			
			connection.on('packet', (packet) => {
				if (packet.id === 0x00) { //received packet
					connection.disconnect();
					const fields = templates.status.clientbound.statusResponse.readData(packet.data);
					resolve(JSON.parse(fields[0]));
				}
			});
		});
	}
}

//export
module.exports = MinecraftJavaClient;