<template>
  <div class = 'app'>
    <home-head @clickOne = 'clickOne' @load = 'getTarget'></home-head>
    <home-tabs></home-tabs>
    <app-bottom></app-bottom>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import homeHead from 'base/home-head/home-head'
import homeTabs from 'base/home-tabs/home-tabs'
import appBottom from 'base/app-bottom/app-bottom'
import CreateAnimations from 'common/js/create-animations/index'
import { mapMutations } from 'vuex'

export default {
  name: 'home-page',
  components: {
    homeHead,
    homeTabs,
    appBottom
  },
  data () {
    return {
      clickPlayerIcon: {},
      createAnimations: null
    }
  },
  methods: {
    clickOne (e) {
      this.triggerShow(true)
      this.createAnimations.runAnimation(this.clickPlayerIcon, 'move')
    },
    ...mapMutations({
      'triggerShow': 'CHANGE_IFSHOWPLAYER'
    }),
    getTarget (e) {
      this.clickPlayerIcon = e
      let distPos = {
        x: window.innerWidth / 2 - this.clickPlayerIcon.clientWidth / 2,
        y: window.innerHeight / 2 - this.clickPlayerIcon.clientHeight / 2
      }
      this.createAnimations = new CreateAnimations()
      this.createAnimations.addAnimation('move', {
        animation: {
          '0%': {
            pos: [0, 0]
          },
          '80%': {
            pos: [distPos.x, distPos.y],
            scale: 5
          },
          '100%': {
            pos: [distPos.x, distPos.y],
            scale: 1
          }
        },
        duration: 500,
        clearAnimationAfter: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/variable'
  @import '~common/css/mixin'
  .app
    position fixed
    top 0
    left 0
    right 0
    bottom $size(64)
</style>
