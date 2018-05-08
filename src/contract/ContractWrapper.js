import web3 from '@/web3'
import { network } from '@/web3/config'

export default class ContractWrapper {
  constructor () {
    this.contract = null
    this.account = null
  }

  // TODO
  async initialize ({ abi, contractName }) {
    const accounts = await web3.eth.getAccounts()
    this.account = accounts[0]
    // Initialize Contract Object
    const networkId = await web3.eth.net.getId()
    const contractAddress = network[networkId][contractName]
    this.contract = new web3.eth.Contract(abi, contractAddress)
  }
}
