import uuid from 'node-uuid'

export const changeBackground = (id, url) => {
  return {
    type: 'CHANGE_BACKGROUND',
    id: id,
    url: url
  }
}

export const deleteParam = (id) => {
  return {
    type: 'PARAM_DELETE',
    id: id
  }
}

export const transformFrame = (id, property, value) => {
  return {
    type: 'FRAME_TRANSFORM',
    id: id,
    property: property,
    value: value
  }
}

export const changeFrameType = (id, newType) => {
  return {
    type: 'FRAME_CHANGE_TYPE',
    id: id,
    newType: newType
  }
}

export const fetchPreview = () => {
  return {
    type: 'FETCH_PREVIEW'
  }
}

export const showPreview = (url) => {
  return {
    type: 'SHOW_PREVIEW',
    url: url
  }
}

let nextFrameSuffix = 0

export const createFrame = () => {
  let suffix = nextFrameSuffix++
  let frame = {
    id: uuid.v1(),
    name: `Блок_${suffix}`,
    type: 'text',
    top: 0,
    left: 0,
    width: 300,
    height: 200,
    param: `Поле_${suffix}`,
    font: 'fixed',
    color: '#FFFFFF'
  }

  return {
    type: 'ADD_FRAME',
    frame: frame
  }
}


