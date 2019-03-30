<template>
  <div class = 'bar'>
    <div class = 'cur' ref = 'cur'>
      <div class = 'dot' v-show = 'showControl' ref = 'dot'
       @touchstart = 'touchStart'
       @touchmove = 'touchMove'
       @touchend = 'touchEnd'
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    showControl: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentTime: function (newVal) {
      this.progress = this.currentTime / this.duration
      this.$refs.cur.style['width'] = `${this.progress * document.documentElement.offsetWidth}px`
      this.$refs.dot.style['transform'] = `translateX(${this.progress * document.documentElement.offsetWidth}px)`
    }
  },
  data () {
    return {
      progress: 0
    }
  },
  methods: {
    touchStart: function (e) {
      this.$emit('showControl')
      this.startX = e.touches[0].pageX
      this.startPos = this.progress * document.documentElement.offsetWidth
    },
    touchMove: function (e) {
      this.$emit('showControl')
      this.moveX = e.touches[0].pageX
      this.dis = this.startPos + this.moveX - this.startX
      this.$refs.dot.style['transform'] = `translateX(${this.dis}px)`
      this.$refs.cur.style['width'] = `${this.dis}px`
    },
    touchEnd (e) {
      this.$emit('hideControl', this.dis / document.documentElement.offsetWidth)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .bar
    width 100%
    height 2px
    background-color rgba(0,0,0,0.3)
    position relative
    .cur
      background-color red
      position absolute
      top 0
      left 0
      height 2.1px
      width 0px
      .dot
        height 15px
        width 15px
        position relative
        bottom 6px
        left -7.5px
        border-radius 50%
        z-index 30
        background-color red
</style>
