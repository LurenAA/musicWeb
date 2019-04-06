<template>
  <transition>
    <div @click = 'clickHandle' v-show = 'flagX'>
      <h1>{{string}}</h1>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'tip',
  props: {
    string: {
      type: String,
      default: '错误'
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      flagX: false
    }
  },
  methods: {
    clickHandle () {
      this.flagX = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  watch: {
    flag (newVal, oldVal) {
      this.flagX = newVal
      if (newVal) {
        this.timer = setTimeout(() => {
          this.flagX = false
        }, 2400)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-enter,
  .v-leave-to
    transform translate3d(0,-100%,0)
  .v-enter-active,
  .v-leave-active
    transition all 0.4s

  div
    position absolute
    top 0
    left 0
    right 0
    background-color #6666CC
    text-align center
    height 34px
    line-height 34px
    border-radius 0 0 14px 14px
    h1
      color #fff
      font-size 15px
</style>
