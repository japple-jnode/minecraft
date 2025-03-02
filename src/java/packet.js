/*
JustMinecraft/java/packet.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load classes and functions
const dataType = require('./data-type.js');

//create a packet buffer
function createPacket(id = 0, data = Buffer.alloc(0)) {
	id = dataType.VarInt.create(id); //id to VarInt buffer
	const len = dataType.VarInt.create(id.length + data.length); //data length to VarInt buffer
	return Buffer.concat([ len, id, data ]); //concat length, id and data
}

//read a packet
function readPacket(data = Buffer.alloc(0), offset = 0) {
	const len = dataType.VarInt.read(data, null, offset);
	const id = dataType.VarInt.read(data, null, offset + len.length);
	return {
		id: id.value,
		data: data.subarray(offset + len.length + id.length, offset + len.length + len.value),
		length: len.length + len.value
	};
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