<template>
  <div>
    <div class="header">
      <el-button-group>
        <el-button :type="view.action === source.action.OUT ? 'primary' : '' "
                   @click="changeAction(source.action.OUT)">我发起的</el-button>
        <el-button :type="view.action === source.action.IN ? 'primary' : '' "
                   @click="changeAction(source.action.IN)">邀请我的</el-button>
      </el-button-group>
    </div>

    <!-- 我发起的 -->
    <div :key="source.action.OUT"
         class="content"
         v-if="view.action === source.action.OUT">
      <el-form inline
               space-none
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="view.outModel">
        <el-form-item label="邀请医生：">
          <el-input placeholder
                    v-model="view.outModel.toDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="邀请机构：">
          <el-input placeholder
                    v-model="view.outModel.toHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="会诊状态：">
          <el-select clearable
                     placeholder
                     v-model="view.outModel.consultStatus">
            <el-option :key="item.consultStatus"
                       :label="item.consultTxt"
                       :value="item.consultStatus"
                       v-for="item in source.consultStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr />

      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn min-width="120"
                          label="患者姓名"
                          prop="familyName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120"
                          label="年龄"
                          prop="familyAge"></PeaceTableColumn>
        <PeaceTableColumn min-width="120"
                          label="性别"
                          prop="familySex"></PeaceTableColumn>
        <PeaceTableColumn min-width="200"
                          label="疾病诊断"
                          prop="familyDisagnose"></PeaceTableColumn>
        <PeaceTableColumn min-width="200"
                          label="邀请机构"
                          prop="toHospitalName"></PeaceTableColumn>
        <PeaceTableColumn min-width="120"
                          label="邀请医生"
                          prop="toDoctorName"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="期望会诊时间"
                          prop="expectTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="160"
                          label="申请时间"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="120"
                          v-bind:formatter="formatterConsultStatus"
                          label="会诊状态"
                          prop="consultStatus"></PeaceTableColumn>
        <PeaceTableColumn width="180"
                          v-bind="false"
                          fixed="right"
                          label="操作">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)"
                       type="text">查看详情</el-button>
            <el-button @click="showMessageHistory(scope.row)"
                       type="text"
                       v-show="scope.row.consultStatus === 7">会诊记录</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <!-- 邀请我的 -->
    <div :key="source.action.IN"
         class="content"
         v-if="view.action === source.action.IN">
      <el-form inline
               space-none
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="view.inModel">
        <el-form-item label="申请医生：">
          <el-input placeholder
                    v-model="view.inModel.fromDoctorName"></el-input>
        </el-form-item>
        <el-form-item label="申请机构：">
          <el-input placeholder
                    v-model="view.inModel.fromHospitalName"></el-input>
        </el-form-item>
        <el-form-item label="会诊状态：">
          <el-select clearable
                     placeholder
                     v-model="view.inModel.consultStatus">
            <el-option :key="item.consultStatus"
                       :label="item.consultTxt"
                       :value="item.consultStatus"
                       v-for="item in source.consultStatus"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr />

      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn label="患者姓名"
                          prop="familyName"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          prop="familyAge"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          prop="familySex"></PeaceTableColumn>
        <PeaceTableColumn label="疾病诊断"
                          min-width="200px"
                          prop="familyDisagnose"></PeaceTableColumn>
        <PeaceTableColumn label="申请机构"
                          min-width="160px"
                          prop="fromHospitalName"></PeaceTableColumn>
        <PeaceTableColumn label="申请医生"
                          prop="fromDoctorName"></PeaceTableColumn>
        <PeaceTableColumn label="期望会诊时间"
                          prop="expectTime"
                          width="160px"></PeaceTableColumn>
        <PeaceTableColumn label="申请时间"
                          prop="createdTime"
                          width="160px"></PeaceTableColumn>
        <PeaceTableColumn :formatter="formatterConsultStatus"
                          label="会诊状态"
                          prop="consultStatus"
                          width="100px"></PeaceTableColumn>
        <PeaceTableColumn :show-overflow-tooltip="false"
                          fixed="right"
                          label="操作"
                          width="180px">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)"
                       type="text">查看详情</el-button>
            <el-button @click="showMessageHistory(scope.row)"
                       type="text"
                       v-show="scope.row.consultStatus === 7">会诊记录</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="dialog.visible"
                 title="会诊详情">
      <TheConsultationDetail :data="dialog.data"
                             @close="() => dialog.visible = false"></TheConsultationDetail>
    </PeaceDialog>

    <PeaceDialog :visible.sync="chatRecord.visible"
                 title="会诊详情">
      <ConsultationSessionMessageList :data="chatRecord.data"
                                      @close="() => chatRecord.visible = false"></ConsultationSessionMessageList>
    </PeaceDialog>
  </div>
</template>

<script>
import TheConsultationDetail from '@src/views/components/consultation/ConsultationDetail'
import ConsultationSessionMessageList from '@src/views/clinic/consultation/src/components/ConsultationSessionMessageList'

export default {
  components: {
    TheConsultationDetail,
    ConsultationSessionMessageList
  },

  data() {
    return {
      view: {
        action: undefined,

        outModel: {
          toDoctorName: '',
          toHospitalName: '',
          consultStatus: ''
        },

        inModel: {
          fromDoctorName: '',
          fromHospitalName: '',
          consultStatus: ''
        }
      },

      dialog: {
        visible: false,
        data: {}
      },

      chatRecord: {
        visible: false,
        data: []
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
    this.view.action = this.$route.params.type || this.source.action.OUT

    Peace.service.consult.getConsultStatusMap().then((res) => {
      this.source.consultStatus = res.data
    })
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
        const fetch = Peace.service.consult.getOutConsultList
        const params = this.view.outModel

        this.$refs.table.loadData({ fetch, params })
      } else {
        const fetch = Peace.service.consult.getInConsultList
        const params = this.view.inModel

        this.$refs.table.loadData({ fetch, params })
      }
    },

    showDetail(row) {
      this.dialog.visible = true
      this.dialog.data = {}

      const params = {
        consultNo: row.consultNo
      }

      Peace.service.consult.getConsultInfo(params).then((res) => {
        this.dialog.data = res.data.info
      })
    },

    showMessageHistory(row) {
      const params = {
        consultNo: row.consultNo
      }

      Peace.service.consult.getChatRecord(params).then((res) => {
        const historyMessageFormatHandler = (messages) => {
          if (messages && Array.isArray(messages)) {
            messages.forEach((message) => {
              const messageTypeMap = { 0: 'text', 1: 'image', 100: 'custom' }

              message.time = message.sendtime
              message.flow = this.$store.state.user.userInfo.list.docInfo.doctor_id === message.from ? 'out' : 'in'
              message.type = messageTypeMap[message.type]
              message.text = message.body.msg
              message.content = message.body
              message.file = message.body
            })
          }
        }

        historyMessageFormatHandler(res.data.info)

        this.chatRecord.data = []
        this.chatRecord.data = res.data.info
        this.chatRecord.visible = true
      })
    },

    formatterConsultStatus(r, c, v) {
      const temp = this.source.consultStatus.find((item) => item.consultStatus === v)

      return temp && temp.consultTxt
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin: -20px -20px 0;
  background: #f9f9f9;
  padding: 20px;
}

.content {
  padding: 20px 0 0 0;
}
</style>

