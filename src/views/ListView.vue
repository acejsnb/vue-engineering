<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>List组件</h1>
            <List :data="listData" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListView",
        data() {
            return {
                listData: [
                    {title: '已支付'},
                    {title: '未支付', more: '更多', url: 'https://baidu.com'},
                    {title: '售后', more: '查看', url: 'https://baidu.com'},
                ],
            }
        }
    }
</script>

<style lang="stylus" scoped>
.s-btn
  margin-bottom 16px
</style>
