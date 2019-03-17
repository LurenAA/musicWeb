<template>
  <div class = 'container'>
    5
  </div>
</template>

<script>
import json from 'api/json.js'
export default {
  name: 'recommend',
  mounted () {
    json('http://localhost:3000', 'GET').then(res => {
      console.log(res.responseText)
    })
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
