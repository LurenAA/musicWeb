<template>
  <div ref = 'container'>
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.container, {
        scrollX: scrollX
      })
    })
  },
  props: {
    data: {
      type: Array
    },
    scrollX: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    data: function (newVal) {
      if (newVal) {
        this.scroll.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
