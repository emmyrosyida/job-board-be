import User from '../../db/models/User.model'

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    const cognitoSub = event?.identity?.sub
    if (!cognitoSub) throw new Error('userDoesNotExist')

    const profileRaw = await User.findOne({ cognitoSub, role: 'recruiter' }).select('-__v')
    if (!profileRaw) throw new Error('unableToFindProfile')

    return ''
  } catch (error) {
    throw new Error(`$createJob - Failed to , ${error}`)
  }
}
