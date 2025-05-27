<template>
  <div class="login-box">
    <div class="login-form">
      <h1 style="text-align: center; color: #303133">登录界面</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { login, getPublicKey } from '@/api/login'
import { JSEncrypt } from 'jsencrypt' // 导入 JSEncrypt

// 引入pinia
import { useAuthStore } from '@/stores/modules/authStore.js'
const getAuthStore = useAuthStore()
const { setToken } = getAuthStore

// 引入路由
import { useRouter } from 'vue-router'
const router = useRouter()

let ruleFormRef = ref()
const ruleForm = reactive({
  username: '912057425@qq.com',
  password: 'yangfeng123.'
})
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})
// 重置
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
// 提交
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      getPublicKey().then((res) => {
        if (res && res.publicKey) {
          let encryptor = new JSEncrypt() // 新建JSEncrypt对象
          encryptor.setPublicKey(res.publicKey) // 设置公钥
          let rsaPassWord = encryptor.encrypt(ruleForm.password) // 对需要加密的数据进行加密

          let req = {
            username: ruleForm.username,
            password: rsaPassWord //前端加密密码
          }
          login(req)
            .then((res) => {
              if (res && res.token) {
                // 保存token
                setToken({
                  token: res.token,
                  userInfo: res.userInfo
                })
                // 跳转到首页
                router.push('/')
              }
            })
            .catch((err) => {
              ElNotification({
                title: 'Warning',
                message: err.message,
                type: 'warning'
              })
            })
        }
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 400px;
    padding: 100px;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
