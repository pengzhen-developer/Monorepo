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
      <el-row class="transfer-doctor">
        <el-form-item label="转诊医生" prop="_转诊医生">
          <span slot="label">转诊医生</span>
          <el-button @click="choseTransfer" style="min-width: auto;" type="text" v-show="!view.model._转诊医生">请选择</el-button>
          <template v-if="view.model._转诊医生">
            <div class="transfer-doctor-info">
              <img :src="view.model._转诊医生.photoDoc" style="width: 40px; height: 40px; border-radis: 50%;">
              <span style="font-size:16px; font-weight:700;">{{view.model._转诊医生.name }}</span>
              <span>{{view.model._转诊医生.doctor_title }}</span>
              <span>{{view.model._转诊医生.netdept_name }}</span>
              <span>{{view.model._转诊医生.netHospital_name }}</span>
              <el-button @click="choseTransfer" style="min-width: auto;" type="text" v-show="view.model._转诊医生">修改</el-button>
            </div>
          </template>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="期望转诊时间" prop="_期望转诊时间">
          <span slot="label">期望转诊时间</span>
          <el-date-picker
            format="yyyy-MM-dd HH:mm"
            placeholder
            style="width: 185px;"
            type="datetime"
            v-model="view.model._期望转诊时间"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
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

    <el-dialog :visible.sync="dialog.visible" title="选择转诊医生" width="700px">
      <div>
        <el-input placeholder="请输入地区、医院或医生姓名" style="width: 320px; margin-right: 40px;" v-model="dialog.model.name"></el-input>
        <el-button @click="get" round type="primary">查询</el-button>
      </div>

      <hr>

      <peace-table pagination ref="table">
        <peace-table-column label="医生头像" prop="name" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.photoDoc" style="width: 40px; height: 40px; border-radis: 50%;">
          </template>
        </peace-table-column>
        <peace-table-column label="医生姓名" prop="name" width="100px"></peace-table-column>
        <peace-table-column label="职称" prop="doctor_title" width="100px"></peace-table-column>
        <peace-table-column label="科室" prop="netdept_name" width="100px"></peace-table-column>
        <peace-table-column label="医院" prop="netHospital_name"></peace-table-column>
        <peace-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button @click="chose(scope.row)" type="text">选择</el-button>
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
        getCase: 'client/v1/inquiry/getCase',
        referralDocListPc: 'client/v1/inquiry/referralDocListPc'
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
          _初步诊断: [{ required: true, message: '请输入初步诊断', trigger: 'change' }],
          _转诊医生: [{ required: true, message: '请选择转诊医生', trigger: 'change' }],
          _期望转诊时间: [{ required: true, message: '请选择期望转诊时间', trigger: 'change' }],
          _转诊说明: [{ required: true, message: '请输入转诊说明', trigger: 'change' }]
        }
      },

      dialog: {
        visible: false,

        model: {
          name: undefined
        }
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
    get() {
      this.$refs.table.loadData({
        api: this.api.referralDocListPc,
        params: { inquiry_no: this.session.custom.ext.inquiryNo, name: this.dialog.model.name }
      })
    },

    choseTransfer() {
      this.dialog.visible = true

      this.$nextTick(function() {
        this.get()
      })
    },

    chose(row) {
      this.dialog.visible = false

      this.view.model._转诊医生 = row
    },

    sendTransfer() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('sendTransfer')
        }
      })
    },

    cancelTransfer() {
      $peace.util.confirm('确定要退出转诊吗？当前所有数据将会被清除!', undefined, undefined, () => {
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

.transfer-doctor {
  /deep/ .el-form-item--mini .el-form-item__label,
  /deep/ .el-form-item--mini .el-form-item__content {
    line-height: 40px;
  }

  &-info {
    display: inline-flex;
    align-items: center;

    span {
      margin: 0 10px;
    }
  }
}
</style>

