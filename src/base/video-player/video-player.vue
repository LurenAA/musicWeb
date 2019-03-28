<template>
  <div class = 'video-container' @click = 'callControl'>
    <div class = 'player-title' v-show = 'showControl'>
      <div class = 'icon-div' @click = 'back'>
        <i class = 'iconfont'>&#xe644;</i>
      </div>
      <h1>{{ mvInfo.title }}</h1>
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
    <div class = 'player-control' v-show = 'showControl'>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters([
      'mv'
    ])
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
      }, 3000)
    },
    back () {
      this.$router.go(-1)
    },
    changeControl () {
      if (this.controlTimer) {
        clearTimeout(this.controlTimer)
      }
      this.controlTimer = setTimeout(() => {
        this.showControl = false
      }, 2500)
    },
    callControl () {
      this.showControl = true
      this.changeControl()
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
    if (!this.mv) {
      this.$router.push({name: 'home-page'})
    }
    this.$refs.video.addEventListener('error', this)
    this.$refs.video.addEventListener('canplay', this)
    this.mvInfo = this.mv
    this.showControl = true
    this.changeControl()
  },
  data () {
    return {
      mvInfo: {},
      showControl: true
    }
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
      background: linear-gradient(to bottom, rgba(0,0,0,70%),rgba(0,0,0,0))
      position absolute
      top 0
      left 0
      right 0
      display flex
      align-items center
      box-sizing border-box
      h1
        flex 1
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        padding 0 10px
        color #fff
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
