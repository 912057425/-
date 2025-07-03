<template>
  <div>
    <!-- 前端开发页面 -->
    <div class="content">
      <div v-for="item in frontEndData" :key="item.id">
        <HtmlCard :data="item"></HtmlCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, toRefs } from 'vue'
import HtmlCard from '@/components/HtmlCard.vue'
import { getCategoryCourses } from '@/api/menu'

// 路由
import { useRoute } from 'vue-router'
const route = useRoute()

//生命周期
onMounted(() => {
  getFrontEndData()
})

const state = reactive({
  frontEndData: []
})
const { frontEndData } = toRefs(state)
// 获取用户信息
const getFrontEndData = async () => {
  const res = await getCategoryCourses(route.query.id)
  if (res && res.data) {
    frontEndData.value = res.data
  }
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
