<template>
  <div ref = 'slider' class = 'slider'>
    <ul ref = 'slider-group'>
      <li v-for = '(item, index) in slider' :key = 'index'>
        <img :src = 'item.pic_info.url'>
      </li>
    </ul>
    <div class = 'dots'></div>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  components: {
    scroll
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
      this.scroll = new BScroll(this.$refs.slider, {
        scrollX: true,
        snap: {
          loop: true
        }
      })
    }
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
      this.conputeSliderWidth()
    })
  }
}
</script>

<style lang="stylus" scoped>
  .slider
    width 100%
    padding-bottom 40%
    height 0
    overflow hidden
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
</style>
