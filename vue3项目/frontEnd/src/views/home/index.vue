<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-menu-item index="2">Processing Center12313</el-menu-item>
          <el-menu-item index="3">Info</el-menu-item>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script setup>
defineProps({})
</script>

<style scoped></style>
