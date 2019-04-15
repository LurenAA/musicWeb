<template>
  <div class = 'container'>

  </div>
</template>

<script>
import json from 'api/json.js'
export default {
  name: 'dist',
  activated () {
    json(`http://132.232.249.69:3000/home/dist?vid=${this.$route.params.id}`, 'GET').then(res => {
      console.log(JSON.parse(res))
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/index'
  .container
    display flex
    flex-direction column
    z-index 22
    position fixed
    top 0
    left 0
    right 0
    bottom 0
</style>
