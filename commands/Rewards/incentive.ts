import { ICommand } from 'wokcommands';
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { bold, italic, underscore, codeBlock, blockQuote } from '@discordjs/builders';

export default {
	category: 'Reward System',
	description: 'Handles Incentive related functions',
	slash: 'both',
	testOnly: true,

	callback: async ({ channel }) => {
		const attatch = new MessageAttachment('/home/fuzzylabrat/discord-dev/bots/discord.BEN/assets/images/1399823.png')

		const title = bold(underscore('Station Incentive Program'))
		const cmd = codeBlock('md', '/incentive info <incentive_id>');

		const embed = new MessageEmbed()
			.setTitle(`- ${title} -`)
			.setColor('#2cb5d1')
			.setDescription(`Get more information on an incentive using the slash command \n${cmd}\n`)
			.addFields(
				//{ name:  '\u200B', value: '\u200B', }, // Spacer Row
				{
					name: '[ Corporate Incentives ]', 
					value: '1MG \t Doctrine Build', 
					inline: true
				},
				{
				 	name: '[ Alliance Incentives ]', 
				 	value: italic('- no active incentives posted-'), 
				 	inline: true
				},
				{ name:  '\u200B', value: '\u200B', }, // Spacer Row
			)
			.setThumbnail('attachment://1399823.png')
			.setFooter({text: 'Incentives last refreshed'})
			.setTimestamp()
		
		//return { custom: true, embeds: [embed], files: [attatch] }
		await channel.send({ embeds: [embed], files: [attatch] })
		await channel.send(blockQuote('Hi There!\tThere\'s a tab here and \t another here :man:\n Multiline!'))
		return;
	}
} as ICommand