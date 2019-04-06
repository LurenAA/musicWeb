<template>
  <transition name = 'music'>
    <div v-show = 'this.ifShowPlayer' class = 'container'>
      <div class = 'header'>
        <div class = 'iconback' @click = 'clickFunc1'>
          <i class = 'iconfont'>&#xe644;</i>
        </div>
        <div class = 'music-title'>
          <h1>{{ this.song.name }}</h1>
          <h2>{{ this.song.singer}}</h2>
        </div>
        <div class = 'iconback' @click = 'clickFunc1'>
          <i class = 'iconfont'>&#xe611;</i>
        </div>
      </div>
      <div class = 'lyric-and-circle'>
        <div class = 'circle' ref = 'circle'>
          <img :src = 'this.song.pic'>
        </div>
      </div>
      <ul class = 'hots-icons'>
        <li>
          <i class = 'iconfont'>&#xeca1;</i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe794;</i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe6a7;</i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe62b;</i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe653;</i>
        </li>
      </ul>
      <div class = 'bar-wrapper'>
        <span>{{ formatTime(currentTime) }}</span>
        <progress-bar class = 'bar'
          :showControl = 'true' :barHeight = '4'
          :duration = 'duration' :currentTime = 'currentTime'
          @hideControl = 'hideControl'
        ></progress-bar>
        <span>{{ formatTime(duration) }}</span>
      </div>
      <ul class = 'buttons'>
        <li>
          <i class = 'iconfont'>&#xe66d;</i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe610;</i>
        </li>
        <li @click="playButton">
          <i class = 'iconfont' v-html = 'playStateIcon'></i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe612;</i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe663;</i>
        </li>
      </ul>
      <audio :src = 'audioSrc' ref = 'audio' @canplay="handleCanplay"
       @timeupdate = 'timeUpdate'
      ></audio>
      <tip :flag = 'tipFlag' :string = '"vip音乐请到官方app聆听"'></tip>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import progressBar from 'base/progress-bar/progress-bar'
import { formatTime } from 'common/js/util/util'
import json from 'api/json.js'
import tip from 'base/false-tip/false-tip'
export default {
  name: 'music-page',
  data: function () {
    return {
      duration: 0,
      currentTime: 0,
      lastSong: null,
      tipFlag: false
    }
  },
  components: {
    progressBar,
    tip
  },
  computed: {
    ...mapGetters([
      'ifShowPlayer',
      'song',
      'musicPlayState'
    ]),
    audioSrc () {
      if (this.song) {
        return this.song.url
      }
      return ''
    },
    playStateIcon () {
      if (!this.musicPlayState) {
        return '&#xe606;'
      } else {
        return '&#xe607;'
      }
    }
  },
  methods: {
    playButton () {
      if (!this.musicPlayState) {
        this.changePlayState(true)
      } else {
        this.changePlayState(false)
      }
    },
    formatTime (time) {
      return formatTime(time)
    },
    clickFunc1 () {
      this.changeShow(!this.ifShowPlayer)
    },
    ...mapMutations({
      changeShow: 'CHANGE_IFSHOWPLAYER',
      setSongUrl: 'SET_SONGURL',
      changePlayState: 'CHANGE_MUSICPLAYSTATE'
    }),
    handleCanplay (e) {
      this.$set(this, 'duration', parseInt(e.target.duration) || parseInt(this.song.int))
      this.$set(this, 'currentTime', e.target.currentTime)
      // console.log('canplay', e.target.duration, this.song.int)
      // e.target.play()
    },
    timeUpdate (e) {
      this.$set(this, 'currentTime', e.target.currentTime)
    },
    hideControl (e) {
      this.$refs.audio.currentTime = e * this.duration
    }
  },
  watch: {
    musicPlayState: function (newVal) {
      if (newVal) {
        this.$refs.circle.style['animation-play-state'] = 'running'
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
        this.$refs.circle.style['animation-play-state'] = 'paused'
      }
    },
    ifShowPlayer: function (newVal) {
      if (newVal === true) {
        // setTimeout(function () {
        this.$refs.circle.style.height = this.$refs.circle.style.width = window.innerHeight * 0.4 + 'px'
        this.$refs.circle.style.left = (window.innerWidth - parseInt(this.$refs.circle.style.width) - 18) / 2 + 'px'
        // }.bind(this), 10)
      }
      setTimeout(function () {
        if (newVal && (!this.lastSong || this.lastSong.mid !== this.song.mid)) {
          let _this = this
          this.tipFlag = false
          json(`http://132.232.249.69:3000/home/song?mid=${this.song.mid}`, 'GET').then(res => {
            _this.setSongUrl(res)
            _this.lastSong = _this.song
            // console.log('startLoad')
            _this.changePlayState(false)
            _this.$refs.audio.load()
            _this.$refs.audio.currentTime = 0
          })
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            if (this.$refs.audio.readyState === 0) {
              this.tipFlag = true
            }
          }, 1300)
        }
      }.bind(this), 200)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index'
  @keyframes rota {
    from {
      transform: rotate(0deg)
    }
    to{
      transform: rotate(360deg)
    }
  }
  .music-enter,
  .music-leave-to
    opacity 0
    .header
      transform translate3d(0,-100%,0)
    .buttons
      transform translate3d(0,100%,0)
  .music-enter-active,
  .music-leave-active
    transition all 0.3s
    .header
    .buttons
      transition all 0.3s
  .container
    display flex
    flex-direction column
    z-index 22
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-image linear-gradient(to bottom,#747474,#868686,#747474,#595959,#404040)
    .bar-wrapper
      display flex
      width 90%
      margin 0 auto 20px
      vertical-align middle
      line-height 4px
      .bar
        flex 1
        margin 0 10px
      span
        color #b6b6b7
    .hots-icons
      display flex
      padding 0 25px
      margin 10px 0 30px
      li
        color #c4c4c4
        flex 1
        text-align center
        i
          font-size $font-size-large-x
    .buttons
      margin-bottom 25px
      display flex
      align-items center
      li
        text-align center
        flex 1
        &:first-child
        &:nth-child(5)
          color #979797
          i
            font-size $font-size-large-x
        &:nth-child(2)
        &:nth-child(4)
          color #d3d3d3
          i
            font-size 25px
        &:nth-child(3)
          color #d3d3d3
          i
            font-size 38px
    .lyric-and-circle
      // height 440px
      flex 1
      .circle
        position absolute
        top 18%
        // left 50%
        // transform translateX(-50%)
        border-radius 50%
        overflow hidden
        border 9px solid #808080
        animation rota infinite 15s linear
        animation-play-state paused
        img
          width 100%
    .header
      height $remSize(40)
      display flex
      padding 4px 10px 6px
      align-items center
      border-bottom 1px solid #858585
      .music-title
        flex 1
        display flex
        flex-direction column
        justify-content center
        padding 0 80px 0 15px
        overflow hidden
        h1
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          font-size $font-size-medium-x
          color #fff
        h2
          margin-top 4px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          color #9f9f9f
      .iconback
        padding 5px 0
        i
          font-size 25px
          color #fff

</style>
