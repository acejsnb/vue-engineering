<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Input组件</h1>
            <Input
                    title="用户名"
                    required="true"
                    type="text"
                    placeholder="请输入用户名"
                    maxlength="10"
                    v-model="inputUsername"
            />
            <Input
                    title="密码"
                    required="true"
                    type="password"
                    placeholder="请输入密码"
                    maxlength="8"
                    v-model="inputPassword"
            />
            <Input
                    type="text"
                    placeholder="请输入"
            />
            <Button type="normal" @touchend="inputValueFn">inputValue</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputView",
        data() {
            return {
                inputUsername: '',
                inputPassword: '',
            }
        },
        methods: {
            inputValueFn() {
                console.log('username', this.inputUsername);
                console.log('password', this.inputPassword);
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
