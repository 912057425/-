<template>
  <div class="html-card">
    <!-- 顶部标识及背景区域 -->
    <div class="card-header">
      <img :src="data.image" alt="HTML5 Logo" class="logo" />
    </div>
    <!-- 标签 -->
    <div class="tag">{{ `全 ${total} 回` }}</div>
    <!-- 标题及更新时间 -->
    <h2 class="card-title">{{ data.name }}</h2>
    <!-- 描述内容 -->
    <p class="description">{{ data.description }}</p>
    <!-- 点赞区域 -->
    <!-- <div class="like-area">
      <button class="like-btn" @click="toggleLike">
        <span v-if="isLiked">❤</span>
        <span v-else>♡</span>
      </button>
      <span class="like-count">{{ likeCount }}</span>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs } from 'vue'
import { getCourseChapters } from '@/api/menu'

// 生命周期
onMounted(() => {
  getChapter()
})

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

// const isLiked = ref(false)
// const likeCount = ref(5)

// const toggleLike = () => {
//   isLiked.value = !isLiked.value
//   if (isLiked.value) {
//     likeCount.value++
//   } else {
//     likeCount.value--
//   }
// }

const state = reactive({
  total: 0 // 总数
})
let { total } = toRefs(state)

//获取章节
const getChapter = async () => {
  const res = await getCourseChapters(props.data.id)
  console.log(res, 'res章节')
  if (res && res.pagination) {
    total.value = res.pagination.total
  }
}
</script>

<style scoped>
.html-card {
  width: 280px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: Arial, sans-serif;
  margin: 16px;
}

.card-header {
  width: 100%;
  height: 100px;
}

.logo {
  width: 100%;
  height: 100%;
}

.tag {
  background-color: #f5a623;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 8px;
  display: inline-block;
  font-size: 12px;
}

.card-title {
  margin: 0 8px;
  font-size: 16px;
}

.update-info {
  margin: 4px 8px;
  font-size: 12px;
  color: #999;
}

.description {
  margin: 8px;
  font-size: 14px;
  line-height: 1.4;
  max-height: 100px; /* 设置固定高度 */

  /* 多行文本溢出省略号 */
  display: -webkit-box; /* 必须 */
  -webkit-box-orient: vertical; /* 必须 */
  -webkit-line-clamp: 5; /* 显示的行数 */
  overflow: hidden; /* 超出内容隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 280px; /* 必须设置宽度或最大宽度 */
}

.like-area {
  display: flex;
  align-items: center;
  margin: 8px;
}

.like-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #ff6b6b;
}

.like-count {
  margin-left: 4px;
  font-size: 14px;
}
</style>
