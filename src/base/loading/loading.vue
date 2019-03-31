<template>
  <div class = 'loading-div'>
    <div class = 'img-div'>
      <img src = './1.gif'>
    </div>
    <span>正在加载....</span>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="stylus" scoped>
  .loading-div
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    text-align center
    .img-div
      margin 0 auto 12px
      img
        margin 0 auto
        display block
    span
      font-size 14px
</style>
