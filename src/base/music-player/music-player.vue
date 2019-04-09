<template>
  <transition name = 'music'>
    <div v-show = 'this.ifShowPlayer' class = 'container' @click = 'handlePlayList'>
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
        <li @click="playButton" ref = 'playbtn'>
          <i class = 'iconfont' v-html = 'playStateIcon'></i>
        </li>
        <li>
          <i class = 'iconfont'>&#xe612;</i>
        </li>
        <li @click = 'handlePlayList' class = 'playListButton'>
          <i class = 'iconfont'>&#xe663;</i>
        </li>
      </ul>
      <audio :src = 'audioSrc' ref = 'audio' @canplay="handleCanplay"
       @timeupdate = 'timeUpdate'
      ></audio>
      <tip :flag = 'tipFlag' :string = '"vip音乐请到官方app聆听"'></tip>
      <div class = 'background-c' v-show = 'playListFlag'></div>
      <transition name = 'play-list'>
        <div class = 'playList' v-show = 'playListFlag' @click.stop>
          <div class = 'play-list-top'>
            <div>
              <i class = 'iconfont'>&#xe66d;</i>
            </div>
            <span>顺序播放</span>
            <div @click = 'removeAll'>
              <i class = 'iconfont'>&#xe6be;</i>
            </div>
          </div>
          <div class = 'ul-wrapper' ref = 'wrapper'>
            <transition-group tag = 'ul' class = 'play-list-list' name="plist">
              <li v-for = 'item in playList' :key = 'item.mid'>
                <span :class = '{"active-song": song.mid === item.mid}' @click="chooseAnother(item)">{{item.name}}</span>
                <span :class = '{"active-song": song.mid === item.mid}' @click="chooseAnother(item)">&nbsp;-&nbsp;{{item.singer}}</span>
                <div @click = 'removeOnsMusic(item)'>
                  <i class = 'iconfont'>&#xe687;</i>
                </div>
              </li>
            </transition-group>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import progressBar from 'base/progress-bar/progress-bar'
import { formatTime } from 'common/js/util/util'
import json from 'api/json.js'
import tip from 'base/false-tip/false-tip'
import MScroll from 'common/js/min-slider/index'

export default {
  name: 'music-page',
  data: function () {
    return {
      duration: 0,
      currentTime: 0,
      tipFlag: false,
      playListFlag: false
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
      'musicPlayState',
      'playList'
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
    removeAll () {
      this.changePlayList([])
    },
    removeOnsMusic (item) {
      this.removeSong(item.mid)
    },
    chooseAnother (item) {
      this.chooseMusic(item)
    },
    handlePlayList (e) {
      if (e.target.className !== 'playListButton' && e.target.parentElement.className !== 'playListButton') {
        this.playListFlag = false
      } else if (!this.playListFlag) {
        this.playListFlag = true
        setTimeout(function () {
          this.scroll.refresh()
        }.bind(this), 500)
        e.stopPropagation()
      }
    },
    ...mapActions([
      'addSong',
      'chooseMusic',
      'removeSong'
    ]),
    playButton () {
      if (!this.musicPlayState) {
        this.changePlayState(true)
        this.addSong(this.song)
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
      changePlayState: 'CHANGE_MUSICPLAYSTATE',
      changePlayList: 'SET_PLAYLIST'
    }),
    handleCanplay (e) {
      this.$set(this, 'duration', parseInt(e.target.duration) || parseInt(this.song.int))
      this.$set(this, 'currentTime', e.target.currentTime)
      this.$refs.playbtn.style['pointer-events'] = 'auto'
      this.$refs.playbtn.style['color'] = '#d3d3d3'
      if (navigator.userAgent.indexOf('UCBrower') !== -1) {
        console.log('uc')
        this.$refs.audio.play()
      }
      // console.log('canplay', e.target.duration, this.song.int)
      // e.target.play()
    },
    timeUpdate (e) {
      this.$set(this, 'currentTime', e.target.currentTime)
    },
    hideControl (e) {
      this.$refs.audio.currentTime = e * this.duration
    },
    changeSong (newVal, oldVal) {
      setTimeout(function () {
        this.$refs.playbtn.style['pointer-events'] = 'none'
        this.$refs.playbtn.style['color'] = 'rgba(0,0,0,0.5)'
        if (newVal.mid !== oldVal.mid) {
          let _this = this
          this.tipFlag = false
          json(`http://132.232.249.69:3000/home/song?mid=${this.song.mid}`, 'GET').then(res => {
            _this.setSongUrl(res)
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
    },
    song (newVal, oldVal) {
      this.changeSong(newVal, oldVal)
    }
  },
  mounted () {
    this.scroll = new MScroll(this.$refs.wrapper, {
      scrollY: true,
      dispatchClick: true
    })
  }
}
</script>

<style lang="stylus" scoped>
  .container >>> .videoBox
    z-index -1
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
    .background-c
      background-color rgba(0,0,0,0.5)
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 29
    .playList
      position absolute
      left 0
      right 0
      bottom 0
      min-height 50px
      background-color #fff
      z-index 30
      border-radius 12px 12px 0 0
      .ul-wrapper
        position relative
        max-height 300px
        overflow hidden
        .play-list-list
          padding 0 10px
          .active-song
            color #FF2400 !important
          .plist-enter,
          .plist-leave-to
            height 0px
          .plist-enter-active,
          .plist-leave-active
            transition all 0.3s
          li
            height 40px
            line-height 40px
            display flex
          span
            &:first-child
              font-size 14px
              max-width 150px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            &:nth-child(2)
              font-size 12px
              flex 1
              color rgba(0,0,0,0.55)
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              padding-right 50px
          div
            i
              color rgba(0,0,0,0.55)
              font-size 20px
      .play-list-top
        height 30px
        line-height 30px
        display flex
        align-items center
        padding 3px 10px 3px
        border-bottom 1px solid rgba(0,0,0,0.07)
        span
          flex 1
          padding 0 8px
        div
          text-align center
          i
            font-size 24px
      &.play-list-enter,
      &.play-list-leave-to
        transform translateY(100%)
      &.play-list-enter-active,
      &.play-list-leave-active
        transition transform 0.3s
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
          pointer-events none
          color rgba(0,0,0,0.5)
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
