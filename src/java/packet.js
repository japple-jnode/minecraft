/*
JustMinecraft/java/packet.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load node packages
const zlib = require('zlib');

//load classes and functions
const dataType = require('./data-type.js');

//create a packet buffer
function createPacket(id = 0, data = Buffer.alloc(0), threshold) {
	id = dataType.VarInt.create(id); //id to VarInt buffer
	if (threshold >= 0) {
		if (data.length > threshold) { //need compress
			const dataLen = dataType.VarInt.create(id.length + data.length);
			data = zlib.deflateSync(Buffer.concat([ id, data ])); //compress
			const packetLen = dataType.VarInt.create(dataLen.length + data.length); //data length to VarInt buffer
			return Buffer.concat([ packetLen, dataLen, data ]); //concat length, id and data
		} else { //no compress
			const dataLen = dataType.VarInt.create(0);
			const packetLen = dataType.VarInt.create(dataLen.length + id.length + data.length); //data length to VarInt buffer
			return Buffer.concat([ packetLen, dataLen, id, data ]); //concat length, id and data
		}
	} else { //no compression
		const packetLen = dataType.VarInt.create(id.length + data.length); //data length to VarInt buffer
		return Buffer.concat([ packetLen, id, data ]); //concat length, id and data
	}
}

//read a packet
function readPacket(data = Buffer.alloc(0), threshold, offset = 0) {
	const packetLen = dataType.VarInt.read(data, null, offset);
	if (threshold >= 0) {
		const dataLen = dataType.VarInt.read(data, null, offset + packetLen.length);
		if (dataLen.value == 0) { //no compress
			const id = dataType.VarInt.read(data, null, offset + packetLen.length + dataLen.length);
			return {
				id: id.value,
				data: data.subarray(offset + packetLen.length + dataLen.length + id.length, offset + packetLen.length + dataLen.length + packetLen.value),
				length: packetLen.length + packetLen.value
			};
		} else { //compress
			data = zlib.inflateSync(
				data.subarray(
					offset + packetLen.length + dataLen.length,
					offset + packetLen.length + dataLen.length + packetLen.value
				)
			);
			const id = dataType.VarInt.read(data);
			return {
				id: id.value,
				data: data.subarray(id.length),
				length: packetLen.length + packetLen.value
			};
		}
	} else {
		const id = dataType.VarInt.read(data, null, offset + packetLen.length);
		return {
			id: id.value,
			data: data.subarray(offset + packetLen.length + id.length, offset + packetLen.length + packetLen.value),
			length: packetLen.length + packetLen.value
		};
	}
}

//packet data template
class PacketDataTemplate {
	constructor(template) {
		this.template = template;
		// template is an array of object:
		//   "type": "Minecraft Data Type",
		//   "item": Object, for array and some data types
	}
	
	//create buffer from fields data
	createData(fields = [], template = this.template) {
		let result = [];
		
		//turn every field to buffer
		for (let i in template) {
			if (dataType[template[i].type]) { //push field or ignore
				result.push(dataType[template[i].type].create(fields[i], template[i].define));
			}
		}
		
		return Buffer.concat(result);
	}
	
	//read fields from buffer
	readData(data, offset = 0, template = this.template) {
		let result = [];
		const beginOffset = offset;
		
		//read every field
		for (let i in template) {
			let field;
			
			if (dataType[template[i].type]) { //set field
				field = dataType[template[i].type].read(data, template[i].define, offset);
			} else { //unknown field type
				field = { value: undefined, length: 0 };
			}
			
			result.push(field.value);
			offset += field.length;
		}
		
		return {
			value: result,
			length: offset - beginOffset
		};
	}
}

//export
module.exports = {
	create: createPacket,
	read: readPacket,
	Template: PacketDataTemplate
};