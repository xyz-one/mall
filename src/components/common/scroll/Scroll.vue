<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    data () {
      return {
        scroll: null,
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      // 1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        // eventPassthrough: 'vertical',
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2. 监听滚动位置
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      }),
      // 3. 监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      // 滚动回最顶点
      scrollTo(x, y, time=500) {
        this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }

</script>
<style scoped>

</style>