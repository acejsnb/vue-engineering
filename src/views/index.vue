<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {routes} from '@/scripts/mergeRoutes';

</script>

<template>
    <h1>Index</h1>
    <main>
        <div class="left">
            <RouterLink v-for="item in routes" :key="item.path" :to="item.path">{{item.name}}</RouterLink>
        </div>
        <div class="right"></div>
    </main>
</template>

<style scoped>
h1 {
  font-size: 20px;
  color: #000;
}
main {
  display: flex;
}
.left {
  display: flex;
  flex-direction: column;
  width: 224px;
}
.right {
  width: calc(100% - 224px);
}
</style>
