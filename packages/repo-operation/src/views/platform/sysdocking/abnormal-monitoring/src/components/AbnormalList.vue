<template>

  <div>
    <!-- 药房列表 -->
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="query"
               v-bind:rules="rules"
               ref="Form"
               inline="inline"
               label-width="auto"
               label-position="right"
               label-suffix
               size="mini"
               class="q-mb-lg"
               style="border-bottom:1px dashed #e9e9e9;">
        <el-form-item label="同步异常短信提醒：">
          <el-switch v-model="query.warnSwitch"
                     active-value="1"
                     inactive-value="0"
                     v-on:change="changeStatus"></el-switch>
        </el-form-item>
        <el-form-item label="提醒人号码"
                      prop="phone"
                      v-if="query.warnSwitch==='1'">
          <template v-if="query.phone&&!isShow">
            <span>{{query.phone}}</span>
            <i class="zyy-icon zyy-xiugai1 text-primary q-ml-md"
               size="12"
               v-on:click="isShow=true">修改</i>
          </template>
          <template v-if="isShow">
            <el-input v-model.trim="query.phone"
                      placeholder="请输入"></el-input>
            <el-button type="text"
                       style="min-width: 50px;;"
                       v-on:click="save"
                       v-bind:disabled="isdisable">保存</el-button>
          </template>
        </el-form-item>
      </el-form>
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="业务编号：">
          <el-input v-model.trim="model.bizCode"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="业务类型：">
          <el-select v-model="model.bizType"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in dictdata.bizTypeDict"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对接系统：">
          <el-select v-model="model.dockingSystem"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item  in dictdata.synSysDict"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="同步状态：">
          <el-select v-model="model.synStatus"
                     placeholder="全部"
                     clearable>
            <el-option v-for="item in dictdata.synStatusDict"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构名称：">
          <el-input v-model.trim="model.organName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <peace-table ref="table"
                   pagination
                   size="mini">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="业务编号"
                         prop="bizCode"
                         width="260px"></el-table-column>
        <el-table-column label="机构名称"
                         prop="organName"
                         min-width="160px">
          <template slot-scope="scope">1920
            {{ scope.row.organName || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="业务类型"
                         prop="bizType"
                         min-width="180px">
          <template slot-scope="scope">
            {{scope.row.bizType | getLabel(dictdata.bizTypeDict)}}
          </template>
        </el-table-column>

        <el-table-column label="对接系统"
                         prop="dockingSystem"
                         width="160px">
          <template slot-scope="scope">
            {{scope.row.dockingSystem | getLabel(dictdata.synSysDict)}}
          </template>
        </el-table-column>
        <el-table-column label="同步状态"
                         prop="synStatus"
                         width="100px"
                         align="center">
          <template slot-scope="scope">
            <div v-bind:class="scope.row.synStatus==0?'red':'grey'">
              {{scope.row.synStatus | getLabel(dictdata.synStatusDict)}}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="首次同步时间"
                         prop="firstSynTime"
                         width="180px"></el-table-column>

        <el-table-column label="操作"
                         align="left"
                         width="160px"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="nonitorDetail(scope.row)">查看详情</el-button>
            <el-button type="text"
                       v-on:click="manualSyn(scope.row)"
                       v-if="scope.row.synStatus==0&&scope.row.manualSyn==1">手工同步</el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
export default {
  name: 'AbnormalList',
  inject: ['provideData'],
  props: {
    dictdata: Object
  },
  data() {
    // 校验手机
    let validMobile = (rule, value, callback) => {
      if (Peace.validate.isMobile(value)) {
        callback()
      } else {
        return callback(new Error())
      }
    }
    return {
      data: {
        bizCode: '',
        bizType: ''
      },
      isShow: false,
      savePhone: '',
      isdisable: false,
      query: {
        id: '',
        phone: '',
        warnSwitch: '',
        organName: ''
      },
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: validMobile,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      model: {
        bizCode: '',
        bizType: '',
        dockingSystem: '',
        synStatus: ''
      }
    }
  },
  watch: {},
  filters: {
    getLabel: function(value, list) {
      return list.find((item) => item.value === value)?.label
    }
  },
  mounted() {
    this.fetch()
    this.getSmsWarn()
  },

  methods: {
    fetch() {
      const fetch = Service.exceptionMonitorList
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    //查询同步异常短信提醒信息
    getSmsWarn() {
      Service.exceptionSmsWarn().then((res) => {
        let data = res.data
        this.query.id = data.id
        this.query.phone = data.phone
        this.savePhone = data.phone
        if (!this.query.phone) {
          this.isShow = true
        }
        this.query.warnSwitch = data.warnSwitch
      })
    },
    //修改异常短信提醒
    save() {
      this.validateForm().then(() => {
        this.isShow = false
        this.isdisable = true
        const params = Object.assign({}, this.query)
        Service.updataExceptionSmsWarn(params)
          .then((res) => {
            Peace.util.success(res.msg)
          })
          .finally(() => {
            this.isdisable = false
            this.getSmsWarn()
          })
      })
    },
    changeStatus() {
      const message = this.query.warnSwitch == '0' ? '确定关闭短信提醒？' : '确定开启短信提醒？'
      if (this.query.warnSwitch == '0') {
        //关闭时还原手机号
        this.query.phone = this.savePhone
      }
      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          if ((this.query.phone && this.query.warnSwitch == '1') || this.query.warnSwitch == '0') {
            this.save()
          }
        })
        .catch(() => {
          this.query.warnSwitch = this.query.warnSwitch == '1' ? '0' : '1'
        })
    },
    //查看详情
    nonitorDetail(row) {
      this.Visible = true
      this.data.bizCode = row.bizCode
      this.data.bizType = row.bizType
      this.provideData(this.data)
    },
    //手工tongbu
    manualSyn(row) {
      this.$confirm('确定手工同步', '提示', { closeOnClickModal: false }).then(() => {
        const params = {
          id: row.id
        }
        Service.manualSyn(params).then((res) => {
          Peace.util.success(res.msg)
          this.fetch()
        })
      })
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.zyy-xiugai1 {
  font-size: 14px;
  cursor: pointer;
  &::before {
    margin-right: 7px;
  }
}
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
.red {
  color: #ed4014;
}
.grey {
  color: #333;
}
</style>