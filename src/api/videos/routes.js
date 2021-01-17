import { Router } from 'express'
import { videosController } from './controller'
import { middleware as query } from 'querymen'

const videosRouter = new Router({ mergeParams: true })


/**
 * @api {get} /videos Find videos by search
 * @apiName GetVideosBySearch
 * @apiGroup Videos
 * @apiParam {String} search Text to search videos
 * @apiParam {Number} limit Limit of videos to return
 * @apiParam {String} daysOfWeek Time by days
 * @apiParamExample {json} Request-Example:
 * http://localhost:3000/api/videos?search=dogs%happy&limit=20&daysOfWeek=10%2C10%2C10%2C10%2C10%2C10%2C10
 * @apiSuccess {Array} videos List of videos.
 * @apiSuccess {String} videos.title Video's title.
 * @apiSuccess {String} videos.url Video's url.
 * @apiSuccess {String} videos.imageUrl Video's imageUrl.
 * @apiSuccess {String} videos.author Video's author.
 * @apiSuccess {String} videos.description Video's description.
 * @apiSuccess {String} videos.duration Video's duration.
 * @apiSuccess {String} videos.uploadedAt Video's uploadedAt.
 * @apiSuccess {Number} videos.views Video's views.
 * @apiSuccess {Array} wordsMostUsed LIst of words most used in title and description.
 * @apiSuccess {Number} totalDays Total of days to watch all videos.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "totalDays": 6,
 *       "videos": [{
 *          "title": "Try Not To Laugh At This Ultimate Funny Dog Video Compilation | Funny Pet Videos",
 *          "url": "https://www.youtube.com/watch?v=AcL0MeVZIxM",
 *          "imageUrl": "https://i.ytimg.com/vi/AcL0MeVZIxM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAvG_56OS8rrGfGtOjNtjNG2VZmPw",
 *          "description": "Brand new weekly theme compilation where we challenge you to Try Not To Laugh at these Funny Dogs. Funny Pet Videos brings ...",
 *          "views": 28539404,
 *          "duration": "20:20",
 *          "uploadedAt": "2 years ago"
 *       }],
 *      "wordsMostUsed": [
 *        "dogs",
 *        "dog",
 *        "to",
 *        "and",
 *        "funny",
 *      ]
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Error to find videos with ytsr."
 *     }
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Error to find videos."
 *     }
 */
videosRouter.get('/',
  query({
    search: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      max: 1000
    },
    daysOfWeek: {
      type: Array,
      required: true
    }
  }),
  videosController.processGetVideosBySearch
)

export { videosRouter }
