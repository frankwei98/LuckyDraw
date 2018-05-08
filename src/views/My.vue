<template lang="pug">
  #my
    .container
    h1| 用户中心
    #login(v-if="!account")
      Icon(type="close" style="font-size: 16rem; color: #ef2626e8")
      h1| 请使用 MetaMask 登录
      h3| 无法访问你的 Web3 接口，请登录后抽卡
    #info(v-else)
        Row(:gutter="20")
        Col(span="8" :xs="24" :md="8")
            AccountView
        Col(span="16" :xs="24" :md="16")
</template>

<script>
import { mapState } from 'vuex'
import { Icon, Row, Col } from 'iview'
import AccountView from '../components/Account'

export default {
  name: 'MyView',
  components: {
    AccountView,
    Icon,
    Row,
    Col
  },
  computed: {
    ...mapState(['account'])
  }
}
</script>
