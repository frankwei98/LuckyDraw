<template lang="pug">
header
    Menu(mode="horizontal" theme="dark" active-name="Home")
        .layout-logo
        .layout-nav(style="width: 520px;")
            router-link(v-for="menu in menuItem" :key="menu.name" :to="{path: menu.to}")
                MenuItem(:name="menu.name")
                    Icon(:type="menu.icon")
                    span|{{menu.name}}
            MenuItem(name="Network")
                    Icon(type="wifi")
                    span|{{getNetwork.name}}
            MenuItem(name="Balance")
                    p|余额: {{getBalance}} ETH
</template>

<script>
import { mapState } from 'vuex'
import { Header, Menu, MenuItem, Icon } from 'iview'
import { getNetwork } from '@/api'

export default {
  name: 'Header',
  components: { 'header': Header, Menu, MenuItem, Icon },
  async created () {
  },
  asyncComputed: {
    async getNetwork () {
      const net = await getNetwork()
      return net
    }
  },
  computed: {
    ...mapState(['account']),
    getBalance () {
      const toFix2 = (num) => num.toFixed(2)
      const balance = this.account.balance
      return balance !== undefined ? toFix2(balance) : 0
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
        }
      ]
    }
  }
}
</script>
