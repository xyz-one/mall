<template>
  <h2 id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 轮播图 -->
    <home-swiper :banners="banners"></home-swiper>

    <!-- recommend展示 -->
    <recommend-view :recommends="recommends"></recommend-view>


  </h2>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar';
  import HomeSwiper from './childComp/HomeSwiper';
  import RecommendView from './childComp/RecommendView'

  import { getHomeMultidata } from '@/network/home';

  
  export default {
    name: "Home",
    data () {
      return {
        banners: [],  
        recommends: []
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView
    },
    created () {
      // 1. 请求多个数据
      getHomeMultidata().then(res => {
        // 请求轮播图数据
        this.banners = res.data.banner.list;
        // 请求 recommend 数据
        this.recommends = res.data.recommend.list;
      })  
    }

  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>