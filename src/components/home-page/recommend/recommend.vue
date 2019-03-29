<template>
  <div class = 'containerY' ref = 'containerY'>
    <div>
      <div class = 'slider-container'>
        <slider v-if = 'sliderFlag' :slider = slider :ifAutoPlay = 'true'></slider>
      </div>
      <div class = 'popular'>
        <div>
          <div class = 'icon-div'>
            <i class = 'iconfont'>
              &#xe75b;
            </i>
            <svg width="100%" height="100%" version="1.1"
              xmlns="http://www.w3.org/2000/svg" class = 'svgIcons'>
                <circle cx="50%" cy="50%" r="0.45rem"
                stroke-width="2"/>
            </svg>
          </div>
          <span>新歌榜</span>
        </div>
        <div>
          <div class = 'icon-div'>
            <i class = 'iconfont'>
              &#xe76a;
            </i>
            <svg width="100%" height="100%" version="1.1"
              xmlns="http://www.w3.org/2000/svg" class = 'svgIcons'>
                <circle cx="50%" cy="50%" r="0.45rem"
                stroke-width="2"/>
            </svg>
          </div>
          <span>热歌榜</span>
        </div>
        <div>
          <div class = 'icon-div'>
            <i class = 'iconfont'>
              &#xe61e;
            </i>
            <svg width="100%" height="100%" version="1.1"
              xmlns="http://www.w3.org/2000/svg" class = 'svgIcons'>
                <circle cx="50%" cy="50%" r="0.45rem"
                stroke-width="2"/>
            </svg>
          </div>
          <span>主题推荐</span>
        </div>
        <div>
          <div class = 'icon-div'>
            <i class = 'iconfont'>
              &#xe614;
            </i>
            <svg width="100%" height="100%" version="1.1"
              xmlns="http://www.w3.org/2000/svg" class = 'svgIcons'>
                <circle cx="50%" cy="50%" r="0.45rem"
                stroke-width="2"/>
            </svg>
          </div>
          <span>今日推荐</span>
        </div>
      </div>
      <div class = 'new-song-recom'>
        <recom-head @click="_initRecomList(newSongList, recomList)"></recom-head>
        <ul class = 'recom-list'>
          <li v-for = '(item, index) in recomList' :key = index>
            <div class = 'pic-div'>
              <div class = 'pic-play'>
                <i class = 'iconfont'>&#xe66a;</i>
              </div>
              <img  v-lazy= 'item.picUrlSour' >
            </div>
            <div class = 'pic-des'>
              <span class = 'des-title'>{{ item.name }}</span>
              <div class = 'des-content'>
                <span>HQ</span>
                <span>MV</span>
                <span>{{ item.singerDesNum }}</span>
              </div>
            </div>
            <div class = 'pic-icon'>
              <i class = 'iconfont'>&#xe679;</i>
            </div>
          </li>
          <see-more></see-more>
        </ul>
      </div>
      <div class = 'mv-list'>
        <recom-head name = 'MV推荐' @click="_initRecomList(theMvList,mvList)"></recom-head>
        <ul>
          <li v-for = '(item, index) in mvList' :key = 'index'
           class = 'mv-mem' @click = 'seeMvDetail (item)'>
            <div class = 'mem-pic'>
              <img v-lazy = 'item.picurl'>
            </div>
            <h1>{{ item.title }}</h1>
            <p class = 'mem-sin'>{{ item.singerDesNum }}</p>
            <p class = 'play-count'>播放次数：{{ item.playcnt}}</p>
          </li>
        </ul>
        <see-more></see-more>
      </div>
    </div>
    <transition name = 'showload'>
      <div class = 'loading-back-div' v-show = '!finishFlag'>
        <div class = 'loading-des'>
          <img src = '../1.png'>
          <h1>**音乐</h1>
          <h1>让生活充满音乐</h1>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import json from 'api/json.js'
// import slider from 'base/slider/slider'
import { randomNum, sliceSingersName } from 'common/js/util/util'
import MScroll from 'common/js/min-slider/index'
import slider from 'base/ownSlider/ownSlider'
import recomHead from 'base/recom-head/recom-head'
import seeMore from 'base/see-more/see-more'
// import { jsonp, mvParams } from 'common/js/util/jsonp'
import { mapMutations } from 'vuex'

export default {
  name: 'recommend',
  beforeRouteEnter (to, from, next) {
    // console.log(from)
    if (from.path === '/') {
      next(vm => {
        vm.finishFlag = false
        setTimeout(() => {
          vm.finishFlag = true
        }, 2000)
      })
    } else {
      next()
    }
  },
  data () {
    return {
      sliderFlag: false,
      recomList: [],
      mvList: [],
      finishFlag: true
    }
  },
  created () {
    json('http://132.232.249.69:3000/home/recom', 'GET').then(res => {
      let x = JSON.parse(res)
      console.log(x)
      this.slider = x.focus.data.content
      this.sliderFlag = true
      this.newSongList = x.new_song.data.song_list
      this._initRecomList(this.newSongList, this.recomList)
      this.scrollY = new MScroll(this.$refs.containerY, {
        loop: false,
        slider: false,
        scrollX: false,
        scrollY: true
      })
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.scrollY.refresh()
        // this.finishFlag = true
      }, 2500)
    }).catch(err => {
      if (err) {
        console.log(err)
      }
    })
    json('http://132.232.249.69:3000/home/mvlist', 'GET').then(res => {
      let x = JSON.parse(res)
      console.log(x)
      this.theMvList = x.mv_list.data.list
      this._initRecomList(this.theMvList, this.mvList)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => { this.scrollY.refresh() }, 1500)
    })
  },
  components: {
    slider,
    recomHead,
    seeMore
  },
  methods: {
    _initRecomList (base, target) {
      let numList = []
      for (let i = 0; i < 4; i++) { // 改
        let ifSame = 0
        let newNum
        while (ifSame !== -1) {
          newNum = randomNum(0, base.length - 1)
          ifSame = numList.findIndex(value => {
            return value === newNum
          })
        }
        numList[i] = newNum
        this.$set(target, i, base[numList[i]])
        if (target === this.recomList) {
          this.$set(target[i], 'picUrlSour', `//y.gtimg.cn/music/photo_new/T002R300x300M000${base[numList[i]].album.mid}.jpg?max_age=2592000`)
          this.$set(target[i], 'singerDesNum', sliceSingersName(base[numList[i]].singer))
        } else if (target === this.mvList) {
          this.$set(target[i], 'singerDesNum', sliceSingersName(base[numList[i]].singers))
        }
      }
    },
    seeMvDetail (item) {
      this.changeMv(item)
      this.$router.push({name: 'mv-detail-page', params: {id: item.vid}})
    },
    ...mapMutations({
      changeMv: 'CHANGE_MV'
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .loading-back-div
    position fixed
    top 0
    left 0
    right 0
    bottom $size(-64)
    background-color white
    z-index 100
    &.showload-leave-to
      opacity 0
    &.showload-leave-active
      transition all 0.5s
    .loading-des
      position absolute
      top 40%
      left 50%
      transform translate(-50%,-50%)
      img
        transform scale(1.5)
      h1
        text-align center
        color #000000
        &:nth-child(2)
          font-family YouYuan
          font-weight bold
          font-size 40px
          margin-top 40px
        &:nth-child(3)
          font-size 18px
          margin-top 12px
  .containerY
    background-color $background-color
    position absolute
    top 1.6rem
    bottom 0
    left 0
    right 0
    overflow hidden
    .mv-list
      background-color #fff
      font-size $font-size-medium-x
      padding 0 15px
      margin-top 10px
      ul
        display flex
        flex-wrap wrap
        justify-content space-between
        .mv-mem
          flex-basis 47.5%
          flex-shrink 0
          display flex
          flex-direction column
          overflow hidden
          padding-bottom 15px
          h1
            margin-top 12px
            font-size $font-size-medium-x
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            padding-right 28px
            font-weight 500
          .play-count
            margin-top 4px
            font-size $font-size-medium
            color #a2a2a2
          .mem-sin
            margin-top 6px
            color #8a53e4
            font-size $font-size-medium
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            padding-right 28px
          .mem-pic
            width 100%
            height 0
            padding-bottom 24.5vw
            overflow hidden
            img
              width 100%
    .new-song-recom
      background-color #fff
      font-size $font-size-medium
      padding 0 15px
      min-height 300px
      .recom-list
        li
          padding 8px 0
          display flex
          .pic-icon
            width $size(55)
            text-align right
            i
              display block
              transform rotate(90deg)
              font-size .8rem
              color #c1c1c1
          .pic-div
            position relative
            flex-shrink 0
            width $size(76)
            // height $size(76)
            height 0
            padding-bottom $size(76)
            border-radius 50%
            overflow hidden
            margin-right 14px
            .pic-play
              position absolute
              top 50%
              left 50%
              transform translate(-40%,-45%)
              opacity .7
              i
                font-size 25px
                color #fff
            img
              width 100%
          .pic-des
            flex 1
            display flex
            flex-direction column
            justify-content center
            flex-shrink 1
            .des-title
              max-width 150px
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              margin-bottom 8px
            .des-content
              line-height 1.1
              white-space nowrap
              max-width 200px
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
              span:first-child
                padding-left 1.5px
                color #ff6000
                font-size $font-size-small
                border-radius 4px
                border 1px solid #ff6000
              span:nth-child(2)
                padding-left 1.5px
                padding-right 1.5px
                color #824be3
                font-size $font-size-small
                border-radius 4px
                border 1px solid #824be3
              span:last-child
                font-size $font-size-medium-x
                vertical-align middle
                color #9c9c9c
    .slider-container
      width 100%
      height 40vw
    .popular
      height $size(190)
      transform: translateY(-12px)
      background-color #fff
      border-top-left-radius 15px
      border-top-right-radius 15px
      display flex
      align-items center
      div
        flex 1
        text-align center
        display flex
        flex-direction column
        align-items center
        position relative
        .icon-div
          height 1rem
          width 1rem
          text-align center
          .svgIcons
            position absolute
            left 0
            right 0
            bottom 0
            top 0
            stroke #bd41f1
            fill #bd41f1
            fill-opacity 0.15
          i
            font-size 0.55rem
            transform translate(0px, 10px)
            color #bd41f1
        span
          margin-top .15rem
          font-size $font-size-medium
</style>
