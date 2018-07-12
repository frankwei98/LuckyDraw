<template lang="pug">
header
    Menu(mode="horizontal" theme="light" active-name="Home" on-select="jumpTo")
            .layout-logo
            router-link(:to="menu.to"  v-for="menu in menuItem"
            :key="menu.name")
              MenuItem(:name="menu.name")
                      Icon(:type="menu.icon")
                      span|{{menu.name}}
            #logined(v-if="account.address")
              .dock-to-right(name="Network" v-if="getNetwork")
                    EtherIcon
                    span|{{getNetwork.name}}
              .dock-to-right(name="Balance")
                    Avatar(:src="getAvatar")
                    span| {{getBalance}} ETH
            #not-login(v-else)
              .dock-to-right| 请解锁 MetaMask
</template>

<script>
import EtherIcon from './EtherIcon'
import { mapState } from 'vuex'
import { Header, Menu, MenuItem, Icon, Avatar } from 'iview'
import { getNetwork } from '@/api'
import dravatar from 'dravatar'

export default {
  name: 'Header',
  components: { Header, EtherIcon, Menu, MenuItem, Icon, Avatar },
  async created () {},
  asyncComputed: {
    async getNetwork () {
      const net = await getNetwork()
      return net
    },
    async getAvatar () {
      const uri = await dravatar(this.account.address)
      return uri
    }
  },
  computed: {
    ...mapState(['account']),
    getBalance () {
      const toFix2 = num => num.toFixed(2)
      const balance = this.account.balance
      return balance !== undefined ? toFix2(balance) : 0
    }
  },
  methods: {
    jumpTo (path) {
      console.log(path)
      this.$router.push({ path })
    }
  },
  data () {
    return {
      menuItem: [
        {
          icon: 'home',
          name: '首页',
          to: '/'
        },
        {
          icon: 'ios-box',
          name: '抽卡',
          to: '/draw'
        },
        {
          icon: 'user',
          name: '我的',
          to: '/my'
        }
      ]
    }
  }
}
</script>

<style scoped>
.ivu-menu div {
  margin: 0 20px;
}
.dock-to-right {
  margin: 0 10px;
  float: right;
}
</style>
