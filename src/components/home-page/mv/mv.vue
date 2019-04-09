<template>
  <div class = 'containerY'>
    <header>
      <ul>
        <li>

        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: 'mv',
  mounted () {
    this.$nextTick(() => {

    })
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
</style>
