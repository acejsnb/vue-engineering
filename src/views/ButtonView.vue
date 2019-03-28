<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Button组件</h1>
            <div class="btn">
                <Button :type="type" @touchend="defaultClick">{{type}}</Button>
                <Button type="normal" @touchend="normalClick">normal</Button>
                <Button type="warning">warning</Button>
                <Button type="error">error</Button>
                <Button type="disabled" :loading="false">disabled</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonView",
        data() {
            return {
                type: 'default',
            }
        },
        methods: {
            defaultClick() {
                console.log('default');
                if (this.type==='default') this.type='disabled';
                else this.type='default';
            },
            normalClick() {
                console.log('normal')
            },
        }
    }
</script>

<style lang="stylus" scoped>
.s-btn
  margin-bottom 16px
</style>
