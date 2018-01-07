import _ from 'lodash'

function getValue(object, key) {
  if(_.hasIn(object, key)) {
    return _.get(object, key)
  }
  return null
}

function normalizeLook(looks) {
  return {
    id: getValue(looks, 'id'),
    src: getValue(looks, 'lookUrl'),
    width: 320,
    height: 320,
    sizes: ['(min-width: 480px) 50vw', '(min-width: 1024px) 33.3vw', '100vw']
  }
}

export function normalizeLooks(data) {
  if(!_.isArray(data)) {
    return []
  }
  var collection = []
  _.forEach(data, function(looks) {
    collection.push(normalizeLook(looks))
  });
  return collection
}
