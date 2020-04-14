<template>
    <div id="app" class="login_contain">
        <el-card class="box-card" show="always">
           <div class="avatar">
                <el-avatar :size="100" :src="circleUrl"/>
           </div>
           <div class="login_form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input placeholder="用户名" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button class="button_reset" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
                </el-form>
           </div>
        </el-card>
    </div>
</template>>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        username: [
          { requir: true, message: '输入用户名', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 3, max: 15, message: '用户名应在5到15字符之间', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const result = await this.$ajax.post('http://localhost:4001/logintest', this.ruleForm)
          // .then((response) => {console.log(response)})
          console.log('账户检测返回的值:' + result.data.data.principal)
          console.log('账户检测codez值:' + result.data.code)
          if (result.data.code === 200) {
            window.sessionStorage.setItem('token', result.data.data.principal)
            this.$router.push('/home')
            this.$notify({
              title: result.data.message,
              message: result.data.message,
              type: 'success',
              offset: 100
            })
          } else {
            this.$notify({
              title: result.data.message,
              message: result.data.message,
              offset: 100
            })
            console.log('error')
          }
        } else {
          console.log('error submit!!')
          this.$refs[formName].resetFields()
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
    .login_contain{
        width: 300px;
        height: 30%;
        position: absolute;
        margin: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .button_reset{
        float: right;
    }
    .box-card{
        height: 100%;
    }
    .avatar{
        position: absolute;
        left: 50%;
        transform: translate(-50%,-60%);
    }
    .login_form{
        position: absolute;
        width: 85%;
        top: 30%;
    }
</style>
