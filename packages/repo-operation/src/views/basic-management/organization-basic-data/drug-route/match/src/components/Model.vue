
<template>
  <div>
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">给药途径编码</div>
            <div class="info-item-value">{{detail.extCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药途径名称</div>
            <div class="info-item-value">{{detail.name}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药途径缩写名</div>
            <div class="info-item-value">{{detail.abbreviation}}</div>
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
            <div class="info-item-label">给药途径编码</div>
            <div class="info-item-value">{{checkedData.code}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药途径名称</div>
            <div class="info-item-value">{{checkedData.name}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">给药途径缩写名</div>
            <div class="info-item-value">{{checkedData.abbreviation}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-36">
      <div class="title">给药途径查找</div>
      <div class="q-mt-16">
        <el-form inline
                 label-suffix="："
                 v-on:keyup.enter.native="fetch"
                 v-on:submit.native.prevent
                 v-bind:model="search">
          <el-form-item label="给药途径名称">
            <PeaceInput v-model.trim="search.name"
                        placeholder="请输入"></PeaceInput>
          </el-form-item>
          <el-form-item>
            <el-button @click="fetch"
                       type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <PeaceTable ref="table"
                    v-bind:pageSize="5"
                    pagination
                    v-loading="loading.list">
          <PeaceTableColumn width="60px"
                            label="">
            <template slot-scope="scope">
              <el-radio v-model="checkedId"
                        v-on:change="selectData(scope.row)"
                        v-bind:label="scope.row.id">
                <span></span>
              </el-radio>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn min-width="160px"
                            label="平台编码"
                            prop="code">
            <template slot-scope="scope">
              {{scope.row.code || '--'}}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn min-width="160px"
                            label="平台给药途径名称"
                            prop="name">
            <template slot-scope="scope">
              {{scope.row.name || '--'}}
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn min-width="160px"
                            label="平台给药途径缩写名"
                            prop="abbreviation">
            <template slot-scope="scope">
              {{scope.row.abbreviation || '--'}}
            </template>
          </PeaceTableColumn>
        </PeaceTable>

      </div>
    </div>
    <div class="flex justify-between full-width q-pt-32">
      <div class="flex items-center">
        <el-button class="skip-btn"
                   v-bind:disabled="loading.save || loading.unable || loading.reset"
                   v-bind:loading="loading.skip"
                   @click="skip">跳过</el-button>
        <span style="color:#EA3930;"
              class="q-ml-8">点击进行下一条配码</span>
      </div>
      <div class="flex items-center">
        <template v-if="!(detail.mapperStatus === 'success' && detail.auditStatus === 'pass')">
          <el-button v-bind:disabled="loading.save || loading.unable || loading.skip"
                     v-bind:loading="loading.reset"
                     @click="reset">重置配码</el-button>
          <el-button v-bind:disabled="loading.save || loading.skip || loading.reset"
                     v-bind:loading="loading.unable"
                     @click="unabel">无法配码</el-button>
          <el-button type="primary"
                     v-bind:disabled="loading.skip || loading.unable || loading.reset"
                     v-bind:loading="loading.save"
                     @click="save">保存配码</el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'Model',
  props: {
    data: Object
  },

  data() {
    return {
      loading: {
        save: false,
        unable: false,
        reset: false,
        skip: false,
        list: false
      },
      detail: {},
      search: {
        name: ''
      },
      checkedId: '',
      checkedData: {}
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.detail = Peace.util.deepClone(this.data)
      this.search.name = this.detail.name
      this.fetch()
    })
  },

  methods: {
    fetch() {
      this.loading.list = true
      const fetch = Service.getPlatFormList
      const params = this.search

      this.$refs.table
        .reloadData({ fetch, params })
        .then((res) => {
          if (this.detail.mapperStatus !== 'success') {
            // 默认选择第一条
            let list = res.data.records
            if (list.length > 0) {
              this.checkedId = list[0].id
              this.checkedData = list[0]
            }
          } else {
            this.checkedId = ''
            this.checkedData = {
              code: this.detail.platformCode,
              name: this.detail.platformName,
              abbreviation: this.detail.platformAbbreviation
            }
          }
        })
        .finally(() => {
          this.loading.list = false
        })
    },
    selectData(data) {
      this.checkedData = data
    },
    save() {
      if (this.checkedData.code) {
        if (this.loading.save) return false
        this.loading.save = true
        let params = {
          code: this.detail.code,
          operatingType: 'Save',
          orgCode: this.detail.orgCode,
          platformCode: this.checkedData.code,
          platformName: this.checkedData.name,
          platformAbbreviation: this.checkedData.abbreviation
        }
        Service.matchCode(params)
          .then((res) => {
            Peace.util.success(res.message || '保存成功')
            this.$emit('refresh')
            this.$emit('clear')
            this.skip()
          })
          .finally(() => {
            this.loading.save = false
          })
      } else {
        Peace.util.warning('请选择平台给药途径')
      }
    },
    reset() {
      if (this.loading.reset) return false
      this.loading.reset = true
      let params = {
        code: this.detail.code,
        operatingType: 'Reset',
        orgCode: this.detail.orgCode,
        platformCode: this.checkedData.code,
        platformName: this.checkedData.name,
        platformAbbreviation: this.checkedData.abbreviation
      }
      Service.matchCode(params)
        .then((res) => {
          this.checkedId = ''
          this.checkedData = {}
          Peace.util.success(res.message || '保存成功')
          this.$emit('refresh')
          this.$emit('clear')
        })
        .finally(() => {
          this.loading.reset = false
        })
    },
    unabel() {
      if (this.loading.unabel) return false
      this.loading.unabel = true
      let params = {
        code: this.detail.code,
        operatingType: 'Unable',
        orgCode: this.detail.orgCode,
        platformCode: this.checkedData.code,
        platformName: this.checkedData.name,
        platformAbbreviation: this.checkedData.abbreviation
      }
      Service.matchCode(params)
        .then((res) => {
          this.checkedId = ''
          this.checkedData = {}
          Peace.util.success(res.message || '保存成功')
          this.$emit('refresh')
          this.$emit('clear')
        })
        .finally(() => {
          this.loading.unabel = false
        })
    },
    skip() {
      if (this.loading.skip) return false
      this.loading.skip = true
      let params = {
        functionOperation: 'MatchCode',
        id: this.detail.id,
        orgCode: this.detail.orgCode
      }
      Service.nextData(params)
        .then((res) => {
          this.detail = res.data

          this.$emit('clear')

          this.checkedId = ''
          this.checkedData = {}
          this.search.name = this.detail.name
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

.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
</style>