<template>
  <div>
    <el-container style="height: 100%">
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
            <el-button type="primary" plain @click="openPersonInfo">
              个人中心
            </el-button>
            <el-button type="danger" plain @click="logout">
              退出系统
            </el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu style="height: 100%" :default-active="defaultActive">
            <el-menu-item
              :index="item.id"
              v-for="item in allMenu"
              :key="item.id"
            >
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { defineProps, reactive, ref, toRefs, onMounted, h, nextTick } from 'vue'

// 路由
import { useRouter } from 'vue-router'
const router = useRouter()

// pinia
import { useAuthStore } from '@/stores/modules/authStore.js'
const { setToken } = useAuthStore()

// 组件
import PersonInfo from '@/views/personInfo/index.vue'

import { getMenuList } from '@/api/menu'

// heard -----------------
const headerState = reactive({
  searchVal: ''
})
const { searchVal } = toRefs(headerState)
//搜索
const searchFunc = () => {}
// 打开个人信息
const openPersonInfo = () => {
  ElMessageBox({
    title: '个人中心',
    message: h(PersonInfo),
    confirmButtonText: '关闭',
    customStyle: {
      width: 'max-content', // 关键设置：自适应内容宽度
      maxWidth: '90%', // 最大宽度限制（响应式）
      minWidth: '300px' // 最小宽度
    }
  })
}
// 退出登录
const logout = () => {
  router.push('/login')
  // 清除token和用户信息
  setToken({
    token: null,
    userInfo: {}
  })
}

// 左侧菜单 -----------------
const menuState = reactive({
  defaultActive: '',
  allMenu: [] // 左侧菜单数据
})
const { allMenu, defaultActive } = toRefs(menuState)

//获取左侧菜单
const getMenu = async () => {
  const res = await getMenuList()
  if (res && res.data) {
    allMenu.value = res.data
    defaultActive.value = res.data[0].id
    // 路由跳转
    router.push({
      path: res.data[0].internal_name,
      query: { id: res.data[0].id }
    })
  }
}
getMenu()
</script>

<style lang="less" scoped>
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
