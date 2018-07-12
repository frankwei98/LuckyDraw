<template lang="pug">
  Card
    h1.title| Qbao AirDropper
    p.subtitle| 一个服务于区块链游戏创作者和游戏爱好者的平台。
    .btns
      Button(type="primary" size="large" circle @click="jumpTo('Draw')")| 现在抽卡
      Button(type="ghost" size="large" circle @click="jumpTo('Contact')" )| 空投合作联系
</template>

<script>
import { Button, Card } from 'iview'
export default {
  name: 'Home',
  components: {
    Button,
    Card
  },
  created () {
    console.log(this.$router)
  },
  methods: {
    jumpTo (name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style scoped>
/* #home * {
  margin: 2.5px
} */
.title {
  font-size: 68px;
}
.subtitle {
  font-size: 24px;
}
.btns button {
  margin: 0 10px;
}
</style>
