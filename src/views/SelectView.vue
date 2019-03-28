<template>
    <div class="Select">
        <div class="component component-padding">
            <h1>Select组件</h1>
            <Select
                    :data="dataSelect"
                    @touchend="selectedFn"
            >{{selectedVal}}</Select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectView",
        data() {
            return {
                dataSelect: [
                    {text: '宋江', id: 1},
                    {text: '鲁智深', id: 2},
                    {text: '吴勇', id: 3},
                    {text: '孙二娘', id: 4},
                    {text: '卢俊义', id: 5},
                    {text: '公孙胜', id: 6},
                    {text: '林冲', id: 7},
                    {text: '呼延灼', id: 8},
                    {text: '花荣', id: 9},
                    {text: '柴进', id: 10},
                    {text: '李应', id: 11},
                    {text: '朱仝', id: 12},
                    {text: '董平', id: 13},
                    {text: '关胜', id: 14},
                    {text: '时迁', id: 15},
                    {text: '时迁', id: 16},
                    {text: '时迁', id: 17},
                    {text: '时迁', id: 18},
                    {text: '时迁', id: 19},
                    {text: '时迁', id: 20},
                    {text: '时迁', id: 21},
                    {text: '时迁', id: 22},
                    {text: '时迁', id: 23},
                    {text: '时迁', id: 24},
                    {text: '时迁', id: 25},
                    {text: '时迁', id: 26},
                    {text: '时迁', id: 27},
                    {text: '时迁', id: 28},
                    {text: '时迁', id: 29},
                    {text: '时迁', id: 30},
                    {text: '时迁', id: 31},
                    {text: '貂蝉', id: 32},
                ],
                selectedVal: '请选择人物',
            }
        },
        methods: {
            selectedFn(d) {
                console.log('selected', d);
                this.selectedVal=d.text;
            },
        }
    }
</script>

<style lang="stylus" scoped>
.Select
  background-color #f5f5f5
</style>
