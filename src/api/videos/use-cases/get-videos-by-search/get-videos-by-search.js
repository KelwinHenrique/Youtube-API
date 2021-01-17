const getVideosBySearch = async (cursor, query) => {
  return { success: 'ok', cursor, query }
}

export { getVideosBySearch }
