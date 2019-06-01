<template>
  <div>
    <div class="header">
      <el-button-group>
        <el-button :type="view.action === source.action.OUT ? 'primary' : '' " @click="changeAction(source.action.OUT)">我发起的</el-button>
        <el-button :type="view.action === source.action.IN ? 'primary' : '' " @click="changeAction(source.action.IN)">邀请我的</el-button>
      </el-button-group>
    </div>

    <hr>

    <!-- 我发起的 -->
    <div :key="source.action.OUT" v-if="view.action === source.action.OUT">
      <el-form :model="view.outModel" inline>
        <el-form-item label="邀请医生">
          <el-input placeholder v-model="view.outModel.toDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="邀请机构">
          <el-input placeholder v-model="view.outModel.toHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="会诊状态">
          <el-select clearable placeholder v-model="view.outModel.consultStatus">
            <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in source.consultStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get" round type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr>

      <peace-table pagination ref="table">
        <peace-table-column label="患者姓名" prop="familyName"></peace-table-column>
        <peace-table-column label="年龄" prop="familyAge"></peace-table-column>
        <peace-table-column label="性别" prop="familySex"></peace-table-column>
        <peace-table-column align="left" label="初步诊断" min-width="200px" prop="familyDisagnose"></peace-table-column>
        <peace-table-column align="left" label="邀请机构" min-width="200px" prop="toHospitalName"></peace-table-column>
        <peace-table-column label="邀请医生" prop="toDoctorName"></peace-table-column>
        <peace-table-column label="期望会诊时间" prop="expectTime" width="150px"></peace-table-column>
        <peace-table-column label="申请时间" prop="createdTime" width="150px"></peace-table-column>
        <peace-table-column :formatter="formatterConsultStatus" label="会诊状态" prop="consultStatus" width="100px"></peace-table-column>
        <peace-table-column :show-overflow-tooltip="false" fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
            <el-button @click="showDetail(scope.row)" type="text">会诊记录</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <!-- 邀请我的 -->
    <div :key="source.action.IN" v-if="view.action === source.action.IN">
      <el-form :model="view.inModel" inline>
        <el-form-item label="申请医生">
          <el-input placeholder v-model="view.inModel.inDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="申请机构">
          <el-input placeholder v-model="view.inModel.inHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="会诊状态">
          <el-select clearable placeholder v-model="view.inModel.consultStatus">
            <el-option :key="item.key" :label="item.value" :value="item.key" v-for="item in source.consultStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get" round type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr>

      <peace-table pagination ref="table">
        <peace-table-column label="患者姓名" prop="familyName"></peace-table-column>
        <peace-table-column label="年龄" prop="familyAge"></peace-table-column>
        <peace-table-column label="性别" prop="familySex"></peace-table-column>
        <peace-table-column align="left" label="初步诊断" min-width="200px" prop="familyDisagnose"></peace-table-column>
        <peace-table-column align="left" label="申请机构" min-width="200px" prop="fromHospitalName"></peace-table-column>
        <peace-table-column label="申请医生" prop="fromDoctorName"></peace-table-column>
        <peace-table-column label="期望会诊时间" prop="expectTime" width="150px"></peace-table-column>
        <peace-table-column label="申请时间" prop="createdTime" width="150px"></peace-table-column>
        <peace-table-column :formatter="formatterConsultStatus" label="会诊状态" prop="consultStatus" width="100px"></peace-table-column>
        <peace-table-column :show-overflow-tooltip="false" fixed="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
            <el-button @click="showDetail(scope.row)" type="text">会诊记录</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <peace-dialog :visible.sync="dialog.visible" custom-class="dialog" title="会诊详情">
      <consultation-detail :data="dialog.data" @close="() => dialog.visible = false"></consultation-detail>
    </peace-dialog>
  </div>
</template>

<script>
import config from './config'
import ConsultationDetail from './ConsultationDetail'

export default {
  components: {
    ConsultationDetail
  },

  data() {
    return {
      config,

      view: {
        action: undefined,

        outModel: {
          toDoctorName: undefined,
          toHospitalName: undefined,
          consultStatus: undefined
        },

        inModel: {
          inDoctorName: undefined,
          inHospitalName: undefined,
          consultStatus: undefined
        }
      },

      dialog: {
        visible: false,

        data: undefined
      },

      source: {
        action: {
          OUT: 'out',
          IN: 'in'
        },

        consultStatus: []
      }
    }
  },

  created() {
    this.view.action = this.source.action.OUT
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    changeAction(action) {
      this.view.action = action

      this.$nextTick().then(() => {
        this.get()
      })
    },

    get() {
      if (this.view.action === this.source.action.OUT) {
        const api = this.config.api.getOutConsultList
        const params = this.view.outModel

        this.$refs.table.loadData({
          api,
          params
        })
      } else {
        const api = this.config.api.getInConsultList
        const params = this.view.outModel

        this.$refs.table.loadData({
          api,
          params
        })
      }
    },

    showDetail(row) {
      this.dialog.data = undefined
      this.dialog.visible = true

      const params = {
        consultNo: row.consultNo
      }

      this.$http.post(this.config.api.getConsultInfo, params).then(res => {
        this.dialog.data = res.data.info
      })
    },

    formatterConsultStatus(r, c, v) {
      const temp = this.source.consultStatus.find(item => item.key === v)

      return temp && temp.refferStatus
    }
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
}
</style>

