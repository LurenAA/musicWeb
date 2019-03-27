<template>
  <div class = 'recom-title-div'>
    <span class = 'recom-title-name'>{{ name }}</span>
    <span class = 'recom-change' @click = 'changeNewSongs' >换一换</span>
    <div class = 'recom-icon-div' ref = 'rota' >
      <i class = 'iconfont'>&#xe626;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recom-head',
  props: {
    name: {
      type: String,
      default: '热门推荐'
    }
  },
  methods: {
    changeNewSongs () {
      this.$refs.rota.style['animation-play-state'] = 'running'
      this.$emit('click')
      if (this.runningTimer) {
        clearTimeout(this.runningTimer)
      }
      this.runningTimer = setTimeout(() => {
        this.runningTimer = null
        this.$refs.rota.style['animation-play-state'] = 'paused'
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  @keyframes rota {
    from{
      transform: rotate(360deg)
    }
    to{
      transform: rotate(0deg)
    }
  }

  .recom-title-div
    font-size $font-size-medium
    display flex
    align-items center
    line-height $size(64)
    height $size(64)
    .recom-icon-div
      transform-origin 52.5% 44.5%;
      display inline-block
      line-height $font-size-medium-x
      animation rota 2s linear infinite
      animation-play-state paused
      i
        background-image: linear-gradient(to bottom, #ba41f0 , #7740e1)
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
        font-size $font-size-medium-x
    .recom-change
      text-align right
      padding-right 8px
    .recom-title-name
      flex 1
      &::before
        top 5px
        position relative
        content ""
        display inline-block
        width 3.5px
        height 20px
        margin-right 10px
        background linear-gradient(to bottom, #ba41f0 , #7740e1)
        border-radius 3px
</style>
