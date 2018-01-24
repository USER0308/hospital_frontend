<template>
  <div id="app">
    <TitleNav></TitleNav>
    <router-view></router-view>
  </div>
</template>

<script>
import TitleNav from './components/TitleNav'
export default {
  name: 'app',
  components: {
    TitleNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
