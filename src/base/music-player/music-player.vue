<template>
  <transition name = 'music'>
    <div v-show = 'this.ifShowPlayer' class = 'container'>

    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'music-page',
  computed: {
    ...mapGetters([
      'ifShowPlayer'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .music-enter,
  .music-leave-to
    opacity 0
  .music-enter-active,
  .music-leave-active
    transition all 0.5s
  .container
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color blue
</style>
