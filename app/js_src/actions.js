const changeBackground = (id, url) => {
  return {
    type: 'CHANGE_BACKGROUND',
    id: id,
    url: url
  }
}

export { changeBackground }
