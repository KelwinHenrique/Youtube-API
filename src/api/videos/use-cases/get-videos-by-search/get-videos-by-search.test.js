import { getVideosBySearch } from './get-videos-by-search'
import { videosRepository } from '../../repository'

const objectExpectedInReturn = () => (
  {
    videos: [
      {
        title: 'Super Happy Dogs | Funny Dog Video Compilation 2017',
        url: 'https://www.youtube.com/watch?v=wl4m1Rqmq-Y',
        imageUrl: 'https://i.ytimg.com/vi/wl4m1Rqmq-Y/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBbfufH0MhXnIBzLZgvypIU_Hi70A',
        author: 'The Pet Collective',
        description: 'From dogs jumping on trampolines, dogs jumping on other dogs, to dogs jumping into the water to fetch, these are just a few of the ...',
        views: 987015,
        duration: '4:19',
        uploadedAt: '3 years ago'
      }
    ],
    wordsMostUsed: [
      'dogs',
      'jumping',
      'on',
      'to',
      'the'
    ],
    totalDays: 1
  }
)

const cursor = {
  limit: 10
}

const query = {
  search: 'Dogs Happy',
  daysOfWeek: '15,120,30,150,20,40,90'
}


describe('Unit Test getVideosBySearch', () => {

  beforeEach(async () => {

    videosRepository.getVideosByYtsr = jest.fn(() => (
      {
        items: [
          {
            title: 'Super Happy Dogs | Funny Dog Video Compilation 2017',
            url: 'https://www.youtube.com/watch?v=wl4m1Rqmq-Y',
            bestThumbnail: { url: 'https://i.ytimg.com/vi/wl4m1Rqmq-Y/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBbfufH0MhXnIBzLZgvypIU_Hi70A' },
            author: { name: 'The Pet Collective' },
            description: 'From dogs jumping on trampolines, dogs jumping on other dogs, to dogs jumping into the water to fetch, these are just a few of the ...',
            views: 987015,
            duration: '4:19',
            uploadedAt: '3 years ago'
          }
        ]
      }
    ))
  })

  test('unit test get-videos-by-search should return 5 words', async () => {
    const responseGetVideos = await getVideosBySearch(cursor, query)
    expect(responseGetVideos.wordsMostUsed.length).toEqual(5)
  })

  test('unit test get-videos-by-search should return expected object contract', async () => {
    const responseGetVideos = await getVideosBySearch(cursor, query)

    expect(responseGetVideos).toEqual(objectExpectedInReturn())
  })

  test('unit test get-videos-by-search should return error when anything wrong happens with getVideosByYtsr', async () => {

    const expectAssertValue = 1
    videosRepository.getVideosByYtsr = jest.fn(() => {
      throw new TypeError()
    })

    expect.assertions(expectAssertValue)

    return getVideosBySearch(cursor, query).catch(err =>
      expect(err.error.message).toEqual('Error to find videos with ytsr.')
    )
  })

  test('unit test get-videos-by-search should return error when dont send query', async () => {
    const expectAssertValue = 1
    expect.assertions(expectAssertValue)

    return getVideosBySearch(cursor).catch(err =>
      expect(err.error.message).toEqual('Error to find videos.')
    )
  })

  test('unit test get-videos-by-search should return empty iamge url and author name', async () => {

    videosRepository.getVideosByYtsr = jest.fn(() => (
      {
        items: [
          {
            title: 'Super Happy Dogs | Funny Dog Video Compilation 2017',
            url: 'https://www.youtube.com/watch?v=wl4m1Rqmq-Y',
            description: 'From dogs jumping on trampolines, dogs jumping on other dogs, to dogs jumping into the water to fetch, these are just a few of the ...',
            views: 987015,
            duration: '4:4:19',
            uploadedAt: '3 years ago'
          }
        ]
      }
    ))

    const responseGetVideos = await getVideosBySearch(cursor, query)
    expect(responseGetVideos.videos[0].imageUrl).toEqual('')
    expect(responseGetVideos.videos[0].author).toEqual('')
    expect(responseGetVideos.totalDays).toEqual(-1)
  })
})
