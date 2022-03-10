/**
 * @file
 * Main entry for Bot Launcher
 *
 * Implements a DiscordJS bot utilizing wokcommands
 * as a command handler
 */

import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import bounty from './models/bounty'

console.log(`Initializing BOT [ BEN.dev ]...`)

const client = new DiscordJS.Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	]
})

client.on('ready', async () => {
	new WOKCommands(client, {
		commandDir: path.join(__dirname, 'commands'),
		featureDir: path.join(__dirname, 'features'),
		typeScript: true,
		testServers: process.env.testServers?.split(','),
		ephemeral: true,
		mongoUri: process.env.MONGO_URI
	})
	.setDisplayName('[BEN]')
	.setDefaultPrefix(process.env.PREFIX)

	client.user!.setActivity('subspace comms', { type: 'LISTENING' });

	console.log('[BEN] is Online')

	setTimeout(async () => {
		await new bounty({
			target: 'Mickey Mouse',
			bounty: '1M',
			currency: 'GALA',
			author: 'Wacko',
			reason: 'I hate the mouse'
		}).save()
	}, 1000)

})

client.login(process.env.TOKEN)
