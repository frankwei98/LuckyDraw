import web3 from '@/web3'
import Contract from './ContractWrapper'
import abi from './abi/LuckyPackage.json'

export default class LuckyPackageContract extends Contract {
  constructor () {
    super(web3)
  }

  async initialize () {
    const contractName = 'contract'
    await super.initialize({ abi, contractName })
  }

  async isApproved (id) {
    const t = await this.contract.methods.approvedFor(id)
    if (t !== '0x0000000000000000000000000000000000000000') {
      return true
    }
    return false
  }

  async isContractAdmin (address) {
    const t = await this.contract.methods.isAdmin(address).call()
    console.log(t)
    return t
  }

  async getLuckyToken (id) {
    const item = {}
    item.id = Number(id)
    item.owner = (await this.contract.methods.allOf(id))
    item.approved = await this.isApproved(id)
    return item
  }

  // 获取某人所拥有的LuckyToken
  async getLuckTokensOf (address) {
    const ids = await this.contract.methods.tokensOf(address)
    const luckyTokens = await Promise.all(ids.map(id => this.getLuckyToken(id)))
    return luckyTokens
  }
  // 获取某人所拥有的LuckyToken张数
  async getLuckTokensOfLength (address) {
    const ids = await LuckyPackageContract
      .methods.tokensOf(address).call()
    console.log(ids)
    return ids.length
  }

  async rollDice (luckyTokenId) {
    var receipt
    try {
      receipt = await this.contract.methods.rollDice(luckyTokenId).send({ from: this.account })
      const prizeId = receipt.events.Transfer[1].returnValues._tokenId
      const prizeIssuer = receipt.events.Transfer[1].address
      return { prizeId, prizeIssuer }
    } catch (error) {
      throw Promise.reject(new Error(error))
    }
  }

  getItem (id) {
    let name = `Card No.${id}`
    return { id, name }
  }

  async getPackage () {
    const [ids, ratios] = await this.contract.methods.getAllPackage()
    // ids = [1, 2, 3];
    // ratios = [1.1, 2.2, 3.3];
    const items = await Promise.all(ids.map(id => this.getItem(id)))
    const sigmaRatio = ratios.reduce((acc, cur) => acc + parseInt(cur, 10), 0)
    return items.map((element, index) => ({ ...element, ratio: ratios[index] }))
      .map(element => ({ ...element, sigmaRatio }))
  }

  async getPackageSize () {
    const size = await this.contract.methods.getAllPackage().call()
    return Number(size[0].length)
  }

  async getTokenTotalSupply () {
    const size = await LuckyPackageContract
      .methods.totalSupply().call()
    return Number(size)
  }

  async transfer ({ to, tokenId }) {
    if (!web3.isAddress(to.toLowerCase())) {
      await this.contract.methods.transfer(to, tokenId)
    } else {
      alert('请输入正确的赠送地址!')
    }
  }
}
