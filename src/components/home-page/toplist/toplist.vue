<template>
  <div class = 'containerY' ref = 'containerY'>
    <ul class = 'content'>
      <li v-for = "(item, index) in recomPlaylist" :key = 'index' @click = 'gotoDis(item)'>
        <div class = 'img-div'>
          <img v-lazy = 'item.cover'>
        </div>
        <div class = 'des'>
          <h1>{{ item.title }}</h1>
          <h2>{{item.rcmdtemplate}} by {{ item.username }}</h2>
          <h3>播放&nbsp; ：&nbsp; {{item.listen_num}} 次</h3>
        </div>
      </li>
    </ul>
    <loading v-show = 'loading'></loading>
  </div>
</template>

<script>
import json from 'api/json.js'
import MScroll from 'common/js/min-slider/index'
import loading from 'base/loading/loading'
export default {
  name: 'toplist',
  components: {
    loading
  },
  methods: {
    gotoDis (item) {
      this.$router.push({name: 'dist-detail-page', params: {id: item.content_id}})
    }
  },
  mounted () {
    json('http://132.232.249.69:3000/home/recom', 'GET').then(res => {
      res = JSON.parse(res)
      console.log(res)
      this.recomPlaylist = res.recomPlaylist.data.v_hot
      this.loading = false
      setTimeout(() => {
        this.scrollY = new MScroll(this.$refs.containerY, {
          loop: false,
          slider: false,
          scrollX: false,
          scrollY: true,
          dispatchClick: true
        })
      }, 200)
    })
  },
  data () {
    return {
      recomPlaylist: [],
      loading: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .containerY
    background-color $background-color
    position absolute
    top 1.6rem
    bottom $size(64)
    left 0
    right 0
    overflow hidden
    .content
      padding 10px 10px;
      background-color #fff;
      li
        display flex;
        align-items center
        justify-content flex-start
        padding 5px 5px;
        .des
          padding-left 15px;
          h1
            font-size 16px
            margin-bottom 8px;
          h2,
          h3
            font-size 14px;
            color #999
            margin-bottom 6px;
        .img-div
          flex-shrink 0
          flex-grow 0
          width 100px;
          padding-bottom 100px;
          height: 0
          border-radius 3px
          overflow hidden
          img
            width 100%
</style>
