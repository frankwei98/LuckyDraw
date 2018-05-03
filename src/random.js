import request from 'superagent'

const RandomAPI = 'https://api.random.org/json-rpc/1/invoke'

export const getRandomInteger = async (min, max) => {
  const requestBody = {
    'jsonrpc': '2.0',
    'method': 'generateIntegers',
    'params': {
      'apiKey': '51a4c0ba-55fd-4e70-aac2-be4af1c467b3',
      'n': 1,
      min,
      max,
      'replacement': true
    },
    'id': 42
  }
  const response = await request.post(RandomAPI)
    .set({ 'Content-Type': 'application/json' })
    .send(requestBody)
  return response.body.result.random.data[0]
}
