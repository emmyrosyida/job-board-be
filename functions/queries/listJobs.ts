export const handler = async (event: any, context: any): Promise<any> => {
  try {
    return ''
  } catch (error) {
    throw new Error(`$listJobs - Failed to , ${error}`)
  }
}
