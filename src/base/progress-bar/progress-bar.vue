<template>
  <div class = 'bar' ref = 'bar'>
    <div class = 'cur' ref = 'cur'>
      <div class = 'dot-wrapper' ref = 'dot'
        @touchstart.prevent = 'touchStart'
        @touchmove.prevent = 'touchMove'
        @touchend.prevent = 'touchEnd'
      >
        <div class = 'dot' v-show = 'showControl'>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'progress-bar',
  computed: {
    ...mapGetters([
      'ifShowPlayer'
    ])
  },
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
    },
    barHeight: {
      type: Number,
      default: 2
    }
  },
  watch: {
    currentTime: function (newVal) {
      if (this.startX) {
        return
      }
      if (newVal === 0) {
        this.$refs.cur.style['width'] = '0px'
        this.$refs.dot.style['transform'] = ''
      }
      this.progress = this.currentTime / this.duration
      this.$refs.cur.style['width'] = `${this.progress * this.$refs.bar.clientWidth}px`
      this.$refs.dot.style['transform'] = `translateX(${this.progress * this.$refs.bar.clientWidth}px)`
    },
    ifShowPlayer (newVal) {
      this.pos = this.$refs.bar.getBoundingClientRect()
      if (newVal) {
        if (this.barHeight !== 2) {
          this.$refs.bar.style['height'] = this.barHeight + 'px'
          this.$refs.cur.style['height'] = this.barHeight + 'px'
        }
      }
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
      this.startPos = this.progress * this.$refs.bar.clientWidth
      this.inital = true
    },
    touchMove: function (e) {
      if (!this.inital) {
        return
      }
      this.$emit('showControl')
      this.moveX = e.touches[0].pageX
      if (this.pos) {
        if (this.moveX - this.pos.x < 5 || this.pos.x + this.pos.width - this.moveX < 1) {
          return
        }
      }
      this.dis = this.startPos + this.moveX - this.startX
      this.$refs.dot.style['transform'] = `translateX(${this.dis}px)`
      this.$refs.cur.style['width'] = `${this.dis}px`
    },
    touchEnd (e) {
      this.inital = false
      this.startX = 0
      this.$emit('hideControl', this.dis / this.$refs.bar.clientWidth)
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
      .dot-wrapper
        height 30px
        width 30px
        position relative
        bottom 13px
        left -13.5px
        display flex
        align-items center
        justify-content center
        z-index 30
        .dot
          height 15px
          width 15px
          // position relative
          // bottom 6px
          // left -7.5px
          border-radius 50%
          background-color red
</style>
