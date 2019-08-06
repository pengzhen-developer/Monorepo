<template>
    <div class="diagnoseSelectBody">
        <van-tree-select
                :active-id="activeId"
                :height="height"
                :items="items"
                :main-active-index="mainActiveIndex"
                @itemclick="onItemClick"
                @navclick="onNavClick"
        />
    </div>
</template>

<script>
    import peace from '@src/library'

    export default {
        props: {},
        data() {
            return {
                data: [],
                params: {},
                height: 500,
                // 左侧高亮元素的index
                mainActiveIndex: 0,
                // 被选中元素的id
                activeId: '',
                items:[],
            }
        },
        created() {
            // this.params = peace.util.decode(this.$route.params.json)

            this.getBodyList();
        },
        methods: {
            getBodyList() {
                let items = [];

                peace.service.diagnose.getAllBodyArea().then(res => {
                    this.data = res.data || [];
                    res.data.map(item => {
                        items.push({
                            text: item.name,
                            id: item.code,
                            children: item.bodySymptomLists.map(it => {
                                return {
                                    text: it.name,
                                    id: it.code
                                }
                            })
                        })
                        return items
                    })
                    this.items = items;
                    this.activeId = items[0].children[0] ? items[0].children[0].id : ''
                    this.height = +(window.innerHeight-52)
                })
            },
            onItemClick(data){

            },
            onNavClick(index){
                this.mainActiveIndex = index
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";
    .diagnoseSelectBody{
        border-top: 1px solid #f5f5f5;
    }
    .van-tree-select__nav-item--active {
        border-color: #00c6ae;
    }
    .van-icon-checked:before {
        content: '\F02F';
        color: #00c6ae;
    }
    .van-tree-select__item--active {
        color: #00c6ae;
    }
</style>