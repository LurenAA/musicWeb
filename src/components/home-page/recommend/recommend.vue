<template>
  <div class = 'containerY' ref = 'containerY'>
    <div>
      <div class = 'slider-container'>
        <slider v-if = 'sliderFlag' :slider = slider></slider>
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
        <recom-head @click="_initRecomList"></recom-head>
        <ul class = 'recom-list'  v-if = 'recomList.length'>
          <li v-for = '(item, index) in recomList' :key = index>
            <div class = 'pic-div'>
              <div class = 'pic-play'>
                <i class = 'iconfont'>&#xe66a;</i>
              </div>
              <img  :src= 'item.picUrlSour' >
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
          <div class ='more-recom'>
            查看全部
            <i class = 'iconfont'>
              &#xe727;
            </i>
          </div>
        </ul>
      </div>
      <div class = 'mv-list'>
        <recom-head name = 'MV推荐' class = 'head-com'></recom-head>
      </div>
    </div>
  </div>
</template>

<script>
import json from 'api/json.js'
// import slider from 'base/slider/slider'
import { randomNum, sliceSingersName } from 'common/js/util/util'
import MScroll from 'common/js/min-slider/index'
import slider from 'base/ownSlider/ownSlider'
import recomHead from 'base/recom-head/recom-head'
// import { jsonp, mvParams } from 'common/js/util/jsonp'
export default {
  name: 'recommend',
  data () {
    return {
      sliderFlag: false,
      recomList: []
    }
  },
  created () {
    json('http://132.232.249.69:3000/home', 'GET').then(res => {
      let x = JSON.parse(res)
      console.log(x)
      this.slider = x.focus.data.content
      this.sliderFlag = true
      this.newSongList = x.new_song.data.song_list
      this._initRecomList()
      this.scrollY = new MScroll(this.$refs.containerY, {
        loop: false,
        slider: false,
        scrollX: false,
        scrollY: true
      })
      setTimeout(() => { this.scrollY.refresh() }, 500)
    }).catch(err => {
      if (err) {
        console.log(err)
      }
    })
  },
  components: {
    slider,
    recomHead
  },
  methods: {
    _initRecomList () {
      let numList = []
      for (let i = 0; i < 4; i++) { // 改
        let ifSame = 0
        let newNum
        while (ifSame !== -1) {
          newNum = randomNum(0, this.newSongList.length - 1)
          ifSame = numList.findIndex(value => {
            return value === newNum
          })
        }
        numList[i] = newNum
        this.$set(this.recomList, i, this.newSongList[numList[i]])
        this.$set(this.recomList[i], 'picUrlSour', `//y.gtimg.cn/music/photo_new/T002R300x300M000${this.newSongList[numList[i]].album.mid}.jpg?max_age=2592000`)
        this.$set(this.recomList[i], 'singerDesNum', sliceSingersName(this.newSongList[numList[i]].singer))
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
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
    .new-song-recom
      background-color #fff
      font-size $font-size-medium
      padding 0 15px
      .recom-list
        .more-recom
          padding 13px 0 20px
          text-align center
          justify-content center
          font-size $font-size-medium
          color #717171
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
            height $size(76)
            border-radius 50%
            background-color yellow
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
