<template>
    <div class="home-layout">
        <div class="banner">
            <div class="banner-img">
                <img src="../../assets/images/newIndex/logo.png"/>
            </div>
        </div>
        <section class="info">
            <div class="name-wrap">
                <div class="w">
                    <span class="name">五莲县人民医院</span>
                    <div class="tags">
                        <span>综合医院</span>
                        <span>二甲医院</span>
                        <span>公立医院</span>
                    </div>
                </div>
                <div class="intro">医院简介</div>
            </div>
            <div class="location" @click="goMap()">
                <span class="name">日照市五莲县城关利民路50号</span>
                <span class="tel"></span>
            </div>
            <div class="notice">
                <i class="alarm"></i>
                <div class="message-box">通知：2012年8月成立全国首家肿瘤专科医院患者服务大..</div>
                <i class="arrow"></i>
            </div>
        </section>
        <section class="functions">
            <div class="item" v-for="(item, index) in funcList" :key="'index'+ index">
                <img :src="require('../../assets/images/newIndex/'+ item.img + '.png')"/>
                <span class="name">{{item.name}}</span>
            </div>
        </section>
        <section class="dept">
            <div class="title">
                <span>医院科室</span>
                <i class="arrow"></i>
            </div>
            <div class="dept-wrap">
                <div class="item" v-for="(item, index) in deptList" :key="'index'+ index">
                    <span :style="'background: '+ colorArr[index]">{{item}}</span>
                </div>
            </div>
        </section>
        <section class="doctors">
            <div class="title">
                <span>明星医生</span>
                <i class="arrow"></i>
            </div>

            <div class="doc-wrap">
                <div class="item-wrap" v-for="(item,index) in [1,2,3,4,5]">
                    <div class="avatar"></div>
                    <div class="item">
                        <span class="name">张豆豆</span>
                        <span class="jd">妇产科 副主任医师</span>
                        <div class="tags">
                            <span class="hao">号</span>
                            <span class="wen">问</span>
                            <span class="bao">服务包</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import peace from '@src/library'
    import { Swipe, SwipeItem } from 'vant';
    export default {
        components: {

        },
        data() {
            return {
                funcList: [
                    {
                        img: 'ic_zhuanjia',
                        name: '值班医生'
                    },
                    {
                        img: 'ic_guahao',
                        name: '预约挂号'
                    },
                    {
                        img: 'ic_online',
                        name: '复诊续方'
                    },
                    {
                        img: 'ic_free',
                        name: '在线咨询'
                    },
                    {
                        img: 'ic_report',
                        name: '查询报告'
                    },
                    {
                        img: 'ic_xuzhi',
                        name: '健康百科'
                    },
                    {
                        img: 'ic_chuyuanxuzhi',
                        name: '中药寄送'
                    }
                ],
                deptList: [
                    '口腔科',
                    '美容科',
                    '儿科',
                    '妇产科',
                    '中医科',
                    '更多科室',
                ],
                colorArr: [
                    '#E6FFFB',
                    '#E6F7FF',
                    '#F9F0FF',
                    '#F0F5FF',
                    '#E6FFFB',
                    '#FFFBE6',
                ]
            }
        },
        mounted() {
           this.colorArr.sort(() => Math.random() - 0.5);
        },
        methods: {
            goMap() {
                this.$router.push('/home/map')
            }
        }
    }
</script>

<style lang="scss" scoped>
@mixin arrow {
    width: 7px;
    height: 12px;
    display: inline-block;
    background: url("../../assets/images/newIndex/ic_right.png");
    background-size: 100% 100%;
}
.home-layout {
    background:rgba(249,249,249,1);
    .banner {
        width: 100%;
        height: 175px;
        background: #fff;
        .banner-img {
            width: 100%;
            height: 100%;
            background: url('../../assets/images/newIndex/bg_home.png');
            background-size: 100% 100%;
            position: relative;
            img {
                width: 130px;
                height: 130px;
                border-radius: 50%;
                position: absolute;
                bottom: 0;
                right: 30px;
                border: 2px solid #fff;
            }
        }
    }
    .info {
        padding: 20px 16px 0;
        background: #fff;
        .name-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            .w {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .name {
                    font-size:17px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                }
                .tags {
                    span {
                        padding: 3px;
                        background:rgba(229,249,246,1);
                        border-radius:1px;
                        font-size:9px;
                        font-weight:400;
                        color:rgba(0,198,174,1);
                        line-height:13px;
                        margin-right: 5px;
                    }
                }
            }
        }
        .intro {
            width:56px;
            height:21px;
            border-radius:2px;
            border:1px solid rgba(0,204,179,1);
            font-size:11px;
            font-weight:400;
            color:rgba(0,204,179,1);
            line-height:21px;
            text-align: center;
        }
        .location {
            display: flex;
            justify-content: space-between;
            height:48px;
            align-items: center;
            border-bottom: 1px solid #EEEEEE;
            .name {
                font-size:14px;
                color:rgba(51,51,51,1);
                &:before {
                    width: 11px;
                    height: 13px;
                    background: url("../../assets/images/newIndex/ic_location.png");
                    background-size: 100% 100%;
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    margin: -3px 6px 0 0;
                }
            }
            .tel {
                width: 14px;
                height: 17px;
                background: url("../../assets/images/newIndex/ic_phone.png");
                background-size: 100% 100%;
            }
        }
        .notice {
            display: flex;
            height: 46px;
            align-items: center;
            .alarm {
                width: 16px;
                height: 16px;
                display: inline-block;
                background: url("../../assets/images/newIndex/ic_notice.png");
                background-size: 100% 100%;
            }
            .message-box {
                flex: 1;
                font-size:11px;
                color:rgba(153,153,153,1);
                padding-left: 12px;
                border-left: 1px solid #EEEEEE;
                height: 18px;
                line-height: 18px;
                margin-left: 12px;
                margin-right: 10px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .arrow {
               @include arrow;
            }
        }
    }
    .functions {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        background: #fff;
        margin-top: 8px;
        padding-bottom: 18px;
        .item {
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 18px;
            img {
                width: 30px;
                height: 30px;
                display: inline-block;
            }
            .name {
                font-size:13px;
                color:rgba(0,0,0,1);
                margin-top: 10px;
            }
        }
    }
    .title {
        padding: 0 16px;
        height: 46px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size:16px;
        font-weight:600;
        color:rgba(51,51,51,1);
        .arrow {
            @include arrow;
        }
    }
    .dept {
         background: #fff;
         margin-top:10px;
        .dept-wrap {
            display: flex;
            flex-wrap: wrap;
            width: 360px;
            margin: 0 auto;
            .item {
                width: 33.3333333%;
                margin-bottom: 15px;
                text-align: center;
                span {
                    width:105px;
                    height:45px;
                    background:rgba(230,255,251,1);
                    border-radius:2px;
                    display: inline-block;
                    font-size:12px;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height:45px;
                }
            }
        }
    }
    .doctors {
        margin-top: 8px;
        background: #fff;
        .doc-wrap {
            display: -webkit-box;
            overflow-x: scroll;
            margin: 0 16px;
            padding-bottom: 25px;
            .item-wrap {
                position: relative;
                width:130px;
                height:130px;
                margin-right: 10px;
                .avatar {
                    width:51px;
                    height:51px;
                    border:1px solid rgba(238,238,238,1);
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 10px;
                    z-index: 10;
                }
                .item {
                    width:130px;
                    height:95px;
                    background:rgba(255,255,255,1);
                    box-shadow:0px 1px 4px 0px rgba(221,221,221,0.5);
                    border-radius:3px;
                    border:1px solid rgba(238,238,238,1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    .name {
                        font-size:14px;
                        font-weight:600;
                        color:rgba(0,0,0,1);
                        margin-top: 30px;
                    }
                    .jd {
                        font-size:11px;
                        font-weight:400;
                        color:rgba(102,102,102,1);
                    }
                    .tags {
                        font-size:9px;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        margin-top: 3px;
                        .hao {
                            background:rgba(116,176,255,1);
                            border-radius:1px;
                            padding: 2px 3px;
                        }
                        .wen {
                            background:#00C6AE;
                            border-radius:1px;
                            padding: 2px 3px;
                            margin: 0 3px 0 3px;
                        }
                        .bao {
                            background:#AC91FF;
                            border-radius:1px;
                            padding: 2px 3px;
                        }
                    }
                }
            }

        }
    }
}

</style>
