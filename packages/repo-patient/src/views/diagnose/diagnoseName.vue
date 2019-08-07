<template>
    <div>
        <div class="tab" v-if="page.isGet && !page.hideTab">
            <div :class="['tab-item', checkedData == 'intro' ? 'active' : '']" data-id="intro" @click="changeTab({id:'intro'})">简介</div>
            <div :class="['tab-item', checkedData == 'pathogenyDescr' ? 'active' : '']" data-id="pathogenyDescr" @click="changeTab({id:'pathogenyDescr'})">病因</div>
            <div :class="['tab-item', checkedData == 'diagnosisDescr' ? 'active' : '']" data-id="diagnosisDescr" @click="changeTab({id:'diagnosisDescr'})">诊断</div>
            <div :class="['tab-item', checkedData == 'treatmentDescr' ? 'active' : '']" data-id="treatmentDescr" @click="changeTab({id:'treatmentDescr'})">治疗</div>
        </div>
        <div class="content">
            <div v-html="txt">
            </div>
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
                    hideTab: false,
                    none: true,
                    json: {},
                    setStyle:{
                        p:'',
                        h4:''
                    }
                },
                data: {},
                checkedData:'',
                params: {},
                txt: ''
            }
        },
        created() {
            this.params = peace.util.decode(this.$route.params.json)
            this.page.hideTab = !!this.params.txt
            !this.params.txt && (this.getBodySymptomDetail())
        },
        methods: {
            getBodySymptomDetail() {
                peace.service.diagnose[this.params.link == 'diagnoseGroup' ?'diseaseInfo' :'getBodySymptomDetail']({
                    code: this.params.id
                }).then(res => {
                    this.page.isGet = true
                    this.data = res.data
                    this.checkedData = 'intro'
                    this.setStyle(this.data.info[this.checkedData])
                })
            },
            changeTab(item){
              this.checkedData = item.id
              this.setStyle(this.data.info[ this.checkedData])
            },
            setStyle: function (html) {
                let txt = html || '暂无描述';

                txt = txt.replace(/\<[pP]>/g,'<p class="txt-p">');
                txt = txt.replace(/\<h4>/g,'<h4 class="txt-h4">');
                this.txt = txt;
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";

    .tab{
        margin: 10px 42.5px;
        border: 1px solid #00C6AE;
        border-radius: 4px;
    }
    .tab .tab-item{
        color: #000;
        font-size: 15px;
        box-sizing: border-box;
        border-left: 1px solid #00C6AE;
    }
    .tab .tab-item:first-child{
        border-left:none;
    }
    .tab .tab-item.active{
        color: #fff;
        background: #00C6AE;
    }
    .content {
        padding: 10px 15px;
        font-size:14px;
    }

    .txt-p{
        font-size: 14px;
        color: #888;
    }
    .txt-h4{
        font-size: 15px;
        color: #333;
    }
</style>