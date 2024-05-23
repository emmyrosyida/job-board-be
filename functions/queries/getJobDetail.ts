export const handler = async (event: any, context: any): Promise<any> => {
  try {
    return ''
  } catch (error) {
    throw new Error(`$getJobDetail - Failed to , ${error}`)
  }
}
