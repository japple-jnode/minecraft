/*
JustMinecraft/java/mutf8.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//create MUTF-8 buffer
function createMUTF8(str) {
	let utftext = [];
	for (let i = 0; i < str.length; i++) {
		let charcode = str.charCodeAt(i);
		if (charcode < 0x80 && charcode !== 0) {
			utftext.push(charcode);
		} else if (charcode === 0) {
			utftext.push(0xc0, 0x80); //null
		} else if (charcode < 0x800) {
			utftext.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
		} else {
			utftext.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
		}
	}
	return Buffer.from(utftext);
}

//read MUTF-8
function readMUTF8(buf, offset) {
	let out = "";
	let pos = offset || 0;
	while (pos < buf.length) {
		let char1 = buf[pos++];
		let char2;
		let char3;
		let char4;
		switch (char1 >> 4) {
			case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
				// 0xxxxxxx
				out += String.fromCharCode(char1);
				break;
			case 12: case 13:
				// 110x xxxx   10xx xxxx
				char2 = buf[pos++];
				out += String.fromCharCode(((char1 & 0x1f) << 6) | (char2 & 0x3f));
				break;
			case 14:
				// 1110 xxxx  10xx xxxx  10xx xxxx
				char2 = buf[pos++];
				char3 = buf[pos++];
				out += String.fromCharCode(((char1 & 0x0f) << 12) |
					((char2 & 0x3f) << 6) |
					((char3 & 0x3f) << 0));
				break;
		}
	}
	return out;
}

module.exports = { create: createMUTF8, read: readMUTF8 };