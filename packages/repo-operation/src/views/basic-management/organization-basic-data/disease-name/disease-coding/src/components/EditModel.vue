
<template>
  <div v-loading="loading">
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">疾病名称</div>
            <div class="info-item-value">{{innerInfo.name}}</div>
          </div>
        </div>
      </div>
      <div class="text-primary flex column items-center">
        <span>已匹配平台字典</span>
        <el-image v-bind:src="require('../assets/images/ic_shuttle.png')"></el-image>
      </div>
      <div class="flex column items-center">
        <div class="subtitle text-center">平台字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">疾病名称</div>
            <div class="info-item-value">{{innerInfo.platformDiseaseName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-36">
      <div class="title">疾病名称查找</div>
      <div class="card card-search q-mt-16">
        <el-form inline
                 label-suffix="："
                 v-on:keyup.enter.native="fetch"
                 v-on:submit.native.prevent
                 v-bind:model="model">
          <el-form-item label="疾病名称">
            <el-input v-model.trim="model.name"
                      placeholder="请输入"></el-input>
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
                    v-bind:pageSize="5">
          <PeaceTableColumn label=""
                            width="60px">
            <template slot-scope="scope">
              <el-radio v-model="radioId"
                        v-on:change="selectItems(scope.row)"
                        v-bind:label="scope.row.code"><span></span></el-radio>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="平台系统编码"
                            prop="code"
                            min-width="160px"></PeaceTableColumn>
          <PeaceTableColumn label="平台疾病名称"
                            prop="name"
                            min-width="160px"></PeaceTableColumn>
        </PeaceTable>

      </div>
    </div>
    <div class="flex justify-between full-width q-pt-32">
      <div class="flex items-center">
        <el-button v-on:click="skip"
                   class="skip-btn">跳过</el-button>
        <span style="color:#EA3930;"
              class="q-ml-8">点击进行下一条配码</span>
      </div>
      <div class="flex items-center"
           v-if="canShowRightBottomBtn">
        <el-button v-on:click="reset">重置配码</el-button>
        <el-button v-on:click="unabel">无法配码</el-button>
        <el-button type="primary"
                   v-on:click="submit">保存配码</el-button>
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
      innerInfo: {},
      model: {
        name: ''
      },
      radioId: '',
      loading: false
    }
  },
  computed: {
    canShowRightBottomBtn() {
      return !(this.innerInfo.auditStatus === 'pass' && this.innerInfo.mapperStatus === 'success')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.innerInfo = Object.assign({}, this.innerInfo, this.info)
      this.model.name = this.innerInfo.name
      this.fetch()
    })
  },
  methods: {
    //保存配码
    submit() {
      if (!this.innerInfo.platformDiseaseCode) {
        return Peace.util.warning('请选择平台编码信息')
      }
      this.matchCodeOperation('Save')
    },
    clear() {
      this.$emit('clear')
    },
    refresh() {
      this.$emit('refresh')
    },
    //重置配码
    reset() {
      this.matchCodeOperation('Reset')
    },
    //无法配码
    unabel() {
      this.matchCodeOperation('Unable')
    },
    matchCodeOperation(type) {
      this.loading = true
      const params = {
        operatingType: type,
        //机构字典
        code: this.innerInfo.code,
        orgCode: this.innerInfo.orgCode,
        //平台字典
        platformDiseaseCode: this.innerInfo.platformDiseaseCode,
        platformDiseaseName: this.innerInfo.platformDiseaseName
      }
      Service.matchCodeOperation(params)
        .then((res) => {
          Peace.util.success(res.message)

          if (type === 'Save') {
            //保存配码 下一条
            this.skip()
          } else {
            //重置配码，无法配码 清除平台字典信息
            this.radioId = ''
            this.innerInfo.platformDiseaseCode = ''
            this.innerInfo.platformDiseaseName = ''
          }
          this.clear()
          this.refresh()
        })
        .finally(() => {
          this.loading = false
        })
    },
    //跳过
    skip() {
      this.loading = true
      const params = {
        functionOperation: 'MatchCode',
        id: this.innerInfo.id,
        orgCode: this.innerInfo.orgCode
      }
      Service.nextData(params)
        .then((res) => {
          this.innerInfo = Object.assign({}, this.innerInfo, res.data)
          this.model.name = this.innerInfo.name
          this.fetch()
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetch() {
      const params = Peace.util.deepClone(this.model)
      const fetch = Service.matchPlatformDisease
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        if (this.innerInfo.mapperStatus !== 'success') {
          //默认选中第一个
          let list = res.data.records
          if (list.length > 0) {
            this.radioId = list[0].code
            this.selectItems(list[0])
          }
        }
      })
    },
    selectItems(row) {
      this.innerInfo.platformDiseaseName = row.name
      this.innerInfo.platformDiseaseCode = row.code
    }
  }
}
</script>

<style lang="scss" scoped>
.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
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
  min-width: 384px;
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
</style>