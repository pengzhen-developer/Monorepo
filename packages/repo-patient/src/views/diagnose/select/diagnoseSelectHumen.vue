<template>
    <div :class="{'mg': true,'module': Max == Items.length}" v-if="Data && Data.length">
        <div class="grid-two">
            <div class="grid-left">
                <div class="bg-card"
                     @click="goMenuPage(Data[0])"
                     :type="appraise"
                     :style="{backgroundImage: 'url(' + Data[0].icon + ')'}"
                     :code="Data[0].code">
                    <div class="tit">
                        {{Data[0].text}}
                    </div>
                    <div class="txt" v-for="(item, index) in Data[0].diseaseLists" :key="index">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div class="grid-right">
                <div class="bg-card"
                     @click="goMenuPage(Data[1])"
                     :type="appraise"
                     :style="{backgroundImage: 'url(' + Data[1].icon + ')'}"
                     :code="Data[1].code">
                    <div class="tit">
                        {{Data[1].text}}
                    </div>
                    <div class="txt" v-for="(item, index) in Data[1].diseaseLists" :key="index">
                        {{item.name}}
                    </div>
                </div>
                <div class="bg-card"
                     @click="goMenuPage(Data[2])"
                     :type="appraise"
                     :style="{backgroundImage: 'url(' + Data[2].icon + ')'}"
                     :code="Data[2].code">
                    <div class="tit">
                        {{Data[2].text}}
                    </div>
                    <div class="txt" v-for="(item, index) in Data[2].diseaseLists" :key="index">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
        <div class="girl-thr" v-if="Items && Items.length">
            <div class="bg-card"
                 @click="goMenuPage(item)"
                 data-type="appraise"
                 v-for="(item,index) in Items"
                 v-if = "index < Max"
                 :style="{background: itemsMap[index] }">
                <div class="tit">
                    {{item.text}}
                </div>
                <div class="txt" v-for="(it, index) in item.diseaseLists" :key="index">
                    {{it.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import peace from '@src/library'

    export default {
        props: {
            items: {
                type: Array,
                default: function () {
                    return []
                },
            },
            data: {
                type: Array,
                default: function () {
                    return []
                },
            },
            // length: {},
            max: {
                type: Number,
                default: function () {
                    return this.items.length
                }
            },
            appraise: {
                type: String,
                default: function () {
                    return 'appraise'
                }
            }
        },
        data() {
            return {
                itemsMap: {
                    0:'#F3FAF6',
                    1:'#F5F9FF',
                    2:'#FAF8FF',
                    3:'#F5F9FF',
                    4:'#FAF8FF',
                    5:'#F3FAF6',
                    6:'#FAF8FF',
                    7:'#FAF8FF',
                },
                Data: [],
                Items: [],
                Max: 3,
                Appraise:'appraise'
            }
        },
        created() {
            if(this.items.length  && this.data.length){
                this.Items = this.items;
                this.Data = this.data;
                this.Max = this.max;
                this.Appraise = this.appraise || this.Appraise
                return;
            }
            this.getData();
        },
        methods: {
            getData(){
                let me = this;
                peace.service.diagnose.diagnoseList().then(res => {
                    me.Items = res.data.crowdLists;
                    me.Data = res.data.crowdListsDisease;
                    me.Max =  me.Items.length;
                })
            },
            goMenuPage(item) {
                let json = peace.util.encode({
                    serviceCode: item.code,
                    title: item.text,
                    date: new Date()
                })
                this.$router.push(`/diagnose/diagnoseGroup/${json}`)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .module{
        background-color: #fff;
        margin: (30px/2) 0;
        /*padding: 15px;*/
        font-size: (30px/2);
    }
    .grid-two{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        overflow:hidden;

    }
    .grid-left{
        flex: 2;
        margin-right: (20px/2);
        min-width: (269px/2);
        min-height: (336px/2);
    }
    .grid-right{
        flex: 3;
        min-width: (400px/2);

        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

        flex-direction:column;
        /*允许换行*/
        flex-wrap:wrap;
        -webkit-flex-wrap:wrap;
        -webkit-box-lines:multiple;
        -moz-flex-wrap:wrap;
        /* 两端对齐 */
        justify-content: space-between;
        /*等高*/
        align-items:stretch;
        /* 多轴对齐 */
        align-content:space-around;
    }
    .bg-card{
        /*margin-right: (20px/2);*/
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        background-size: cover;
        background-repeat: no-repeat;
        padding: (20px/2) (30px/2);
        box-sizing:border-box;
        border-radius: (10px/2);
    }
    .bg-card .tit{
        font-size: (30px/2);
        color: #fff;
        font-weight: normal;
        padding-bottom: (10px/2);
    }
    .bg-card .txt{
        font-size: (22px/2);
        color: #fff;
        font-weight: normal;
        padding-bottom: (5px/2);
    }

    .grid-right .bg-card{
        height: (158px/2);
    }
    .girl-thr{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        /*允许换行*/
        flex-wrap:wrap;
        -webkit-flex-wrap:wrap;
        -webkit-box-lines:multiple;
        -moz-flex-wrap:wrap;

        /*等高*/
        align-items:stretch;
        -webkit-align-items:stretch;
        box-align:stretch;
        -moz-box-align:stretch;
        -webkit-box-align:stretch;

        /* buding */
        margin: (20px/2) -(20px/2) (20px/2) -(10px/2);
    }
    .girl-thr .bg-card{
        flex: 0 1 30%;
        margin: (10px/2);
        align-self: stretch;
        height: auto;
    }
    .girl-thr .bg-card .tit{
        color: #000;
    }
    .girl-thr .bg-card .txt{
        color: #999;
    }
    .van-hairline--top-bottom::after {
         border-width: 0;
    }

    .mg{
        margin: 0px 15px;
        .girl-thr {
            margin: 5px -10px 0 -5px;
            .bg-card:last-child{
                margin-right: 0;
            }
        }
    }


</style>