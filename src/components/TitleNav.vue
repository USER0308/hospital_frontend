<template>
  <el-menu :default-active="activeIndex" theme="dark" class="top-menu" mode="horizontal" @select="handleSelect">
    <el-menu-item index="index">{{title}}</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: 'index',
        title: '数字健康平台'
      }
    },
    methods: {
      handleSelect (key) {
        //alert(key)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-menu-item
    margin-top 10px
    margin-left 20px
    font-size  25px
    margin-bottom 10px
</style>
