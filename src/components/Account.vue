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
          h3| 你有 {{getChances}} 次抽奖机会
          h4| 幸运币库存: {{getTotalSupply}}
          h4| 是不是管理员: {{isContractAdmin}}
          slot
</template>

<script>
import { mapState } from 'vuex'
import { Tooltip, Avatar } from 'iview'
import Dravatar from 'dravatar'
import { getLuckTokensOfLength, getTokenTotalSupply, isContractAdmin } from '@/contract/luckyPackage'

export default {
  components: {
    Tooltip,
    Avatar
  },
  asyncComputed: {
    async getAvatar () {
      const uri = await Dravatar(this.account.address)
      return uri
    },
    async getChances () {
      const result = await getLuckTokensOfLength(this.account.address)
      return result
    },
    async getTotalSupply () {
      const result = await getTokenTotalSupply()
      return result
    },
    async isContractAdmin () {
      const result = await isContractAdmin(this.account.address)
      return result
    }
  },
  computed: {
    ...mapState(['account']),
    acct () {
      return this.account ? this.account.address.slice(-6) : ''
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
