import ListingJob from '../../db/models/Listing.model'
import { handler } from '../../functions/queries/listJobs'

jest.mock('../../db/models/Listing.model')

describe('listJobs handler', () => {
  it('should return published jobs', async () => {
    const mockJobs = [
      { _id: '1', title: 'Job 1', status: 'active', toObject: jest.fn().mockReturnThis() },
      { _id: '2', title: 'Job 2', status: 'active', toObject: jest.fn().mockReturnThis() },
    ]

    jest.spyOn(ListingJob, 'find').mockResolvedValue(mockJobs as any)

    const result = await handler({}, {})

    expect(result).toEqual(mockJobs)
  })

  it('should return an empty array if no published jobs', async () => {
    const mockJobs: any[] = []

    jest.spyOn(ListingJob, 'find').mockResolvedValue(mockJobs as any)
    const result = await handler({}, {})

    expect(result).toEqual([])
  })

  it('should throw an error if an any error', async () => {
    const mockError = new Error('Failed Test')

    jest.spyOn(ListingJob, 'find').mockRejectedValue(mockError)

    await expect(handler({}, {})).rejects.toThrow('$listJobs - Failed to , Error: Failed Test')
  })
})
