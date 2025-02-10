/*
JustMinecraft/java/connection.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load node packages
const EventEmitter = require('events');

//load classes and functions
const resolveRsv = require('./resolve-srv.js');
const packet = require('./packet.js');
const dataType = require('./data-type.js');

//Minecraft Java connection
class MinecraftJavaConnection extends EventEmitter {
	constructor(socket) {
		super();
		
		this.socket = socket; //connected tcp socket
		
		//receive packet
		this.buf = Buffer.alloc(0);
		this.len = null;
		this.socket.on('data', (data) => {
			//concat old data with new data
			this.buf = Buffer.concat([ this.buf, data ]);
			
			//keep read packet
			while (this.buf.length > 0) {
				//check VarInt loaded
				for (let i = 0; i < 5; i++) {
					if (this.buf.length <= i) return; //VarInt not fully loaded
					if (this.buf[i] < 0b10000000) break; //VarInt end
				}
				
				//get packet data length
				if (this.len === null) {
					let len = dataType.readVarInt(this.buf);
					this.len = len.length + len.value;
				}
				
				//check packet is fully loaded
				if (this.buf.length < this.len) return;
				
				//read packet
				let pak = packet.readPacket(this.buf);
				this.emit('packet', pak);
				
				//update buffer
				this.buf = this.buf.subarray(pak.length);
				this.len = null;
			}
		});
	}
	
	connect(host, port = 25565, timeout = 10000) {
		//set timeout
		const timer = setTimeout(() => {
			this.socket.destroy();
			this.emit('timeout');
		}, timeout);
		
		//start tcp connect
		this.socket.connect({
			host: host,
			port: port
		}, () => { clearTimeout(timer); this.emit('connect'); }); //emit a connect event
		
		//throw error
		this.socket.on('error', (err) => { this.emit('error', err )});
		
		return;
	}
	
	sendPacket(id, data) {
		return this.socket.write(packet.createPacket(id, data));
	}
	
	disconnect() {
		return this.socket.destroy();
	}
}

module.exports = MinecraftJavaConnection;