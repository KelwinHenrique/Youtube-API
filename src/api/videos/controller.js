import { getVideosBySearch } from './use-cases'
import { success } from '../../core/services/response'

const processGetVideosBySearch = ({ querymen: { cursor, query } }, res, next) => (
  getVideosBySearch(cursor, query)
    .then(success(res))
    .catch(error => next(error))
)

const videosController = {
  processGetVideosBySearch
}

export { videosController }
