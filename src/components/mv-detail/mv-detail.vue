<template>
  <div class = 'container'>
    <video ></video>
  </div>
</template>

<script>
import { jsonp, mvParams } from '@/api/jsonp'
export default {
  name: 'mv-detail',
  activated () {
    jsonp('https://u.y.qq.com/cgi-bin/musicu.fcg', mvParams(this.$route.params.id))
      .then(res => {
        this.playList = res.getMvUrl[Object.keys(res.getMvUrl)[0]].mp4
      })
      .catch(err => {
        console.log(err)
      })
  },
  data () {
    return {
      playList: []
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .container
    background-color $background-color
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    overflow hidden
</style>
