<template>
    <div class="ComponentLists">
        <List :data="listData" />
    </div>
</template>

<script>
    export default {
        name: "ComponentLists",
        data() {
            return {
                listData: [
                    {title: 'Button', more: '按钮', url: 'buttonView'},
                    {title: 'Alert', more: '弹窗', url: 'alertView'},
                    {title: 'Message', more: '信息提示', url: 'messageView'},
                    {title: 'List', more: '列表', url: 'listView'},
                    {title: 'Carousel', more: '轮播', url: 'carouselView'},
                    {title: 'Select', more: '滑动选择', url: 'selectView'},
                    {title: 'Input', more: 'input输入框', url: 'inputView'},
                    {title: 'Datepicker', more: '日期选择器', url: 'datepickerView'},
                    {title: 'Toggle', more: '开关', url: 'toggleView'},
                ],
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
