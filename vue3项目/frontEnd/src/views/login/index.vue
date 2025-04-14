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

import { login } from '@/api/login'

let ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: ''
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
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(ruleForm).then((res) => {
        console.log(res)
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
