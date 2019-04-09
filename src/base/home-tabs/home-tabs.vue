<template>
  <ul class = 'container'>
    <router-link tag = 'li' to = '/home/recommend'>
      <span>热门推荐</span>
    </router-link>
    <router-link tag = 'li' to = '/home/singers'>
      <span>歌手</span>
    </router-link>
    <router-link tag = 'li' to = '/home/toplist'>
      <span>歌单</span>
    </router-link>
    <router-link tag = 'li' to = '/home/mv'>
      <span>MV</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'home-tabs'
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .container
    height $size(54)
    line-height $size(54)
    display flex
    margin-bottom 4px
    li
      flex 1
      height 100%
      box-sizing border-box
      text-align center
      letter-spacing:1px
      span
        display inline-block
        font-size $font-size-medium
      &.router-link-active
        color $selected-tabs-color
        span
          border-bottom 4px solid $selected-tabs-color
</style>
