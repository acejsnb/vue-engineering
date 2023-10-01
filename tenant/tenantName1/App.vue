<script setup lang="ts">
import {ref } from 'vue';

import SvgVue from '@/assets/iconSvg/home.svg';
import BgPng from '@/assets/img/bg.png';
</script>

<template>
    <h1>Hello Tenant-1!</h1>
    <SvgVue />
    <img :src="BgPng" alt=""/>
    <router-view></router-view>
</template>

<style scoped>

</style>
