<template>
  <div>
    <!-- 无数据显示空态页 -->
    <template>
      <NoDataVIew v-if="noDataView"></NoDataVIew>
    </template>

    <!-- 药师工作状态 -->
    <template>
      <WorkStatusView v-if="statusView"></WorkStatusView>
    </template>

    <!-- 药师医网信签名设置 -->
    <template>
      <SignStatusView v-if="signStatusView"></SignStatusView>
    </template>

    <!-- 审方-处方详情 -->

  </div>
</template>

<script>
import Observable from '../observable'
import NoDataVIew from './components/NoDataVIew'
import SignStatusView from './components/SignStatusView'
import WorkStatusView from './components/WorkStatusView'
import Service from './service/index'
export default {
  name: 'PrescriptionCheck',

  components: {
    NoDataVIew,
    SignStatusView,
    WorkStatusView
  },
  watch: {
    '$store.state.pharmacist.status': {
      handler(value) {
        if (value === '0') {
          Observable.mutations.changeView(Observable.constants.view.STATUS)
        }
        // if (value) {
        // this.getUserStatus()

        // }
      },
      immediate: true
    }
  },
  data() {
    return {
      // info: {
      //   userId: '',
      //   status: ''
      // }
    }
  },
  computed: {
    view() {
      console.log(Observable.state.view)
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
    detailView() {
      return this.view === Observable.constants.view.DETAIL
    }
  },

  created() {
    // this.getUserStatus()
  },
  methods: {
    getUserStatus() {
      Service.getUserStatus().then((res) => {
        // this.info.userId = res.data.userId
        // this.info.status = res.data.status
        if (res.data.status === '0') {
          Observable.mutations.changeView(Observable.constants.view.STATUS)
        }
      })
    }
  }
}
</script>

<style>
</style>