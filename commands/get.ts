import { ICommand } from 'wokcommands';
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { bold, italic, underscore, codeBlock, blockQuote } from '@discordjs/builders';

const types = ['bounty']

export default {
	category: 'Get Functions',
	description: 'temporary way to pull a record for display until we get subcommands working',
	slash: 'both',
	testOnly: true,
	
	// options: [
	// 	{
	// 		name: 'type',
	// 		description: `The type of object to retrive: ${types.join(', ')}`,
	// 		type: 'STRING',
	// 		required: true,
	// 		choices: types.map((type) => ({
	// 			name: type,
	// 			value: type,
	// 		}))
	// 	},
	// 	{
	// 		name: 'identifier',
	// 		description: 'The record identifier to retrieve',
	// 		type: 'STRING',
	// 		required: true,
	// 	},
	// ],

	callback: ({ channel, client }) =>  {
		const dummyUser = client.users.cache.get('498685965456375820')
		const usr = dummyUser?.username
		const avatar = dummyUser?.displayAvatarURL({format: 'png'})
		
		const gala = client.emojis.cache.get('951210858149711922')

		
		const attach = new MessageAttachment('/home/fuzzylabrat/discord-dev/bots/discord.BEN/assets/images/1253876.png')
		const embed = new MessageEmbed()
			.setTitle('- Bounty Record -')
			.setColor('#f8a26c')
			.addFields(
				{ name: 'Target:', value: blockQuote('Mickey Mouse'), inline: true },
				{ name: 'Reward:', value: blockQuote(`1M ${gala}`), inline: true },
				{ name: 'Bounty Reason:', value: 'Cause he wants to kill my Minnie!!' }
			)
			.setFooter(
				{ 
					text: `${usr} issued bounty on`, 
					iconURL: avatar
				}
			)
			.setTimestamp( new Date('2022-01-02') )
			.setThumbnail('attachment://1253876.png')
		channel.send({ embeds: [embed], files: [attach] })
	}
} as ICommand