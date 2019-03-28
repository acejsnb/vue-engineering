<template>
    <div class="s-select" @touchmove.prevent>
        <span class="s-select-name" @touchend="selectShow">
            <slot></slot>
        </span>
        <div class="s-select-mask"
             v-if="show"
             @touchend="selectShow"
        ></div>
        <div class="s-select-main" v-if="show" :style="{bottom: `${bottom}px`}">
            <section class="s-select-handle">
                <article class="s-select-cancel" @touchend.stop="selectShow">取消</article>
                <article class="s-select-confirm" @touchend.prevent="confirmFn">确定</article>
            </section>
            <section class="s-select-content"
                     @touchstart="touchStart"
                     @touchmove.prevent="touchMove"
                     @touchend="contentEnd"
                     :style="{
                         height: `${data.length*38}px`,
                         transition: `transform ${seconds}ms`,
                         transform: `translateY(${contentY}px)`
                     }"
            >
                <article
                        v-for="(item, ind) in data"
                        :key="item.id"
                        :class="`s-option ${index===ind&&'active'}`"
                        @touchend="optionEnd(ind)"
                >{{item.text}}</article>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Select",
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                show: false,
                bottom: -255,
                index: -1,
                startY: 0, // 点击开始位置
                moveY: 0, // 移动距离
                contentY: 0, // content偏移量
                contentActive: 0, // 记录content当前偏移
                seconds: 0, // 动画毫秒
                contentHeight: 202 // 列表高
            }
        },
        methods: {
            // 显示弹窗
            selectShow(e) {
                e.preventDefault();
                this.show=!this.show;
                setTimeout(() => {
                    if (this.show) {
                        this.bottom=0;
                    } else {
                        this.bottom=-255;
                        this.index=-1;
                        this.startY=0;
                        this.moveY=0;
                    }
                }, 0)
            },
            touchStart(e) {
                this.startY=e.changedTouches[0].pageY;
                if (this.data.length>5) this.seconds=0;
            },
            touchMove() {
                const move=event.changedTouches[0].pageY-this.startY;
                // this.moveY=Math.abs(move);
                this.moveY=move;

                // 监听滚动事件
                if (this.data.length > 5) {
                    this.contentY=this.contentActive+move;
                } else {
                    this.startY=0;
                }
            },
            // content选择事件
            contentEnd() {
                const len=this.data.length;
                this.seconds=300;
                if (len > 5) {
                    this.contentY+=this.moveY;
                    setTimeout(() => {
                        const max=len*38-202;
                        // const max=len*38-202+65;
                        if (this.contentY>=25) this.contentY=0;
                        if (this.contentY<=-max) this.contentY=-max;
                        this.contentActive=this.contentY;
                        this.startY=0;
                        this.moveY=0;
                    }, 0)
                }
            },
            // option选择事件
            optionEnd(ind) {
                if (this.moveY === 0) this.index=ind;
            },
            // 确定
            confirmFn() {
                if (this.index !== -1) this.$emit('touchend', this.data[this.index]);
                this.show=false
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-select
  width 100%
.s-select-name
  font-size 18px
  color $text_title
  width 100%
.s-select-mask
  position fixed
  bottom 0
  left 0
  z-index 100
  background-color rgba(0,0,0,.1)
  width 100%
  height 100%
.s-select-main
  position fixed
  //bottom -255px
  left 0
  z-index 101
  background-color $default
  width 100%
  max-height 255px
  overflow hidden
  transition bottom 300ms
  .s-select-handle
    display flex
    justify-content space-between
    position relative
    z-index 1
    padding 16px
    background-color $bg_color
    width 100%
    article
      font-size 16px
    .s-select-cancel
      color $text_content
    .s-select-confirm
      color $normal
  .s-select-content
    min-height 40px
    .s-option
      padding 8px 0
      border-bottom 1px solid $br_color
      text-align center
      font-size 16px
      color $text_title
      cursor pointer
      &:last-child
        border-bottom 0
    .active
      background-color $normal
      color #fff

</style>
