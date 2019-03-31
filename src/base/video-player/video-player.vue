<template>
  <div >
    <div class = 'video-container'>
      <transition name = 'title'>
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
      </transition>
      <video ref = 'video' class = 'video' @timeupdate="timeUpdate" @click = 'callControl'>
        <source :src="url" type="video/mp4">
        您的浏览器不支持 video 标签。
      </video>
      <transition name = 'control'>
        <div class = 'player-control' v-show = 'showControl'>
          <span>{{ currentTime }} / <em>{{ duration}}</em></span>
          <div>
            <i class = 'iconfont'>&#xe61d;</i>
          </div>
        </div>
      </transition>
      <div class = 'pauseOrplay' v-show = 'showControl'>
        <div ref = 'rota-icon' @click = 'trigglePlay'>
          <i class = 'iconfont' v-html = 'stateIcon'></i>
        </div>
      </div>
    </div>
    <progress-bar v-if = 'this.palyState !== "loading"'
     :currentTime = 'this.$refs.video.currentTime'
     :duration = 'this.$refs.video.duration'
     :showControl = 'showControl'
     @showControl = 'moveShowControl'
     @hideControl = 'hideShowControl'
    >
    </progress-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatTime } from 'common/js/util/util'
import progressBar from 'base/progress-bar/progress-bar'
export default {
  name: 'video-player',
  components: {
    progressBar
  },
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
    ]),
    stateIcon () {
      return this.palyState === 'loading' ? '&#xe655;'
        : this.palyState === 'play' ? '&#xe76b;' : '&#xe6ce;'
    }
  },
  methods: {
    handleEvent (e) {
      switch (e.type) {
        case 'error':
          console.log('error')
          break
        case 'canplay':
          console.log('canplay')
          if (this.changeProgress) {
            this.changeProgress = false
            return
          }
          this.duration = formatTime(this.$refs.video.duration)
          // this.$refs.video.play()
          this.$refs['rota-icon'].style['animation-play-state'] = 'paused'
          this.$refs['rota-icon'].style['display'] = 'none'
          setTimeout(() => {
            this.$refs['rota-icon'].style['display'] = 'block'
          }, 100)
          this.palyState = 'pause'
          this.autoHideControl()
          // this.$refs.video.removeEventListener('canplay', this)
          break
      }
    },
    timeUpdate (e) {
      this.currentTime = formatTime(e.target.currentTime)
    },
    checkUrl () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
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
      this.$router.push({name: 'home-page'})
    },
    autoHideControl () {
      if (this.controlTimer) {
        clearTimeout(this.controlTimer)
      }
      this.controlTimer = setTimeout(() => {
        this.showControl = false
      }, 4500)
    },
    callControl () {
      // console.dir(this.$refs.video)
      if (!this.showControl) {
        this.showControl = true
        this.autoHideControl()
      } else {
        if (this.controlTimer) {
          clearTimeout(this.controlTimer)
        }
        this.showControl = false
      }
    },
    trigglePlay () {
      if (this.palyState === 'play') {
        this.palyState = 'pause'
        this.$refs.video.pause()
      } else if (this.palyState === 'pause') {
        this.palyState = 'play'
        this.$refs.video.play()
      }
    },
    moveShowControl () {
      this.showControl = true
      this.changeProgress = true
      if (this.controlTimer) {
        clearTimeout(this.controlTimer)
      }
    },
    hideShowControl (x) {
      let curTime = x * this.$refs.video.duration
      this.$refs.video.currentTime = curTime
      this.autoHideControl()
    }
  },
  watch: {
    url: function (newVal) {
      if (newVal && newVal === 'error') {
        console.log('error')
        if (this.timer) {
          clearTimeout(this.timer)
        }
      } else if (newVal) {
        this.$refs.video.load()
        this.$refs['rota-icon'].style['animation-play-state'] = 'running'
        this.palyState = 'loading'
        this.checkUrl()
      }
    }
  },
  deactivated () {
    this.$refs.video.removeEventListener('error', this)
    if (this.timer) {
      clearTimeout(this.timer)
    }
    if (this.controlTimer) {
      clearTimeout(this.controlTimer)
    }
  },
  activated () {
    if (!this.mv) {
      this.showControl = false
      return
    }
    this.$refs.video.addEventListener('error', this)
    this.$refs.video.addEventListener('canplay', this)
    this.mvInfo = this.mv
    this.showControl = true
  },
  data () {
    return {
      mvInfo: {},
      showControl: true,
      currentTime: '00:00',
      duration: '00:00',
      palyState: 'loading', // loaing,play,pause
      changeProgress: false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/variable'
  @keyframes rota {
    from {
      transform: rotate(0deg)
    }
    to{
      transform: rotate(360deg)
    }
  }
  .video-container
    height 200px
    width 100%
    background-color #000
    position relative
    overflow hidden
    user-select:none
    .pauseOrplay
      position absolute
      top 50%
      left 50%
      color rgba(256,256,256, 0.5)
      transform translate(-50%,-50%)
      div
        margin 0 auto
        animation rota 2s linear infinite
        animation-fill-mode backwards
        i
          font-size 1rem
    .player-control
      position absolute
      bottom 0
      left 0
      right 0
      z-index 2
      height 38px
      line-height 38px
      background: linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,70%))
      padding 0 10px
      &.control-enter,&.control-leave-to
        transform translateY(100%)
      &.control-enter-active,&.control-leave-active
        transition all 0.3s
      span
        color #fff
        font-size $font-size-medium
        em
          color rgba(256,256,256, 0.5)
      div
        float right
        i
          color #fff
          font-size $font-size-large-x
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
      &.title-enter,&.title-leave-to
        transform translateY(-100%)
      &.title-enter-active,&.title-leave-active
        transition all 0.3s
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
