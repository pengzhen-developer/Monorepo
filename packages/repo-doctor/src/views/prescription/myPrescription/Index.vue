<template>
  <div>
    <el-form :model="view.model" inline>
      <el-form-item label="患者姓名">
        <el-input placeholder v-model="view.model._患者姓名"></el-input>
      </el-form-item>
      <el-form-item label="患者来源">
        <el-select placeholder v-model="view.model._患者来源">
          <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in view.source._患者来源"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-input placeholder v-model="view.model._所属分组"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="get" round type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr>

    <peace-table pagination ref="table">
      <peace-table-column label="患者姓名" prop="_患者姓名" width="180"></peace-table-column>
      <peace-table-column label="最近咨询" prop="_最近咨询"></peace-table-column>
      <peace-table-column label="患者来源" prop="_患者来源"></peace-table-column>
      <peace-table-column label="所属分组" prop="_所属分组"></peace-table-column>
      <peace-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <el-dialog :visible.sync="dialog.visible" append-to-body title="患者详情" top="5vh" width="800px">
      <prescription-detail></prescription-detail>
    </el-dialog>
  </div>
</template>

<script>
import PrescriptionDetail from './PrescriptionDetail'

export default {
  components: {
    PrescriptionDetail
  },

  data() {
    return {
      api: {
        get: 'client/v1/getPatientDoctorList',
        getDetail: 'getDetail'
      },

      view: {
        model: {
          _患者姓名: undefined,
          _患者来源: undefined,
          _所属分组: undefined
        },

        source: {
          _患者来源: [{ label: '问诊', value: '问诊' }, { label: '扫码', value: '扫码' }]
        }
      },

      dialog: {
        visible: false
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.table.loadData({
        api: this.api.get,
        params: {}
      })
    },

    showDetail() {
      this.dialog.visible = true
      this.$http.get(this.api.getDetail)
    }
  }
}
</script>

<style lang="scss" scoped>
.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}

.el-form-item {
  margin-right: 60px;

  .el-input {
    width: 140px;
    height: 27px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}

/deep/ .el-dialog__body {
  max-height: 85vh;
  overflow-y: auto;
}
</style>
