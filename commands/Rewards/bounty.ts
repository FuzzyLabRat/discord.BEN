import { ICommand } from 'wokcommands';
import { MessageActionRow, MessageAttachment, MessageButton, MessageEmbed, MessageComponentInteraction } from 'discord.js'
import { bold, underscore, italic, codeBlock, quote, } from '@discordjs/builders';
import { Modal, TextInputComponent, showModal } from 'discord-modals';
import Tablefier from '@functions/Tablefier';

const controls = {
 	next : '▶️',
 	prev : '◀️',
 	new  : '🆕',
	help : '❔',
	refresh : '♻️',
}

const sample = [
	['ID','Target','Reward'],
	['\'01230\'', 'Donald Duck', '$1M'],
	['\'4a567\'', 'Minnie Mouse', '$1M'],
	['\'3BCDE\'', 'Donald Duck', '$5M'],
	['\'7FGHI\'', '[Atls] Calus Daiga', '$10M'],
	["\'1a904\'", 'Dellachenko GA', '$100M'],
	["\'19d05\'", 'Salama Maimonides', '$100M'],
	["","",""]
]

const embeds: MessageEmbed[] = []
const pages = {} as { [key: string]: number} 

const getButtonRow = (id: number, recordsLen: number) => {
	// Control Icons: ◀️ ▶️ 🆕 ❔ ♻️
	const row = new MessageActionRow()
	row.addComponents(
		new MessageButton()
			.setCustomId('pBounty')
			.setEmoji('◀️')
			.setLabel('Prev')
			.setStyle('SECONDARY')
			.setDisabled( id === 0 )
	)
	row.addComponents(
		new MessageButton()
			.setCustomId('nBounty')
			.setEmoji('▶️')
			.setLabel('Next')
			.setStyle('SECONDARY')
			.setDisabled( pages[id] === embeds.length -1 )
	)
	row.addComponents(
		new MessageButton()
			.setCustomId('newBounty')
			.setEmoji('🆕')
			.setLabel('New Bounty')
			.setStyle('SECONDARY')
	)
	row.addComponents(
		new MessageButton()
			.setCustomId('bountyHelp')
			.setEmoji('❔')
			.setLabel('Help')
			.setStyle('SECONDARY')
	)
	row.addComponents(
		new MessageButton()
			.setCustomId('bountyRefresh')
			.setEmoji('♻️')
			.setStyle('SECONDARY')
			.setDisabled(true)
	)
	return row
}

export default {
	category: 'Reward System',
	description: 'Handles Bounty related functions',
	slash: 'both',
	testOnly: true,

	callback: async ({ client, channel, interaction }) => {


		const attatch = new MessageAttachment('/home/fuzzylabrat/discord-dev/bots/discord.BEN/assets/images/1255972.png')

		const start = 1;
		const end   = 5;
		const len   = sample.length-1;

		const embed = new MessageEmbed()
			.setTitle('- '+bold(underscore('Station Bounty Board'))+' -')
			.setColor('#d76628')
			.setDescription(`${
				codeBlock('bash', Tablefier(sample)) +
				quote(italic('displaying ['+start+'-'+end+'] of ['+len+'] bounties'))
			}`)
			.addFields(
				{
					name: '\u200B',
					value: '<#953018251720405012>',
					inline: true
				},
				{
					name: '\u200B',
					value: '<#953018061584216104>',
					inline: true
				},
			)
			.setThumbnail('attachment://1255972.png')
			.setFooter({text: 'last refreshed'})
			.setTimestamp()
		
		//const board = await interaction.reply({ 
		const board = await channel.send({ 
		//const board = await interaction.followUp({ 
			embeds: [embed], 
			components: [getButtonRow(0,sample.length-1)],
			files: [attatch] 
		})

		const filter = (btInt: MessageComponentInteraction) => { }
		const collector = channel.createMessageComponentCollector({ })

		collector.on('collect', async i => {

			switch (i.customId) {
				case 'bountyHelp': {
					i.reply({content: 'Hello Help Menu', ephemeral: true})
					break;
				}
				case 'newBounty': {
					const target =  new TextInputComponent()
						.setCustomId('bountyTarget')
						.setLabel('Bounty Target')
						.setStyle('SHORT')
						.setPlaceholder('Target Name')
						.setRequired(true)
		
					const reward = new TextInputComponent()
						.setCustomId('bountyReward')
						.setLabel('Reward Offered')
						.setStyle('SHORT')
						.setPlaceholder('What will be paid upon bounty fulfillment')
						.setRequired(true)
					const reason = new TextInputComponent()
						.setCustomId('bountyReason')
						.setLabel('Bounty Reason')
						.setStyle('LONG')
						.setPlaceholder('<OPTIONAL Reason why this bounty is posted')
						.setRequired(false)

					const modal = new Modal()
						.setCustomId('newBounty')
						.setTitle('New Station Bounty')
						.addComponents(target)
						.addComponents(reward)
						.addComponents(reason)

					showModal(modal, {client: client,interaction: i})
					break;
				}
				case 'pBounty': {
					console.log('Load Previous Bounty')
					i.deferReply();
					break;
				}
				case 'nBounty': {
					console.log('Load Next Bounty')
					i.deferReply();
					break;
				}
			}
		})

		// const filter = (reaction: MessageReaction, user: User ) => {
		// 	return !user.bot
		// }
		// const collector = board.createReactionCollector({filter})
		// collector.on('collect', (reaction, user) => {
		// 	reaction.users.remove(user.id);
		// 	console.log(interaction)
		// 	if (reaction.emoji.name === newBounty) {
		// 		reaction.message.reply({content: 'OK, creating a Bounty', emphemeral: true})
		// 	}
		// })

		//channel.send(blockQuote(channelMention('950877934472798228')))

		// board.react(prev)  // Format for inline async
		// 	.then(() => { board.react(next) })
		// 	.then(() => { board.react(newBounty) })
		// 	.then(() => { board.react(help) })
	}
} as ICommand
