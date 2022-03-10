import mongoose from 'mongoose'
import nanoid from 'nanoid';

interface bounty {
	target: string;
	bounty: string;
	currency: string;
	author: string;
	reason?: string;
}

var schema = new mongoose.Schema <bounty> ({
	target: {type: String, required: true},
	bounty: {type: String, required: true},
	currency: {type: String, required: true},
	author: {type: String, required: true},
	reason: {type: String, required: false}
},{ 
	// turn on create/modify record timestamps
	timestamps: true 
})


export default mongoose.model('Bounties', schema)