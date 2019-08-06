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
                !$peace.$recordCondition && ($peace.$recordCondition = this);

                this.$router.push({
                    name: '/setting/myFamilyMembers',
                    params: {
                        link: 'recordCondition'
                    }
                })
            },
            fmlConfirm(item, index) {
                if(item.id == 'addFamily'){
                    this.addFamily();
                    this.showFmlDic = false;
                    return;
                }
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

                !$peace.$recordCondition && ($peace.$recordCondition = this);
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