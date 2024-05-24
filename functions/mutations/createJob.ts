import ListingJob from '../../db/models/Listing.model'
import User from '../../db/models/User.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const cognitoSub = event?.identity?.sub
    if (!cognitoSub) throw new Error('userDoesNotExist')

    const profileRaw = await User.findOne({ cognitoSub, role: 'recruiter', status: 'active' }).select('-__v')
    if (!profileRaw) throw new Error('unableToFindRecruiter')

    const { title, description, location } = event?.arguments?.input

    if (title.trim().length <= 0) throw new Error('titleIsRequired')
    if (location.trim().length <= 0) throw new Error('locationIsRequired')

    const createdListingJob = await ListingJob.create({
      title,
      location,
      description,
      updatedBy: profileRaw.email,
      createdBy: profileRaw.email,
    })
    if (!createdListingJob) throw new Error('failedToCreateListingJob')

    const response = createdListingJob.toObject({ virtuals: true })

    return response
  } catch (error) {
    throw new Error(`$createJob - Failed to , ${error}`)
  }
}
