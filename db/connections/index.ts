import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const workMongoDBURI = process.env.MONGODB_WORK_CONN as string
const workMongoDBConn = mongoose.createConnection(workMongoDBURI)

export const coreDB = workMongoDBConn.useDb('core')
export const jobDB = workMongoDBConn.useDb('jobs')
