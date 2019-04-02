<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import player from 'base/music-player/music-player'
export default {
  name: 'App',
  components: {
    player
  }
}
</script>

<style lang="stylus" scoped>
</style>
