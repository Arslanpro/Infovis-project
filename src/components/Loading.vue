<template>
  <div id="loading">
    <h1 class="caption">Loading...</h1>
    <div class="loading-svg"></div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.caption {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 16vw;
  text-align: center;
  z-index: 1000;
}
.loading-svg {
  position: fixed;
  left: 0;
  top: 0;
  background: url('~@/assets/loading-infinity.svg') center center no-repeat #fff;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
</style>
