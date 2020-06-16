<template>
  <div class="record-consult" @click="onClickConsultDetail">
    <div class="record-consult__left">
      <img :src="require('@src/assets/images/ic_会诊.png')" />
    </div>
    <div class="record-consult__right">
      <div class="title">会诊单</div>
      <div class="content">
        <span>{{ netHospitalName }}</span>
        <span v-if="netHospitalName !== '' && netDeptName !== ''"> | </span>
        <span>{{ netDeptName }}</span>
      </div>
    </div>
    <peace-dialog :visible.sync="consultVisible"
                  v-if="consultVisible"
                  append-to-body
                  title="会诊详情">
      <consult-detail :data="consultData"
                     @close="() => consultVisible = false"></consult-detail>
    </peace-dialog>
  </div>
</template>

<script>
  import get from 'lodash/get'
  import peace from '@src/library'
  import ConsultDetail from './ConsultDetail'

  export default {
    name: 'RecordConsult',
    components: {
      ConsultDetail
    },
    props: {
      data: {
        type: Object,
        default() {
          return {
            noData: true
          }
        }
      },
      type: String
    },
    data() {
      return {
        consultData: null,
        consultVisible: false
      }
    },
    computed: {
      netHospitalName() {
        return get(this, 'data.netHospitalName', '')
      },
      netDeptName() {
        return get(this, 'data.netDeptName', '')
      }
    },
    methods: {
      onClickConsultDetail() {
        const consultNo = get(this, 'data.consultNo', null)
        if (consultNo === null) {
          console.log('缺少会诊ID')
          return;
        }
        this.consultVisible = true
        this.getConsultDetail(consultNo)
      },
      getConsultDetail(consultNo) {
        const params = {
          dataNo: consultNo,
        }

        peace.service.health.consultDetail(params).then(res => {
          this.consultData = res.data
          console.log(this.consultData)
        })
      },
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .record-consult {
    width: 100%;
    height: 80px;
    padding: 16px;
    cursor: pointer;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__left {
      margin: 0 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__right {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .title {
        font-size: 16px;
        color: #333333;
      }

      .content {
        font-size: 12px;
        color: #999999;
      }
    }
  }
</style>

