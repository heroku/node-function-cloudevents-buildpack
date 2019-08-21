const v03 = require('cloudevents-sdk/v03')
const unmarshaller = new v03.HTTPUnmarshaller();

module.exports = async function (payload) {
  if (payload && payload.specversion) {
    delete payload.subject // https://github.com/cloudevents/sdk-javascript/issues/32 :(
    // TODO: get headers from the middleware when they are available
    const cloudevent = await unmarshaller.unmarshall(payload, {'content-type': 'application/cloudevents+json'})
    let data = cloudevent.getData()
    // TODO: remove once SDK follows spec on translating JSON from string value. -> 3.1. Special Handling of "data"
    if (typeof (data) === 'string' && cloudevent.getContenttype().indexOf('application/json') > -1) {
      data = JSON.parse(data)
    }
    return data
  }
  return payload;
}
