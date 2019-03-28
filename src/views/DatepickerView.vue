<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Datepicker组件</h1>
            <Datepicker
                    title="生日"
                    v-model="date"
                    range="2000-2099"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "DatepickerView",
        data() {
            return {
                date: '2019-10-01',
            }
        }
    }
</script>

<style lang="stylus" scoped>
.component
  background-color #f5f5f5

</style>
