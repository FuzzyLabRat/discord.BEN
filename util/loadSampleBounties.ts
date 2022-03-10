import mongoose from 'mongoose'
import bounty from './../models/bounty'
import * as dotenv from 'dotenv';

dotenv.config({path: './../.env'})

run().catch(err => console.log(err))

async function run(): Promise<void> {
	await mongoose.connect(process.env.MONGO_URI!);

	await new bounty({
		target: 'Mini Mouse',
		bounty: '5M',
		currency: 'Corp Points',
		author: 'Mickey Mouse',
		reason: 'She did the dirty with Goofy'
	}).save()
}
