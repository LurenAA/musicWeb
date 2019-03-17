<template>
  <div class = 'app'>
    <home-head></home-head>
    <home-tabs></home-tabs>
    <router-view/>
  </div>
</template>

<script>
import homeHead from 'base/home-head/home-head'
import homeTabs from 'base/home-tabs/home-tabs'
export default {
  name: 'home-page',
  components: {
    homeHead,
    homeTabs
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/css/variable'
  @import '~common/css/mixin'
  .app
    position fixed
    top 0
    left 0
    right 0
    bottom 0
</style>
