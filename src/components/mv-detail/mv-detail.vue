<template>
  <transition>
    <div class = 'container'>
      <video-player :url = 'mvUrl' @changeUrl = 'changeMvUrl' :backIcon = 'backIcon'></video-player>
      <div class = 'des' v-if = 'mv' ref = 'des'>
        <div>
          <div class = 'title-div'>
            <h1 class = 'title'>{{ mv.title || mv.name}}</h1>
            <div class = 'title-des'>
              <span>发布：{{ updateDate }}</span>
              &nbsp;&nbsp;
              <span>播放：{{ mv.playcnt }}</span>
            </div>
          </div>
          <div class = 'relevant-mv'>
            <loading v-if = '!releventFlag'></loading>
            <h1 class = 'mv-h1-des'>相关视频</h1>
            <ul v-if = 'releventFlag'>
              <li v-show = '!relevantMv.length'>
                抱歉,无相关视频...
              </li>
              <li v-for = '(item, index) in relevantMv' :key = 'index'
               @click = 'gotoNextOne(item)'
              >
                <div class = 'img-div'>
                  <img v-lazy ='item.cover_pic'>
                </div>
                <div class = 'img-title-des'>
                  <h1 ref = 'item-title'>{{item.name}}</h1>
                  <span>{{formatTime(item.duration)}} by {{sliceSingersName(item.singers) || item.uploader_nick}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class = 'relevant-mv'>
            <h1 class = 'mv-h1-des'>热门评论</h1>
            <div class = 'mv-comment'>
              <img src = './2.gif'>
              <span>抱歉，暂无评论</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { jsonp, mvParams } from '@/api/jsonp'
import { getTimeString, formatTime, sliceSingersName } from 'common/js/util/util'
import videoPlayer from 'base/video-player/video-player'
import { mapGetters, mapMutations } from 'vuex'
import json from 'api/json'
import loading from 'base/loading/loading'
import MScroll from 'common/js/min-slider/index'
import clamp from 'common/js/clamp/index'

export default {
  name: 'mv-detail',
  components: {
    videoPlayer,
    loading
  },
  computed: {
    ...mapGetters([
      'mv'
    ])
  },
  beforeRouteEnter (to, from, next) {
    from.path === '/' ? next({name: 'home-page'}) : next(
      vm => {
        vm.backIcon = from.name === 'home-mv' ? 'home-mv' : 'home-recommend'
      }
    )
  },
  updated () {
    this.$nextTick(() => {
      if (!this.lastVid.length || this.lastVid === this.mv.vid) {
        return
      }
      this._initAllThings()
    })
  },
  activated () {
    if (!this.MScroll) {
      this.initMScroll()
    }
    this._initAllThings()
  },
  deactivated () {
    if (this.MScroll) {
      this.MScroll.disable()
    }
  },
  data () {
    return {
      playList: [],
      availableMvUrl: [],
      mvUrl: null,
      mvIndex: 0,
      updateDate: '2019-1-1',
      relevantMv: [],
      releventFlag: false,
      lastVid: '',
      redirectFlag: false,
      backIcon: 'home-recommend'
    }
  },
  methods: {
    _findavailable () {
      this.availableMvUrl = []
      for (let x = 0, len = this.playList.length; x < len; x++) {
        this.availableMvUrl = this.availableMvUrl.concat(this.playList[x].freeflow_url)
      }
    },
    changeMvUrl: function () {
      if (this.mvIndex === this.availableMvUrl.length) {
        this.$set(this, 'mvUrl', 'error')
      } else {
        this.$set(this, 'mvUrl', this.availableMvUrl[this.mvIndex++])
      }
    },
    change: function () {
      this.show = !this.show
    },
    formatTime (time) {
      return formatTime(time)
    },
    sliceSingersName (singer) {
      return sliceSingersName(singer)
    },
    gotoNextOne (item) {
      this.changeMv(item)
      this.$router.push({name: 'mv-detail-page', params: {id: item.vid}})
    },
    ...mapMutations({
      changeMv: 'CHANGE_MV'
    }),
    _initAllThings () {
      if (!this.mv) {
        return
      }
      this.lastVid = this.mv.vid
      this.releventFlag = false
      this.updateDate = getTimeString(this.mv.pubdate)
      if (this.MScroll) {
        this.MScroll.scrollTo(0, 0, '', true)
      }
      jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg', mvParams(this.$route.params.id))
        .then(res => {
          this.playList = res.getMvUrl.data[Object.keys(res.getMvUrl.data)[0]].mp4
          this._findavailable()
          this.mvIndex = 0
          this.changeMvUrl()
        })
        .catch(err => {
          console.log(err)
        })
      json(`http://132.232.249.69:3000/home/mv?vid=${this.mv.vid}`, 'GET').then(res => {
        res = JSON.parse(res)
        this.relevantMv = res.other.data.list.slice(0, 8)
        this.releventFlag = true
        setTimeout(function () {
          if (this.$refs['item-title']) {
            this.$refs['item-title'].forEach(value => {
              clamp(value, {
                clamp: 2
              })
            })
          }
        }.bind(this), 20)
        setTimeout(function () {
          this.MScroll.enable()
          this.MScroll.refresh()
        }.bind(this), 200)
      }).catch(err => {
        console.log(err)
      })
    },
    initMScroll () {
      if (!this.$refs.des) {
        return
      }
      this.MScroll = new MScroll(this.$refs.des, {
        loop: false,
        slider: false,
        scrollX: false,
        scrollY: true,
        dispatchClick: true
      })
    }
  },
  mounted () {
    this.initMScroll()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .v-enter
  .v-leave-to
    transform translateX(100%) translateZ(0px)
  .v-enter-active
  .v-leave-active
    transition all 0.5s
  .container
    background-color $background-color
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 20
    overflow hidden
    .des
      position fixed
      bottom 0
      top 203px
      left 0
      right 0
      overflow hidden
      .relevant-mv
        position relative
        margin-top 10px
        background-color #fff
        padding 0 15px 5px
        min-height 150px
        .mv-comment
          box-sizing border-box
          padding 22px 0 12px
          img
            padding-left 30px
            width 100px
          span
            font-size $font-size-large
            padding-left 30px
        .mv-h1-des
          padding 12px 0 10px
          font-size $font-size-large
          font-weight 600
        ul
          li
            display flex
            align-items center
            padding 5px 0
            .img-div
              flex-shrink 0
              overflow hidden
              border-radius 5px
              width 120px
              padding-bottom @width * 0.5625
              height 0
              img
                width 100%
            .img-title-des
              padding-left 10px
              flex 1
              display flex
              flex-direction column
              overflow hidden
              h1
                font-size $font-size-large
                line-height 1.2
                color #000
                // max-height 36px
                // display: -webkit-box;
                // -webkit-box-orient: vertical;
                // -webkit-line-clamp: 2;
                // overflow: hidden;
                padding-right 25px
              span
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                margin-top 10px
      .title-div
        padding 0 20px 20px
        background-color #fff
        .title
          line-height 1.3
          padding 15px 0 12px
          font-size $font-size-large-x
        .title-des
          color rgba(0,0,0,0.5)
          span
            &:first-child
              padding-right 12px
              border-right 2px solid rgba(0,0,0,0.3)
              font-size $font-size-medium-x
</style>
