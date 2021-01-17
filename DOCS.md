<a name="top"></a>
# Youtube API v0.1.0

Api Doc for Youtube API

 - [Videos](#Videos)
   - [Find videos by search](#Find-videos-by-search)

___


# <a name='Videos'></a> Videos

## <a name='Find-videos-by-search'></a> Find videos by search
[Back to top](#top)

```
GET /videos
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| search | `String` | <p>Text to search videos</p> |
| limit | `Number` | <p>Limit of videos to return</p> |
| daysOfWeek | `String` | <p>Time by days</p> |

### Parameters examples
`json` - Request-Example:

```json
localhost:3000/api/videos?search=dogs HAPPY&limit=8&daysOfWeek=15,120,30,150,20,40,90
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| videos | `Array` | <p>List of videos.</p> |
| videos.title | `String` | <p>Video's title.</p> |
| videos.url | `String` | <p>Video's url.</p> |
| videos.imageUrl | `String` | <p>Video's imageUrl.</p> |
| videos.author | `String` | <p>Video's author.</p> |
| videos.description | `String` | <p>Video's description.</p> |
| videos.duration | `String` | <p>Video's duration.</p> |
| videos.uploadedAt | `String` | <p>Video's uploadedAt.</p> |
| videos.views | `Number` | <p>Video's views.</p> |
| wordsMostUsed | `Array` | <p>LIst of words most used in title and description.</p> |
| totalDays | `Number` | <p>Total of days to watch all videos.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
{
  "totalDays": 6,
  "videos": [{
     "title": "Try Not To Laugh At This Ultimate Funny Dog Video Compilation | Funny Pet Videos",
     "url": "https://www.youtube.com/watch?v=AcL0MeVZIxM",
     "imageUrl": "https://i.ytimg.com/vi/AcL0MeVZIxM/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAvG_56OS8rrGfGtOjNtjNG2VZmPw",
     "description": "Brand new weekly theme compilation where we challenge you to Try Not To Laugh at these Funny Dogs. Funny Pet Videos brings ...",
     "views": 28539404,
     "duration": "20:20",
     "uploadedAt": "2 years ago"
  }],
 "wordsMostUsed": [
   "dogs",
   "dog",
   "to",
   "and",
   "funny",
}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
{
  "message": "Error to find videos with ytsr."
}
HTTP/1.1 400 Bad Request
{
  "message": "Error to find videos."
}
```
