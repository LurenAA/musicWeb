<template>
  <div class = 'container'>
    <slider v-if = 'sliderFlag' :slider = slider></slider>
  </div>
</template>

<script>
import json from 'api/json.js'
import slider from 'base/slider/slider'
export default {
  name: 'recommend',
  data () {
    return {
      slider: [],
      sliderFlag: false
    }
  },
  mounted () {
    json('http://localhost:3000/home', 'GET').then(res => {
      let x = JSON.parse(res)
      console.log(x)
      this.slider = x.focus.data.content
      this.sliderFlag = true
    })
  },
  components: {
    slider
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index.styl'
  .container
    background-color $background-color
    position absolute
    top 1.6rem
    bottom 0
    left 0
    right 0
</style>
