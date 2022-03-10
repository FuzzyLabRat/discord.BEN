import { NewsChannel } from 'discord.js';
import { ICommand } from 'wokcommands';

const ANNOUNCE_CHANNEL = '951243002150527007'

export default {
	category: 'Reward System',
	description: 'Handles Incentive related functions',
	slash: true,
	testOnly: true,

	callback: ({ client }) => {
		console.log('Putting an announcement in the channel and crossposting')
		const msg = `Now hear this @ ${new Date()}`
		const chan = client.channels.cache.get(ANNOUNCE_CHANNEL)
		if (chan!.isText()) { chan!.send(msg).then(message => (message.crosspost()))}
	}
} as ICommand