<template>
  <div class="layout">
      <Layout>
          <Header/>
            <Content :style="{padding: '0 50px', marginTop: '30px'}">
              <Card>
              <router-view/>
              </Card>
            </Content>
        </Layout>
        <Footer> Qbao AirDropper </Footer>
  </div>
</template>

<script>
import { Footer, Layout, Content, Card } from 'iview'
import Header from './components/Header'
import 'iview/dist/styles/iview.css'
export default {
  name: 'App',
  components: {
    Card,
    Header,
    Footer,
    Layout,
    Content
  },
  created () {
    this.$store.dispatch('fetchAccount')
  }
}
</script>

<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
