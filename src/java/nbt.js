/*
JustMinecraft/java/nbt.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load classes and functions
const mutf8 = require('./mutf8.js');

//create NBT Byte buffer
function createByte(num) {
	const buf = Buffer.alloc(1);
	buf.writeInt8(byte);
	return buf;
}

//read NBT Byte
function readByte(data, offset = 0) {
	return {
		value: data.readInt8(offset),
		length: 1
	};
}

//create NBT Short buffer
function createShort(num) {
	const buf = Buffer.alloc(2);
	buf.writeInt16BE(byte);
	return buf;
}

//read NBT Short
function readShort(data, offset = 0) {
	return {
		value: data.readInt16BE(offset),
		length: 2
	};
}

//create NBT Int buffer
function createInt(num) {
	const buf = Buffer.alloc(4);
	buf.writeInt32BE(num);
	return buf;
}

//read NBT Int
function readInt(data, offset = 0) {
	return {
		value: data.readInt32BE(offset),
		length: 4
	};
}

//create NBT Long buffer
function createLong(num) {
	const buf = Buffer.alloc(8);
	buf.writeBigInt64BE(BigInt(num));
	return buf;
}

//read NBT Long
function readLong(data, offset = 0) {
	return {
		value: data.readBigInt64BE(offset),
		length: 8
	};
}

//create NBT Float buffer
function createFloat(num) {
	const buf = Buffer.alloc(4);
	buf.writeFloatBE(num);
	return buf;
}

//read NBT Float
function readFloat(data, offset = 0) {
	return {
		value: data.readFloatBE(offset),
		length: 4
	};
}

//create NBT Double buffer
function createDouble(num) {
	const buf = Buffer.alloc(8);
	buf.writeDoubleBE(num);
	return buf;
}

//read NBT Double
function readDouble(data, offset = 0) {
	return {
		value: data.readDoubleBE(offset),
		length: 8
	};
}

//create NBT ByteArray buffer
function createByteArray(buf = Buffer.alloc(0)) {
	const len = Buffer.alloc(4);
	len.writeInt32BE(buf.length);
	return Buffer.concat([ len, buf ]);
}

//read NBT ByteArray
function readByteArray(data, offset = 0) {
	const len = data.readInt32BE(offset);
	return {
		value: data.subarray(offset + 4, offset + 4 + len),
		length: 4 + len
	};
}

//create NBT String buffer
function createString(str = '') {
	const len = Buffer.alloc(2);
	const buf = mutf8.create(str); //mutf8 encode
	len.writeUInt16BE(buf.length);
	return Buffer.concat([ len, buf ]);
}

//read NBT String
function readString(data, offset = 0) {
	const len = data.readUInt16BE(offset);
	
	return {
		value: mutf8.read(data.subarray(offset + 2, offset + 2 + len)),
		length: 2 + len
	};
}

//create NBT List buffer
function createList(list = { type: 0, items: [] }) {
	const len = Buffer.alloc(4);
	len.writeInt32BE(list.items.length);
	
	//no data
	if (list.items.length === 0 || list.type === 0) return Buffer.concat([ Buffer.from([0]), len ]);
	
	//choose a creator to generate items
	let dataCreator = {
		1: createByte,
		2: createShort,
		3: createInt,
		4: createLong,
		5: createFloat,
		6: createDouble,
		7: createByteArray,
		8: createString,
		9: createList,
		10: createCompound,
		11: createIntArray,
		12: createLongArray
	}[list.type];
	
	let bufs = [ Buffer.from([list.type]), len ];
	
	//create every item
	for (let i of list.items) {
		bufs.push(dataCreator(i));
	}
	
	return Buffer.concat([ len, buf ]);
}

//read NBT List
function readList(data, offset = 0) {
	const originalOffset = offset;
	const type = data[offset];
	const len = data.readInt32BE(offset + 1);
	offset += 5;
	
	//choose a reader to read items
	let dataReader = {
		1: readByte,
		2: readShort,
		3: readInt,
		4: readLong,
		5: readFloat,
		6: readDouble,
		7: readByteArray,
		8: readString,
		9: readList,
		10: readCompound,
		11: readIntArray,
		12: readLongArray
	}[type];
	
	//read every item
	let items = [];
	for (let i = 0; i < len; i++) {
		let item = dataReader(data, offset);
		items.push(item.value);
		offset += item.length;
	}
	
	return {
		value: {
			type: type,
			items: items
		},
		length: offset - originalOffset
	};
}

//create NBT Compound buffer
function createCompound(items = {}) {
	// format is
	// { key: { type, value } }
	
	//choose a creator to generate items
	let dataCreators = {
		1: createByte,
		2: createShort,
		3: createInt,
		4: createLong,
		5: createFloat,
		6: createDouble,
		7: createByteArray,
		8: createString,
		9: createList,
		10: createCompound,
		11: createIntArray,
		12: createLongArray
	};
	
	let bufs = [];
	
	//create every item
	for (let i in items) {
		const name = createString(i);
		
		bufs.push(Buffer.from([items[i].type])); //type id
		bufs.push(name); //name
		bufs.push(dataCreator[items[i].type](i.value)); //payload
	}
	
	bufs.push(Buffer.from([ 0 ])); //end
	
	return Buffer.concat(bufs);
}

//read NBT Compound
function readCompound(data, offset = 0) {
	const originalOffset = offset;
	
	//choose a reader to read items
	let dataReader = {
		1: readByte,
		2: readShort,
		3: readInt,
		4: readLong,
		5: readFloat,
		6: readDouble,
		7: readByteArray,
		8: readString,
		9: readList,
		10: readCompound,
		11: readIntArray,
		12: readLongArray
	};
	
	//read every item
	let items = {};
	while (offset <= data.length) {
		const type = data[offset];
		offset++;
		
		if (type === 0) break;
		
		const name = readString(data, offset);
		offset += name.length;
		
		let item = dataReader[type](data, offset);
		items[name.value] = item.value;
		offset += item.length;
	}
	
	return {
		value: items,
		length: offset - originalOffset
	};
}

//create NBT IntArray buffer
function createIntArray(arr = []) {
	const len = Buffer.alloc(4);
	len.writeInt32BE(arr.length);
	const buf = Buffer.alloc(arr.length * 4);
	for (let i = 0; i < arr.length; i++) {
		buf.writeInt32BE(arr[i], i * 4);
	}
	return Buffer.concat([ len, buf ]);
}

//read NBT IntArray
function readIntArray(data, offset = 0) {
	const len = data.readInt32BE(offset);
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(data.readInt32BE(offset + 4 + i * 4));
	}
	return {
		value: arr,
		length: 4 + len * 4
	};
}

//create NBT LongArray buffer
function createLongArray(arr = []) {
	const len = Buffer.alloc(4);
	len.writeInt32BE(arr.length);
	const buf = Buffer.alloc(arr.length * 8);
	for (let i = 0; i < arr.length; i++) {
		buf.writeBigInt64BE(BigInt(arr[i]), i * 8);
	}
	return Buffer.concat([ len, buf ]);
}

//read NBT LongArray
function readLongArray(data, offset = 0) {
	const len = data.readInt32BE(offset);
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(data.readBigInt64BE(offset + 4 + i * 8));
	}
	return {
		value: arr,
		length: 4 + len * 8
	};
}

//create NBT buffer
function createNBT(nbt = { type: 10, value: {} }) {
	let dataCreators = {
		1: createByte,
		2: createShort,
		3: createInt,
		4: createLong,
		5: createFloat,
		6: createDouble,
		7: createByteArray,
		8: createString,
		9: createList,
		10: createCompound,
		11: createIntArray,
		12: createLongArray
	};
	
	if (type === 0) return Buffer.from([ type, 0, 0 ]);
	
	return Buffer.concat(Buffer.from([type]), Buffer.from([ 0, 0 ]), dataCreators[nbt.type](nbt.value));
}

//read NBT
function readNBT(data, offset = 0) {
	const originalOffset = offset;
	let dataReader = {
		1: readByte,
		2: readShort,
		3: readInt,
		4: readLong,
		5: readFloat,
		6: readDouble,
		7: readByteArray,
		8: readString,
		9: readList,
		10: readCompound,
		11: readIntArray,
		12: readLongArray
	};
	
	const type = data[offset];
	const name = readString(data, offset + 1);
	offset += name.length + 1;
	
	if (type === 0) return {
		value: { type: type, value: null },
		length: offset - originalOffset
	};
	
	let item = dataReader[type](data, offset);
	offset += item.length;
	
	return {
		value: { type: type, value: item.value, name: name.value },
		length: offset - originalOffset
	};
}

//create network NBT buffer
function createNetworkNBT(nbt = { type: 10, value: {} }) {
	let dataCreators = {
		1: createByte,
		2: createShort,
		3: createInt,
		4: createLong,
		5: createFloat,
		6: createDouble,
		7: createByteArray,
		8: createString,
		9: createList,
		10: createCompound,
		11: createIntArray,
		12: createLongArray
	};
	
	if (type === 0) return Buffer.from([ type ]);
	
	return Buffer.concat(Buffer.from([type]), dataCreators[nbt.type](nbt.value));
}

//read network NBT
function readNetworkNBT(data, offset = 0) {
	const originalOffset = offset;
	let dataReader = {
		1: readByte,
		2: readShort,
		3: readInt,
		4: readLong,
		5: readFloat,
		6: readDouble,
		7: readByteArray,
		8: readString,
		9: readList,
		10: readCompound,
		11: readIntArray,
		12: readLongArray
	};
	
	const type = data[offset];
	offset++;
	
	if (type === 0) return {
		value: { type: type, value: null },
		length: offset - originalOffset
	};
	
	let item = dataReader[type](data, offset);
	offset += item.length;
	
	return {
		value: { type: type, value: item.value },
		length: offset - originalOffset
	};
}

module.exports = {
	Byte: { create: createByte, read: readByte },
	Short: { create: createShort, read: readShort },
	Int: { create: createInt, read: readInt },
	Long: { create: createLong, read: readLong },
	Float: { create: createFloat, read: readFloat },
	Double: { create: createDouble, read: readDouble },
	ByteArray: { create: createByteArray, read: readByteArray },
	String: { create: createString, read: readString },
	List: { create: createList, read: readList },
	Compound: { create: createCompound, read: readCompound },
	IntArray: { create: createIntArray, read: readIntArray },
	LongArray: { create: createLongArray, read: readLongArray },
	create: createNBT,
	read: readNBT,
	network: { create: createNetworkNBT, read: readNetworkNBT }
};