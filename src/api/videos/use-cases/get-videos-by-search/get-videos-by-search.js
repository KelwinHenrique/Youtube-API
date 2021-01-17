import { serializeError } from '../../../../core/services/serializers'

const getVideosBySearch = async (cursor, query) => {
  try {
    return { success: 'ok', cursor, query }
  } catch (error) {
    return Promise.reject(serializeError(error, 'Error to find videos.' ))
  }
}

export { getVideosBySearch }
