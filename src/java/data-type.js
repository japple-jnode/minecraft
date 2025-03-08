/*
JustMinecraft/java/data-type.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load functions and classes
const nbt = require('./nbt.js');

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
function readVarInt(data, define, offset = 0) {
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
	if (str.length > 2147483647) str = str.subarray(0, 2147483648);
	
	const len = createVarInt(str.length); //length VarInt buffer
	
	return Buffer.concat([ len, str ]);
}

//read String
function readString(data, define, offset = 0) {
	const len = readVarInt(data, null, offset); //read length VarInt
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
function readUShort(data, define, offset = 0) {
	return {
		value: data.readUInt16BE(offset),
		length: 2
	};
}

//create Byte buffer
function createByte(num) {
	const buf = Buffer.alloc(1);
	buf.writeInt8(num);
	return buf;
}

//read Byte
function readByte(data, define, offset = 0) {
	return {
		value: data.readInt8(offset),
		length: 1
	};
}

//create Unsigned Byte buffer
function createUByte(num) {
	const buf = Buffer.alloc(1);
	buf.writeUInt8(num);
	return buf;
}

//read Unsigned Byte
function readUByte(data, define, offset = 0) {
	return {
		value: data.readUInt8(offset),
		length: 1
	};
}

//create Short buffer
function createShort(num) {
	const buf = Buffer.alloc(2);
	buf.writeInt16BE(num);
	return buf;
}

//read Short
function readShort(data, define, offset = 0) {
	return {
		value: data.readInt16BE(offset),
		length: 2
	};
}

//create Int buffer
function createInt(num) {
	const buf = Buffer.alloc(4);
	buf.writeInt32BE(num);
	return buf;
}

//read Int
function readInt(data, define, offset = 0) {
	return {
		value: data.readInt32BE(offset),
		length: 4
	};
}

//create Long buffer
function createLong(num) {
	const buf = Buffer.alloc(8);
	buf.writeBigInt64BE(BigInt(num));
	return buf;
}

//read Long
function readLong(data, define, offset = 0) {
	return {
		value: data.readBigInt64BE(offset),
		length: 8
	};
}

//create Float buffer
function createFloat(num) {
	const buf = Buffer.alloc(4);
	buf.writeFloatBE(num);
	return buf;
}

//read Float
function readFloat(data, define, offset = 0) {
	return {
		value: data.readFloatBE(offset),
		length: 4
	};
}

//create Double buffer
function createDouble(num) {
	const buf = Buffer.alloc(8);
	buf.writeDoubleBE(num);
	return buf;
}

//read Double
function readDouble(data, define, offset = 0) {
	return {
		value: data.readDoubleBE(offset),
		length: 8
	};
}

//create Boolean buffer
function createBoolean(bool) {
	return Buffer.from([bool ? 0x01 : 0x00]);
}

//read Boolean
function readBoolean(data, define, offset = 0) {
	return {
		value: data[offset] !== 0x00,
		length: 1
	};
}

//create UUID
function createUUID(uuid) {
	const buf = Buffer.alloc(16);
	const parts = uuid.split('-');
	const combined = parts.join('');
	
	if (combined.length !== 32) throw new Error('Invalid UUID format');
	
	for (let i = 0; i < 16; i++) {
		buf[i] = parseInt(combined.substring(i * 2, i * 2 + 2), 16); //HEX encode
	}
	
	return buf;
}

//read UUID
function readUUID(data, define, offset = 0) {
	const hex = data.slice(offset, offset + 16).toString('hex');
	
	const uuid = [
		hex.substring(0, 8),
		hex.substring(8, 12),
		hex.substring(12, 16),
		hex.substring(16, 20),
		hex.substring(20)
	].join('-');
	
	return {
		value: uuid,
		length: 16
	};
}

//create prefixed array
function createPrefixedArray(items = [], define) {
	let buf = [ createVarInt(items.length) ];
	
	//create items
	for (let i of items) {
		buf.push(define.createData(i));
	}
	
	return Buffer.concat(buf);
}

//read prefixed array
function readPrefixedArray(data, define, offset = 0) {
	const originalOffset = offset;
	
	//get array length
	let len = readVarInt(data, null, offset);
	offset += len.length;
	
	//read items
	let items = [];
	for (let i = 0; i < len.value; i++) {
		item = define.readData(data, offset);
		items.push(item.value);
		
		offset += item.length;
	}
	
	return {
		value: items,
		length: offset - originalOffset
	};
}

//create prefixed bytes
function createPrefixedBytes(bytes) {
	if (!Buffer.isBuffer(bytes)) bytes = Buffer.from(bytes);
	
	//overflow cut
	if (bytes.length > 2147483647) bytes = bytes.subarray(0, 2147483648);
	
	const len = createVarInt(bytes.length); //length VarInt buffer
	
	return Buffer.concat([ len, bytes ]);
}

//read prefixed bytes
function readPrefixedBytes(data, define, offset = 0) {
	const len = readVarInt(data, null, offset); //read length VarInt
	return {
		value: data.subarray(len.length + offset, len.length + len.value + offset), //slice bytes part
		length: len.length + len.value
	};
}

//create prefixed optional
function createPrefixedOptional(value = null, define) {
	let buf = [ createBoolean(value !== null) ];
	
	if (value !== null) buf.push(define.createData([value]));
	
	return Buffer.concat(buf);
}

//read prefixed optional
function readPrefixedOptional(data, define, offset = 0) {
	const isNull = !readBoolean(data, null, offset).value;
	let value = isNull ? null : define.readData(data, offset + 1);
	return {
		value: isNull ? value : value.value[0],
		length: isNull ? 1 : 1 + value.length
	};
}

//create remain data
function createRemainData(buf) {
	return buf;
}

//read remain data
function readRemainData(data, define, offset = 0) {
	return {
		value: data,
		length: data.length
	};
}

//create Angle buffer
function createAngle(angle) {
	const buf = Buffer.alloc(1);
	buf.writeUInt8(angle);
	return buf;
}

//read Angle
function readAngle(data, define, offset = 0) {
	return {
		value: data.readUInt8(offset),
		length: 1
	};
}

//create Position buffer
function createPosition(pos) {
	const buf = Buffer.alloc(8);
	
	//make sure xyz is vaild
	const limitedX = pos.x & 0x3FFFFFF; // 26 bits
	const limitedY = pos.y & 0xFFF; // 12 bits
	const limitedZ = pos.z & 0x3FFFFFF; // 26 bits
	
	const position = ((BigInt(limitedX) << 38n) | (BigInt(limitedZ) << 12n) | BigInt(limitedY));
	
	buf.writeBigInt64BE(position, 0);
	return buf;
}

//read Position
function readPosition(data, define, offset = 0) {
	const val = data.readBigInt64BE(offset);
	
	let x = Number(val >> 38n);
	let y = Number((val << 52n) >> 52n);
	let z = Number((val << 26n) >> 38n);
	
	if (x >= (1 << 25)) x -= (1 << 26);
	if (y >= (1 << 11)) y -= (1 << 12);
	if (z >= (1 << 25)) z -= (1 << 26);
	
	return {
		value: { x: x, y: y, z: z },
		length: 8
	};
}

//create IDOr buffer
function createIDOr(idOr = {}, define) {
	if (!value.id) {
		// Inline value
		const idBuf = createVarInt(0);
		const valueBuf = define.createData(value);
		return Buffer.concat([idBuf, valueBuf]);
	} else {
		// Registry ID + 1
		const idBuf = createVarInt(value.id + 1);
		return idBuf;
	}
}

//read IDOr
function readIDOr(data, define, offset = 0) {
	const originalOffset = offset;
	const idResult = readVarInt(data, null, offset);
	const id = idResult.value;
	offset += idResult.length;
	
	if (id === 0) {
		// Inline value
		const valueResult = define.readData(data, offset);
		offset += valueResult.length;
		return {
			value: { id: 0, value: valueResult.value },
			length: offset - originalOffset
		};
	} else {
		// Registry ID + 1
		return {
			value: { id: id - 1, value: null },
			length: offset - originalOffset
		};
	}
}

//create BitSet buffer
function createBitSet(bits) {
	const longCount = Math.ceil(bits.length / 64);
	const longs = new Array(longCount).fill(0n);
	
	for (let i = 0; i < bits.length; i++) {
		if (bits[i]) {
			const longIndex = Math.floor(i / 64);
			const bitIndex = i % 64;
			longs[longIndex] |= (1n << BigInt(bitIndex));
		}
	}
	
	const longBuffer = Buffer.alloc(longCount * 8);
	for (let i = 0; i < longCount; i++) {
		longBuffer.writeBigInt64BE(longs[i], i * 8);
	}
	
	const lengthVarInt = module.exports.VarInt.create(longCount);
	return Buffer.concat([lengthVarInt, longBuffer]);
}

//read BitSet
function readBitSet(data, define, offset = 0) {
	let currentOffset = offset;
	const lengthInfo = module.exports.VarInt.read(data, null, currentOffset);
	const longCount = lengthInfo.value;
	currentOffset += lengthInfo.length;
	
	const bits = [];
	for (let i = 0; i < longCount; i++) {
		const longValue = data.readBigInt64BE(currentOffset + i * 8);
		for (let j = 0; j < 64; j++) {
			bits[i * 64 + j] = (longValue & (1n << BigInt(j))) !== 0n;
		}
	}
	
	return {
		value: bits,
		length: lengthInfo.length + longCount * 8
	};
}

//create FixedBitSet buffer
function createFixedBitSet(bits = Buffer.alloc(0, 0), define = 0) {
	if (bits.length < Math.ceil(define / 8)) {
		bits = Buffer.concat([ Buffer.alloc(Math.ceil(define / 8) - bits.length), bits ]);
	}
	return bits.subarray(0, Math.ceil(define / 8));
}

//read FixedBitSet
function readFixedBitSet(data, define, offset = 0) {
	return {
		value: data.subarray(offset, offset + Math.ceil(define / 8)),
		length: Math.ceil(define / 8)
	};
}

//export
module.exports = {
	VarInt: { create: createVarInt, read: readVarInt },
	String: { create: createString, read: readString },
	UShort: { create: createUShort, read: readUShort },
	Byte: { create: createByte, read: readByte },
	UByte: { create: createUByte, read: readUByte },
	Short: { create: createShort, read: readShort },
	Int: { create: createInt, read: readInt },
	Long: { create: createLong, read: readLong },
	Float: { create: createFloat, read: readFloat },
	Double: { create: createDouble, read: readDouble },
	Boolean: { create: createBoolean, read: readBoolean },
	UUID: { create: createUUID, read: readUUID },
	PrefixedArray: { create: createPrefixedArray, read: readPrefixedArray },
	PrefixedBytes: { create: createPrefixedBytes, read: readPrefixedBytes },
	PrefixedOptional: { create: createPrefixedOptional, read: readPrefixedOptional },
	RemainData: { create: createRemainData, read: readRemainData },
	Angle: { create: createAngle, read: readAngle },
	Position: { create: createPosition, read: readPosition },
	IDOr: { create: createIDOr, read: readIDOr },
	Identifier: { create: createString, read: readString },
	BitSet: { create: createBitSet, read: readBitSet },
	TextComponent: { create: nbt.network.create, read: nbt.network.read },
	FixedBitSet: { create: createFixedBitSet, read: readFixedBitSet },
};