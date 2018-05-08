import web3 from '@/web3'
import abi from './abi/LuckyMoney.json'
import Contract from './ContractWrapper'

export default class LuckyMoney extends Contract {
  async initialize () {
    const contractName = 'ERC20Package'
    await super.initialize({ abi, contractName })
  }

  // TODO: Functions
  async getTokenTotalSupply () {
    const size = await this.contract.methods.totalSupply().call()
    return Number(size)
  }
}
