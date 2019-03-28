<template>
    <button type="button" :class="`s-btn s-btn-${type}`" @touchend="handleTouchend">
        <span class="loading" v-if="loading"></span>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            type: {
                type: String,
                required: true,
                default: ''
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleTouchend(evt) {
                if (this.type !== 'disabled') this.$emit('touchend', evt);
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-btn
  display block
  padding 10px 16px
  border-width 1px
  border-style solid
  border-radius 4px
  font-size 16px
  width 100%
  -webkit-tap-highlight-color rgba(0,0,0,0)
  tap-highlight-color rgba(0,0,0,0)
  transition background-color .5s
  /*&+.s-btn*/
    /*margin-top 16px*/
  .loading
    display inline-block
    vertical-align middle
    width 16px
    height @width
    background url("~icon/loading.gif") no-repeat center/16px
.s-btn-normal
  background-color $normal
  border-color $normal
  color $default
  cursor pointer
  &:hover
    background-color $normal_hover
    border-color $normal_hover
  &:active
    background-color $normal_mousedown
    border-color $normal_mousedown
.s-btn-warning
  background-color $warning
  border-color $warning
  color $default
  cursor pointer
  &:hover
    background-color $warning_hover
    border-color $warning_hover
  &:active
    background-color $warning_mousedown
    border-color $warning_mousedown
.s-btn-default
  background-color $default
  border-color $normal
  color $normal
  cursor pointer
  &:hover
    background-color $default
    border-color $normal_hover
    color $normal_hover
  &:active
    background-color $default
    border-color $normal_mousedown
    color $normal_mousedown
.s-btn-error
  background-color $default
  border-color $error
  color $error
  cursor pointer
  &:hover
    border-color $error_hover
    color $error_hover
  &:active
    background-color $default
    border-color $error_mousedown
    color $error_mousedown
.s-btn-disabled
  background-color $bg_color
  border-style dashed
  color $text_content
  cursor not-allowed

</style>
