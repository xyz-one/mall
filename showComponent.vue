<!--  -->
<template>
    <div class="">
        <div v-if="type=='number' || type=='text'">
            <input :type="type" name="" id="" :value="value">
        </div>
        <div v-if="type=='select'">
            <div @click="showOption">{{value}}</div>
            <div v-if="show" class="myshow">
                <div v-for="(item, i) in option" :key="i" @click="getValue(i)">
                    {{item.label}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'number'
        },
         value: {
            type: String,
            default: 'order001'
        },
        option: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            show: false
        };
    },
    //方法
    methods: {
        showOption(){
            this.show = !this.show
        },
        getValue(i){
            this.value = this.option[i].value
        }
    },
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        console.log(this.option)
    }
};
</script>
<style scoped>
</style>