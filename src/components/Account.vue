<template lang="pug">
  #account
          h1| 我的账户
          Tooltip(placement="right")
            div(slot="content")
              p| 这是 Dravatar, 你的以太坊通用账户头像
              p| 你可以去 dravatar.xyz 修改你的头像
            Avatar(:src="getAvatar" shape="square" size="large")
          h3| 账户尾号 {{acct}}
          h3| 账户余额 {{getBalance}} ETH
          h3| 你有 {{userStatus.tokensQty}} 次抽奖机会
          h4| 是不是管理员: {{userStatus.isAdmin}}
          slot
</template>

<script>
import { mapState } from 'vuex'
import { Tooltip, Avatar } from 'iview'
import Dravatar from 'dravatar'
import LuckyPackageContract from '@/contract/LuckyPackageContract'

export default {
  components: {
    Tooltip,
    Avatar
  },
  asyncComputed: {
    async getAvatar () {
      const uri = await Dravatar(this.address)
      return uri
    }
  },
  data () {
    return {
      contract: null,
      userStatus: {}
    }
  },
  async created () {
    this.contract = new LuckyPackageContract()
    await this.contract.initialize()
    this.userStatus = await this.getUserStatus()
  },
  methods: {
    async getUserStatus () {
      const contract = this.contract
      const isAdmin = await contract.isContractAdmin(this.address)
      const tokensQty = await contract.getLuckTokensOfLength(this.address)
      const newObj = {isAdmin, tokensQty}
      console.log(newObj)
      return newObj
    }
  },
  computed: {
    ...mapState(['account']),
    address () {
      return this.account ? this.account.address : ''
    },
    acct () {
      return this.account ? this.address.slice(-6) : ''
    },
    getBalance () {
      const toFix2 = num => num.toFixed(2)
      const balance = this.account.balance
      return balance !== undefined ? toFix2(balance) : 0
    }
  }
}
</script>

<style scoped>
.ivu-avatar {
  width: 100%;
  height: 100%;
}
</style>
