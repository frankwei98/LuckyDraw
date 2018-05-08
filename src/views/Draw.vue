<template lang="pug">
  .container
    #login(v-if="!account")
      Icon(type="close" style="font-size: 16rem; color: #ef2626e8")
      h1| 请使用 MetaMask 登录
      h3| 无法访问你的 Web3 接口，请登录后抽卡
    #draw(v-if="account")
    Row(:gutter="20")
        //- h1.title| 幸运回旋
        Col(span="8" :xs="24" :md="8")
            AccountView
              Button(type="primary" size="large"
              icon="ios-pulse-strong" @click="draw" long)| 搏一搏!
              router-link(to="/my")
                Button(type="primary" size="large"
                icon="ios-pulse-strong" long)| 我的奖品
              Button(type="primary" size="large"
              icon="eye" @click="draw" long disabled)| 奖池明细
        Col(span="16" :xs="24" :md="16")
            h1| 幸运回旋
            Spin(v-if="pricesRow.length === 0" size="large" fix)
            Row
            Col(:xs="12" :sm="8" :md="8" :lg="6" style="min-height: 100px"
            v-for="element in pricesRow" :key="element.name" :class="isSelect(element)")
                img(:src="element.img" style="width: 128px")
                p| {{element.name}}

</template>

<script>
import { mapState } from 'vuex'
import AccountView from '../components/Account'
import { Button, Row, Col, Modal, Avatar, Tooltip, Spin, Icon } from 'iview'
import request from 'superagent'
import Dravatar from 'dravatar'
import { map } from 'ramda'
import LuckyPackageContract from '@/contract/LuckyPackage'
export default {
  name: 'HelloWorld',
  components: {
    Button,
    Tooltip,
    AccountView,
    Spin,
    Icon,
    Avatar,
    Row,
    Col
  },
  asyncComputed: {
    async getAvatar () {
      const uri = await Dravatar(this.account.address)
      return uri
    }
  },
  computed: {
    ...mapState(['account']),
    acct () {
      const address = this.account.address
      return address !== undefined ? address.slice(-6) : ''
    },
    getBalance () {
      const toFix2 = (num) => num.toFixed(2)
      const balance = this.account.balance
      return balance !== undefined ? toFix2(balance) : 0
    }
  },
  data () {
    return {
      pricesRow: [],
      contract: null
    }
  },
  async created () {
    this.contract = await this.initContract()
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
      return map(prize => ({ ...prize, isSelected: false }), data)
      // return data.map(prize => ({ ...prize, isSelected: false }))
    },
    changeColState (data) {
      return col => {
        let curData = data.map(element =>
          Object.assign(element, { isSelected: false })
        )
        curData[col] = Object.assign(curData[col], {
          isSelected: true
        })
        return curData
      }
    },
    async initContract () {
      const contract = new LuckyPackageContract()
      await contract.initialize()
      return contract
    },
    async draw () {
      const contract = this.contract
      try {
        const rollTxResult = await contract.rollDice(1, this.account.address)
        console.log(rollTxResult)
        console.log(JSON.stringify(rollTxResult))
        await this.startToRoll(rollTxResult)
      } catch (error) {
        alert('Rolldice Transaction have been rejected')
      }
    },
    async startToRoll ({prizeId, prizeIssuer}) {
      // 使用Promise完成模拟同步 Timeout
      const sleep = (ms) => new Promise((resolve, reject) => {
        setTimeout(() => { resolve(ms) }, ms)
      })
      const winningPrompt = (number, prizeIssuer) => {
        changeColState(number)
        const content = `你抽到了 ${prizeIssuer} 发出的 ${number + 1} 号奖品`
        Modal.success({
          title: '抽奖成功',
          content
        })
      }
      const data = [...this.pricesRow]
      // changeColState 获得的是一个 function
      const changeColState = this.changeColState(data)
      let number = 0
      const iteration = () => {
        if (number >= data.length - 1) {
          number = 0
        } else {
          number += 1
        }
        changeColState(number)
      }
      const intervalId = setInterval(iteration, 100)
      const num = Number(prizeId)
      clearInterval(intervalId)
      // 开始放慢速度
      for (let i = 1; i <= 3; i++) {
        let delayPerItem = i * 1250 / data.length
        console.log(delayPerItem)
        for (let i = 0; i < data.length; i++) {
          iteration()
          await sleep(delayPerItem)
        }
      }
      // 慢慢迭代到奖品格
      while (true) {
        if (number === num) {
          changeColState(num)
          break
        } else {
          iteration()
          changeColState(number)
          await sleep(650)
        }
      }
      // number = num
      winningPrompt(num, prizeIssuer)
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
  opacity: 0.8;
}
.ivu-col {
  float: none;
  display: inline-block;
}
button {
      margin: 5px;
    min-height: 40px;
}
</style>
