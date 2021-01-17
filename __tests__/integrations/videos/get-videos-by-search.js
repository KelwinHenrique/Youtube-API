import { server } from './../../../src/app'
const request = require('supertest')

describe('Integration test getVideosBySearch', () => {

  test('getVideosBySearch should return 200 when all is ok.', async () => {

    const query = {
      search: 'dogs HAPPY',
      limit: 5,
      daysOfWeek: '15,120,30,150,20,40,90'
    }
    const response = await request(server)
      .get('/api/videos')
      .query(query)

    expect(response.status).toBe(200)

  })

  test('getVideosBySearch should return 400 when don\'t send daysOfWeek.', async () => {

    const query = {
      search: 'dogs HAPPY',
      limit: 5
    }
    const response = await request(server)
      .get('/api/videos')
      .query(query)

    expect(response.status).toBe(400)

  })

  test('getVideosBySearch should return 400 when don\'t send search.', async () => {

    const query = {
      limit: 5,
      daysOfWeek: '15,120,30,150,20,40,90'
    }
    const response = await request(server)
      .get('/api/videos')
      .query(query)

    expect(response.status).toBe(400)

  })

  test('getVideosBySearch should return videos, wordsMostUsed and totalDays.', async () => {

    const query = {
      search: 'dogs HAPPY',
      limit: 5,
      daysOfWeek: '15,120,30,150,20,40,90'
    }
    const response = await request(server)
      .get('/api/videos')
      .query(query)

      expect(response.body.videos).not.toBeNull()
      expect(response.body.wordsMostUsed).not.toBeNull()
      expect(response.body.totalDays).not.toBeNull()

  })

  test('getVideosBySearch should return size equal 5', async () => {

    const query = {
      search: 'dogs HAPPY',
      limit: 5,
      daysOfWeek: '15,120,30,150,20,40,90'
    }
    const response = await request(server)
      .get('/api/videos')
      .query(query)

      expect(response.body.videos.length).toBe(5)

  })
})
