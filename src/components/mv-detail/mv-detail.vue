<template>
  <transition>
    <div class = 'container'>
      <video-player :url = 'mvUrl' @changeUrl = 'changeMvUrl'></video-player>
    </div>
  </transition>
</template>

<script>
import { jsonp, mvParams } from '@/api/jsonp'
import videoPlayer from 'base/video-player/video-player'
import { mapGetters } from 'vuex'
export default {
  name: 'mv-detail',
  components: {
    videoPlayer
  },
  computed: {
    ...mapGetters([
      'mv'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.path === '/') {
        vm.$router.push({name: 'home-page'})
      }
    })
  },
  activated () {
    if (!this.mv) {
      return
    }
    jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg', mvParams(this.$route.params.id))
      .then(res => {
        this.playList = res.getMvUrl.data[Object.keys(res.getMvUrl.data)[0]].mp4
        this._findavailable()
        this.changeMvUrl()
      })
      .catch(err => {
        console.log(err)
      })
  },
  data () {
    return {
      playList: [],
      availableMvUrl: [],
      mvUrl: null,
      mvIndex: 0
    }
  },
  methods: {
    _findavailable () {
      this.availableMvUrl = []
      for (let x = 0, len = this.playList.length; x < len; x++) {
        this.availableMvUrl = this.availableMvUrl.concat(this.playList[x].freeflow_url)
      }
    },
    changeMvUrl: function () {
      if (this.mvIndex === this.availableMvUrl.length) {
        this.mvUrl = 'error'
      } else {
        this.mvUrl = this.availableMvUrl[this.mvIndex++]
      }
    },
    change: function () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .v-enter
  .v-leave-to
    transform translateX(100%)
  .v-enter-active
  .v-leave-active
    transition all 0.5s
  .container
    background-color $background-color
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 20
    overflow hidden
</style>
