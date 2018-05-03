<template lang="pug">
header
    Menu(mode="horizontal" theme="dark" active-name="Home")
        .layout-logo
        .layout-nav
            router-link(v-for="menu in menuItem" :key="menu.name" :to="{path: menu.to}")
                MenuItem(:name="menu.name")
                    Icon(:type="menu.icon")
                    span|{{menu.name}}
</template>

<script>
import { Header, Menu, MenuItem, Icon } from 'iview'

export default {
  name: 'Header',
  components: { 'header': Header, Menu, MenuItem, Icon },
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
