<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height:36px;">Please sign in</span>
        </div>
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item label="账号"  required="">
            <el-input v-model="form.account" placeholder="请输入账号" type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码" required="">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>



<script>
  export default{
    name: 'login',
    data () {
      return {
        form: {
          account: '',
          password: '',
        }
      }
    },
    methods: {
      Login () {
        let obj = {
          name: this.form.account,
          password: this.form.password
        }
        // this.$http.post('/auth/admin', obj) // 将信息发送给后端
        // .then((res) => { // axios返回的数据都在res.data里
//          if (res.data.success) { // 如果成功
        if (true) {
            // sessionStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
          this.$message({ // 登录成功，显示提示语
            type: 'success',
            message: '登录成功！'
          })
          console.log('login success')
          this.$router.push('/hospital') // 登录成功
          } else {
            this.$message.error(res.data.info)// 登录失败，显示提示语
            sessionStorage.setItem('demo-token', null) // 将token清空
          }
//        }, (eor) => {
//          this.$message.error('请求错误！')
//          sessionStorage.setItem('demo-token', null) // 将token清空
//        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-card
    margin-top 80px
    margin-bottom 200px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
  .el-menu-item
    margin-top 10px
    margin-left 20px
    font-size  25px
    margin-bottom 10px
</style>
