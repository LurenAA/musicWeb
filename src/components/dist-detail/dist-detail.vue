<template>
  <transition>
    <div class = 'container'>
      <header class = 'header'>
        <div class = 'icon-back' @click = 'returnBack'>
          <i class = 'iconfont'>&#xe644;</i>
        </div>
        <h1>{{ this.title }}</h1>
      </header>
      <div class="showImg">
        <img :src = 'this.logo'>
      </div>
      <loading v-show = 'showflag'></loading>
      <div class = 'list' ref = 'list'>
        <ul>
          <li v-for = '(item, index) in songlist' :key = 'index' @click = 'chooseSong(item)'>
            <div class = 'img-div'>
              <img v-lazy = 'getImgUrl(item.albummid)'>
            </div>
            <div class = 'img-des'>
              <span class = 'songName'>{{ item.songname }}</span>
              <span class = 'songDes'>{{ sliceSingersName(item.singer)}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import loading from 'base/loading/loading'
import json from 'api/json.js'
import { mapMutations } from 'vuex'
import MScroll from 'common/js/min-slider/index'
import { sliceSingersName } from 'common/js/util/util'
import Song from 'common/js/song/song'
export default {
  name: 'dist',
  mounted () {
    this.$nextTick(() => {
      this.$refs.list.style.top = (window.innerWidth * 0.7) + 'px'
    })
    setTimeout(() => {
      this.scrollY = new MScroll(this.$refs.list, {
        loop: false,
        slider: false,
        scrollX: false,
        scrollY: true,
        dispatchClick: true
      })
    }, 200)
  },
  activated () {
    json(`http://132.232.249.69:3000/home/dist?vid=${this.$route.params.id}`, 'GET').then(res => {
      res = JSON.parse(res).cdlist[0]
      this.scrollY.scrollTo(0, 0, '', true)
      this.title = res.dissname
      this.logo = res.logo
      this.songlist = res.songlist
      // console.log(res)
      setTimeout(() => {
        this.showflag = false
        this.scrollY.refresh()
      }, 0)
    })
  },
  deactivated () {
    this.title = ''
    this.logo = ''
    this.showflag = true
    this.songlist = []
  },
  data () {
    return {
      title: '',
      logo: '',
      showflag: true,
      songlist: []
    }
  },
  methods: {
    returnBack () {
      this.$router.go(-1)
    },
    getImgUrl (mid) {
      return `http://y.gtimg.cn/music/photo_new/T002R90x90M000${mid}.jpg?max_age=2592000`
    },
    sliceSingersName (i) {
      return sliceSingersName(i)
    },
    chooseSong (item) {
      let newSong = new Song({
        name: item.songname,
        mid: item.songmid,
        pic: this.getImgUrl(item.albummid),
        singer: sliceSingersName(item.singer),
        int: item.interval
      })
      this.setSong(newSong)
      this.showFlag(true)
    },
    ...mapMutations({
      setSong: 'SET_SONG',
      showFlag: 'CHANGE_IFSHOWPLAYER'
    })
  },
  components: {
    loading
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
    .showImg
      width 100%;
      padding-bottom 70%;
      height 0
      overflow hidden
      border-radius 0 0 4px 4px
      img
        width 100%
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
        color #fff
      .icon-back
        position absolute
        left 0
        top 5px
        padding-left 8px;
        align-items center;
        i
          font-size 24px;
          color #fff
</style>
