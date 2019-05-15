<template>
  <div>
    <el-form :model="view.model" inline>
      <el-form-item label="患者姓名">
        <el-input placeholder v-model="view.model.patient_name"></el-input>
      </el-form-item>
      <el-form-item label="患者来源">
        <el-select clearable placeholder v-model="view.model.source">
          <el-option :key="item.key" :label="item.source" :value="item.key" v-for="item in view.source.group_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-input placeholder v-model="view.model.group_name"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="get" round type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr>

    <peace-table pagination ref="table">
      <peace-table-column label="患者姓名" prop="real_name" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.patient_remarks || scope.row.real_name || scope.row.weixin_name }}</span>
        </template>
      </peace-table-column>
      <peace-table-column align="left" label="最近咨询" min-width="300">
        <template slot-scope="scope">
          <span style="margin-right: 8px;">{{ scope.row.family_name }}</span>
          <span style="margin-right: 8px;">{{ scope.row.family_sex }}</span>
          <span style="margin-right: 8px;">{{ scope.row.family_age }}</span>
          <span style="margin-right: 8px;">{{ scope.row.diagnose }}</span>
          <span style="margin-right: 8px;">{{ scope.row.family_time }}</span>
        </template>
      </peace-table-column>
      <peace-table-column :formatter="(r,c,v) => { return this.view.source.group_name.find(item => item.key === v).source }" label="患者来源" prop="source"></peace-table-column>
      <peace-table-column label="所属分组" min-width="200" prop="group_names"></peace-table-column>
      <peace-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>

    <peace-dialog :visible.sync="dialog.visible" append-to-body title="患者详情" width="690px">
      <prescription-detail :data="dialog.data"></prescription-detail>
    </peace-dialog>
  </div>
</template>

<script>
import PrescriptionDetail from './PrescriptionDetail'

import config from './config'

export default {
  components: {
    PrescriptionDetail
  },

  data() {
    return {
      config,

      view: {
        model: {
          patient_name: undefined,
          source: undefined,
          group_name: undefined
        },

        source: {
          group_name: []
        }
      },

      dialog: {
        visible: false,

        data: {}
      }
    }
  },

  created() {
    this.$http.post(this.config.api.getSource).then(res => {
      this.view.source.group_name = res.data
    })
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      this.$refs.table.loadData({
        api: this.config.api.patientListPc,
        params: this.view.model
      })
    },

    showDetail(row) {
      this.dialog.data = {}
      this.dialog.visible = true

      const params = {
        patientid: row.patient_id
      }

      this.$http.get(this.config.api.patientListDescPc, { params }).then(res => {
        this.dialog.data = res.data
      })
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
</style>
