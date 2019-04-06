<template>
  <div class = 'app'>
    <home-head @clickOne = 'clickOne' @load = 'getTarget'></home-head>
    <home-tabs></home-tabs>
    <app-bottom v-show = 'showBottomFlag'></app-bottom>
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
// import Boom from 'common/js/boomjs/boom'
import { mapMutations } from 'vuex'

export default {
  name: 'home-page',
  components: {
    homeHead,
    homeTabs,
    appBottom
  },
  created () {
    this.winHeight = window.innerHeight
  },
  activated () {
    window.addEventListener('resize', this.hanleEvent)
  },
  deactivated () {
    window.addEventListener('resize', this.hanleEvent)
  },
  data () {
    return {
      clickPlayerIcon: {},
      createAnimations: null,
      showBottomFlag: true
    }
  },
  methods: {
    hanleEvent (e) {
      if (e.type === 'resize') {
        let thisHeight = window.innerHeight
        if (thisHeight - this.winHeight < -140) {
          this.showBottomFlag = false
        } else {
          this.showBottomFlag = true
        }
      }
    },
    clickOne (e) {
      this.createAnimations.runAnimation(this.clickPlayerIcon, 'move', function () {
      // this.boom = new Boom(this.clickPlayerIcon)
        setTimeout(() => {
          this.triggerShow(true)
        }, 100)
      }.bind(this))
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
            scale: 3
          },
          '100%': {
            pos: [distPos.x, distPos.y],
            scale: 5
          }
        },
        duration: 500,
        // fillMode: 'forwards'
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
    position absolute
    top 0
    left 0
    right 0
    bottom 0
</style>
