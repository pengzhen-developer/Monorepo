<template>
  <div class="layout fit">
    <div class="layout-content q-ml-lg">
      <div class="row items-center q-mb-md">
        <div class="bg-primary q-mr-sm square-I"></div>

        <span class="title-style">患者基本信息</span>
      </div>

      <div class="row items-baseline">
        <div class="col-2.5">
          <span class="span-width">标签</span>
          <span>：</span>
        </div>

        <div class="row items-baseline col-9 no-wrap">
          <div class="q-mr-sm">
            <span v-show="model.diseaseInfo.tag.length === 0"
                  class="text-primary text-weight-regular">添加标签</span>

            <el-tag v-for="(item, index) in model.diseaseInfo.tag"
                    v-bind:key="index.toString() + item.toString()"
                    type="info"
                    size="small"
                    class="q-mr-sm q-mb-sm">{{ item }}</el-tag>
          </div>

          <el-button type="text"
                     icon="el-icon-circle-plus"
                     v-on:click="addLabel"></el-button>
        </div>
      </div>

      <div class="row items-baseline">
        <div class="col-2.5">
          <span class="span-width">诊断</span>
          <span>：</span>
        </div>

        <div class="row items-baseline col-9 no-wrap">
          <div class="q-mr-sm">
            <span v-show="model.diagnoseInfo.tag.length === 0"
                  class="text-primary">添加诊断</span>

            <el-tag v-for="(item, index) in model.diagnoseInfo.tag"
                    v-bind:key="index.toString() + item.toString()"
                    type="info"
                    size="small"
                    class="q-mr-sm q-mb-sm">{{ item }}</el-tag>
          </div>
          <el-button type="text"
                     icon="el-icon-circle-plus"
                     v-on:click="addDiagnose"> </el-button>
        </div>
      </div>

      <div class="row q-mb-md"
           v-bind:class="{ flexBaseLine: !action.isEditDisease, focusMarginTop: action.isEditDisease }">
        <div class="col-2.5">
          <span class="span-width">基本病情</span>
          <span>：</span>
        </div>

        <el-input ref="diseaseInput"
                  v-show="action.isEditDisease"
                  v-model.trim="model.illnessInfo.illness"
                  v-on:blur="endEditDisease"
                  maxlength="150"
                  show-word-limit
                  rows="7"
                  type="textarea"
                  class="col-9"></el-input>

        <div class="row items-baseline col-8 no-wrap"
             v-show="!action.isEditDisease">
          <div class="row items-baseline no-wrap">
            <span v-show="showIllness"
                  class="text-primary">填写病情</span>
            <span class="col-grow q-mr-sm"
                  style="word-break: break-all"
                  v-show="!action.isEditDisease">{{ model.illnessInfo.illness }}</span>
            <el-button v-show="!action.isEditDisease"
                       type="text"
                       icon="el-icon-edit"
                       v-on:click="addDisease"></el-button>
          </div>
        </div>
      </div>

      <q-separator class="q-my-sm bg-grey-3"
                   style="height: 1px" />

      <div class="q-my-md">
        <div class="row items-center justify-between q-mb-md">
          <div class="row items-center">
            <div class="bg-primary q-mr-sm square-I"></div>
            <span class="title-style">患者病程</span>
          </div>
          <el-button type="text"
                     class="sort-Text"
                     v-on:click="ascDisease">
            <div class="flex justify-center items-center">
              <span class="text-weight-regular q-mr-xs">{{ action.isAsc ? '最新病程优先' : '最早病程优先' }}</span>
              <el-image class="asc-image"
                        v-bind:class="[action.isAsc ? 'ascTran' : 'descTran']"
                        v-bind:src="ascImage" />
            </div>
          </el-button>
        </div>

        <RecordList noDataText="暂未为该患者添加病程记录"
                    :request-data="{}"
                    :data="model.list"
                    v-slot="item">
          <DiseaseRecordListCell :item="item"></DiseaseRecordListCell>
        </RecordList>
      </div>

      <el-backtop target=".layout-content"
                  :bottom="90"
                  :right="200"></el-backtop>
    </div>

    <div class="layout-footer full-width">
      <q-separator inset
                   class="q-mb-sm bg-grey-3" />

      <div class="text-center q-mt-md">
        <el-button class="btn rounded-borders"
                   v-on:click="addItem">添加病程</el-button>
        <el-button class="btn rounded-borders"
                   v-on:click="sendMessage">发送信息</el-button>
      </div>
    </div>

    <peace-dialog append-to-body
                  title="诊断"
                  :visible.sync="dialog.diagnoseVisible">
      <div style="margin-bottom: 10px">
        <el-select :remote-method="getPresent"
                   @change="chooseItem"
                   filterable
                   placeholder="请输入初步诊断"
                   remote
                   style="width: 100%;"
                   v-model="dialog.chooseItem">
          <el-option :key="item.id"
                     :label="item.name"
                     :value="item.name"
                     v-for="item in dialog.source.present_history"></el-option>
        </el-select>
      </div>

      <div style="margin: 10px 0;"
           v-if="dialog.chooseData.length > 0">
        <p>已选诊断</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item + index.toString()"
                  @close="closeItem(item)"
                  closable
                  style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="(item, index) in dialog.chooseData">{{ item }}</el-tag>
        </div>
      </div>

      <div style="margin: 10px 0;">
        <p>常见诊断</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item + index.toString()"
                  :type="dialog.chooseData.findIndex((existItem) => existItem === item) === -1 ? 'info' : 'primary'"
                  @click="chooseItem(item)"
                  style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="(item, index) in dialog.source.IllnessList">{{ item }}</el-tag>
        </div>
      </div>

      <div style="margin-bottom: 10px; text-align: center;">
        <el-button @click="dialog.diagnoseVisible = false">取消</el-button>
        <el-button @click="saveItem"
                   type="primary">保存</el-button>
      </div>
    </peace-dialog>

    <peace-dialog append-to-body
                  title="添加标签"
                  :visible.sync="dialog.visible">
      <div style="margin-bottom: 10px">
        <el-select @change="chooseItem"
                   allow-create
                   filterable
                   placeholder="请输入标签"
                   style="width: 100%;"
                   v-model="dialog.chooseItem">
          <el-option :key="item.name"
                     :label="item.name"
                     :value="item.name"
                     v-for="item in dialog.source.present_history"></el-option>
        </el-select>
      </div>

      <div style="margin: 10px 0;"
           v-if="dialog.chooseData.length > 0">
        <p>已选标签</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item + index.toString()"
                  @close="closeItem(item)"
                  closable
                  style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="(item, index) in dialog.chooseData">{{ item }}</el-tag>
        </div>
      </div>

      <div style="margin: 10px 0;">
        <p>常见标签</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item + index.toString()"
                  :type="dialog.chooseData.findIndex((existItem) => existItem === item) === -1 ? 'info' : 'primary'"
                  @click="chooseItem(item)"
                  style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="(item, index) in dialog.source.labelList">{{ item }}</el-tag>
        </div>
      </div>

      <div style="margin-bottom: 10px; text-align: center;">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button @click="saveLabel"
                   type="primary">保存</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import RecordList from '../RecordList'
import peace from '@src/library'
import DiseaseRecordListCell from './DiseaseRecordListCell'

export default {
  name: 'DiseaseRecord',
  props: {
    params: undefined
  },
  created() {
    this.getDiseaseData()
    this.getOption()
  },
  data() {
    return {
      model: {
        diseaseInfo: {
          id: undefined,
          tag: []
        },
        diagnoseInfo: {
          id: undefined,
          tag: []
        },
        illnessInfo: {
          id: undefined,
          illness: ''
        },
        list: []
      },
      action: {
        isEditDisease: false,
        isAsc: true
      },
      requestData: {
        request: peace.service.health.getPatientInquiryList,
        data: {
          // 请求列表参数
          tag: 'inquiry',
          patientNo: this.params.id
        }
      },
      ascImage: require('@src/assets/images/health-record/health_Records_Disease_Asc.png'),
      dialog: {
        visible: false,
        diagnoseVisible: false,
        // 已选中项
        chooseData: [],
        // 当前选中项
        chooseItem: '',
        // 远程搜索数据源
        source: {
          present_history: [],
          // 诊断
          IllnessList: [],
          //标签
          labelList: []
        },

        model: {
          name: undefined
        }
      }
    }
  },
  components: {
    RecordList,
    DiseaseRecordListCell
  },
  computed: {
    showIllness() {
      return !this.action.isEditDisease && peace.validate.isEmpty(this.model.illnessInfo.illness)
    }
  },
  methods: {
    addLabel() {
      this.dialog.chooseData = this.model.diseaseInfo.tag
      this.dialog.visible = true
    },
    addDiagnose() {
      this.dialog.chooseData = this.model.diagnoseInfo.tag
      this.dialog.diagnoseVisible = true
    },
    addDisease() {
      this.action.isEditDisease = true
      this.$nextTick(() => {
        this.$refs.diseaseInput.$el.children[0].focus()
      })
    },
    chooseItem(item) {
      const index = this.dialog.chooseData.findIndex((existItem) => existItem === item)
      if (index === -1) {
        this.dialog.chooseData.push(item)
        // 选中后， 清空状态
        this.dialog.chooseItem = ''
        this.dialog.source.present_history = []
      }
    },
    closeItem(item) {
      const index = this.dialog.chooseData.findIndex((existItem) => existItem === item)
      if (index !== -1) {
        this.dialog.chooseData.splice(index, 1)
      }
    },
    getPresent(query) {
      if (query !== '' && query.length > 0) {
        const params = { name: query }
        peace.service.patient.getDiseaseInfo(params).then((res) => {
          this.dialog.source.present_history = res.data.list
        })
      } else {
        this.dialog.source.present_history = []
      }
    },
    saveItem() {
      this.model.diagnoseInfo.tag = [...this.dialog.chooseData]
      this.dialog.diagnoseVisible = false
      // save
      const tmp = {
        tagType: 'diagnose',
        familyId: '',
        patientNo: '',
        patientId: '',
        tagId: this.model.diagnoseInfo?.id,
        tagNames: [...this.model.diagnoseInfo.tag]
      }
      const params = Object.assign(tmp, this.params.familyInfo)

      peace.service.follow.addTads(params).then((res) => {
        peace.util.success(res.msg)
      })
    },
    saveLabel() {
      this.model.diseaseInfo.tag = [...this.dialog.chooseData]
      this.dialog.visible = false

      const tmp = {
        tagType: 'disease',
        familyId: '',
        patientNo: '',
        patientId: '',
        tagId: this.model.diseaseInfo?.id,
        tagNames: [...this.model.diseaseInfo.tag]
      }
      const params = Object.assign(tmp, this.params.familyInfo)

      peace.service.follow.addTads(params).then((res) => {
        peace.util.success(res.msg)
      })
    },
    endEditDisease() {
      this.action.isEditDisease = false
      const tmp = {
        tagType: 'disease',
        familyId: '',
        patientNo: '',
        patientId: '',
        illnessId: this.model.illnessInfo?.id,
        illnessInfo: this.model.illnessInfo?.illness || ''
      }
      const params = Object.assign(tmp, this.params.familyInfo)
      peace.service.follow.addEditIllness(params).then((res) => {
        peace.util.success(res.msg)
      })
    },
    ascDisease() {
      this.action.isAsc = !this.action.isAsc
      this.getDiseaseData()
    },
    addItem() {
      $peace.$emit('showDrawer', { index: peace.type.HEALTH_RECORD.ACTION_TYPE.添加病程 })
    },
    sendMessage() {
      peace.util.info('暂未开通')
    },
    getDiseaseData() {
      const tmp = {
        familyId: '',
        patientNo: '',
        patientId: '',
        sort: this.action.isAsc ? 'asc' : 'desc'
      }
      const params = Object.assign(tmp, this.params.familyInfo)

      peace.service.follow.getDiseaseCourse(params).then((res) => {
        const tmpInfo = res.data.upInfo.couseInfo
        this.model.diagnoseInfo = Object.assign(this.model.diagnoseInfo, tmpInfo?.diagnoseInfo)
        this.model.diseaseInfo = Object.assign(this.model.diseaseInfo, tmpInfo?.diseaseInfo)
        this.model.illnessInfo = Object.assign(this.model.illnessInfo, tmpInfo?.illnessInfo)
        this.model.list = [...res.data.downInfo.list]
      })
    },
    getOption() {
      peace.service.follow.getTags({ type: 'diagnose' }).then((res) => {
        this.dialog.source.IllnessList = res.data.map((item) => {
          return item.tag
        })
      })
      peace.service.follow.getTags({ type: 'disease' }).then((res) => {
        this.dialog.source.labelList = res.data.map((item) => {
          return item.tag
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;

  .flexBaseLine {
    align-items: baseline;
  }

  .focusMarginTop {
    margin-top: 10px;
  }

  .span-width {
    width: 4em;
    display: inline-block;
    text-align-last: justify;
    color: rgba(96, 98, 102, 1);
  }

  .layout-content {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;

    .square-I {
      width: 4px;
      height: 16px;
    }

    .title-style {
      line-height: 22px;
      font-size: 16px;
    }

    .sort-Text {
      font-weight: 500;
      font-size: 12px;
      color: $--color-text-regular;
    }

    .asc-image {
      width: 16px;
      height: 13px;
    }

    .ascTran {
      transition: all 0.4s;
    }

    .descTran {
      transform: rotate(-180deg);
      transition: all 0.4s;
    }

    ::v-depp .list {
      margin: 0;
    }
  }

  .layout-footer {
    height: 59px;
    .btn {
      border-color: $--color-primary;
      color: $--color-primary;
      padding: 0 42px;
      height: 28px;

      &:nth-child(1) {
        margin-right: 30px;
      }
    }
  }
}
</style>
