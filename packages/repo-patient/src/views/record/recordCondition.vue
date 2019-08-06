<template>
    <div>
        <div>
            <div class="form-dl">
                <div class="form-dt">请选择医院</div>
                <div :class="['form-dd', params.banHsp ? '' : 'icon-next', formData.hsp.netHospitalId ? 'value': '']" @click="goHspListPage">
                    {{formData.hsp.hospitalName || '请选择'}}
                </div>
            </div>
            <div class="form-dl">
                <div class="form-dt">请选择就诊人</div>
                <div :class="['form-dd','icon-next', formData.family.id ? 'value': '']" @click="goFamilyResourcePage">
                    {{formData.family.name || '请选择'}}
                </div>
                <van-action-sheet :actions="fmlDic" @cancel="hideFmlDic" @select="fmlConfirm" cancel-text="取消" v-model="showFmlDic"/>
            </div>
        </div>
        <div class="fixed-bottom">
            <div :class="['btn',canSubmit ? 'btn-blue' : 'disabled']" @click="goRecordPage"> 查找 </div>
        </div>
    </div>
</template>

<script>
    import peace from '@src/library'

    export default {
        props: {},
        data() {
            return {
                data: {},
                params: {},
                fmlDic: [],
                showFmlDic: false,
                fmlList: [],
                canSubmit: false,
                formData: {
                    hsp: {},
                    family: {}
                },
            }
        },
        created() {
            this.params = peace.util.decode(this.$route.params.json);
            this.formData.hsp = this.params.hsp || {};
            this.canSubmitProcesses();
        },
        methods: {
            goFamilyResourcePage(){
                peace.service.patient.getMyFamilyList().then(res => {
                    this.fmlList = res.data || []
                    this.fmlDic =
                        this.fmlList.map(item => {
                            return {
                                name: item.name,
                                subname: '(' + item.relation + ')'
                            }
                        }) || [];

                    if (this.fmlList.length) {
                        this.showFmlDic = true;
                    } else {
                        peace.util.alert('请先前往个人中心添加就诊人')
                    }
                    this.canSubmitProcesses();
                })
            },
            fmlConfirm(item, index) {
                console.log(item,index)
                this.formData.family = this.fmlList[index];
                this.canSubmitProcesses();
                this.showFmlDic = false;
            },
            hideFmlDic(){
                this.showFmlDic = false;
            },
            goHspListPage(){
                let json = peace.util.encode({
                    title: '选择医院',
                    link: 'select',
                    type: 'report',
                })

                if (this.params.banHsp) {
                    return;
                }

                $peace.$recordCondition = this;
                this.$router.push(`/hospital/HospitalList/${json}`)
            },
            goRecordPage(){
                let json =  peace.util.encode({
                    id: this.formData.family.id,
                    netHospitalId: this.formData.hsp.netHospitalId
                });

                if (!this.canSubmit) {
                    return;
                }
                this.$router.push(`/record/recordHome/${json}`)
            },
            canSubmitProcesses: function () {
                let formData = this.formData, bool;

                bool = !!(formData.hsp.netHospitalId && formData.family.id);
                this.canSubmit = bool;
                return bool
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import "~@src/views/style/style.css";
    .btn{
        padding: 13px;
        text-align: center;
    }
</style>