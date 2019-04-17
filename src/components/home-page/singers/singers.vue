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
    </header>
    <div class = 'ul-wrapper' ref = 'list-scroll'>
      <ul>
        <li v-for = '(item, index) in singerlist' :key = 'index'  @click = 'gotoSinger(item)'>
          <div class = 'img-div'>
            <img v-lazy = 'item.singer_pic'>
          </div>
          <span class = 'item-title'>{{ item.singer_name }}</span>
        </li>
      </ul>
    </div>
    <loading v-show = 'showflag'></loading>
  </div>
</template>

<script>
import loading from 'base/loading/loading'
import json from 'api/json.js'
import MScroll from 'common/js/min-slider/index'
import { mapMutations } from 'vuex'
export default {
  name: 'singers',
  mounted () {
    json('http://132.232.249.69:3000/home/singerslist', 'GET').then(res => {
      res = JSON.parse(res).singerList.data
      // console.log(res)
      this.area = res.tags.area
      this.singerlist = res.singerlist
      setTimeout(() => {
        this.showflag = false
        this.caculateWidth(this.$refs.ulOne)
        this.areaScroll = new MScroll(this.$refs.divOne, {
          scrollX: true,
          dispatchClick: true
        })
        this.scrollList = new MScroll(this.$refs['list-scroll'], {
          scrollY: true,
          dispatchClick: true
        })
      }, 0)
    })
  },
  components: {
    loading
  },
  data () {
    return {
      area: [],
      showflag: true,
      curArea: 0,
      singerlist: []
    }
  },
  methods: {
    ...mapMutations({
      'setSinger': 'SET_SINGER'
    }),
    gotoSinger (item) {
      this.$router.push({name: 'singer-detail-page', params: {id: item.singer_mid}})
      setTimeout(() => {
        this.setSinger(item)
      }, 0)
    },
    changeIndex (index) {
      this.curArea = index
      this.showflag = true
      json(`http://132.232.249.69:3000/home/singerslist?vid=${this.area[index].id}`, 'GET').then(res => {
        // console.log(JSON.parse(res))
        res = JSON.parse(res).singerList.data
        console.log(res)
        // console.log(res)
        // this.area = res.tags.area
        // this.singerlist = res.singerlist
        this.$set(this, 'singerlist', res.singerlist)
        setTimeout(() => {
          this.showflag = false
          this.scrollList.refresh()
          this.scrollList.scrollTo(0, 0, '', true)
        }, 0)
      })
    },
    caculateWidth: function (ele) {
      let children = ele.children
      let width = 0
      for (let i = 0, len = children.length; i < len; i++) {
        let tmp = window.getComputedStyle(children[i])
        width += children[i].offsetWidth + parseInt(tmp['margin-left']) + parseInt(tmp['margin-right'])
      }
      ele.style.width = width + 'px'
    }
  },
  activated () {
    if (this.areaScroll) {
      this.areaScroll.enable()
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
      top 42.8 + 80 px
      overflow hidden
      ul
        padding 10px 0
        min-height 300px
        display flex
        flex-wrap wrap
        justify-content space-between
        li
          flex-basis 33.3%
          flex-shrink 0
          display flex
          flex-direction column
          overflow hidden
          padding-bottom 15px
          align-items center
          .item-title
            padding-top 10px
            text-align center
          .img-div
            width 80px
            height 80px
            border-radius 50%
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
