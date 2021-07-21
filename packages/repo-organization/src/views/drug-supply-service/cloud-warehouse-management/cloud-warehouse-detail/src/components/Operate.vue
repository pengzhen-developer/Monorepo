<template>
  <div class="layout-route">

    <div class="card card-search">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="org-name">
        {{props.Name}}
      </div>
    </div>

    <div class="card"
         v-loading="loading">
      <div class="q-mb-24">
        <div class="item-title">
          <div class="title-left"></div>
          <p class="title">取药知情同意书</p>
        </div>
        <el-input type="textarea"
                  style="width: 802px;"
                  rows="7"
                  maxlength="500"
                  show-word-limit
                  placeholder="请输入内容"
                  v-model="InformedConsent">
        </el-input>
      </div>
      <el-button type="primary"
                 v-on:click="saveInformed"
                 v-bind:loading="saveLoading">保存</el-button>
    </div>

  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

let CLOUD_MODEL = {
  Id: '', // 云仓唯一标识
  Name: '', // 名称
  SystemCode: '', // 系统编码
  Type: '', // 系统类型 0 ERP  2 九州云仓
  CodeIn3PartPlatform: '', // 物流中心ID  / branchid
  IDIn3PartPlatform: '', // 运营方ID
  PrentCustList: [] // 机构数据信息
}

export default {
  data() {
    return {
      loading: true,
      saveLoading: false,
      cloudInfo: {},
      operationInfo: {},
      InformedConsent: ''
    }
  },

  computed: {
    props() {
      return Observable.state.props
    },
    view() {
      return Observable.state.view
    }
  },

  watch: {
    view(value) {
      if (value === Observable.constants.view.OPERATE) {
        this.getInfo()
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.props.Id) {
        this.getInfo()
      }
    })
  },

  methods: {
    getInfo() {
      this.loading = true
      let params = {
        ID: this.props.Id
      }
      Service.getInfo(params)
        .then((res) => {
          this.cloudInfo = res.data.GetCustIn3PartRes || Object.assign({}, CLOUD_MODEL)
          this.operationInfo = res.data.OperationInfo
          this.InformedConsent = this.operationInfo.InformedConsent || ''
        })
        .finally(() => {
          this.loading = false
        })
    },
    saveInformed() {
      this.saveLoading = true

      let params = {
        InformedConsent: this.InformedConsent
      }
      Service.saveInformedConsentInfo(params)
        .then(() => {
          Peace.util.success('保存成功')
          this.getInfo()
        })
        .finally(() => {
          this.saveLoading = false
        })
    },

    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}

p {
  padding: 0;
  margin: 0;
}

.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  font-weight: 500;
  color: #333333;
  line-height: 24px;
  margin-left: 10px;
  height: 24px;
  font-size: 16px;
}

::v-deep .el-textarea:not(.element-ui-default).el-input--mini .el-textarea__inner {
  padding: 16px;
}
</style>