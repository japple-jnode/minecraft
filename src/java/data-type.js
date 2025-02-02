/*
JustMinecraft/java/data-type.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//create VarInt buffer
function createVarInt(num = 0) {
	//for number 0
	if (num === 0) return Buffer.from([0]);
	
	//result bytes
	let bytes = [];
	const isNegative = num < 0;
	
	//check overflow
	if (num > 2147483647) num = 2147483647;
	if (num < -2147483648) num = -2147483648;
	
	//to a 32-bit integer
	num = num | 0;
	
	//7 bits to a byte, little-endian
	while (num !== 0) {
		bytes.push((num & 0b1111111) | 0b10000000);
		num >>>= 7;
	}
	
	//last one's first bit should be 0
	bytes[bytes.length - 1] -= 0b10000000;
	
	return Buffer.from(bytes);
}

//read VarInt
function readVarInt(data, offset = 0) {
	//make a 32-bit integer
	let value = 0 | 0;
	
	//7 bits to a byte, little-endian
	let i;
	for (i = 0; i < (data.length - offset) && i < 5; i++) {
		value |= (data[i + offset] & 0b1111111) << i*7;
		if ((data[i + offset] & 0b10000000) === 0) {
			i++;
			break;
		}
	}
	
	return {
		value: value, //number value
		length: i //actual byte length
	};
}

//create String buffer
function createString(str) {
	str = Buffer.from(str); //string to buffer
	
	//overflow cut
	if (str.length > 2147483647) {
		str = str.subarray(0, 2147483648);
	}
	
	const len = createVarInt(str.length); //length VarInt buffer
	
	return Buffer.concat([ len, str ]);
}

//read String
function readString(data, offset = 0) {
	const len = readVarInt(data, offset); //read length VarInt
	return {
		value: data.subarray(len.length + offset, len.length + len.value + offset).toString('utf8'), //slice string part
		length: len.length + len.value
	};
}

//create Unsigned Short (UInt16) buffer
function createUShort(num) {
	const buf = Buffer.alloc(2);
	buf.writeUInt16BE(num);
	return buf;
}

//read Unsigned Short (UInt16)
function readUShort(data, offset = 0) {
	return {
		value: data.readUInt16BE(offset),
		length: 2
	};
}

//export
module.exports = {
	createVarInt,
	readVarInt,
	createString,
	readString,
	createUShort,
	readUShort
};