import _ from 'lodash'

function getValue(object, key) {
  if(_.hasIn(object, key)) {
    return _.get(object, key)
  }
  return null
}

function normalizeMediaImages(media) {
  return {
    id: getValue(media, 'id'),
    src: getValue(media, 'images.standard_resolution.url'),
    width: getValue(media, 'images.standard_resolution.width'),
    height: getValue(media, 'images.standard_resolution.height'),
    sizes: ['(min-width: 480px) 50vw', '(min-width: 1024px) 33.3vw', '100vw']
  }
}

export function normalizeMedias(data) {
  if(!_.isArray(data)) {
    return []
  }
  var collection = []
  _.forEach(data, function(media) {
    collection.push(normalizeMediaImages(media))
  });
  return collection
}

function normalizeLook(media) {
  return {
    id: getValue(media, 'id'),
    lookUrl: getValue(media, 'images.standard_resolution.url'),
    profileUrl: getValue(media, 'user.profile_picture'),
    profileName: getValue(media, 'user.username'),
    description: getValue(media, 'caption.text')
  }
}

export function normalizeLooks(data) {
  if(!_.isArray(data)) {
    return []
  }
  var collection = []
  _.forEach(data, function(media) {
    collection.push(normalizeLook(media))
  });
  return collection
}
