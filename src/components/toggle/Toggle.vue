<template>
    <div
            :class="['s-toggle', value?'s-toggle-on':'s-toggle-off']"
            @touchend="handleToggle"
    >
        <input type="checkbox" :value="value" />
    </div>
</template>

<script>
    export default {
        name: "Toggle",
        props: {
            value: {
                type: Boolean,
                default: true
            }
        },
        model: {
            props: 'value',
            event: 'change'
        },
        methods: {
            handleToggle() {
                this.$emit('change', !this.value)
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-toggle
  position relative
  width 52px
  height 32px
  border-width 2px
  border-style solid
  border-radius (@height/2)
  &:before
    content ''
    position absolute
    top 1px
    display block
    background-color $default
    width 26px
    height @width
    border-radius (@height/2)
    box-shadow 0 2px 7px rgba(0,0,0,.35), 0 1px 1px rgba(0,0,0,.15)
    transition right 200ms, background-color 200ms
  input
    display none
    width 0
    height 0
.s-toggle-off
  background-color $default
  border-color #e6e6e6
  &:before
    right 21px
.s-toggle-on
  background-color $normal
  border-color $normal
  &:before
    right 1px

</style>
