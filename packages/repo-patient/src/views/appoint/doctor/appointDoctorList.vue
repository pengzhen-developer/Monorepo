<template>
    <div>
        <div class="padding-style scroll-x">
            <div class=' box-scroll' >
                <div class="scroll-items">
                    <div :class="['item', activeIndex == 'all' ? 'active' : '']"  @click="checkTime({index:'all'})">
                        <div class="week">不限</div>
                        <div class="week">日期</div>
                    </div>
                    <div :class="['item', activeIndex == index ? 'active' : '']" v-for="(item,index) in dateList" :key="index"  @click="checkTime({index})">
                        <div class="week">{{item.week}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="card" v-for="item in doctorList" :key="item.doctorId" @click="goHomeIndex(item)">
                <div class="card-avatar avatar-circular">
                    <img class="" src="item.doctorInfo.avartor" />
                </div>
                <div class="card-body">
                    <div class="card-name">{{item.doctorInfo.doctorName}}
                        <div class="card-small">
                            {{item.doctorInfo.doctorTitle}} {{item.doctorInfo.deptName}}</div>
                        <van-button type="primary" size="mini" plain hairline v-if="activeIndex == 'all'" @click="goDoctorHomePage">预约</van-button>

                    </div>
                    <div class="card-small">
                        评分：7.6  预约量：123
                    </div>
                    <div class="card-brief" v-if="item.doctorInfo.specialSkill">
                        <div class="span s">擅长：</div>
                        <div class="span xl">
                            {{item.doctorInfo.specialSkill}}</div>
                    </div>
                    <div class="box-appoint" v-if="activeIndex!='all'">
                        <div class="bar-line">
                            <div class="item">01-09 上午</div>
                            <div class="item">专家门诊</div>
                            <div class="item">￥26.5</div>
                            <div class="item active">预约</div>
                        </div>
                        <div class="bar-line disabled">
                            <div class="item">01-09 上午</div>
                            <div class="item">专家门诊</div>
                            <div class="item">￥26.5</div>
                            <div class="item disabled">约满</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import peace from '@src/library'

    export default {
        props: {
        },
        data() {
            return {
                dateListLength: 7,
                data: {},
                doctorList:[],
                activeIndex:'all',
                dateList: [{time:'01-07',week:'周一'},{time:'01-08',week:'周二'},{time:'01-09',week:'周三'},{time:'01-10',week:'周四'},{time:'01-11',week:'周五'},{time:'01-12',week:'周六'},{time:'01-13',week:'周日'}]
            }
        },
        created() {
            const params = peace.util.decode(this.$route.params.json)
            console.log(params)
            this.doctorList = [{"doctorInfo":{"doctorId":"ndxticolxc","doctorName":"潘英志","status":1,"avartor":"https:\/\/testdoctor.hp.aijiayi.com\/img\/doctordefault.png","specialSkill":"","summary":"","hospitalName":"上医馆","doctorTitle":"医师","nethospitalId":"yuewnhalis","deptName":"胸外科","money":0,"sign_status":2,"netdept_nameId":"yftedyguyd","platdept_name":"外科","platdept_child":"胸外科"},"consultationList":{"0":{"consultingTypeId":"mqfocpezkrlipcdvcltq","tag":"image","status":1,"money":0,"count":1,"type":0,"inquiry_time":0,"icon":"icon_01_01_09","tagName":"图文咨询","packageContent":"免费"},"2":{"consultingTypeId":"bjxwlzihdcafelhonjqp","tag":"prvivateDoctor","status":1,"money":1000,"count":2,"type":1,"inquiry_time":0,"icon":"icon_01_01_08","tagName":"私人医生","packageContent":"￥1000\/周"},"1":{"consultingTypeId":"dofzwooxzteowmdfekjo","tag":"video","status":1,"money":0,"count":1,"type":0,"inquiry_time":0,"icon":"icon_01_01_08","tagName":"视频咨询","packageContent":"免费"}}},{"doctorInfo":{"doctorId":"dswjutldne","doctorName":"黄润全","status":1,"avartor":"https://testdoctor.hp.aijiayi.com/img/doctordefault.png","specialSkill":"阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶水水水水水水水水水水水水水水水水水水水","summary":"","hospitalName":"全息综合门诊部","doctorTitle":"医师","nethospitalId":"nvuhyojcez","deptName":"神经外科","money":0,"sign_status":2,"netdept_nameId":"pkijzeptte","platdept_name":"外科","platdept_child":"神经外科"},"consultationList":{"0":{"consultingTypeId":"hhwtxykcjvlfnepgnjhr","tag":"image","status":1,"money":0,"count":1,"type":0,"inquiry_time":0,"icon":"icon_01_01_09","tagName":"图文咨询","packageContent":"免费"},"2":{"consultingTypeId":"cqtuuyxkecagtlwdubuw","tag":"prvivateDoctor","status":1,"money":0,"count":2,"type":1,"inquiry_time":0,"icon":"icon_01_01_08","tagName":"私人医生","packageContent":"￥0\/周"},"1":{"consultingTypeId":"fyopixepmswhrqzlmqhv","tag":"video","status":1,"money":0,"count":1,"type":0,"inquiry_time":0,"icon":"icon_01_01_08","tagName":"视频咨询","packageContent":"免费"}}}];

            // peace.service.xx.xx({
            //     xx: params.xx
            // }).then(res => {
            //     this.data = res.data
            // })

        },
        methods: {
            checkTime(index){
               this.activeIndex = index.index;
               // get doctorList of the index( = >time)
            },
            goDoctorHomePage(item){
                console.log(item)
            },
            goHomeIndex(item){
                let doctorInfo = item;
                console.log(item)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";
    .scroll-x{
        box-sizing: border-box;
        position: relative;
        position: fixed;
        width: 100%;
        height: 56px;
        border-top: 1px solid #f5f5f5;
        border-bottom: 10px solid #f5f5f5;
    }
    .scroll-x .box-scroll{
        overflow: hidden;
        height:45px;
    }
    .box-scroll .scroll-items{
        background: #fff;
        color: #000;
        font-size: 13px;
        display: flex;
        overflow-x: auto;
        justify-content: space-between;
        padding: 0;
        height: 100%;
    }
    .box-scroll .scroll-items>.item{
        text-align: center;
        font-size: 13px;
        color: #000;
        font-weight: bold;
        flex-basis: 66px;
        flex-shrink: 0;
        white-space: nowrap;
        border-right: 1px solid #f5f5f5;
        padding: 4px;
    }
    .box-scroll .scroll-items>.item .week{

    }
    .box-scroll .scroll-items>.item .time{
        color: #999;
        font-size: 11px;
        font-weight: normal;
    }
    .scroll-items .item.active {
        color: #fff;
        background: #00c6ae;
        border-right-color: #00c6ae;
    }
    .scroll-items .item.active .time{
        color: #fff;
    }
/*·       doctor*/
    .content{
        overflow: hidden;
        padding-top: 56px;
    }
    .card{
        padding:7px 5px;
        border-bottom: 1px solid #DEDEDE;
    }
    .card-brief{
        color: #999;
    }
    .card .card-brief,.card .p-small{
        display: flex;
        align-items:baseline;
        line-height: 1.3;
        font-size: 13px;
        padding: 7px 0;
    }
    .card .card-small,.card .card-brief{
        /*line-height: 1.3;*/
    }
    .card-brief{

    }
    .card-brief,.p-small{
        display: 1;
        overflow: hidden;
    }
    .card-brief .span,.p-small .span{
        position: relative;
        flex: 1;
    }
    .card-brief .span.s,.p-small .span.s{
        flex: 0 0 auto;
        /*width: ;*/
    }
    .card-brief .span.xl{
        flex: 0 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .card .card-name{
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

    }
    .card .card-name .card-small{
        flex: 1;
        align-self: center;
        padding-top: 5px;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .van-button--primary{
        color: #00c6ae;
        flex: 0 0 auto;
        width: 62px;
        margin-right: 10px;
        align-self: center;
    }
/*    box-appoint*/
    .box-appoint{
        margin: 5px 0;
        padding-top: 5px;
        clear: both;
        margin-right: 10px;
    }
    .bar-line{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: stretch;
        justify-content: space-around;
        width: 100%;
        border-radius: 15px;
        min-height: 25px;
        box-sizing: border-box;
        color: #00c6ae;
        background: #DDF7F4;
    }
    .bar-line +.bar-line{
        margin-top: 5px;
    }
    .bar-line>.item{
        flex: 1;
        text-align: center;
        font-size: 12px;
        padding: 3px 0;
    }
    .bar-line>.item:first-child{
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        flex:1.3;
    }
    .bar-line>.item:last-child{
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
    }
    .bar-line>.item.active{
        background: #00c6ae;
        color: #fff;
    }
    .bar-line>.item.disabled{
        background: #E1E1E1;
        color: #999;
    }
    .bar-line.disabled{
        background: #F3F3F3;
        color: #999;
    }
</style>

