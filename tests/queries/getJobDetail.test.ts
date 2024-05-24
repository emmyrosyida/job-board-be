import ListingJob from '../../db/models/Listing.model'
import { handler } from '../../functions/queries/getJobDetail'

jest.mock('../../db/models/Listing.model')

describe('getJobDetail handler', () => {
  it('should return job details for a valid job ID', async () => {
    const event = { arguments: { input: { id: '66503a070688315f4d3be101' } } }

    const mockJob = {
      _id: '66503a070688315f4d3be101',
      title: 'Test Job',
      description: 'This is a test job',
      status: 'active',
      toObject: jest.fn().mockReturnThis(),
    }

    jest.spyOn(ListingJob, 'findOne').mockResolvedValue(mockJob as any)

    const result = await handler(event, null)

    expect(result).toEqual(mockJob.toObject({ virtuals: true }))
  })

  it('should throw an error for an invalid job ID', async () => {
    const event = { arguments: { input: { id: 'invalidJobId' } } }

    jest.spyOn(ListingJob, 'findOne').mockResolvedValue(null)

    await expect(handler(event, null)).rejects.toThrow('$getJobDetail - Failed to , Error: jobNotFound')
  })
})
