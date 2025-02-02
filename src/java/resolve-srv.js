/*
JustMinecraft/java/srv-lookup.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load node packages
const dns = require('dns').promises;

//resolve Minecraft Java server SRV record
async function resolveSrv(host = 'localhost', port = 25565) {
	let record = { host: host, port: port }; //default host and port
	
	try {
		const dnsRecord = (await dns.resolveSrv('_minecraft._tcp.' + host))[0];
		record = { //resolve SRV record
			host: dnsRecord.name ?? record.host,
			port: dnsRecord.port ?? record.port
		};
	} catch {}
	
	return record;
}

//export
module.exports = resolveSrv;