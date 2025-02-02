# JustMinecraft

Simple Minecraft package for Node.js.

```shell
npm install @jnode/minecraft
```

## Get Minecraft Java server status

```js
const mcje = require('@jnode/minecraft').java;

const client = new mcje.Client('MINECRAFT SERVER HOST');

client.getServerStatus().then((d) => {
	console.log(JSON.stringify(d, null, 2));
});
```