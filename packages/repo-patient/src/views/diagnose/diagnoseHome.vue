<template>
    <div>
        <div class="card cards" v-if="data.info">
            <div class="card-avatar">
                <img class="" :src="page.icon.logo" />
            </div>
            <div class="card-body">
                <div class="card-name">{{data.info.name}}</div>
                <div class="block">
                    <div class="card-label" v-for="item in data.info.recommendDepName" :key="item">
                        {{item}}
                    </div>
                </div>
            </div>
        </div>
        <div class="box-block" v-if="txt">
            <div class="block-left">
                <div v-html="txt" class="txt"></div>
            </div>
            <div class="block-right"  @click="goDiagnoseNamePage">
                <img class="next" :src="page.icon.next" />
            </div>

        </div>
        <div class="panel">
            <div class="panel-head">
                <div class="head-tit">问医生</div>
                <!--                <picker mode="selector" bindchange="bindCityChange" value="{{index}}" range="{{cityList}}" range-key="name">-->
                <div class="head-more" @click="showCityDicFn">{{checkCity || '选择城市'}}</div>
                <!--                </picker>-->
                <van-action-sheet
                        v-model="showCityDic"
                        :actions="cityDic"
                        @select="checkCityDic"
                />
            </div>
            <!--        <div class="panel-body">-->
            <!--        </div>-->
        </div>
        <van-loading size="24px" v-if="showLoadingType" class="load">加载中...</van-loading>
        <div class="card" v-for="(item, index) in doctorList" @click="goHomeIndex(item)" data-id="item.doctorId" :key="index">
            <div class="card-avatar avatar-circular">
                <img class="" :src="item.avartor" />
            </div>
            <div class="card-body">
                <div class="card-name">{{item.name}}
                    <div class="card-small">
                        {{item.doctorTitle}}
                        <div :class="['label', 'label-'+it]" v-for="(it, i) in item.serviceList" :key="i">
                            {{it == 'image' || it == 'video' ? '问' : it =='prvivateDoctor' ? '服务包' : it == 'register' ? '号' : ''}}
                        </div>
                    </div>
                </div>
                <div class="card-small">
                    {{item.netHospitalName}} {{item.deptName}}
                </div>
                <div class="card-brief" v-if="item.specialSkill">
                    <div class="span s">擅长：</div>
                    <div class="span xl">
                        {{item.specialSkill}}</div>
                </div>
            </div>
        </div>
        <div class="none-page" v-if="!doctorList.length && !showLoadingType">
            <div class="icon icon_none_doctor"></div>
            <div class="none-text">暂无医生信息</div>
        </div>
    </div>
</template>

<script>
    import peace from '@src/library'

    export default {
        props: {},
        data() {
            return {
                page: {
                    isGet: false,
                    none: true,
                    icon:{
                        next: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAcBAMAAADVQiH5AAAAJ1BMVEVHcEyLi4uLi4uMjIyMjIyMjIyMjIyLi4uMjIyMjIyMjIyMjIyMjIzEW0gMAAAADHRSTlMAT/lqGjms7t7KhpqRP6QEAAAA4UlEQVQoz23QrQ7CMBAH8FsYSxhmQaAwiLmJPcDEHEiCwYJHgkMiETwAggdA8AAYRvj+PxTXbmzrrk2aXu76a65H1CfLWhA50VzmvSygHh6ysETIG4J44Nsd4CsB9kQH4Gzmu8CbD0kuGpDbJAqkKhgDn3rhBGx14O6AY5X3gVeah0xuFpCT+J9vVcAkCbAqtbspCYNnWr07KokBiNpMAhU4DCb13mfAVZ0DYG1MoR1pwiCbmPOZAkMNwsakmWSBEwmgL997EuTPo+hNkKI1SaxAf9oG9Jhia4GSmz1Pfh38AJ6/btXbNdVeAAAAAElFTkSuQmCC',
                        logo:'data:image/png;base64,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'
                    },
                },
                data: {},
                cityList: [{name:'武汉'}],
                params: {},
                doctorList:[],
                txt:'',
                checkCity: '武汉',
                showCityDic: false,
                showLoadingType: true,
                cityDic:[{name:'武汉'}]
            }
        },
        created() {
            this.params = peace.util.decode(this.$route.params.json)
            // document.title = this.params.name;
            this.getBodySymptomDetail();
            this.getDoctList();
        },
        methods: {
            getBodySymptomDetail() {
                peace.service.diagnose[this.params.link == 'diagnoseGroup' ?'diseaseInfo' :'getBodySymptomDetail']({
                    code: this.params.id
                }).then(res => {
                    this.data = res.data;
                    this.txt = this.delHtml(res.data.info.intro)
                })
            },
            delHtml: function (html) {
                return html && html.replace(/<[^>]+>/g, '')
            },
            getDoctList(){
                this.showLoadingType = true;
                this.doctorList = [];
                peace.service.diagnose.doctorList({
                    crowdCode: this.params.serviceCode,
                    city: this.checkCity,
                    p: 1,
                    size: 50
                }).then(res => {
                    !this.cityDic[1] && res.data.citys && res.data.citys[1] && (
                        this.cityDic = res.data.citys || []
                    );
                    this.doctorList = res.data.list || []
                    this.showLoadingType = false;
                })
            },
            showCityDicFn(){
                this.showCityDic = true;
            },
            checkCityDic(item){
                this.checkCity = item.name;
                this.showCityDic = false;
                this.getDoctList();
            },
            goHomeIndex(item){
                let json = peace.util.encode({
                    doctorId: item.doctorId,
                    date: new Date()
                })

                this.$router.push(`/components/doctorDetail/${json}`)
            },
            goDiagnoseNamePage(){
                let json = peace.util.encode(this.params)
                this.$router.push(`/diagnose/diagnoseName/${json}`)
            },
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";
    .banner{
        position: relative;
        width: 100%;
        height: 150px;
        overflow: hidden;
        background-size: cover;
        padding: 0;
        margin: 0;
        background-color: #f5f5f5;
    }
    .banner image{
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    .banner .head{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 9px 7px;
        font-weight: 700;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        background: rgba(255, 255, 255, .8)
    }
    .card{
        background: #fff;
        padding: 10px;
        margin: 0;
        border-bottom: 1px solid #f5f5f5;
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
        word-wrap: break-word;
        /* white-space: pre-wrap; */
        display:-webkit-box;
        overflow:hidden;
        text-overflow:ellipsis;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        max-height: 32px;
    }
    .p-small .span.m{
        font-size: 15px;
        /*flex: 0 1 auto;*/
    }
    .txt{
        font-size: 13px;
    }
    .box-block{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

        align-items:center;

        background: #fff;
        color: #000;
        padding: 10px 15px;
        font-size: 13px;
        border-bottom: 1px solid #f5f5f5;
    }

    .box-block .block-left{
        flex:1;
    }
    .box-block .block-right{
        flex: 0 0 12px;
        padding-left: 10px;
    }
    .block-right .next{
        transform: rotate(-90deg);
        width: 12px;
        height: 7px;
    }

    .box-bg{
        background: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #f5f5f5;
        overflow:hidden;
        position: relative;
        box-sizing: border-box;
    }
    .box-bg .label{
        padding: 3px 9px;
        color: #444;
        border-color: #aaa;
        font-size: 11px;
        margin-right: 6px;
        margin-bottom: 6px;
    }

    .box-bg .more{
        padding-top: 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 20px;
        background: #fff;
        width: 100%;
    }
    .box-bg .more .next{
        width: 12px;
        height: 7px;
        display: block;
        margin: 0 auto;
        text-align: center;
    }
    .box-bg .more .next.toggle{
        transform: rotate(-180deg);
    }
    .panel{
        margin: 0;
        box-shadow: none;
        padding-bottom: 0;
    }
    .panel .panel-head {
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        position: relative;
    }
    .panel .panel-head .head-tit{
        flex: 1;
    }
    .panel .panel-head .head-more{
        flex: 0 0 auto;
        position: relative;
        padding-right: 15px;
    }
    .head-more::before{
        content: '';
        position: absolute;
        display: block;
        top: 4px;
        left: -20px;
        width: 12.5px;
        height: 16px;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAgCAMAAADQQiM0AAAAPFBMVEVHcEwAxq4Axq4Axq4Axq4Axq4Ax6wAxq4Axq0Axa0Axq4Axq4Axq4Axq0Axq4Axq4Axq4Axq4Axq4Axq6iG7DjAAAAE3RSTlMA7D3Q3X4W+E4LoY0mW7zFMGmufULRZgAAAThJREFUKM9dUluChCAMAwHLS3zk/nfdtoCD248ZNCVNUo3plY7siHwrl/lUChazXFyAywPUQtxicYw9aQKbBYV9PNTG18ZDtfAr+0E4+8nDa88ej015IiHIfwDJjavJeCqpv6osy6L0PpAI1BkOmVlBfL4IntXuoc/gl8lkPHxsY5aJwMFEhMjzb+4Fpr+Mxr8naxCUO+3UHEGKBwNswutf28BArPBGmTh86vWHEWGUifdATlUk04vKzKBNgaLsFbiElyPYPdvf6sFBFMWt+hWZ1Y/1ZEnQanDs7dbl6ZLUVoNN3ZvkJ+BYS5i+eYZLy35ip1Rz9B77kF/jjdeOGLL115f79oah9eNJDj6NcPqm36qkoch/+36KIij0u/s/pAf2zPg+dYLcqvHjA6uvpdjwJ4ulbr9YNH+y9BFFB0KjTAAAAABJRU5ErkJggg==");
    }
    .head-more::after{
        content: "";
        width: 7.5px;
        height: 7.5px;
        border: solid #8C8C8C;
        border-width: 0 1.5px 1.5px 0;
        transform: translate(-50%, -50%) rotate(45deg);
        position: absolute;
        right: -5px;
        top: 45%;
    }
    .none-page .icon{
        margin-top: 50px;
    }

    .label.blue{
        border-color: #00C6AE;
        background: #00C6AE;
        color: #fff;
    }
    /*{{it.tag == 'image' ? '问' : it.tag =='prvivateDoctor' ? '服务包' : it.tag == 'appoint' ? '号' : '视频'}}*/
    .card-small .label{
        border-radius: 2px;
        color: #fff;
        padding: 0px 2px;
        margin-right: 2.5px;
        font-size: 9px;
    }
    .label.label-image{
        background: #00C6AE;
        border-color: #00C6AE;
    }
    .label.label-appoint{
        background: #74B0FF;
        border-color: #74B0FF;
    }
    .label.label-prvivateDoctor{
        background: #AC91FF;
        border-color: #AC91FF;
    }
    .label.label-video{
        background: #888;
        border-color: #888;
    }
    .card{
        background: #fff;
        padding: 10px 15px;
        margin: 0;
    }
    .txt{
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
    .box-block{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

        align-items:center;

        background: #fff;
        color: #000;
        font-size: 13px;
        padding: 10px 15px;
        border-bottom: 1px solid #f5f5f5;

    }
    .box-block .block-left{
        flex:1;
    }
    .box-block .block-right{
        flex: 0 0 12px;
        padding-left: 10px;
    }
    .block-right .next{
        transform: rotate(-90deg);
        width: 12px;
        height: 7px;
    }
    .panel{
        margin: 0;
        box-shadow: none;
    }
    .none-page .icon{
        margin-top: 50px;
    }
    .card-label{
        margin-bottom:5px;
    }
    .load{
        text-align: center;
        width: 100%;
        margin: 30px auto;
    }
</style>