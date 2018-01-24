<template scope="scope">
    <el-col :span="2">
      <el-menu :default-active="menuItems[0].index" theme="light" class="el-menu-vertical-demo" @select="handleSelect">
        <el-menu-item v-for="item in menuItems" :index="item.index" :key="item.index" >{{item.content}}</el-menu-item>
        <!--<el-menu-item id='buttom' index="1-1"></el-menu-item>-->
      </el-menu>
    </el-col>
</template>

<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElCol},
    props: ['menuItems','sendVisible','receiveVisible'],
    data() {
      return {
        selfSendVisible: this.sendVisible,
        selfReceiveVisible: this.receiveVisible,
      }
    },
    watch: {
      sendVisible (newValue) {
        this.selfSendVisible = newValue;
      },
      receiveVisible (newValue) {
        this.selfReceiveVisible = newValue;
      }
    },
    methods: {
      handleSelect (index) {
        if (index==="send"){
          this.$emit('updateSendVisible',true);
          this.$emit('updateReceiveVisible',false)
        }else {
          this.$emit('updateSendVisible',false);
          this.$emit('updateReceiveVisible',true)
        }
      },
    }
  }
</script>


<style lang="stylus" scoped>
  .el-menu-item
    margin-top 10px
    font-size  20px
  #buttom
    height 400px
</style>
