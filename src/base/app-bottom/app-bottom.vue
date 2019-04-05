<template>
  <ul class = 'container'>
    <router-link tag = 'li' to = '/home/recommend' :class = '{activePage: currentPage === 0}'>
      <div class = 'icon-wrapper'>
        <i class = 'iconfont'>&#xe64e;</i>
      </div>
      <span>主页</span>
    </router-link>
    <router-link tag = 'li' to = '/music' :class = '{activePage: currentPage === 1}'>
      <div class = 'icon-wrapper'>
        <i class = 'iconfont'>&#xe7b8;</i>
      </div>
      <span>我的音乐</span>
    </router-link>
    <router-link tag = 'li' to = '/friends' :class = '{activePage: currentPage === 2}'>
      <div class = 'icon-wrapper'>
        <i class = 'iconfont'>&#xe627;</i>
      </div>
      <span>乐友圈</span>
    </router-link>
    <router-link tag = 'li' to = '/user' :class = '{activePage: currentPage === 3}'>
      <div class = 'icon-wrapper'>
        <i class = 'iconfont'>&#xe643;</i>
      </div>
      <span>账户</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'app-bottom',
  data () {
    return {
      currentPage: 0
    }
  },
  watch: {
    '$route': 'getPath'
  },
  methods: {
    getPath: function (newVal) {
      if (newVal.fullPath.indexOf('home') !== -1) {
        this.currentPage = 0
      } else if (newVal.fullPath.indexOf('music') !== -1) {
        this.currentPage = 1
      } else if (newVal.fullPath.indexOf('friend') !== -1) {
        this.currentPage = 2
      } else {
        this.currentPage = 3
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .container
    position absolute
    bottom 0
    left 0
    right 0
    height $size(64)
    // z-index 20
    display flex
    list-style none
    background-color #fff
    li
      flex 1
      display flex
      align-items center
      justify-content center
      flex-direction column
      &.activePage
        color $selcted-app-bottomd-color
      .icon-wrapper
        margin-bottom .1rem
        i
          font-size $font-size-large-x
      span
        font-size $font-size-small-s
</style>
