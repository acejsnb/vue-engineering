<template>
    <div :class="`s-message s-message-${type}`" @touchend="clearTimer">
        <span class="text">{{message}}</span>
    </div>
</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                type: 'info',
                message: '',
                duration: 3, // 倒计时
                timer: null // 定时器名字
            }
        },
        mounted() {
            this.startTimer(); // 开启定时器
        },
        watch: {
            duration(newVal) {
                newVal === 0 && this.clearTimer();
            }
        },
        methods: {
            startTimer() { // 开启定时器
                this.timer = setInterval(() => {
                    this.duration=this.duration-1;
                }, 1000);
            },
            clearTimer() { // 关闭定时器
                this.timer && clearInterval(this.timer);
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-message
  position fixed
  top 32px
  left 10%
  display flex
  align-items center
  padding-left 16px
  padding-right 16px
  border-radius 4px
  width 80%
  height 48px
  line-height @height
  animation fadeInDown .5s
  &+.s-message
    margin-top 16px
  span
    padding-left 28px
    font-size 18px
.s-message-info
  background-color $normal_bg
  border 1px solid $normal_br
  span
    background url("~icon/info.png") no-repeat left top 10px/24px
    color $normal
.s-message-success
  background-color $success_bg
  border 1px solid $success_br
  span
    background url("~icon/success.png") no-repeat left top 10px/24px
    color $success
.s-message-warning
  background-color $warning_bg
  border 1px solid $warning_br
  span
    background url("~icon/warning.png") no-repeat left top 10px/24px
    color $warning
.s-message-error
  background-color $error_bg
  border 1px solid $error_br
  span
    background url("~icon/error.png") no-repeat left top 10px/24px
    color $error
</style>
