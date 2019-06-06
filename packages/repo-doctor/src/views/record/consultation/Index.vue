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
            <el-option :key="item.consultStatus" :label="item.consultTxt" :value="item.consultStatus" v-for="item in source.consultStatus"></el-option>
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
            <el-button @click="showMessageHistory(scope.row)" type="text" v-show="scope.row.consultStatus === 7">会诊记录</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <!-- 邀请我的 -->
    <div :key="source.action.IN" v-if="view.action === source.action.IN">
      <el-form :model="view.inModel" inline>
        <el-form-item label="申请医生">
          <el-input placeholder v-model="view.inModel.fromDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="申请机构">
          <el-input placeholder v-model="view.inModel.fromHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="会诊状态">
          <el-select clearable placeholder v-model="view.inModel.consultStatus">
            <el-option :key="item.consultStatus" :label="item.consultTxt" :value="item.consultStatus" v-for="item in source.consultStatus"></el-option>
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
            <el-button @click="showMessageHistory(scope.row)" type="text" v-show="scope.row.consultStatus === 7">会诊记录</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </div>

    <peace-dialog :visible.sync="dialog.visible" custom-class="dialog" title="会诊详情">
      <consultation-detail :data="dialog.data" @close="() => dialog.visible = false"></consultation-detail>
    </peace-dialog>

    <peace-dialog :visible.sync="chatRecord.visible" custom-class="dialog" title="会诊详情">
      <ChatTeamList :data="chatRecord.data" @close="() => chatRecord.visible = false"></ChatTeamList>
    </peace-dialog>
  </div>
</template>

<script>
import config from './config'
import ConsultationDetail from './ConsultationDetail'
import ChatTeamList from './../../clinic/consultation/ChatTeamList'

import { mapState } from 'vuex'

export default {
  components: {
    ConsultationDetail,
    ChatTeamList
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
          fromDoctorName: undefined,
          fromHospitalName: undefined,
          consultStatus: undefined
        }
      },

      dialog: {
        visible: false,

        data: undefined
      },

      chatRecord: {
        visible: false,
        data: undefined
      },

      source: {
        action: {
          OUT: 'out',
          IN: 'in'
        },

        consultStatus: [
          { consultStatus: 1, consultTxt: '发起待审核' },
          { consultStatus: 2, consultTxt: '发起已拒绝' },
          { consultStatus: 3, consultTxt: '邀请待审核' },
          { consultStatus: 4, consultTxt: '邀请已拒绝' },
          { consultStatus: 5, consultTxt: '等待会诊' },
          { consultStatus: 6, consultTxt: '会诊中' },
          { consultStatus: 7, consultTxt: '会诊已完成' },
          { consultStatus: 8, consultTxt: '会诊已关闭' }
        ]
      }
    }
  },

  computed: {
    ...mapState(['user'])
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
        const params = this.view.inModel

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

    showMessageHistory(row) {
      this.chatRecord.visible = true
      this.chatRecord.data = undefined

      const params = {
        consultNo: row.consultNo
      }

      this.$http.post(this.config.api.getChatRecord, params).then(res => {
        res.data.info.forEach(item => {
          item.custom = item.ext && JSON.parse(item.ext)

          if (this.user.userInfo.list.docInfo.doctor_id === item.from) {
            item.flow = 'out'
          } else {
            item.flow = 'in'
          }
        })

        this.chatRecord.data = res.data.info.filter(item => item.type === 0)
      })
    },

    formatterConsultStatus(r, c, v) {
      const temp = this.source.consultStatus.find(item => item.consultStatus === v)

      return temp && temp.consultTxt
    }
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
}
</style>

