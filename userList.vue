<!--  -->
<template>
    <div class="bag">
        <div class="flex_R mybox">
            <div class="flex_R flex1" v-for="(item, i) in itemList" :key="i">
               <show-component :type="item.type" :value="item.value" :option="item.option?item.option:[]" ></show-component>
            </div>
        </div>
    </div>
</template>

<script>
import showComponent from './showComponent.vue'
export default {
    components: {
        showComponent
    },
    data() {
        return {
            itemList: [
                {
                    id: 1,
                    type: "number",
                    value: "order001"
                },
                {
                    id: 2,
                    type: "text",
                    value: "order002"
                },
                {
                    id: 4,
                    type: "select",
                    value: "order004",
                    option: [
                        {
                            label: "aa",
                            value: "aa"
                        },
                        {
                            label: "bb",
                            value: "bb"
                        }
                    ]
                }
            ]
        };
    },
    //方法
    methods: {},
    //生命周期 - 创建完成（访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（访问DOM元素）
    mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.bag{
    background: #ffffff;
    width: 100%;
    height: 600px;
}
.flex_R{
    display: flex;
    align-items: center;
}
.mybox{
    width: 100%;
}
.flex1{
    flex: 1
}
.mybox >>> .el-button{
    width: 90%;
}
</style>