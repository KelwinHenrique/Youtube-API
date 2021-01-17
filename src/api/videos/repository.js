import ytsr from 'ytsr'

const getVideosByYtsr = (search, opt) => (
  ytsr(search, opt)
)

const videosRepository = {
  getVideosByYtsr
}

export {
  videosRepository
}
