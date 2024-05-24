import ListingJob from '../../db/models/Listing.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const jobsRaw = await ListingJob.find({ status: 'active' })
    if (jobsRaw.length <= 0) return []

    const jobs = jobsRaw.map(job => job.toObject({ virtuals: true }))

    const response = jobs

    return response
  } catch (error) {
    throw new Error(`$listJobs - Failed to , ${error}`)
  }
}
