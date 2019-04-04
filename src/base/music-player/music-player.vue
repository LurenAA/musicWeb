<template>
  <transition name = 'music'>
    <div v-show = 'this.ifShowPlayer' class = 'container' @click = 'func1'>

    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'music-page',
  computed: {
    ...mapGetters([
      'ifShowPlayer'
    ])
  },
  methods: {
    func1 () {
      this.changeShow(!this.ifShowPlayer)
    },
    ...mapMutations({
      changeShow: 'CHANGE_IFSHOWPLAYER'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .music-enter,
  .music-leave-to
    opacity 0
  .music-enter-active,
  .music-leave-active
    transition all 0.3s
  .container
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color #000
</style>
