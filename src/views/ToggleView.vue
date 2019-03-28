<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Toggle组件</h1>
            <Toggle v-model="toggleVal" />
            <Toggle v-model="toggleVal2" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "ToggleView",
        data() {
            return {
                toggleVal: true,
                toggleVal2: false
            }
        },
        watch: {
            toggleVal(now, old) {
                if (now !== old) console.log(now);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.s-toggle~.s-toggle
  margin-top 8px

</style>
