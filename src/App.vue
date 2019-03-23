<template>
  <div id="app">
    <app-bottom></app-bottom>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
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
