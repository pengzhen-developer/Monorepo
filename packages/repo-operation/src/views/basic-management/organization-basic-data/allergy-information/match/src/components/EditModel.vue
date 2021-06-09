
<template>
  <div>
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">过敏信息</div>
            <div class="info-item-value">{{organInfo.name}}</div>
          </div>
        </div>
      </div>
      <div class="text-primary flex column items-center justify-center q-pt-12">
        <span>已匹配平台字典</span>
        <el-image :src="require('../assets/images/ic_shuttle.png')"></el-image>
      </div>
      <div class="flex column items-center">
        <div class="subtitle text-center">平台字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">过敏信息</div>
            <div class="info-item-value">{{platInfo.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-36">
      <div class="title">过敏信息查找</div>
      <div class="card card-search q-mt-16">
        <el-form inline
                 label-suffix="："
                 v-on:keyup.enter.native="fetch"
                 v-on:submit.native.prevent
                 v-bind:model="model">
          <el-form-item label="过敏信息">
            <peace-input v-model.trim="model.name"
                         placeholder="请输入"></peace-input>
          </el-form-item>
          <el-form-item>
            <el-button v-on:click="fetch"
                       type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <PeaceTable ref="table"
                    pagination
                    v-bind:pageSize='5'
                    v-loading="loading.list">
          <PeaceTableColumn label=""
                            width="60px">
            <template slot-scope="scope">
              <el-radio v-model="radioId"
                        v-bind:label="scope.row.code"
                        v-on:change="selectItem(scope.row)"><span></span></el-radio>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="平台系统编码"
                            prop="code"
                            min-width="160px"></PeaceTableColumn>
          <PeaceTableColumn label="平台过敏信息"
                            prop="name"
                            min-width="160px"></PeaceTableColumn>
        </PeaceTable>

      </div>
    </div>
    <div class="flex justify-between full-width q-pt-32">
      <div class="flex items-center">
        <el-button v-on:click="skip"
                   class="skip-btn"
                   v-bind:loading="loading.skip">跳过</el-button>
        <span style="color:#EA3930;"
              class="q-ml-8">点击进行下一条配码</span>
      </div>
      <div class="flex items-center"
           v-if="!(organInfo.mapperStatus==='success'&&organInfo.auditStatus==='pass')">
        <el-button v-on:click="reset"
                   v-bind:loading="loading.reset"
                   v-bind:disabled="loading.save || loading.unable || loading.skip">重置配码</el-button>
        <el-button v-on:click="unabel"
                   v-bind:loading="loading.unabel"
                   v-bind:disabled="loading.save || loading.reset || loading.skip">无法配码</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:loading="loading.save"
                   v-bind:disabled="loading.reset || loading.unable || loading.skip">保存配码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'EditModel',
  props: {
    info: Object
  },

  data() {
    return {
      model: {
        name: ''
      },
      radioId: '',
      organInfo: {},
      platInfo: {},
      loading: {
        save: false,
        unabel: false,
        reset: false,
        skip: false,
        list: false
      }
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.organInfo = this.info
      this.model.name = this.organInfo.name
      if (this.organInfo.mapperStatus === 'success') {
        this.platInfo = { name: this.organInfo.platformAllergyName, code: this.organInfo.platformAllergyCode }
      }
      this.fetch()
    })
  },
  methods: {
    fetch() {
      this.loading.list = true
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.matchPlatformAllergyInfo
      this.$refs.table
        .reloadData({ fetch, params })
        .then((res) => {
          if (this.organInfo.mapperStatus !== 'success') {
            if (res.data.records.length > 0) {
              this.radioId = res.data.records[0].code
              this.selectItem(res.data.records[0])
            }
          }
        })
        .finally(() => {
          this.loading.list = false
        })
    },
    selectItem(row) {
      this.platInfo = row
    },
    save() {
      if (this.platInfo.code) {
        if (this.loading.save) return false
        this.loading.save = true
        const params = {
          code: this.organInfo.code,
          operatingType: 'Save',
          orgCode: this.organInfo.orgCode,
          platformAllergyCode: this.platInfo.code,
          platformAllergyName: this.platInfo.name
        }
        Service.allergyInfoMatchCode(params)
          .then(() => {
            Peace.util.alert('保存成功')
            this.$emit('complete')
            this.skip()
          })
          .finally(() => {
            this.loading.save = false
          })
      } else {
        Peace.util.warning('请选择需要配码的数据')
      }
    },
    //重置配码
    reset() {
      if (this.loading.reset) return false
      this.loading.reset = true
      const params = {
        code: this.organInfo.code,
        operatingType: 'Reset',
        orgCode: this.organInfo.orgCode,
        platformAllergyCode: this.platInfo.code ? this.platInfo.code : '',
        platformAllergyName: this.platInfo.name ? this.platInfo.name : ''
      }
      Service.allergyInfoMatchCode(params)
        .then(() => {
          Peace.util.alert('操作成功')
          this.platInfo = {}
          this.radioId = ''
          this.$emit('complete')
        })
        .finally(() => {
          this.loading.reset = false
        })
    },
    //无法配码
    unabel() {
      if (this.loading.unabel) return false
      this.loading.unabel = true
      const params = {
        code: this.organInfo.code,
        operatingType: 'Unable',
        orgCode: this.organInfo.orgCode,
        platformAllergyCode: this.platInfo.code ? this.platInfo.code : '',
        platformAllergyName: this.platInfo.name ? this.platInfo.name : ''
      }
      Service.allergyInfoMatchCode(params)
        .then(() => {
          Peace.util.alert('操作成功')
          this.platInfo = {}
          this.radioId = ''
          this.$emit('complete')
        })
        .finally(() => {
          this.loading.unabel = false
        })
    },
    //跳过
    skip() {
      if (this.loading.skip) return false
      this.loading.skip = true
      const params = { functionOperation: 'MatchCode', id: this.organInfo.id, orgCode: this.organInfo.orgCode }
      Service.allergyInfoNextData(params)
        .then((res) => {
          this.organInfo = res.data
          this.model.name = this.organInfo.name
          this.platInfo = {}
          this.fetch()
        })
        .finally(() => {
          this.loading.skip = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 24px;
  margin-bottom: 8px;
}
.info {
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  width: 384px;
  .info-item-label,
  .info-item-value {
    border-bottom: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    padding: 9px 16px;

    color: #333333;
    line-height: 20px;
  }
  .info-item-label {
    background: #fafafa;
    font-weight: bold;
    width: 35%;
  }
  .info-item-value {
    width: 65%;
  }
}
.title {
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  position: relative;
  padding-left: 12px;
  &::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #3099a6;
    border-radius: 2px;
    left: 0;
    top: 4px;
    position: absolute;
  }
}
.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
</style>