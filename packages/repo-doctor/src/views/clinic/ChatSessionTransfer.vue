<template>
  <div>
    <el-alert :closable="false" title="双向转诊" type="success">
      <div slot="title">
        <span>双向转诊</span>
        <i @click="cancelTransfer" class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <el-form :model="view.model" :rules="view.rules" label-position="right" label-width="120px" ref="form">
      <el-row>
        <el-form-item label="初步诊断" prop="_初步诊断">
          <span slot="label">初步诊断</span>
          <span>{{ view.model._初步诊断 }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转诊医生" prop="_转诊医生">
          <span slot="label">转诊医生</span>
          <el-button @click="choseTransfer" style="min-width: auto;" type="text" v-show="!view.model._转诊医生">请选择</el-button>
          <span>{{ view.model._转诊医生 }}</span>
          <el-button @click="choseTransfer" style="min-width: auto;" type="text" v-show="view.model._转诊医生">修改</el-button>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="期望转诊时间" prop="_期望转诊时间">
          <span slot="label">期望转诊时间</span>
          <el-date-picker placeholder type="datetime" v-model="view.model._期望转诊时间"></el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="转诊说明" prop="_转诊说明">
          <span slot="label">转诊说明</span>
          <el-input :rows="3" placeholder type="textarea" v-model="view.model._转诊说明"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center;">
        <el-form-item label=" ">
          <el-button @click="sendTransfer" type="primary">提交</el-button>
          <el-button @click="cancelTransfer">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-dialog :visible.sync="dialog.visible" title="选择转诊医生">
      <div>
        <el-input placeholder="请输入地区、医院或医生姓名" style="width: 300px;" v-model="dialog.model.doctorInfo"></el-input>
        <el-button type="primary">查询</el-button>
      </div>

      <peace-table :data="[{},{},{},{}]" :show-header="false" pagination ref="table">
        <peace-table-column align="left" label="name" prop="name">
          <template slot-scope="scope">{{ scope.$index }}xxxx 医院 xxxx 科室 xxxx 医生</template>
        </peace-table-column>
        <peace-table-column align="left" label="name" prop="name">
          <template>
            <el-button @click="chose" type="text">选择</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </el-dialog>
  </div>
</template>

<script>
import { state } from './util'

export default {
  props: {
    session: Object
  },

  data() {
    return {
      state,

      api: {
        getCase: 'client/v1/inquiry/getCase'
      },

      drug: {},

      view: {
        visible: false,

        model: {
          _初步诊断: undefined,
          _转诊医生: undefined,
          _期望转诊时间: undefined,
          _转诊说明: undefined
        },

        rules: {
          _初步诊断: [{ required: true, message: '请输入初步诊断', trigger: 'blur' }],
          _转诊医生: [{ required: true, message: '请选择转诊医生', trigger: 'blur' }],
          _期望转诊时间: [{ required: true, message: '请选择期望转诊时间', trigger: 'blur' }],
          _转诊说明: [{ required: true, message: '请输入转诊说明', trigger: 'blur' }]
        }
      },

      dialog: {
        visible: false,

        model: {}
      }
    }
  },

  created() {
    this.$http.post(this.api.getCase, { inquiry_no: this.session.custom.ext.inquiryNo }).then(res => {
      this.view.model._初步诊断 = res.data.diagnose
    })
  },

  mounted() {},

  methods: {
    choseTransfer() {
      this.dialog.visible = true
    },

    chose(row) {
      console.log(row)
      $peace.util.confirm('确定要选择【xxxx 医院 xxxx 科室 xxxx 医生】吗？', undefined, undefined, () => {
        this.view.model._转诊医生 = 'xxxx 医院 xxxx 科室 xxxx 医生'

        this.dialog.visible = false
      })
    },

    sendTransfer() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('sendTransfer')
        }
      })
    },

    cancelTransfer() {
      $peace.util.confirm('确定要退出病历吗？当前所有数据将会被清除!', undefined, undefined, () => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding-top: 20px;
  padding-right: 20px;

  .el-form-item__label span {
    // text-align-last: justify;
    // text-align: justify;
    // text-justify: distribute-all-lines;
    width: 6em;
    display: inline-block;
  }
}

.inspect {
  display: flex;
  justify-content: space-between;

  margin: 0 0 5px 0;

  .item {
    margin: 0 5px 0 0;

    .el-input {
      width: 56px;
      padding: 0;

      border-top: none;
      border-right: none;
      border-bottom: 1px solid #d6d6d6;
      border-left: none;

      /deep/ .el-input__inner {
        border: none;
        padding: 0 10px;
      }
    }

    & :first-child {
      color: rgba(51, 51, 51, 1);
    }

    & :last-child {
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>

