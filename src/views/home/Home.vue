<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" 
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"> 
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>

      <!-- recommend展示 -->
      <recommend-view :recommends="recommends"></recommend-view>

      <!-- Feature 展示 -->
      <feature-view/>

      <!-- TabControl 展示 -->
      <tab-control :titles="['流行', '新品', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>

      <!-- goodslist 展示 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  /**
   * 页面专属子组件
  **/
  // Home页面
  import HomeSwiper from './childComp/HomeSwiper';
  import RecommendView from './childComp/RecommendView';
  import FeatureView from './childComp/FeatureView';

  /**
   *公共组件 
  **/
  // 导航栏
  import NavBar from '@/components/common/navbar/NavBar';
  // 滚动功能
  import Scroll from '@/components/common/scroll/Scroll';
  // 商品分类更改
  import TabControl from '@/components/content/tabControl/TabControl';
  // 商品列表
  import GoodsList from '@/components/content/goodsList/GoodsList';
  // 返回顶部功能
  import BackTop from '@/components/content/backTop/BackTop'

  // 网络请求功能
  import { getHomeMultidata, getHomeGoods } from '@/network/home';

  
  export default {
    name: "Home",
    data () {
      return {
        banners: [],  
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    // 组件注册
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created () {
      // 请求轮播图数据
      // 请求 recommend 数据
      this.getHomeMultidata1()

      // Home商品列表数据获取
      this.getHomeGoods1('pop')
      this.getHomeGoods1('new')
      this.getHomeGoods1('sell')
    },
    methods: {
      /**
       *  事件监听相关方法
      **/
      // 点击切换获取对应商品列表
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2: 
            this.currentType = 'sell';
            break;
        }
      },
      // BackTop 点击事件监听
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      // 监听scroll自定义事件
      contentScroll(position) {
        this.isShowBackTop = ( -position.y > 1000 )
      },
      // 监听上拉加载更多事件
      loadMore() {
        this.getHomeGoods1(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },

      // 网络请求相关方法
      getHomeMultidata1() {
          // 1. 请求多个数据
        getHomeMultidata().then(res => {
          // 请求轮播图数据
          this.banners = res.data.banner.list;
          // 请求 recommend 数据
          this.recommends = res.data.recommend.list;
        })
      },
      // 商品列表数据获取
      getHomeGoods1(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      }
      
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    }

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff!important;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
  }

</style>