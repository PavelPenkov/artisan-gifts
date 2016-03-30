const changeBackground = (id, url) => {
  return {
    type: 'CHANGE_BACKGROUND',
    id: id,
    url: url
  }
}

const deleteParam = (id) => {
  return {
    type: 'PARAM_DELETE',
    id: id
  }
}

const transformFrame = (id, property, value) => {
  return {
    type: 'FRAME_TRANSFORM',
    id: id,
    property: property,
    value: value
  }
}

const changeFrameType = (id, newType) => {
  return {
    type: 'FRAME_CHANGE_TYPE',
    id: id,
    newType: newType
  }
}

const fetchPreview = () => {
  return {
    type: 'FETCH_PREVIEW'
  }
}

const showPreview = (url) => {
  return {
    type: 'SHOW_PREVIEW',
    url: url
  }
}


export { changeBackground, deleteParam, transformFrame, fetchPreview, changeFrameType }
