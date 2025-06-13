/*
JustMinecraft/java/templates.js

Simple Minecraft package for Node.js.

by JustNode Dev Team / JustApple
*/

//load classes and functions
const { Template } = require('./packet.js');

//export
module.exports = {
	handshake: {
		serverbound: {
			0x00: new Template([
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'UShort' },
				{ type: 'VarInt' }
			])
		}
	},
	status: {
		clientbound: {
			0x00: new Template([
				{ type: 'String' }
			]),
			0x01: new Template([
				{ type: 'Long' }
			])
		},
		serverbound: {
			0x00: new Template([]),
			0x01: new Template([
				{ type: 'Long' }
			])
		}
	},
	login: {
		clientbound: {
			0x00: new Template([
				{ type: 'String' }
			]),
			0x01: new Template([
				{ type: 'String' },
				{ type: 'PrefixedBytes' },
				{ type: 'PrefixedBytes' },
				{ type: 'Boolean' }
			]),
			0x02: new Template([
				{ type: 'UUID' },
				{ type: 'String' },
				{ type: 'PrefixedArray', define: new Template ([
					{ type: 'String' },
					{ type: 'String' },
					{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
				])}
			]),
			0x03: new Template([
				{ type: 'VarInt' }
			]),
			0x04: new Template([
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'PrefixedBytes' }
			]),
			0x05: new Template([
				{ type: 'String' }
			])
		},
		serverbound: {
			0x00: new Template([
				{ type: 'String' },
				{ type: 'UUID' }
			]),
			0x01: new Template([
				{ type: 'PrefixedBytes' },
				{ type: 'PrefixedBytes' }
			]),
			0x02: new Template([
				{ type: 'VarInt' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'PrefixedBytes' }]) }
			]),
			0x03: new Template([]),
			0x04: new Template([
				{ type: 'String' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'PrefixedBytes' }]) }
			])
		}
	},
	configuration: {
		clientbound: {
			0x00: new Template([
				{ type: 'String' }
			]),
			0x01: new Template([
				{ type: 'String' },
				{ type: 'RemainData' }
			]),
			0x02: new Template([
				{ type: 'String' }
			]),
			0x03: new Template([]),
			0x04: new Template([
				{ type: 'Long' }
			]),
			0x05: new Template([
				{ type: 'Int' }
			]),
			0x06: new Template([]),
			0x07: new Template([
				{ type: 'String' },
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'String' },
					{ type: 'PrefixedOptional', define: new Template([{ type: 'NBT' }]) }
				])}
			]),
			0x08: new Template([
				{ type: 'PrefixedOptional', define: new Template([{ type: 'UUID' }]) }
			]),
			0x09: new Template([
				{ type: 'UUID' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'Boolean' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }])}
			]),
			0x0A: new Template([
				{ type: 'String' },
				{ type: 'PrefixedBytes' }
			]),
			0x0B: new Template([
				{ type: 'String' },
				{ type: 'VarInt' }
			]),
			0x0C: new Template([
				{ type: 'PrefixedArray', define: new Template([{type: 'String'}]) }
			]),
			0x0D: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'String' },
					{ type: 'PrefixedArray', define: new Template([
						{ type: 'String' },
						{ type: 'PrefixedArray', define: new Template([{type: 'RemainData'}]) }
					])}
				])}
			]),
			0x0E: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{type: 'String'},
					{type: 'String'},
					{type: 'String'}
				])}
			]),
			0x0F: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{type: 'String'},
					{type: 'String'}
				])}
			]),
			0x10: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'Boolean' },
					{ type: 'VarInt' },
					{ type: 'String' }
				])}
			]),
		},
		serverbound: {
			0x00: new Template([
				{ type: 'String' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'VarInt' }
			]),
			0x01: new Template([
				{ type: 'String' }
			]),
			0x02: new Template([
				{ type: 'String' },
				{ type: 'RemainData' }
			]),
			0x03: new Template([]),
			0x04: new Template([
				{ type: 'Long' }
			]),
			0x05: new Template([
				{ type: 'Int' }
			]),
			0x06: new Template([
				{ type: 'UUID' },
				{ type: 'VarInt' }
			]),
			0x07: new Template([
				{ type: 'PrefixedArray', define: new Template([
					{type: 'String'},
					{type: 'String'},
					{type: 'String'}
				])}
			])
		}
	},
	play: {
		clientbound: {
			0x00: new Template([]), // Bundle Delimiter
			0x01: new Template([ // Spawn Entity
				{ type: 'VarInt' },
				{ type: 'UUID' },
				{ type: 'VarInt' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Angle' },
				{ type: 'Angle' },
				{ type: 'Angle' },
				{ type: 'VarInt' },
				{ type: 'Short' },
				{ type: 'Short' },
				{ type: 'Short' }
			]),
			0x02: new Template([ // Spawn Experience Orb
				{ type: 'VarInt' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Short' }
			]),
			0x03: new Template([ // Entity Animation
				{ type: 'VarInt' },
				{ type: 'UByte' }
			]),
			0x04: new Template([ // Award Statistics
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'VarInt' },
					{ type: 'VarInt' },
					{ type: 'VarInt' }
				])}
			]),
			0x05: new Template([ // Acknowledge Block Change
				{ type: 'VarInt' }
			]),
			0x06: new Template([ // Set Block Destroy Stage
				{ type: 'VarInt' },
				{ type: 'Position' },
				{ type: 'UByte' }
			]),
			0x07: new Template([ // Block Entity Data
				{ type: 'Position' },
				{ type: 'VarInt' },
				{ type: 'NBT' }
			]),
			0x08: new Template([ // Block Action
				{ type: 'Position' },
				{ type: 'UByte' },
				{ type: 'UByte' },
				{ type: 'VarInt' }
			]),
			0x09: new Template([ // Block Update
				{ type: 'Position' },
				{ type: 'VarInt' }
			]),
			0x0A: new Template([ // Boss Bar
				{ type: 'UUID' },
				{ type: 'VarInt' },
				// Action Data will be added later based on Action ID
			]),
			0x0B: new Template([ // Change Difficulty
				{ type: 'UByte' },
				{ type: 'Boolean' }
			]),
			0x0C: new Template([ // Chunk Batch Finished
				{ type: 'VarInt' }
			]),
			0x0D: new Template([]), // Chunk Batch Start
			0x0E: new Template([ // Chunk Biomes
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'Int' },
					{ type: 'Int' },
					{ type: 'PrefixedBytes' }
				])}
			]),
			0x0F: new Template([ // Clear Titles
				{ type: 'Boolean' }
			]),
			0x10: new Template([ // Command Suggestions Response
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'String' },
					{ type: 'PrefixedOptional', define: new Template([
						{ type: 'String' }
					])}
				])}
			]),
			0x11: new Template([ // Commands
				{ type: 'PrefixedArray', define: new Template([{ type: 'RemainData' }]) },
				{ type: 'VarInt' }
			]),
			0x12: new Template([ // Close Container
				{ type: 'VarInt' }
			]),
			0x13: new Template([ // Set Container Content
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'RemainData' },
				{ type: 'Slot' }
			]),
			0x14: new Template([ // Set Container Property
				{ type: 'VarInt' },
				{ type: 'Short' },
				{ type: 'Short' }
			]),
			0x15: new Template([ // Set Container Slot
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Short' },
				{ type: 'RemainData' }
			]),
			0x16: new Template([ // Cookie Request (play)
				{ type: 'String' }
			]),
			0x17: new Template([ // Set Cooldown
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x18: new Template([ // Chat Suggestions
				{ type: 'VarInt' },
				{ type: 'PrefixedArray', define: new Template([{ type: 'String' }])}
			]),
			0x19: new Template([ // Clientbound Plugin Message (play)
				{ type: 'String' },
				{ type: 'RemainData' }
			]),
			0x1A: new Template([ // Damage Event
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				// Optional position data will be added later
			]),
			0x1B: new Template([ // Debug Sample
				{ type: 'PrefixedArray', define: new Template([{type: 'Long'}]) },
				{ type: 'VarInt' }
			]),
			0x1C: new Template([ // Delete Message
				{ type: 'VarInt' },
				// Optional data will be added later
			]),
			0x1D: new Template([ // Disconnect (play)
				{ type: 'TextComponent' }
			]),
			0x1E: new Template([ // Disguised Chat Message
				{ type: 'String' },
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
			]),
			0x1F: new Template([ // Entity Event
				{ type: 'Int' },
				{ type: 'Byte' }
			]),
			0x20: new Template([ // Teleport Entity
				{ type: 'VarInt' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Boolean' }
			]),
			0x21: new Template([ // Explosion
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Boolean' },
				{ type: 'RemainData' }
			]),
			0x22: new Template([ // Unload Chunk
				{ type: 'Int' },
				{ type: 'Int' }
			]),
			0x23: new Template([ // Game Event
				{ type: 'Byte' },
				{ type: 'Float' }
			]),
			0x24: new Template([ // Open Horse Screen
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Int' }
			]),
			0x25: new Template([ // Hurt Animation
				{ type: 'VarInt' },
				{ type: 'Float' }
			]),
			0x26: new Template([ // Initialize World Border
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'VarLong' },
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x27: new Template([ // Clientbound Keep Alive (play)
				{ type: 'Long' }
			]),
			0x28: new Template([ // Chunk Data and Update Light
				{ type: 'Int' },
				{ type: 'Int' },
				{ type: 'ChunkData' },
				{ type: 'RemainData' }
			]),
			0x29: new Template([ // World Event
				{ type: 'Int' },
				{ type: 'Position' },
				{ type: 'Int' },
				{ type: 'Boolean' }
			]),
			0x2A: new Template([ // Particle
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Int' },
				{ type: 'VarInt' },
				{ type: 'RemainData' }
			]),
			0x2B: new Template([ // Update Light
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'RemainData' }
			]),
			0x2C: new Template([ // Login (play)
				{ type: 'Int' },
				{ type: 'Boolean' },
				{ type: 'PrefixedArray', define: new Template([{ type: 'String' }]) },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'Long' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'Boolean' },
				{ type: 'RemainData' }
			]),
			0x2D: new Template([ // Map Data
				{ type: 'VarInt' },
				{ type: 'Byte' },
				{ type: 'Boolean' },
				{ type: 'PrefixedOptional', define: new Template([
					{ type: 'VarInt' },
					{ type: 'Byte' },
					{ type: 'Byte' },
					{ type: 'Byte' },
					{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
				])},
				{ type: 'RemainData' }
			]),
			0x2E: new Template([{ type: 'VarInt' },
				{
					type: "PrefixedArray",
					define: new Template([
						{ type: "Slot" },
						{ type: "Slot" },
						{ type: "PrefixedOptional", define: new Template([{ type: "Slot" }]) },
						{ type: "Boolean" },
						{ type: "Int" },
						{ type: "Int" },
						{ type: "Int" },
						{ type: "Float" },
						{ type: "Int" },
						{ type: "VarInt" },
						{ type: "VarInt" },
						{ type: "Boolean" },
						{ type: "Boolean" },
					]),
				}]),
			0x2F: new Template([ // Update Entity Position
				{ type: 'VarInt' },
				{ type: 'Short' },
				{ type: 'Short' },
				{ type: 'Short' },
				{ type: 'Boolean' }
			]),
			0x30: new Template([ // Update Entity Position and Rotation
				{ type: 'VarInt' },
				{ type: 'Short' },
				{ type: 'Short' },
				{ type: 'Short' },
				{ type: 'Angle' },
				{ type: 'Angle' },
				{ type: 'Boolean' }
			]),
			0x31: new Template([ // Move Minecart Along Track
				{ type: 'VarInt' },
				{ type: 'PrefixedArray', define: new Template([{type: 'Double'}]) },
				{ type: 'PrefixedArray', define: new Template([{type: 'Double'}]) },
				{ type: 'PrefixedArray', define: new Template([{type: 'Double'}]) },
				{ type: 'PrefixedArray', define: new Template([{type: 'Double'}]) },
				{ type: 'PrefixedArray', define: new Template([{type: 'Double'}]) },
				{ type: 'PrefixedArray', define: new Template([{type: 'Double'}]) },
				{ type: 'Angle' },
				{ type: 'Angle' },
				{ type: 'Float' }
			]),
			0x32: new Template([ // Update Entity Rotation
				{ type: 'VarInt' },
				{ type: 'Angle' },
				{ type: 'Angle' },
				{ type: 'Boolean' }
			]),
			0x33: new Template([ // Move Vehicle
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' }
			]),
			0x34: new Template([ // Open Book
				{ type: 'VarInt' }
			]),
			0x35: new Template([ // Open Screen
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'String' }
			]),
			0x36: new Template([ // Open Sign Editor
				{ type: 'Position' },
				{ type: 'Boolean' }
			]),
			0x37: new Template([ // Ping (play)
				{ type: 'Int' }
			]),
			0x38: new Template([ // Ping Response (play)
				{ type: 'Long' }
			]),
			0x39: new Template([ // Place Ghost Recipe
				{ type: 'VarInt' },
				{ type: 'RemainData' }
			]),
			0x3A: new Template([ // Player Abilities (clientbound)
				{ type: 'Byte' },
				{ type: 'Float' },
				{ type: 'Float' }
			]),
			0x3B: new Template([ // Player Chat Message
				{ type: "UUID" },
				{ type: "VarInt" },
				{
					type: "PrefixedOptional",
					define: new Template([{ type: "PrefixedBytes" }]),
				},
				{ type: "String" },
				{ type: "Long" },
				{ type: "Long" },
				{
					type: "PrefixedArray",
					define: new Template([{ type: "VarInt" }]),
				},
				{
					type: "PrefixedOptional",
					define: new Template([{ type: "String" }]),
				},
				{ type: "VarInt" },
				// Filter type bits will be added later based on Filter Type
				{ type: "VarInt" },
				{ type: "String" },
				{ type: "PrefixedOptional", define: new Template([{ type: "String" }]) },
			]),
			0x3C: new Template([ // End Combat
				{ type: 'VarInt' }
			]),
			0x3D: new Template([]), // Enter Combat
			0x3E: new Template([ // Combat Death
				{ type: 'VarInt' },
				{ type: 'String' }
			]),
			0x3F: new Template([ // Player Info Remove
				{ type: 'PrefixedArray', define: new Template([{ type: 'UUID' }])}
			]),
			0x40: new Template([{ type: 'RemainData' }]), // Player Info Update
			0x41: new Template([ // Look At
				{ type: 'VarInt' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Boolean' },
				{ type: 'RemainData' }
			]),
			0x42: new Template([ // Synchronize Player Position
				{ type: 'VarInt' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Byte' }
			]),
			0x43: new Template([ // Player Rotation
				{ type: 'Float' },
				{ type: 'Float' }
			]),
			0x44: new Template([{ type: 'RemainData' }]),// Recipe Book Add
			0x45: new Template([ // Recipe Book Remove
				{ type: 'PrefixedArray', define: new Template([{ type: 'VarInt' }])}
			]),
			0x46: new Template([ // Recipe Book Settings
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'Boolean' }
			]),
			0x47: new Template([ // Remove Entities
				{ type: 'PrefixedArray', define: new Template([{ type: 'VarInt' }])}
			]),
			0x48: new Template([ // Remove Entity Effect
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x49: new Template([ // Reset Score
				{ type: 'String' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
			]),
			0x4A: new Template([ // Remove Resource Pack (play)
				{ type: 'PrefixedOptional', define: new Template([{ type: 'UUID' }]) }
			]),
			0x4B: new Template([ // Add Resource Pack (play)
				{ type: 'UUID' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'Boolean' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
			]),
			0x4C: new Template([ // Respawn
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'Long' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'Boolean' },
				{ type: 'RemainData' }
			]),
			0x4D: new Template([ // Set Head Rotation
				{ type: 'VarInt' },
				{ type: 'Angle' }
			]),
			0x4E: new Template([ // Update Section Blocks
				{ type: 'Long' },
				{ type: 'PrefixedArray', define: new Template([{ type: 'VarLong' }]) }
			]),
			0x4F: new Template([ // Select Advancements Tab
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }])}
			]),
			0x50: new Template([ // Server Data
				{ type: 'String' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'PrefixedBytes' }]) }
			]),
			0x51: new Template([ // Set Action Bar Text
				{ type: 'String' }
			]),
			0x52: new Template([ // Set Border Center
				{ type: 'Double' },
				{ type: 'Double' }
			]),
			0x53: new Template([ // Set Border Lerp Size
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'VarLong' }
			]),
			0x54: new Template([ // Set Border Size
				{ type: 'Double' }
			]),
			0x55: new Template([ // Set Border Warning Delay
				{ type: 'VarInt' }
			]),
			0x56: new Template([ // Set Border Warning Distance
				{ type: 'VarInt' }
			]),
			0x57: new Template([ // Set Camera
				{ type: 'VarInt' }
			]),
			0x58: new Template([ // Set Center Chunk
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x59: new Template([ // Set Render Distance
				{ type: 'VarInt' }
			]),
			0x5A: new Template([ // Set Cursor Item
				{ type: 'Slot' }
			]),
			0x5B: new Template([ // Set Default Spawn Position
				{ type: 'Position' },
				{ type: 'Float' }
			]),
			0x5C: new Template([ // Display Objective
				{ type: 'VarInt' },
				{ type: 'String' }
			]),
			0x5D: new Template([ // Set Entity Metadata
				{ type: 'VarInt' },
				{ type: 'RemainData' }
			]),
			0x5E: new Template([ // Link Entities
				{ type: 'Int' },
				{ type: 'Int' }
			]),
			0x5F: new Template([ // Set Entity Velocity
				{ type: 'VarInt' },
				{ type: 'Short' },
				{ type: 'Short' },
				{ type: 'Short' }
			]),
			0x60: new Template([{ type: 'RemainData' }]), // Set Equipment
			0x61: new Template([ // Set Experience
				{ type: 'Float' },
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x62: new Template([ // Set Health
				{ type: 'Float' },
				{ type: 'VarInt' },
				{ type: 'Float' }
			]),
			0x63: new Template([ // Set Held Item (clientbound)
				{ type: 'VarInt' }
			]),
			0x64: new Template([{ type: 'RemainData' }]), // Update Objectives
			0x65: new Template([ // Set Passengers
				{ type: 'VarInt' },
				{ type: 'PrefixedArray', define: new Template([{ type: 'VarInt' }])}
			]),
			0x66: new Template([ // Set Player Inventory Slot
				{ type: 'VarInt' },
				{ type: 'Slot' }
			]),
			0x67: new Template([{ type: 'RemainData' }]), // Update Teams
			0x68: new Template([{ type: 'RemainData' }]), // Update Score
			0x69: new Template([ // Set Simulation Distance
				{ type: 'VarInt' }
			]),
			0x6A: new Template([ // Set Subtitle Text
				{ type: 'String' }
			]),
			0x6B: new Template([ // Update Time
				{ type: 'Long' },
				{ type: 'Long' },
				{ type: 'Boolean' }
			]),
			0x6C: new Template([ // Set Title Text
				{ type: 'String' }
			]),
			0x6D: new Template([ // Set Title Animation Times
				{ type: 'Int' },
				{ type: 'Int' },
				{ type: 'Int' }
			]),
			0x6E: new Template([{ type: 'IDorSoundEvent' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Long' }
			]),
			0x6F: new Template([{ type: 'IDorSoundEvent' },
				{ type: 'VarInt' },
				{ type: 'Int' },
				{ type: 'Int' },
				{ type: 'Int' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Long' }
			]),
			0x70: new Template([]),//Start Configuration
			0x71: new Template([{ type: 'RemainData' }]),//Stop Sound
			0x72: new Template([{ type: 'String' }, { type: 'PrefixedBytes' }]),
			0x73: new Template([ // System Chat Message
				{ type: 'TextComponent' },
				{ type: 'Boolean' }
			]),
			0x74: new Template([ // Set Tab List Header And Footer
				{ type: 'String' },
				{ type: 'String' }
			]),
			0x75: new Template([ // Tag Query Response
				{ type: 'VarInt' },
				{ type: 'NBT' }
			]),
			0x76: new Template([ // Pickup Item
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x77: new Template([ // Synchronize Vehicle Position
				{ type: 'VarInt' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Byte' }
			]),
			0x78: new Template([ // Set Ticking State
				{ type: 'Float' },
				{ type: 'Boolean' }
			]),
			0x79: new Template([ // Step Tick
				{ type: 'VarInt' }
			]),
			0x7A: new Template([ // Transfer (play)
				{ type: 'String' },
				{ type: 'VarInt' }
			]),
			0x7B: new Template([{ type: 'RemainData' }]),//Update Advancements
			0x7C: new Template([{ type: 'RemainData' }]),//Update Attributes
			0x7D: new Template([ // Update Entity Effect
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Byte' }
			]),
			0x7E: new Template([{ type: 'RemainData' }]),//Update Recipes
			0x7F: new Template([{ type: 'RemainData' }]),//Update Tags
			0x80: new Template([ // Projectile Power
				{ type: 'VarInt' },
				{ type: 'Double' }
			]),
			0x81: new Template([{ type: 'PrefixedArray', define: new Template([{type: 'String'},{type: 'String'}])}]),
			0x82: new Template([{ type: 'PrefixedArray', define: new Template([{ type: 'Boolean' },{ type: 'VarInt' },{ type: 'String' }])}]),
		},
		serverbound: {
			0x00: new Template([ // Confirm Teleportation
				{ type: 'VarInt' }
			]),
			0x01: new Template([ // Query Block Entity Tag
				{ type: 'VarInt' },
				{ type: 'Position' }
			]),
			0x02: new Template([ // Bundle Item Selected
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x03: new Template([ // Change Difficulty
				{ type: 'UByte' }
			]),
			0x04: new Template([ // Acknowledge Message
				{ type: 'VarInt' }
			]),
			0x05: new Template([ // Chat Command
				{ type: 'String' }
			]),
			0x06: new Template([ // Signed Chat Command
				{ type: 'String' },
				{ type: 'Long' },
				{ type: 'Long' },
				{ type: 'PrefixedArray', define: new Template([
					{ type: 'String' },
					{ type: 'PrefixedBytes' }
				])},
				{ type: 'VarInt' },
				{ type: 'FixedBitSet', bits: 20 }
			]),
			0x07: new Template([ // Chat Message
				{ type: 'String' },
				{ type: 'Long' },
				{ type: 'Long' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'PrefixedBytes' }]) },
				{ type: 'VarInt' },
				{ type: 'FixedBitSet', define: 20 }
			]),
			0x08: new Template([ // Player Session
				{ type: 'UUID' },
				{ type: 'Long' },
				{ type: 'PrefixedBytes' },
				{ type: 'PrefixedBytes' }
			]),
			0x09: new Template([ // Chunk Batch Received
				{ type: 'Float' }
			]),
			0x0A: new Template([ // Client Status
				{ type: 'VarInt' }
			]),
			0x0B: new Template([]), // Client Tick End
			0x0C: new Template([ // Client Information (play)
				{ type: 'String' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'VarInt' }
			]),
			0x0D: new Template([ // Command Suggestions Request
				{ type: 'VarInt' },
				{ type: 'String' }
			]),
			0x0E: new Template([]), // Acknowledge Configuration
			0x0F: new Template([ // Click Container Button
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x10: new Template([{ type: 'RemainData' }]), // Click Container, need more infomation
			0x11: new Template([ // Close Container
				{ type: 'VarInt' }
			]),
			0x12: new Template([ // Change Container Slot State
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Boolean' }
			]),
			0x13: new Template([ // Cookie Response (play)
				{ type: 'String' },
				{ type: 'PrefixedBytes' }
			]),
			0x14: new Template([ // Serverbound Plugin Message (play)
				{ type: 'String' },
				{ type: 'RemainData' }
			]),
			0x15: new Template([ // Debug Sample Subscription
				{ type: 'VarInt' }
			]),
			0x16: new Template([ // Edit Book
				{ type: 'VarInt' },
				{ type: 'PrefixedArray', define: new Template([{ type: 'String' }]) },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
			]),
			0x17: new Template([ // Query Entity Tag
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x18: new Template([{ type: 'RemainData' }]),//Interact
			0x19: new Template([ // Jigsaw Generate
				{ type: 'Position' },
				{ type: 'VarInt' },
				{ type: 'Boolean' }
			]),
			0x1A: new Template([ // Serverbound Keep Alive (play)
				{ type: 'Long' }
			]),
			0x1B: new Template([ // Lock Difficulty
				{ type: 'Boolean' }
			]),
			0x1C: new Template([ // Set Player Position
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Byte' }
			]),
			0x1D: new Template([ // Set Player Position and Rotation
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Byte' }
			]),
			0x1E: new Template([ // Set Player Rotation
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Byte' }
			]),
			0x1F: new Template([ // Set Player Movement Flags
				{ type: 'Byte' }
			]),
			0x20: new Template([ // Move Vehicle
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Double' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Boolean' }
			]),
			0x21: new Template([ // Paddle Boat
				{ type: 'Boolean' },
				{ type: 'Boolean' }
			]),
			0x22: new Template([ // Pick Item From Block
				{ type: 'Position' },
				{ type: 'Boolean' }
			]),
			0x23: new Template([ // Pick Item From Entity
				{ type: 'VarInt' },
				{ type: 'Boolean' }
			]),
			0x24: new Template([ // Ping Request (play)
				{ type: 'Long' }
			]),
			0x25: new Template([ // Place Recipe
				{ type: 'VarInt' },
				{ type: 'Boolean' }
			]),
			0x26: new Template([ // Player Abilities (serverbound)
				{ type: 'Byte' }
			]),
			0x27: new Template([ // Player Action
				{ type: 'VarInt' },
				{ type: 'Position' },
				{ type: 'Byte' },
				{ type: 'VarInt' }
			]),
			0x28: new Template([ // Player Command
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x29: new Template([ // Player Input
				{ type: 'UByte' }
			]),
			0x2A: new Template([]), // Player Loaded
			0x2B: new Template([ // Pong (play)
				{ type: 'Int' }
			]),
			0x2C: new Template([ // Change Recipe Book Settings
				{ type: 'VarInt' },
				{ type: 'Boolean' },
				{ type: 'Boolean' }
			]),
			0x2D: new Template([ // Set Seen Recipe
				{ type: 'VarInt' }
			]),
			0x2E: new Template([ // Rename Item
				{ type: 'String' }
			]),
			0x2F: new Template([ // Resource Pack Response (play)
				{ type: 'UUID' },
				{ type: 'VarInt' }
			]),
			0x30: new Template([ // Seen Advancements
				{ type: 'VarInt' },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'String' }]) }
			]),
			0x31: new Template([ // Select Trade
				{ type: 'VarInt' }
			]),
			0x32: new Template([ // Set Beacon Effect
				{ type: 'PrefixedOptional', define: new Template([{ type: 'VarInt' }]) },
				{ type: 'PrefixedOptional', define: new Template([{ type: 'VarInt' }]) }
			]),
			0x33: new Template([ // Set Held Item (serverbound)
				{ type: 'Short' }
			]),
			0x34: new Template([ // Program Command Block
				{ type: 'Position' },
				{ type: 'String' },
				{ type: 'VarInt' },
				{ type: 'Byte' }
			]),
			0x35: new Template([ // Program Command Block Minecart
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'Boolean' }
			]),
			0x36: new Template([ // Set Creative Mode Slot
				{ type: 'Short' },
				{ type: 'Slot' }
			]),
			0x37: new Template([ // Program Jigsaw Block
				{ type: 'Position' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'VarInt' },
				{ type: 'VarInt' }
			]),
			0x38: new Template([ // Set Structure Block
				{ type: 'Position' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'Byte' },
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'String' },
				{ type: 'Float' },
				{ type: 'VarLong' },
				{ type: 'Byte' }
			]),
			0x39: new Template([ // Update Sign
				{ type: 'Position' },
				{ type: 'Boolean' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'String' },
				{ type: 'String' }
			]),
			0x3A: new Template([ // Swing Arm
				{ type: 'VarInt' }
			]),
			0x3B: new Template([ // Teleport To Entity
				{ type: 'UUID' }
			]),
			0x3C: new Template([ // Use Item On
				{ type: 'VarInt' },
				{ type: 'Position' },
				{ type: 'VarInt' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Float' },
				{ type: 'Boolean' },
				{ type: 'Boolean' },
				{ type: 'VarInt' }
			]),
			0x3D: new Template([ // Use Item
				{ type: 'VarInt' },
				{ type: 'VarInt' },
				{ type: 'Float' },
				{ type: 'Float' }
			])
		}
	}
};