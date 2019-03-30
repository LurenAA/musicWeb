<template>
  <div>

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
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
</style>
