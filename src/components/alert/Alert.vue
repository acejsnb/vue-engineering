<template>
    <div class="s-alert" v-if="alertShow">
        <section class="s-alert-bg" @touchend="onClose"></section>
        <section class="s-alert-main">
            <article class="s-alert-title">
                <p>{{title}}</p>
                <span @touchend="onClose">✕</span><!--&#10005-->
            </article>
            <article class="s-alert-content">
                <p><i></i>{{content}}</p>
                <span>删除后数据不可恢复，若要继续，请点击确定！</span>
            </article>
            <article class="s-alert-buttons">
                <Button type="default" @touchend="onClose">取消</Button>
                <Button :type="type" @touchend="onConfirm" :loading="loading">确定</Button>
            </article>
        </section>
    </div>
</template>

<script>
    import Button from 'button';

    export default {
        name: "Alert",
        props: {
            alertShow: {
                type: Boolean,
                default: false,
                require: true
            },
            title: {
                type: String,
                default: '',
                require: true
            },
            content: {
                type: String,
                default: '',
                require: true
            },
            iconLoading: {
                type: Boolean,
                default: false
            }
        },
        components: { Button },
        data() {
            return {
                type: 'normal', // 确定按钮的type属性
                loading: false // 确定按钮的loading属性
            }
        },
        methods: {
            onClose() {
                this.$emit('close')
            },
            onConfirm() {
                if (this.iconLoading) {
                    this.type='disabled';
                    this.loading=true;
                }
                this.$emit('confirm')
            }
        },
        watch: {
            alertShow(val) { // alertShow值改变重置按钮状态
                if (!val) {
                    this.type='normal';
                    this.loading=false;
                }
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-alert-bg
  position fixed
  left 0
  top 0
  background-color rgba(0,0,0,.1)
  width 100%
  height 100%
.s-alert-main
  position fixed
  left $vw(48)
  top (100-(248/7.5)*2.2)vh
  background-color $default
  border-radius 4px
  width (100-(48/7.5)*2)vw
  animation bounceInDown 1s
.s-alert-title
  position relative
  border-bottom 1px solid $bg_color
  text-align center
  height 48px
  line-height @height
  p
   color $text_title
   font-size 20px
  span
    position absolute
    top 14px
    right @top
    color $text_content
    font-size 16px
    text-align center
    width 22px
    height @width
    line-height @width
    border-radius (@width/2)
    &:active
      color $normal
.s-alert-content
  margin 32px 16px 16px
  text-align center
  width 100%
  height 80px
  p
    margin-bottom 8px
    font-size 18px
    color $text_title
    line-height 26px
    i
      display inline-block
      vertical-align bottom
      width 30px
      height @width
      background url("~icon/warning.png") no-repeat center/30px
  span
    font-size 12px
    color $text_content
.s-alert-buttons
  display flex
  padding 0 24px 24px
  width 100%
  .s-btn
    width 50%
    &:first-child
      margin-right 16px

</style>
