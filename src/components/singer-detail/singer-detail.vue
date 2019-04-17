<template>
  <transition>
    <div class = 'container'>
      <header class = 'header'>
        <div class = 'icon-back' @click = 'returnBack'>
          <i class = 'iconfont'>&#xe644;</i>
        </div>
        <h1>{{ this.singer.singer_name }}</h1>
      </header>
      <div class="showImg">
        <img :src = 'this.singer.singer_pic'>
      </div>
      <div class = 'list' ref = 'list'>
        <ul>
          <li v-for = '(item, index) in list' :key = 'index' @click = 'chooseSong(item)'>
            <div class = 'img-div'>
              <img v-lazy = 'getImgUrl(item.musicData.albummid)'>
            </div>
            <div class = 'img-des'>
              <span class = 'songName'>{{ item.musicData.songname }}</span>
              <span class = 'songDes'>{{ sliceSingersName(item.musicData.singer)}}</span>
            </div>
          </li>
        </ul>
      </div>
      <loading v-show = 'showflag'></loading>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { sliceSingersName } from 'common/js/util/util'
import json from 'api/json.js'
import MScroll from 'common/js/min-slider/index'
import loading from 'base/loading/loading'
import Song from 'common/js/song/song'

export default {
  name: 'singer-detail',
  components: {
    loading
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.list.style.top = (window.innerWidth * 0.7) + 'px'
      setTimeout(() => {
        this.scrollY = new MScroll(this.$refs.list, {
          loop: false,
          slider: false,
          scrollX: false,
          scrollY: true,
          dispatchClick: true
        })
      }, 200)
    })
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    sliceSingersName (i) {
      return sliceSingersName(i)
    },
    getImgUrl (mid) {
      return `http://y.gtimg.cn/music/photo_new/T002R90x90M000${mid}.jpg?max_age=2592000`
    },
    chooseSong (item) {
      let newSong = new Song({
        name: item.musicData.songname,
        mid: item.musicData.songmid,
        pic: this.getImgUrl(item.musicData.albummid),
        singer: sliceSingersName(item.musicData.singer),
        int: item.musicData.interval
      })
      this.setSong(newSong)
      this.showFlag(true)
    },
    ...mapMutations({
      setSong: 'SET_SONG',
      showFlag: 'CHANGE_IFSHOWPLAYER'
    })
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  activated () {
    setTimeout(() => {
      json(`http://132.232.249.69:3000/home/singerdetail?vid=${this.singer.singer_mid}`, 'GET').then(res => {
        res = JSON.parse(res)
        console.log(res)
        // this.list = res.data.list
        this.$set(this, 'list', res.data.list)
        setTimeout(() => {
          this.showflag = false
          this.scrollY.refresh()
          this.scrollY.scrollTo(0, 0, '', true)
        }, 0)
      })
    }, 0)
  },
  deactivated () {
    this.list = []
    this.showflag = true
  },
  data () {
    return {
      list: [],
      showflag: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index'
  .v-enter,
  .v-leave-to
    transform translateX(100%)
  .v-enter-active,
  .v-leave-active
    transition all 0.6s ease
  .container
    background #fff
    display flex
    flex-direction column
    z-index 22
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    .showImg
      width 100%;
      padding-bottom 70%;
      height 0
      overflow hidden
      border-radius 0 0 4px 4px
      img
        width 100%
    .list
      position fixed
      bottom 0
      left 0
      right 0
      overflow hidden
      ul
        padding 10px 15px;
        list-style none
        li
          display flex
          align-items center
          padding 10px 0
          border-bottom 1px solid rgba(0,0,0,0.05)
          .img-des
            padding-left 18px
            display flex
            // align-items center
            justify-content center
            flex-direction column
            .songName
              font-size 16px
              color rgba(0,0,0, 0.7)
            .songDes
              font-size 14px
              padding-top 8px
              color rgba(0,0,0, 0.7)
          .img-div
            flex-shrink 0
            width 65px
            height 65px
            overflow hidden
    .header
      position absolute
      top 0
      left 0;
      right: 0;
      padding-top 5px
      height 30px;
      line-height 30px;
      text-align center
      h1
        font-size 16px
        color #8a53e4
      .icon-back
        position absolute
        left 0
        top 5px
        padding-left 8px;
        align-items center;
        i
          font-size 24px;
          color #8a53e4
</style>
