<template>
  <div class = 'container'>
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
      <div class = 'recom-title-div'>
        <div class = 'recom-title'>
          <span>热门推荐</span>
        </div>
        <div class = 'recom-change'>
          <span>换一换</span>
          <div class = 'recom-icon-div'>
            <i class = 'iconfont'>&#xe655;</i>
          </div>
        </div>
      </div>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
import json from 'api/json.js'
// import slider from 'base/slider/slider'
import slider from 'base/ownSlider/ownSlider'
export default {
  name: 'recommend',
  data () {
    return {
      slider: [],
      sliderFlag: false,
      newSongList: []
    }
  },
  mounted () {
    json('http://132.232.249.69:3000/home', 'GET').then(res => {
      let x = JSON.parse(res)
      console.log(x)
      this.slider = x.focus.data.content
      this.sliderFlag = true
      this.newSongList = x.new_song.data.song_list
    }).catch(err => {
      if (err) {
        console.log(err)
      }
    })
  },
  components: {
    slider
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .container
    background-color $background-color
    position absolute
    top 1.6rem
    bottom 0
    left 0
    right 0
    ul
      display flex
      flex-direction column
      align-items center
      justify-content center
    .new-song-recom
      background-color #fff
      .recom-title-div
        display flex
        align-items center
        height $size(64)
        line-height $size(64)
        .recom-change
          flex 1
          text-align right
          padding-right 15px
          height 100%
          font-size 0
          .recom-icon-div
            display inline-block
            i
              position relative
              top 1px
              display inline-block
              background-image: linear-gradient(to bottom, #ba41f0 , #7740e1)
              -webkit-background-clip:text;
              -webkit-text-fill-color:transparent;
              animation rota 2s linear infinite
              font-size $font-size-medium-x
              animation-play-state paused
          span
            font-size $font-size-medium-x
            padding-right 7px
        .recom-title
          height 100%
          span
            font-size $font-size-medium-x
          &::before
            top 5px
            position relative
            content ""
            display inline-block
            width 3.5px
            height 20px
            margin 0 10px 0 15px
            background linear-gradient(to bottom, #ba41f0 , #7740e1)
            border-radius 3px
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

  @keyframes rota {
    from{
      transform: rotate(360deg)
    }
    to{
      transform: rotate(0deg)
    }
  }
</style>
