<template>
  <div ref = 'slider' class = 'slider'>
    <ul ref = 'slider-group'>
      <li v-for = '(item, index) in slider' :key = 'index' >
        <img :src = 'item.pic_info.url'>
      </li>
    </ul>
    <div class = 'dots' ref = 'dots'>
      <span v-for = '(item, index) in slider' :key = 'index' class = 'dot'
       :class = '{active: curPag === index}'
      ></span>
    </div>
  </div>
</template>

<script>
import MScroll from 'common/js/min-slider'
export default {
  name: 'slider',
  data () {
    return {
      curPag: 0
    }
  },
  methods: {
    conputeSliderWidth () {
      let children = this.$refs['slider-group'].children
      let totalWidth = 0
      for (let x = 0; x < children.length; x++) {
        totalWidth += children[0].clientWidth
      }
      totalWidth += 2 * children[0].clientWidth
      this.$refs['slider-group'].style.width = `${totalWidth}px`
    }
    // goOut (item) {
    //   if (item.jump_info.url.substring(0, 2) === 'ht') {
    //     window.location.href = item.jump_info.url
    //   }
    //   window.location.href = `https://y.qq.com/w/album.html?albummid=${item.jump_info.url}&ADTAG=myqq&from=myqq&channel=10007100`
    // }
  },
  props: {
    slider: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      let _this = this
      this.conputeSliderWidth()
      let options = {
        loop: true,
        slider: true,
        scrollX: true,
        scrollY: false
      }
      this.MScrollX = new MScroll(this.$refs.slider, options)
      let length = this.$refs.dots.children.length
      this.MScrollX.addEventListener('scrollEnd', (page) => {
        if (page.pageNum === length + 1) {
          _this.curPag = 0
          return
        } else if (page.pageNum === 0) {
          _this.curPag = length - 1
          return
        }
        _this.curPag = page.pageNum - 1
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
  .slider
    width 100%
    height 100%
    overflow hidden
    position relative
    touch-action false
    ul
      list-style none
      white-space nowrap
      position relative
      li
        width 100vw
        height 39.8vw
        display inline-block
        img
          width 100%
    .dots
      position absolute
      bottom 18px
      left 0
      right 0
      text-align center
      font-size: 0
      .dot
        height 8px
        width 8px
        display inline-block
        margin 0 4px
        border-radius 50%
        background-color rgba(0,0,0,0.3)
        &.active
          background-color #fff
</style>
