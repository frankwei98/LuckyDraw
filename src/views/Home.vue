<template lang="pug">
  #home
    h1| 欢迎来到 Qbao 卡牌空投
    h2| 我们提供游戏抽卡、卡牌空投服务
    router-link(:to="{name: 'Draw'}")|
        Button(type="primary" size="large")| 现在抽卡
    router-link(:to="{name: 'Contact'}")|
        Button(type="primary" size="large")| 空投合作联系
</template>

<script>
import { Button } from 'iview'
export default {
  name: 'Home',
  components: {
    Button
  },
  created () {
    console.log(this.$router)
  }
}
</script>

<style scoped>
#home * {
  margin: 2.5px
}
</style>
