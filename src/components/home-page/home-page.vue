<template>
  <div class = 'app'>
    <home-head></home-head>
    <home-tabs></home-tabs>
    <app-bottom></app-bottom>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import homeHead from 'base/home-head/home-head'
import homeTabs from 'base/home-tabs/home-tabs'
import appBottom from 'base/app-bottom/app-bottom'
export default {
  name: 'home-page',
  components: {
    homeHead,
    homeTabs,
    appBottom
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
    bottom $size(64)
</style>
