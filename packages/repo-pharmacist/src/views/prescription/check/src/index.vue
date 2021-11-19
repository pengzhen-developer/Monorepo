<template>
  <div class="layout-route full-width flex">
    <!-- 无数据显示空态页 -->
    <template>
      <NoDataView v-if="noDataView"
                  v-loading="loading"></NoDataView>
    </template>

    <!-- 药师工作状态 -->
    <template>
      <WorkStatusView v-if="statusView"></WorkStatusView>
    </template>

    <!-- 药师医网信签名设置 -->
    <template v-if="signStatusView">
      <peace-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    append-to-body
                    width="500px"
                    title="提示"
                    :visible.sync="signStatusVisible"
                    class="element-ui-default">
        <SignStatusView></SignStatusView>
      </peace-dialog>
    </template>
    <!-- 审方-处方详情 -->
    <template>
      <StratCheckView v-if="stratCheckView"
                      v-bind:jztClaimNo="JZTClaimNo"
                      v-bind:notCheckedCount="notCheckedCount"></StratCheckView>
    </template>
  </div>
</template>

<script>
import Service from './service/index'
import Observable from '../observable'
import NoDataView from './components/NoDataView'
import SignStatusView from './components/SignStatusView'
import WorkStatusView from './components/WorkStatusView'
import StratCheckView from './components/StratCheckView'
export default {
  // name: 'PrescriptionCheck',
  data() {
    return {
      JZTClaimNo: '',
      signStatusVisible: false,
      loading: false,
      notCheckedCount: undefined
    }
  },
  components: {
    NoDataView,
    SignStatusView,
    WorkStatusView,
    StratCheckView
  },
  watch: {
    '$store.state.pharmacist.status': {
      handler(value) {
        if (value) {
          if (value === '0') {
            Observable.mutations.changeView(Observable.constants.view.STATUS)
          } else {
            Service.getPharmacistAutograph().then((res) => {
              if (!res.data) {
                Observable.mutations.changeView(Observable.constants.view.SIGNSTATUS)
                this.signStatusVisible = true
              } else {
                this.getNotCheckedPrescription()
              }
            })
          }
        }
      },
      immediate: true
    }
  },
  computed: {
    view() {
      return Observable.state.view
    },
    noDataView() {
      return this.view === Observable.constants.view.NODATA
    },
    statusView() {
      return this.view === Observable.constants.view.STATUS
    },
    signStatusView() {
      return this.view === Observable.constants.view.SIGNSTATUS
    },
    stratCheckView() {
      return this.view === Observable.constants.view.DETAIL
    }
  },

  created() {},
  methods: {
    getNotCheckedPrescription() {
      Service.getNotCheckedPrescription()
        .then((res) => {
          this.loading = false
          this.JZTClaimNo = res.data.jztClaimNo
          console.log(this.JZTClaimNo)
          this.notCheckedCount = res.data.notCheckedCount
          if (this.JZTClaimNo) {
            Observable.mutations.changeView(Observable.constants.view.DETAIL)
            clearTimeout()
          } else {
            Observable.mutations.changeView(Observable.constants.view.NODATA)
            setTimeout(() => {
              this.loading = true
              this.getNotCheckedPrescription()
            }, 15000)
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__title {
  color: rgba(0, 0, 0, 0.85);
}
</style>