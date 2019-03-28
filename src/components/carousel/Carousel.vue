<template>
    <div class="s-carousel">
        <section class="s-carousel-img" :style="{width: widthCarousel+'px', transition: transitionCarousel, left: leftCarousel+'px'}">
            <router-link v-for="(item, index) in data" :key="index" class="s-carousel-item" :to="item.url?item.url:''">
                <img :src="item.img" alt="" :data-index="index" @touchstart="imgStart" @touchmove="imgMove" @touchend="imgEnd">
            </router-link>
        </section>
        <section class="s-carousel-point" :style="{left: leftPoint+'%'}">
            <article v-for="(item, index) in data" :key="item.img+index" :class="{'active': active===index}"></article>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Carousel",
        props: {
            data: {
                type: Array,
                default: [],
                require: true
            }
        },
        data() {
            return {
                widthScreen: 0,
                transitionCarousel: 'left .5s',
                widthCarousel: '', // 轮播盒子宽
                leftCarousel: 0, // 轮播盒子离左边距离
                leftCarouselActive: 0, // 轮播盒子离左边距离当前状态
                leftPoint: '', // 小圆点左边距离
                startX: 0, // 手指按下的距离
                active: 0 // 小圆点高亮状态

            }
        },
        created() {
            this.computeFn(this.data.length);
        },
        methods: {
            computeFn(len) {
                const w=window.screen.width;
                this.widthScreen=w;
                this.widthCarousel=w*len*100;
                this.leftPoint=(w-(len*8)-(len-1)*6)/2/w*100;
            },
            imgStart(e) {
                this.transitionCarousel='none 0s';
                this.startX=e.changedTouches[0].pageX;
            },
            imgMove(e) {
                const moveX=e.changedTouches[0].pageX-this.startX;
                this.leftCarousel=this.leftCarouselActive+moveX;
            },
            imgEnd(e) {
                this.transitionCarousel='left .5s';

                const endX=e.changedTouches[0].pageX,
                    startX=this.startX,
                    index=Number(e.target.dataset.index),
                    x=endX-startX,
                    len=this.data.length,
                    w=this.widthScreen;

                if (Math.abs(x) < 20) {
                    this.leftCarousel=this.leftCarouselActive;
                    return;
                }
                if (x >= 0) {
                    if (index === 0) {
                        this.leftCarousel=-(len-1)*w;
                        this.active=len-1;
                    } else {
                        this.leftCarousel=-(index-1)*w;
                        this.active=index-1;
                    }
                } else if (x <= -20) {
                    if (index === len-1) {
                        this.leftCarousel=0;
                        this.active=0;
                    } else {
                        this.leftCarousel=-(index+1)*w;
                        this.active=index+1;
                    }
                }
                this.leftCarouselActive=this.leftCarousel;
            }
        }
    }
</script>

<style lang="stylus">
@import "~stylus/common.styl"

.s-carousel
  position relative
  background-color $bg_color
  overflow hidden
  width 100%

.s-carousel-img
  position relative
  .s-carousel-item
    display inline-block
    vertical-align middle
    width 100vw
    img
      width @width
      height auto

.s-carousel-point
  position absolute
  bottom 16px
  width auto
  .active
    background-color $normal_hover
  article
    display inline-block
    margin-right 6px
    background-color $default
    width 8px
    height @width
    border-radius (@width/2)
    &:last-child
      margin-right 0

</style>
