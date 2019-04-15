<template>
  <div class = 'containerY'>
    <header>
      <div class = 'wrapper'>
        <span>地区&nbsp;：&nbsp;</span>
        <div ref = 'divOne'>
          <ul ref = 'ulOne'>
            <li v-for = '(item,index) in area' :key = 'index'
            :class = '{areaActive: curArea === index}' @click = 'changeIndex(index)'>
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class = 'wrapper'>
        <span>版本&nbsp;：&nbsp;</span>
        <div ref = 'divSec'>
          <ul ref = 'ulSec'>
            <li v-for = '(item,index) in version' :key = 'index'
             :class = '{areaActive: curVersion === index}' @click = 'changeIndex(index, 1)'>
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class = 'ul-wrapper' ref = 'list-scroll'>
      <ul>
        <li v-for = '(item, index) in list' :key = 'index' @click = 'seeMvDetail(item)'>
          <div class = 'img-wrapper'>
            <img :src="item.picurl">
          </div>
          <h1>{{ item.title }}</h1>
          <p class = 'mem-sin'>{{ sliceSingersName(item.singers) }}</p>
          <p class = 'play-count'>播放次数：{{ item.playcnt}}</p>
        </li>
      </ul>
    </div>
    <loading v-show = 'loading'></loading>
  </div>
</template>

<script>
import json from 'api/json.js'
import MScroll from 'common/js/min-slider/index'
import { sliceSingersName } from 'common/js/util/util'
import { mapMutations } from 'vuex'
import loading from 'base/loading/loading'

export default {
  name: 'mv',
  components: {
    loading
  },
  methods: {
    caculateWidth: function (ele) {
      let children = ele.children
      let width = 0
      for (let i = 0, len = children.length; i < len; i++) {
        let tmp = window.getComputedStyle(children[i])
        width += children[i].offsetWidth + parseInt(tmp['margin-left']) + parseInt(tmp['margin-right'])
      }
      ele.style.width = width + 'px'
    },
    getPageInfo () {
      this.loading = true
      json(`http://132.232.249.69:3000/home/homeMv?version_id=${this.version[this.curVersion].id}&area_id=${this.area[this.curArea].id}`, 'GET').then(res => {
        res = JSON.parse(res)
        this.list = res['mv_list'].data.list
        this.loading = false
      }).catch((err) => {
        console.log(err)
      })
    },
    ...mapMutations({
      changeMv: 'CHANGE_MV',
      changePlayState: 'CHANGE_MUSICPLAYSTATE'
    }),
    changeIndex (index, val) {
      if (val) {
        this.curVersion = index
      } else {
        this.curArea = index
      }
    },
    sliceSingersName (singer) {
      return sliceSingersName(singer)
    },
    seeMvDetail (item) {
      setTimeout(function () {
        this.changeMv(item)
        this.changePlayState(false)
      }.bind(this), 600)
      this.$router.push({name: 'mv-detail-page', params: {id: item.vid}})
    }
  },
  mounted () {
    this.$nextTick(() => {
      json('http://132.232.249.69:3000/home/homeMvTag', 'GET').then((res) => {
        res = JSON.parse(res)
        console.log(res)
        this.area = res['mv_tag'].data.area
        this.version = res['mv_tag'].data.version
        this.list = res['mv_list'].data.list
        this.loading = false
        setTimeout(function () {
          this.caculateWidth(this.$refs.ulOne)
          this.caculateWidth(this.$refs.ulSec)
          this.areaScroll = new MScroll(this.$refs.divOne, {
            scrollX: true,
            dispatchClick: true
          })
          this.areaScrollSec = new MScroll(this.$refs.divSec, {
            scrollX: true,
            dispatchClick: true
          })
          this.scrollList = new MScroll(this.$refs['list-scroll'], {
            scrollY: true,
            dispatchClick: true
          })
        }.bind(this), 300)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  data () {
    return {
      area: [],
      version: [],
      curArea: 0,
      curVersion: 0,
      list: [],
      loading: true
    }
  },
  watch: {
    curArea (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getPageInfo()
      }
    },
    curVersion (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getPageInfo()
      }
    }
  },
  activated () {
    if (this.areaScroll) {
      this.areaScroll.enable()
    }
    if (this.areaScrollSec) {
      this.areaScrollSec.enable()
    }
    if (this.scrollList) {
      this.scrollList.enable()
      this.scrollList.scrollTo(0, 0, '', true)
    }
  },
  deactivated () {
    if (this.areaScroll) {
      this.areaScroll.disable()
    }
    if (this.areaScrollSec) {
      this.areaScrollSec.disable()
    }
    if (this.scrollList) {
      this.scrollList.disable()
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
    .ul-wrapper
      background-color #fff
      padding 0 3%
      border-top 1px solid rgba(0,0,0,0.15)
      position fixed
      left 0
      right 0
      bottom $size(64)
      top 85.6 + 80 px
      overflow hidden
      ul
        padding 10px 0
        min-height 300px
        display flex
        flex-wrap wrap
        justify-content space-between
        li
          flex-basis 47.5%
          flex-shrink 0
          display flex
          flex-direction column
          overflow hidden
          padding-bottom 15px
          h1
            text-indent 2px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            margin 5px 15px 5px 0
          p
            text-indent 2px
          .play-count
            font-size $font-size-medium
            color #a2a2a2
          .mem-sin
            margin-bottom 5px
            color #8a53e4
            font-size $font-size-medium
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          .img-wrapper
            width 100%
            height 0
            padding-bottom 24.5vw
            overflow hidden
            img
              width 100%
    header
      padding 0 10px
      background-color #fff
      .wrapper
        overflow hidden
        padding 5px 0
        white-space nowrap
        font-size 0
        span
          font-size 0.28rem
          background-color #fff
          vertical-align middle
        div
          vertical-align middle
          overflow hidden
          line-height 1.2
          font-size 0.28rem
          position relative
          display inline-block
          max-width 280px
          ul
            white-space nowrap
            li
              display inline-block
              margin 0 10px
              padding 8px 10px
              &.areaActive
                background-color #a927ed
                color #fff
</style>
