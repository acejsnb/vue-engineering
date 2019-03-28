<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Alert组件</h1>
            <div class="alertShow">
                <Button type="normal" @touchend="alertShowFn">alertShow</Button>
            </div>
            <Alert
                    :alertShow="alertShow"
                    title="弹窗提示"
                    content="确定要删除此列表吗？"
                    :iconLoading="true"
                    @close="alertClose"
                    @confirm="alertConfirm"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlertView",
        data() {
            return {
                alertShow: false,
            }
        },
        methods: {
            alertShowFn() {
                this.alertShow=true
            },
            alertClose() {
                this.alertShow=false
            },
            alertConfirm() {
                console.log('alertConfirm')
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>
