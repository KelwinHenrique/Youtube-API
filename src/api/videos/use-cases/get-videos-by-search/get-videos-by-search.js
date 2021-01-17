import { serializeError } from '../../../../core/services/serializers'
import ytsr from 'ytsr'

const getTimeInSecondsAllVideos = (videos) => (
  videos.map(video => {
    const time = video.duration ? video.duration.split(':') : ['0']
    if (time.length === 3) {
      const hour = time[0]
      const minutes = time[1]
      const seconds = time[2]
      return parseInt(hour) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds)
    } else if (time.length === 2) {
      const minutes = time[0]
      const seconds = time[1]
      return parseInt(minutes) * 60 + parseInt(seconds)
    } else {
      const seconds = time[0]
      return parseInt(seconds)
    }

  })
)

const calculateDaysToWatchAllVideos = (videos, timeByDayInSeconds) => {
  const timeInSecondsAllVideos = getTimeInSecondsAllVideos(videos)
  let totalOfDays = 0, attempts = 0
  while (timeInSecondsAllVideos.length > 0) {
    for (let timeByDay of timeByDayInSeconds) {
      totalOfDays = totalOfDays + 1
      let restTime = timeByDay
      for (let videoTime of timeInSecondsAllVideos) {
        if (videoTime <= restTime) {
          attempts = 0
          restTime = restTime - videoTime
          timeInSecondsAllVideos.shift()
        } else {
          attempts = attempts + 1
          continue
        }
      }
      if (timeInSecondsAllVideos.length <= 0) {
        return totalOfDays
      }
    }
    if (attempts >= 7) {
      return -1
    }
  }
  return totalOfDays;
}

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

const transformInSeconds = (daysOfWeek) => {
  return (daysOfWeek.split(',')).map(dayTime => parseInt(dayTime) * 60)
}

const getVideosBySearch = async (cursor, query) => {
  try {
    const { search, daysOfWeek } = query
    const timeByDayInSeconds = transformInSeconds(daysOfWeek)
    const { limit } = cursor
    const searchResults = await getVideos(search, limit)
    const videos = serializeVideos(searchResults)
    const wordsMostUsed = findWordsMostUsed(videos)
    const daysToWatchAllVideos = calculateDaysToWatchAllVideos(videos, timeByDayInSeconds)
    return {
      videos,
      wordsMostUsed,
      totalDays: daysToWatchAllVideos
    }
  } catch (error) {
    return Promise.reject(serializeError(error, 'Error to find videos.'))
  }
}

export { getVideosBySearch }
