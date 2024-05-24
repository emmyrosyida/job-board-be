import mongoose from 'mongoose'
import ListingJob from '../../db/models/Listing.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const { id } = event?.arguments?.input

    const jobId = id?.trim() || ''
    if (jobId <= 0) throw new Error('jobIdIsRequired')

    const isValidJobId = mongoose.isValidObjectId(jobId)
    if (!isValidJobId) throw new Error('jobIdIsNotValid')

    const jobRaw = await ListingJob.findOne({ _id: jobId, status: { $ne: 'deleted' } })
    if (!jobRaw) throw new Error('jobNotFound')

    const response = jobRaw.toObject({ virtuals: true })

    return response
  } catch (error) {
    throw new Error(`$getJobDetail - Failed to , ${error}`)
  }
}
