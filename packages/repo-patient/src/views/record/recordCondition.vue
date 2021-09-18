<template>
  <div>
    <div>
      <div class="form-dl">
        <div class="form-dt">请选择医院</div>
        <div :class="['form-dd', params.banHsp ? '' : 'icon-next', formData.hsp.netHospitalId ? 'value': '']"
             @click="goHspListPage">
          {{formData.hsp.hospitalName || '请选择'}}
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt">请选择就诊人</div>
        <div :class="['form-dd','icon-next', familyInfo.familyId ? 'value': '']"
             @click="selectFamily">
          {{familyInfo.name || '请选择'}}
        </div>
      </div>
    </div>
    <!-- 查询结果 -->
    <div v-if="recordFlag"
         class="record">
      <van-sticky @scroll="hasFixed">
        <div class="tab"
             v-if="!isFixed">
          <div @click="changeTab(0)"
               :class="tabIndex === 0 ? 'tab-item active' : 'tab-item'">
            检验
          </div>
          <div @click="changeTab(1)"
               :class="tabIndex === 1 ? 'tab-item active' : 'tab-item'">
            影像
          </div>
        </div>
        <div class="tab fixed"
             v-else>
          <div @click="changeTab(0)"
               :class="tabIndex === 0 ? 'tab-item-fixed active' : 'tab-item-fixed'">
            检验
          </div>
          <div @click="changeTab(1)"
               :class="tabIndex === 1 ? 'tab-item-fixed active' : 'tab-item-fixed'">
            影像
          </div>
        </div>
      </van-sticky>
      <div class="content"
           v-if="tabIndex===0">
        <van-list v-model="isLoading"
                  :finished="finished"
                  @load="get(0)">
          <div class="record-item"
               v-for="(item,index) in inspection.list"
               @click="getoDetail(item.checkId,item.checkType)"
               :key="index">
            <img class="record-item-left"
                 :src="require(tabIndex === 0?'@src/assets/images/ic_jianyan.png':'@src/assets/images/ic_yinxiang.png')">
            <div class="record-item-content">
              <div class="record-item-content-title">{{item.itemName || item.checkName}}</div>
              <div class="record-item-content-time">{{item.checkDate}}</div>
            </div>
            <img class="record-item-right"
                 :src="require('@src/assets/images/tit-more.jpg')">
          </div>
          <div class="none-page"
               v-if="inspection.list.length==0&&loaded">
            <div class="icon icon_none_record"></div>
            <div class="none-text">暂无报告单</div>
          </div>
        </van-list>
      </div>
      <div class="content"
           v-if='tabIndex===1'>
        <van-list v-model="isLoading"
                  :finished="finished"
                  @load="get(1)">
          <div class="record-item"
               v-for="(item,index) in pacs.list"
               @click="getoDetail(item.checkId,item.checkType)"
               :key="index">
            <img class="record-item-left"
                 :src="require(tabIndex === 0?'@src/assets/images/ic_jianyan.png':'@src/assets/images/ic_yinxiang.png')">
            <div class="record-item-content">
              <div class="record-item-content-title">{{item.itemName || item.checkName}}</div>
              <div class="record-item-content-time">{{item.checkDate}}</div>
            </div>
            <img class="record-item-right"
                 :src="require('@src/assets/images/tit-more.jpg')">
          </div>
          <div class="none-page"
               v-if="pacs.list.length==0&&loaded">
            <div class="icon icon_none_record"></div>
            <div class="none-text">暂无报告单</div>
          </div>
        </van-list>
      </div>
    </div>

    <!-- 就诊人信息 -->
    <template>
      <AddPatientMsg :showFamily.sync="showFamily"
                     type="recordCondition"
                     :patientId="familyInfo.familyId"
                     @changeFlag="changeFlag"></AddPatientMsg>
    </template>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sticky } from 'vant'

Vue.use(Sticky)
import peace from '@src/library'
import AddPatientMsg from '@src/views/components/AddPatientMsg'
export default {
  components: { AddPatientMsg },
  props: {},
  data() {
    return {
      params: {},
      formData: {
        hsp: {}
      },
      familyInfo: {},
      familyId: '',
      recordFlag: false,
      tabIndex: 0,
      isFixed: false,
      showFamily: false,
      inspection: {
        list: [],
        p: 0,
        size: 10
      },
      pacs: {
        list: [],
        p: 0,
        size: 10
      },
      finished: false,
      isLoading: false,
      loaded: false,
      timer: null
    }
  },
  watch: {
    'formData.hsp.netHospitalId': {
      handler() {
        this.reset()
        this.get()
      },
      immediate: true
    }
  },
  created() {
    this.params = peace.util.decode(this.$route.params.json)
    this.formData.hsp = this.params.hsp || {}
  },
  methods: {
    hasFixed(e) {
      this.isFixed = e.isFixed
    },
    reset(index = 0) {
      console.log('reset')
      if (index === 0) {
        this.inspection.list = []
        this.inspection.p = 0
      } else {
        this.pacs.list = []
        this.pacs.p = 0
      }
      this.loaded = false
      this.finished = false
    },
    changeTab(index) {
      if (this.tabIndex != index) {
        this.tabIndex = index
        this.reset(index)
        this.get(index, 'change')
      }
    },
    changeFlag(params) {
      this.showFamily = !this.showFamily
      if (params.flag) {
        this.familyInfo = params.familyInfo
        if (this.formData?.hsp?.netHospitalId) {
          this.recordFlag = true
          this.reset()
          this.get()
        } else {
          peace.util.alert('请选择医院')
        }
      }
    },

    selectFamily() {
      this.showFamily = true
    },
    goHspListPage() {
      let json = peace.util.encode({
        title: '选择医院',
        link: 'select',
        type: 'report'
      })

      if (this.params.banHsp) {
        return
      }

      !$peace.$recordCondition && ($peace.$recordCondition = this)
      this.$router.push(`/hospital/HospitalList/${json}`)
    },
    getoDetail(id, type) {
      const json = peace.util.encode({
        type: type,
        checkId: id
      })
      this.$router.push(`/file/fileRecordDetail/${json}`)
    },
    get(index = 0, type = 'srcoll') {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          if (index === 0) {
            this.getInspectionRecordList(type)
          } else {
            this.getPacsRecordList(type)
          }
          this.timer = null
        }, 100)
      }
    },
    getInspectionRecordList(type) {
      if (!this.familyInfo.familyId) {
        return
      }

      this.inspection.p++
      let param = {
        familyId: this.familyInfo.familyId,
        netHospitalId: this.formData.hsp.netHospitalId,
        checkType: 'inspection',
        p: this.inspection.p,
        size: this.inspection.size
      }
      peace.service.health.getRecordList(param).then((res) => {
        if (type === 'change') {
          this.inspection.list = [].concat(res.data.list)
        } else {
          this.inspection.list = this.inspection.list.concat(res.data.list)
        }

        this.isLoading = false
        this.loaded = true
        this.recordFlag = true
        if (this.inspection.p * this.inspection.size >= res.data.total) {
          this.finished = true
        }
      })
    },
    getPacsRecordList(type) {
      if (!this.familyInfo.familyId) {
        return
      }

      this.pacs.p++
      let param = {
        familyId: this.familyInfo.familyId,
        netHospitalId: this.formData.hsp.netHospitalId,
        checkType: 'pacs',
        p: this.pacs.p,
        size: this.pacs.size
      }
      peace.service.health.getRecordList(param).then((res) => {
        if (type === 'change') {
          this.pacs.list = [].concat(res.data.list)
        } else {
          this.pacs.list = this.pacs.list.concat(res.data.list)
        }

        this.isLoading = false
        this.loaded = true
        this.recordFlag = true
        if (this.pacs.p * this.pacs.size >= res.data.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@src/views/style/style.css';
.btn {
  padding: 13px;
  text-align: center;
}
::v-deep .van-sticky--fixed {
  background-color: #fff;
  background-color: #fff;
  border-bottom: 4px solid #f9f9f9;
}
.record {
  border-top: 8px solid #f9f9f9;
  padding: 16px;
  .tab {
    width: 60%;
    margin: 0 auto 15px;
    height: 33px;
    border: 1px solid #00c6ae;
    border-radius: 20px;
    position: relative;
    &.fixed {
      width: 100%;
      border: 0;
      display: flex;
      margin: 10px 0 15px 0;
      .tab-item-fixed {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin: 0;
        font-size: 15px;
        &.active {
          color: #00c6ae;
          &::after {
            content: '';
            position: absolute;
            display: block;
            width: 28px;
            background-color: #00c6ae;
            height: 2.5px;
            border-radius: 5px;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }

    .tab-item {
      width: 55%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 33px;
      line-height: normal;
      position: absolute;
      z-index: 1;
      top: -1px;
      border-radius: 20px;
      padding: 0;
      font-size: 15px;
      &:first-child {
        left: -1px;
      }
      &:last-child {
        right: -1px;
      }
      &.active {
        background: #00c6ae;
        color: #fff;
        z-index: 3;
      }
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    .record-item {
      display: flex;
      align-items: center;
      padding: 8.5px 0;
      border-bottom: 1px solid #dedede;
      .record-item-left {
        width: 30px;
        height: 30px;
        display: block;
        margin-right: 15px;
      }
      .record-item-right {
        width: 7px;
        height: 12px;
        display: block;
      }
      .record-item-content {
        // flex: 1;
        width: calc(100% - 52px);
        .record-item-content-title {
          color: #000;
          font-size: 15px;
          width: 96%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .record-item-content-time {
          font-size: 13px;
          color: #999;
        }
      }
    }
  }
}
</style>