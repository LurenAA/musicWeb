<template>
  <div class = 'video-container'>
    <div class = 'player-title'>
      <div class = 'icon-div' @click = 'back'>
        <i class = 'iconfont'>&#xe644;</i>
      </div>
      <h1></h1>
      <div class = 'icon-div'>
        <i class = 'iconfont'>&#xe611;</i>
      </div>
      <div class = 'icon-div'>
        <i class = 'iconfont'>&#xe62e;</i>
      </div>
    </div>
    <video ref = 'video' class = 'video'>
      <source :src="url" type="video/mp4">
      您的浏览器不支持 video 标签。
    </video>
  </div>
</template>

<script>
export default {
  name: 'video-player',
  props: {
    url: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  methods: {
    handleEvent (e) {
      switch (e.type) {
        case 'error':
          console.log('error')
          break
        case 'canplay':
          this.$refs.video.play()
          break
      }
    },
    checkUrl () {
      this.timer = setTimeout(() => {
        if (this.$refs.video.readyState === 0) {
          // this.changeMvUrl()
          console.log('blbl')
          this.$emit('changeUrl')
          this.checkUrl()
        }
      }, 2000)
    },
    back () {
      console.log(1)
    }
  },
  watch: {
    url: function (newVal) {
      if (newVal && newVal === 'error') {
        console.log('error')
      } else if (newVal) {
        this.$refs.video.load()
        this.checkUrl()
      }
    }
  },
  deactivated () {
    this.$refs.video.removeEventListener('error', this)
    this.$refs.video.removeEventListener('canplay', this)
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  activated () {
    this.$refs.video.addEventListener('error', this)
    this.$refs.video.addEventListener('canplay', this)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/variable'
  .video-container
    height 200px
    width 100%
    background-color #000
    position relative
    .player-title
      z-index 2
      height 38px
      line-height 38px
      background-color transparent
      position absolute
      top 0
      left 0
      right 0
      display flex
      align-items center
      box-sizing border-box
      h1
        flex 1
      .icon-div
        padding 0 10px
        height 100%
        width $font-size-large-x
        color #fff
        i
          font-size $font-size-large-x
    .video
      width 100%
      height 200px
</style>
