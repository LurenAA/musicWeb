<template>
  <div class = 'container'>
    <div class = 'left'>
      <i class = 'iconfont'>&#xe67e;</i>
    </div>
    <div class = 'middle'>
      <div class = 'search-icon'>
        <i class = 'iconfont'>&#xe60b;</i>
      </div>
      <input placeholder="搜索">
    </div>
    <div class = 'right'>
      <i class = 'iconfont'>&#xe602;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-head'
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index'
  .container
    height $size(60)
    width 100%
    background linear-gradient(to right, #5922da , #b428ef)
    display flex
    align-items center
    .left,
    .right
      width $size(69)
      i
        font-size $size(32)
        width $size(32)
        height $size(32)
        line-height $size(32)
        margin 0 auto
        color #fff
        display block
    .middle
      flex 1
      position relative
      overflow hidden
      display flex
      input
        flex 1
        border-radius 3px
        padding $size(10) 0 $size(10) 0.6rem
        color $font-color-1
        font-size $font-size-medium
        font-weight 500
      .search-icon
        position absolute
        left .1rem
        top .14rem
        i
          font-size $size(32)
          color $font-color-1
</style>
