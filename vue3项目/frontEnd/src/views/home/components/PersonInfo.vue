<template>
  <div>
    <!-- 个人信息页面 -->
    <el-descriptions direction="vertical" :column="5" border>
      <el-descriptions-item
        v-for="item in personInfo"
        :key="item.label"
        :label="item.label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/modules/authStore.js'
import { perosnMap } from '@/utils/mapTable.js'

//生命周期
onMounted(() => {
  getPerson()
})

const personInfo = reactive([])
// 获取用户信息
const getPerson = async () => {
  const getAuthStore = await useAuthStore()
  if (getAuthStore.userInfo && getAuthStore.userInfo.id) {
    for (const key in getAuthStore.userInfo) {
      if (perosnMap[key]) {
        let obj = {
          label: perosnMap[key],
          value: getAuthStore.userInfo[key]
        }
        personInfo.push(obj)
      }
    }
  }
}
</script>
