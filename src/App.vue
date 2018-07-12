<template>
  <div class="layout">
      <Layout>
          <Header/>
            <Content :style="{padding: '0 50px', marginTop: '30px'}">
              <!-- <Card> -->
              <router-view/>
              <!-- </Card> -->
            </Content>
        </Layout>
        <Footer>
          <div class="community">
            <div class="info">
              <h1>加入我们的社群</h1>
              <h3 style="font-weight: 400;">以获取更多消息</h3>
            </div>
            <div class="communities">
              <i class="iconfont icon-telegram"></i>
              <i class="iconfont icon--medium"></i>
              <i class="iconfont icon-QQ"></i>
              <i class="iconfont icon-twitter"></i>
            </div>
          </div>
          <!-- <p>Qbao AirDropper All Right Reserved</p> -->

           </Footer>
  </div>
</template>

<script>
import { Footer, Layout, Content } from 'iview'
import Header from './components/Header'
import 'iview/dist/styles/iview.css'
export default {
  name: 'App',
  components: {
    // Card,
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
@import url(https://at.alicdn.com/t/font_658528_vgud7j2gxfl84cxr.css);
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
.info {
  float: left;
}
.communities {
  float: right;
}
.iconfont {
  font-size: 2rem;
}
.icon-telegram {
  color: #00a3fb;
}
.icon--medium {
  color: #10d463;
}
.icon-QQ {
  color: #489ef9;
}
.icon-twitter {
  color: #519dec;
}
</style>
