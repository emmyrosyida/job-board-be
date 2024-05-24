import mongoose from 'mongoose'
import User from '../../db/models/User.model'
import ListingJob from '../../db/models/Listing.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const cognitoSub = event?.identity?.sub
    if (!cognitoSub) throw new Error('userDoesNotExist')

    const profileRaw = await User.findOne({ cognitoSub, role: 'recruiter' }).select('-__v')
    if (!profileRaw) throw new Error('unableToFindProfile')

    const { id, status } = event?.arguments?.input

    const jobId = id?.trim() || ''
    if (jobId <= 0) throw new Error('jobIdIsRequired')

    const isValidJobId = mongoose.isValidObjectId(jobId)
    if (!isValidJobId) throw new Error('jobIdIsNotValid')

    const jobRaw = await ListingJob.findOne({ _id: jobId, status: { $ne: 'deleted' } })
    if (!jobRaw) throw new Error('jobNotFound')

    jobRaw['status'] = status
    jobRaw['updatedBy'] = profileRaw.email

    if (status === 'active') jobRaw['publishedAt'] = new Date()

    const updatedQuestion = await jobRaw.save()
    if (!updatedQuestion) throw new Error('failedTodUpdateQuestion')

    const response = updatedQuestion.toObject({ virtuals: true })

    return response
  } catch (error) {
    throw new Error(`$updateJobStatus - Failed to , ${error}`)
  }
}
