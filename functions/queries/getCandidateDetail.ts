import User from '../../db/models/User.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const cognitoSub = event?.identity?.sub
    if (!cognitoSub) throw new Error('userDoesNotExist')

    const profileRaw = await User.findOne({ cognitoSub, role: 'candidate', status: 'active' }).select('-__v')
    if (!profileRaw) throw new Error('unableToFindProfile')

    const response = profileRaw.toObject({ virtuals: true })

    return response
  } catch (error) {
    throw new Error(`$getCandidateDetail - Failed to , ${error}`)
  }
}
