import web3 from '@/web3'
// import request from 'superagent'

export const getMyAddr = async () => {
  if (!window.web3) {
    throw Error('NO_METAMASK')
  }
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      const address = accounts[0]
      if (address) {
        return resolve(address)
      }
      return reject(err)
    })
  })
}
