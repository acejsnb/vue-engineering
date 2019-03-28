<template>
  <div class="app">
    <div class="backBox">
      <section class="back" v-if="backShow">
        <img src="~icon/right.png" alt="" @touchend="backFn">
      </section>
      <section class="title">{{routeName}}</section>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        backShow: false, // 当前路由
        routeName: '' // 当前路由名字
      }
    },
    created() {
      const {path, name} = this.$route;
      this.routeName=name;
      if (path === '/componentLists') this.backShow = false;
      else this.backShow = true;
    },
    mounted() {
    },
    watch: {
      $route(to){
        // （监听路由变化）控制tab显示
        this.routeName=to.name;
        if (to.path === '/componentLists') this.backShow = false;
        else this.backShow = true;
      }
    },
    methods: {
      backFn() {
        // 返回上一页
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus">
  .app
    font-size 0
    .backBox
      position relative
      padding 16px
      box-shadow 0 3px 3px rgba(0,0,0,.1)
      .back
        position absolute
        left 16px
        top 16px
        img
          width 24px
          transform rotate(-180deg)
      .title
        text-align center
        color #000
        font-size 18px
        font-weight 600
    .component-padding
      padding 16px
    .component
      h1
        margin-bottom 8px
        font-size 20px

</style>
