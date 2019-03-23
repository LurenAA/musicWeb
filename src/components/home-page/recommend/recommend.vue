<template>
  <div class = 'container'>
    <slider v-if = 'sliderFlag' :slider = slider></slider>
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
      sliderFlag: false
    }
  },
  mounted () {
    json('http://localhost:3000/home', 'GET').then(res => {
      let x = JSON.parse(res)
      console.log(x)
      this.slider = x.focus.data.content
      this.sliderFlag = true
    }).catch(err => {
      if (err) {
        alert(1)
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
    .popular
      height $size(190)
      transform: translateY(-12px)
      background-color #fff
      border-radius 15px 15px
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
