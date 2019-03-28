<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Message组件</h1>
            <Button type="default" @touchend="messageInfo">info</Button>
            <Button type="normal" @touchend="messageSuccess">success</Button>
            <Button type="warning" @touchend="messageWarning">warning</Button>
            <Button type="error" @touchend="messageError">error</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageView",
        methods: {
            messageInfo() {
                this.$message.info('这是一条消息');
            },
            messageSuccess() {
                this.$message.success('Oh,yes');
            },
            messageWarning() {
                this.$message.warning('Oh,no');
            },
            messageError() {
                this.$message({
                    type: 'error',
                    message: '错了哦，这是一条错误消息'
                });
            },
        }
    }
</script>

<style lang="stylus" scoped>
.s-btn
  margin-bottom 16px
</style>
