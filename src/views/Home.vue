<template lang="pug">
  #home
    h1| 欢迎来到抽卡处
    h4| 我们提供游戏抽卡、卡牌空投服务
    router-link(:to="{name: 'Draw'}")|
        Button(type="primary")| 现在抽卡
    router-link(:to="{name: 'Contact'}")|
        Button(type="primary")| 空投合作联系
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
