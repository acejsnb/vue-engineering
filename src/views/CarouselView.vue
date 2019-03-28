<template>
    <div class="Button">
        <div class="component">
            <h1>Carousel组件</h1>
            <Carousel :data="dataCarousel"></Carousel>
        </div>
    </div>
</template>

<script>
    import duizhang from 'images/duizhang.jpg';
    import leishen from 'images/leishen.jpg';
    import zuhe from 'images/zuhe.jpg';

    export default {
        name: "CarouselView",
        data() {
            return {
                dataCarousel: [
                    {img: duizhang},
                    {img: leishen, url: 'https://baidu.com'},
                    {img: zuhe, url: 'https://jd.com'}
                ]
            }
        },
    }
</script>

<style lang="stylus" scoped>
</style>
