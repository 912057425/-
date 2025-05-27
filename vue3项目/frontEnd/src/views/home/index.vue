<template>
  <div class="common-layout">
    <div class="common-layout">
      <el-container>
        <el-header class="heard">
          <div>LOGO</div>
          <div class="heard-right">
            <el-input
              v-model="searchVal"
              placeholder="请输入搜索内容"
              style="width: 240px"
            >
              <template #suffix>
                <el-icon style="cursor: pointer">
                  <Search @click="searchFunc" />
                </el-icon>
              </template>
            </el-input>
            <div style="margin-left: 12px">
              <el-button type="primary" plain>个人中心</el-button>
              <el-button type="danger" plain>退出系统</el-button>
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { getPersonInfo } from '@/api/login'
import { useAuthStore } from '@/stores/modules/authStore.js'

import { defineProps, reactive, ref, toRefs, onMounted } from 'vue'

onMounted(() => {
  getPerson()
})

// 获取用户信息
const getPerson = async () => {
  const getAuthStore = await useAuthStore()
  if (getAuthStore.userInfo && getAuthStore.userInfo.id) {
    let res = await getPersonInfo(getAuthStore.userInfo.id)
    console.log(res, 'res登录信息')
  }
}

// 头部搜索框
const headerState = reactive({
  searchVal: ''
})
const { searchVal } = toRefs(headerState)
const searchFunc = () => {
  console.log('searchVal', searchVal.value)
}
</script>

<style scoped>
.heard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eae2d7;
}
.heard-right {
  display: flex;
}
</style>
