<template>
  <div class ='more-recom' @click = 'emitClick'>
    查看全部
    <i class = 'iconfont'>
      &#xe727;
    </i>
  </div>
</template>

<script>
export default {
  name: 'see-more',
  methods: {
    emitClick () {
      this.$emit('emitClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/variable'
  .more-recom
    padding 13px 0 20px
    text-align center
    // justify-content center
    font-size $font-size-medium
    color #717171
</style>
