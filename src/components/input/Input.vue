<template>
    <div class="s-input">
        <section class="s-input-title" v-if="required==='true' || required===true"><span>✱</span>{{title}}</section>
        <input
                :type="type"
                :placeholder="placeholder"
                :maxlength="maxlength"
                :value="value"
                @input="valueInput"
        />
    </div>
</template>

<script>
    export default {
        name: "Input",
        props: {
            title: {
                type: String,
                default: ''
            },
            required: {
                type: [String, Boolean],
                default: 'false'
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            maxlength: {
                type: [String, Number],
                default: 20
            },
            value: {
                type: String,
                default: ''
            }
        },
        model: { // 注意：value和input是默认值，可不写
            props: 'value',
            event: 'input'
        },
        methods: {
            valueInput(e) {
                this.$emit('input', e.target.value)
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-input
  display flex
  justify-content space-between
  align-items center
  padding 8px 12px
  background-color #fff
  width 100%
  .s-input-title
    width 50%
    font-size 16px
    color $text_title
    span
      margin-right 4px
      font-size 16px
      color $error
  input
    display block
    border 0
    background none
    outline none
    appearance none
    font-size 16px
    color $text_title
    width @width
    height 34px
  &+.s-input
    border-top 1px solid $br_color

</style>
