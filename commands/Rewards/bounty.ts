import { ICommand } from 'wokcommands';
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { bold, italic, underscore, codeBlock, blockQuote, channelMention } from '@discordjs/builders';

// const controls = {
// 	next = '▶️',
// 	prev = '◀️',
// 	newBounty = '🆕',
// 	help = '❔',
// }; // TOOD: convert consts to a map/hashtable
const next = '▶️'
const prev = '◀️'
const newBounty = '🆕'
const help = '❔'

const SAMPLE = `
   ID   │      Target       │ Reward 
────────┼───────────────────┼──────────
 [0123] │ Donald Duck       │ 1M Gala
 [4567] │ Minnie Mouse      │ 1M Gala 
 [890A] │ Minnie Mouse      │ 1M Gala
 [BCDE] │ Donald Duck       │ 5M Gala
 [FGHI] │ [Atls]Calus Daiga │ 10M Gala`

export default {
	category: 'Reward System',
	description: 'Handles Bounty related functions',
	slash: 'both',
	testOnly: true,

	callback: async ({ client, channel }) => {
		const attatch = new MessageAttachment('/home/fuzzylabrat/discord-dev/bots/discord.BEN/assets/images/1255972.png')
		const gala = client.emojis.cache.get('949888554673250364')

		const embed = new MessageEmbed()
			.setTitle('- '+bold(underscore('Station Bounty Board'))+' -')
			.setColor('#d76628')
			//.setDescription()
			.addFields(
				{ 
					name: 'Active Bounties ',
					value: codeBlock('ini', SAMPLE),
				},
				{
					name: '\u200B', 
					value: underscore('Board Controls') + '\n'+ blockQuote(
						`${prev} : Previous Bounty Set` + `\n` +
						`${newBounty} : Create a new Bounty` 
					), 
					inline: true
				},
				{
					name: '\u200B', 
					value: italic('- react below -') + '\n' + blockQuote(
						`${next} : Next Bounty Set` + '\n' +
						`${help} : Bounty Board Help` + '\n'
					), 
					inline: true
				},// Spacer Row
				// { 
				// 	name:  '\u200B', 
				// 	value: `Get more information on a bounty using the slash command \n ${codeBlock('md', '/bounty info <bounty_id>')}\n Redeem at ${channelMention('950877934472798228')}`,
				// },
				// {
				// 	name: 'Active Bounties (0/0)', 
				// 	value: italic(
				// 		'- no active bounties posted -' + '\n'
				// 	), 
				// },
				//{ name:  '\u200B', value: '\u200B', }, // Spacer Row
			)
			.setThumbnail('attachment://1255972.png')
			.setFooter({text: 'last refreshed'})
			.setTimestamp()
		
		//return { custom: true, embeds: [embed], files: [attatch] }

		const board = await channel.send({ embeds: [embed], files: [attatch] })
		
		// TODO: convert to a for loop or hash iterator
		await board.react(prev) 
		await board.react(next)
		await board.react(newBounty)
		await board.react(help)

		//channel.send(blockQuote(channelMention('950877934472798228')))

		// board.react(prev)  // Format for inline async
		// 	.then(() => { board.react(next) })
		// 	.then(() => { board.react(newBounty) })
		// 	.then(() => { board.react(help) })
	}
} as ICommand

/*
`┌────────┬──────────────┬────────┐
│   ID   │    Target    │ Reward │
├────────┼──────────────┼────────┤
│ [0123] │ Donald Duck  │ 1MG    │
│ [0123] │ Minnie Mouse │ 1MG    │
│ [0123] │ Minnie Mouse │ 1MG    │
│ [0123] │ Donald Duck  │        │
└────────┴──────────────┴────────┘`
*/