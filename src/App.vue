<template>
  <keep-alive>
    <div id="app">
      <app-bottom></app-bottom>
      <router-view/>
    </div>
  </keep-alive>
</template>

<script>
import appBottom from 'base/app-bottom/app-bottom'
export default {
  name: 'App',
  components: {
    appBottom
  }
}
</script>

<style></style>
