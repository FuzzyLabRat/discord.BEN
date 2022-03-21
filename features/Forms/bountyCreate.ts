import { Client } from 'discord.js'
import { ModalSubmitInteraction } from 'discord-modals'

export default (client: Client) => {

	client.on('modalSubmit', async (modal: ModalSubmitInteraction) => {
		if (modal.customId === 'newBounty') {
			// TODO: create proper action when fully supported
			await modal.deferReply({ephemeral: true})

			modal.followUp( {content: 'Bounty Created!'} )
			
		}
	})
}

// Configuration for this feature
export const config = {
	// The display name that server owners will see.
	// This can be changed at any time.
	displayName: 'Bounty Form Handler',
	description: "Processes input from a Bounty Form"
  
	// The name the database will use to set if it is enabled or not.
	// This should NEVER be changed once set, and users cannot see it.
	//dbName: 'WELCOME MESSAGE'
}