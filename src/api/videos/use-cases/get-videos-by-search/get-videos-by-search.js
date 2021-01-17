import { serializeError } from '../../../../core/services/serializers'
import ytsr from 'ytsr'

const getAllWords = (videos) => {
  const words = []
  videos.map(video => {
    const { title, description } = video
    const wordsInTitle = title ? title.toLowerCase().match(/\w+/g) : []
    words.push(...wordsInTitle)
    const wordsInDescription = description ? description.toLowerCase().match(/\w+/g) : []
    words.push(...wordsInDescription)
  })
  return words
}

const findWordsMostUsed = (videos) => {
  const words = getAllWords(videos)
  const occurances = {};
  for (let word of words) {
    if (occurances[word]) {
      occurances[word]++;
    } else {
      occurances[word] = 1;
    }
  }
  return Object.entries(occurances)
    .sort(([, a], [, b]) => b - a)
    .map(word => word[0])
    .slice(0,5)
}

const serializeVideo = (video) => {
  const {
    title,
    url,
    bestThumbnail,
    author,
    description,
    views,
    duration,
    uploadedAt
  } = video

  return {
    title,
    url,
    imageUrl: bestThumbnail ? bestThumbnail.url : '',
    author: author ? author.name : '',
    description,
    views,
    duration,
    uploadedAt
  }
}

const serializeVideos = (videos) => (
  videos.map((video) => serializeVideo(video))
)

const getVideos = async (search, limit) => {
  try {
    const opt = {
      limit
    }
    const searchResults = await ytsr(search, opt)
    return searchResults.items
  } catch (error) {
    return Promise.reject({ messageError: 'Error to find videos with ytsr.' })
  }
}

const getVideosBySearch = async (cursor, query) => {
  try {
    const { search } = query
    const { limit } = cursor
    const searchResults = await getVideos(search, limit)
    const videos = serializeVideos(searchResults)
    const wordsMostUsed = findWordsMostUsed(videos)
    return {
      videos,
      wordsMostUsed
    }
  } catch (error) {
    console.log(error)
    return Promise.reject(serializeError(error, 'Error to find videos.'))
  }
}

export { getVideosBySearch }
