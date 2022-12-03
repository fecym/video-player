<template>
  <el-menu :default-active="activeName" mode="horizontal" router>
    <el-menu-item
      :index="item.name"
      v-for="item in menus"
      :key="item.name"
      :route="item.path"
      >{{ item.title }}</el-menu-item
    >
  </el-menu>
  <router-view />
</template>

<script setup>
import { routes } from "@/router";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const menus = computed(() => routes);
const activeName = ref("");

watchEffect(() => {
  if (route.name) {
    activeName.value = route.name;
  }
});
</script>

<style>
* {
  padding: 0;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
.el-menu {
  margin-bottom: 20px;
}
</style>
