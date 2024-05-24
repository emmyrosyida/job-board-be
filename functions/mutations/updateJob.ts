import mongoose from 'mongoose'
import ListingJob from '../../db/models/Listing.model'
import User from '../../db/models/User.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const cognitoSub = event?.identity?.sub
    if (!cognitoSub) throw new Error('userDoesNotExist')

    const profileRaw = await User.findOne({ cognitoSub, role: 'recruiter', status: 'active' }).select('-__v')
    if (!profileRaw) throw new Error('unableToFindRecruiter')

    const { id, title, description, location } = event?.arguments?.input

    const jobId = id?.trim() || ''
    if (jobId <= 0) throw new Error('jobIdIsRequired')

    const isValidJobId = mongoose.isValidObjectId(jobId)
    if (!isValidJobId) throw new Error('jobIdIsNotValid')

    const jobRaw = await ListingJob.findOne({ _id: jobId, status: { $ne: 'deleted' } })
    if (!jobRaw) throw new Error('jobNotFound')

    if (title.trim() <= 0) jobRaw['title'] = description
    if (description.trim() <= 0) jobRaw['description'] = description
    if (location.trim() <= 0) jobRaw['location'] = location

    jobRaw['updatedBy'] = profileRaw.email

    const updatedQuestion = await jobRaw.save()
    if (!updatedQuestion) throw new Error('failedTodUpdateQuestion')

    const response = updatedQuestion.toObject({ virtuals: true })

    return response
  } catch (error) {
    throw new Error(`$updateJob - Failed to , ${error}`)
  }
}
