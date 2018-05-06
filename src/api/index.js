import web3 from '@/web3'
import * as config from '@/web3/config'
import { partialRight, compose } from 'ramda'
// import request from 'superagent'

// self hand make promisify
const promisify = (func) => new Promise((resolve, reject) => {
  func((err, data) => {
    if (data) {
      return resolve(data)
    }
    return reject(err)
  })
})

export const getMe = async () => {
  if (!window.web3) {
    throw Error('NO_METAMASK')
  }
  const accounts = await promisify(web3.eth.getAccounts)
  const address = accounts[0]
  var balance = await web3.eth.getBalance(address)
  const fromWeiToEther = partialRight(web3.utils.fromWei, ['ether'])
  // Functional Style!
  balance = compose(
    Number, // then transform to Number()
    fromWeiToEther // first transform to ether
  )(balance)
  return {address, balance}
}

export const getNetwork = async () => {
  // const getId = () =>
  const netId = await promisify(web3.eth.net.getId)
  return config.network[netId]
}
