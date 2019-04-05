<template>
  <transition name = 'music'>
    <div v-show = 'this.ifShowPlayer' class = 'container'>
      <div class = 'header'>
        <div class = 'iconback' @click = 'clickFunc1'>
          <i class = 'iconfont'>&#xe644;</i>
        </div>
        <h1></h1>
        <div class = 'iconback' @click = 'clickFunc1'>
          <i class = 'iconfont'>&#xe611;</i>
        </div>
      </div>
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
    clickFunc1 () {
      this.changeShow(!this.ifShowPlayer)
    },
    ...mapMutations({
      changeShow: 'CHANGE_IFSHOWPLAYER'
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index'
  .music-enter,
  .music-leave-to
    opacity 0
    .header
      transform translateY(-100%)
  .music-enter-active,
  .music-leave-active
    transition all 0.3s
    .header
      transition all 0.4s
  .container
    z-index 22
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-image linear-gradient(to bottom,#747474,#868686,#747474,#595959,#404040)
    .header
      height $remSize(40)
      display flex
      padding 0 10px
      align-items center
      border-bottom 1px solid #858585
      h1
        flex 1
        text-align center
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .iconback
        padding 5px 0
        i
          font-size 25px
          color #fff

</style>
