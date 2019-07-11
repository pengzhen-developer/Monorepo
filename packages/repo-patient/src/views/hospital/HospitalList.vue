/** eslint-disable */
<template>
    <div>
        <van-skeleton
                title
                avatar
                :row="3"
                :loading="loading"
                v-for="(item,index) in items"
                @click="goMenuPage"
                :nethospitalid="item.netHospitalId"
                :name="item.hospitalName"
                type="organHome"
                v-if="index < max"
        >
            <div class="cards">
                <div class="card-avatar">
                    <img class="" :src="item.icon"/>
                </div>
                <div class="card-body">
                    <div class="card-name">{{item.hospitalName}}</div>
                    <div class="block">
                        <div class="card-small" v-for="(tit,i) in item.brief">
                            {{ (i == 0 ? '' : ' / ' ) + tit}}
                        </div>
                    </div>
                    <div class="block">
                        <van-tag plain  type="success" v-for="it in item.tags"> {{it}}</van-tag>
                    </div>
                </div>
            </div>

        </van-skeleton>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                default: function () {
                    return []
                },
            },
            max: {
                type: Number,
                default: function () {
                    return this.items.length
                }
            }
        },
        data(){
            return {
                loading: true
            }
        },
        created(){
            console.log(this.items)
        },
        mounted() {
            this.loading = false;
        },
        methods: {
            goMenuPage(item){
                console.log(item)
            },
        }
    };
</script>

<style lang="scss" scoped>

    .cards{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        margin: 15px 10px;
        font-size: 13px;
        color: #000;
        border: 0;
        border-bottom: 1px solid #f5f5f5;
        &:first-child{
            margin-top: 0;
        }
        .card-avatar{
            position: relative;
            flex: none;
            border: 1px solid #DDE1EA;
            width: 60px;
            height: 60px;
            margin: 6px;
            margin-right: 14px;
            position: relative;
            background-color: #f5f5f5;
            border-radius: 2px;
            flex: 0 0 auto;

            img{
                width: 100%;
                height: 100%;
            }
        }
        .card-body {
            flex: 1 0 1%;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
        }
        .card-small{
            font-weight: normal;
            font-size: 13rpx;
            line-height: 1.5;
            display: inline;
            vertical-align: text-bottom;
            color: #999;
            margin-bottom: 8px;
        }
        .card-name {
            font-size: 17px;
            font-weight: 600;
            line-height: 2;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

        }
        .block{
            margin-bottom: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

        }
    }
    .van-tag{
        padding: 0.1em 0.5em;
        margin-right: 5px;
    }
</style>
