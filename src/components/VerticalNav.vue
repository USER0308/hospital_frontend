<template scope="scope">
  <el-menu default-active="select" theme="light" class="el-menu-vertical" @select="handleSelect">
    <el-menu-item v-for="item in menuItems" :index="item.index" :key="item.index" >{{item.content}}</el-menu-item>
    <el-menu-item id='buttom'></el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    props: ['menuItems'],
    data() {
      return {

      }
    },
    methods: {
      handleSelect (index) {
        console.log(index)
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .el-menu-item
    margin-top 10px
    font-size  23px
  #buttom
    height 400px
</style>
