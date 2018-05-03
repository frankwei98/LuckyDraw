<template lang="pug">
  .container
    h1.title| 抽奖 Demo
    Col(span="16")
        Row
        Col(span="8" style="min-height: 100px" v-for="element in pricesRow" :key="element.name" :class="isSelect(element)")
            img(:src="element.img" style="width: 128px")
            p| {{element.name}}
    Col(span="8")
        Button(type="primary" size="large" icon="ios-pulse-strong" @click="draw")| 搏一搏!
</template>

<script>
import { Button, Row, Col, Modal } from 'iview'
import request from 'superagent'
import { getRandomInteger } from '../random'
export default {
  name: 'HelloWorld',
  components: {
    Button,
    Row,
    Col
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pricesRow: [
        // { name: '1' },
        // { name: '2' },
        // { name: '3' },
        // { name: '4' },
        // { name: '5' },
        // { name: '6' },
        // { name: '7' },
        // { name: '8' },
        // { name: '9' }
      ]
    }
  },
  async created () {
    this.pricesRow = await this.fetchPrizes()
  },
  methods: {
    isSelect (element) {
      return element.isSelected ? 'selected' : ''
    },
    async fetchPrizes () {
      const api =
        'https://easy-mock.com/mock/5aea9745f0c3f57c582874b8/prizesmock/getPrizesList'
      const res = await request.get(api)
      const data = res.body.data
      return data.map(prize => ({ ...prize, isSelected: false }))
    },
    async draw () {
      const data = [...this.pricesRow] //
      const changeColState = col => {
        let curData = data.map(element =>
          Object.assign(element, { isSelected: false })
        )
        curData[col] = Object.assign(curData[randomNumber], {
          isSelected: true
        })
        return curData
      }
      let randomNumber = 0
      const randomFn = this.getRandomizer(0, 8)
      const randomIteration = () => {
        randomNumber = randomFn()
        this.pricesRow = changeColState(randomNumber)
      }
      var intervalId = setInterval(randomIteration, 200)
      const num = await getRandomInteger(0, 8)
      setTimeout(() => {
        clearInterval(intervalId)
        randomNumber = num
        changeColState(randomNumber)
        const content = `你抽到了 ${randomNumber + 1} 号奖品`
        Modal.success({
          title: '抽奖成功',
          content
        })
      }, 3000)
    },
    getRandomizer (bottom, top) {
      return function () {
        return Math.floor(Math.random() * (1 + top - bottom)) + bottom
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: center;
}
.selected {
  background: #ffec3d;
}
</style>
