<template>
  <div>
    <div class="patient-title-style">{{ patientInfo.name }}</div>

    <el-alert v-bind:closable="false">
      <div slot="title">
        <span class="text-grey-333"
              style="font-size: 14px;">开处方</span>
        <i v-on:click="close"
           class="el-alert__closebtn el-icon-error"></i>
      </div>
    </el-alert>

    <div class="q-px-md q-mt-sm">
      <div class="q-mb-md text-center">
        <p class="text-subtitle1">{{ caseInfo.doctorInfo.hospitalName }}</p>
        <p class="text-h5">普通处方笺</p>
      </div>

      <div class="row q-mb-md items-center">

        <div class="col">
          <span class="text-grey-7">姓名</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.patientInfo.patientName }}</span>
        </div>

        <div class="col">
          <span class="text-grey-7">性别</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.patientInfo.sex }}</span>
        </div>

        <div class="col">
          <span class="text-grey-7">年龄</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.patientInfo.age }}</span>
        </div>

        <div class="col">
          <span class="text-grey-7">科别</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.doctorInfo.deptName }}</span>
        </div>

        <div class="col row items-center">
          <span class="text-grey-7 text-justify">体重</span>
          <span class="q-mx-sm">：</span>

          <div class="row">
            <el-input-number style="width: 100px;"
                             controls-position="right"
                             v-bind:min="0"
                             v-bind:max="200"
                             v-model="weight"
                             v-bind:precision="1">
            </el-input-number>
            <div class="flex items-center bg-grey-2 q-px-sm"
                 style="border-radius: 5px">
              kg
            </div>
          </div>
        </div>

      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-center">
          <span class="require-style"></span>
          <span class="text-grey-7 text-justify"
                style="width: 50px;">诊断</span>
          <span class="q-mx-sm">：</span>

          <template v-if="diagnoseList && diagnoseList.length > 0">
            <el-tag :key="item.id"
                    class="tag-style"
                    type="info"
                    v-for="item in diagnoseList">{{ item.name }}</el-tag>
            <el-button @click="changeDialog('疾病诊断')"
                       type="text">修改</el-button>
          </template>

          <template v-else>
            <el-button @click="showDialog('疾病诊断')"
                       type="text">请选择</el-button>
          </template>

        </div>

      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-center">
          <span class="require-style"></span>
          <span class="text-grey-7 text-justify"
                style="width: 50px;">过敏史</span>
          <span class="q-mx-sm">：</span>

          <template v-if="allergyHistory && allergyHistory.length > 0">
            <el-tag :key="item.id"
                    class="tag-style"
                    type="info"
                    v-for="item in allergyHistory">{{ item.name }}</el-tag>
            <el-button @click="changeDialog('过敏史')"
                       type="text">修改</el-button>
          </template>

          <template v-else>
            <el-button @click="showDialog('过敏史')"
                       type="text">请选择</el-button>
          </template>

        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-start">
          <span class="require-style"></span>
          <span class="text-grey-7 text-justify"
                style="width: 50px;">主诉</span>
          <span class="q-mx-sm">：</span>

          <el-input class="col"
                    type="textarea"
                    show-word-limit
                    placeholder="请输入内容"
                    v-bind:maxlength="500"
                    v-bind:autosize="{ minRows: 2, maxRows: 4}"
                    v-model="chiefComplaint"></el-input>
        </div>
      </div>

      <el-divider style="margin: 8px 0;"></el-divider>

      <div class="q-mb-sm">
        <span class="text-subtitle1 text-weight-bold">处方药品</span>
        <span class="text-body2 text-grey-5"></span>
      </div>

      <div class="q-mb-sm">
        <DrugSelect ref="drugSelect"
                    v-model="drugList"
                    v-bind:prescriptionTag.sync="prescriptionTag"
                    v-bind:max-count="5"></DrugSelect>
      </div>

      <div class="q-mb-sm text-center">
        <el-button v-on:click="close">取消</el-button>
        <el-button v-on:click="send"
                   v-bind:disabled="sending"
                   type="primary">发送</el-button>
      </div>
    </div>

    <!-- 系统审方结果 -->
    <peace-dialog title="系统审方结果"
                  v-bind:visible.sync="audit.visible">
      <RecipeAudit v-bind:data="audit.data"></RecipeAudit>

      <div class="q-my-md flex justify-center">
        <el-button v-on:click="sendConfirm">继续发送</el-button>
        <el-button type="primary"
                   v-on:click="audit.visible = false">返回修改</el-button>
      </div>
    </peace-dialog>

    <!-- 修改诊断 -->
    <peace-dialog :title="'添加' + dialog.title"
                  :visible.sync="dialog.visible">
      <div class="q-mb-10">

        <template v-if="dialog.title === '过敏史'">
          <el-select :remote-method="getAllergy"
                     @change="chooseItem"
                     allow-create
                     filterable
                     placeholder="请输入过敏史"
                     remote
                     style="width: 100%;"
                     v-model="dialog.chooseItem"
                     value-key="id">
            <el-option :key="item.id"
                       :label="item.name"
                       :value="item"
                       v-for="item in dialog.source.allergy_history"></el-option>
          </el-select>
        </template>

        <template v-if="dialog.title === '疾病诊断'">
          <el-select :remote-method="getPresent"
                     @change="chooseItem"
                     allow-create
                     filterable
                     placeholder="请输入疾病诊断"
                     remote
                     style="width: 100%;"
                     v-model="dialog.chooseItem">
            <el-option :key="item.id"
                       :label="item.name"
                       :value="item.name"
                       v-for="item in dialog.source.present_history"></el-option>
          </el-select>
        </template>

      </div>

      <div class="q-mx-10"
           v-if="dialog.chooseData.length > 0">
        <p>已选{{ dialog.title }}</p>

        <div class="q-ma-10">

          <el-tag :key="item.id"
                  @close="closeItem(item)"
                  closable
                  class="tag-style"
                  v-for="item in dialog.chooseData">{{ item.name }}</el-tag>

        </div>
      </div>

      <template v-if="dialog.title === '疾病诊断'">
        <div style="margin: 10px 0;">
          <p>常见{{ dialog.title }}</p>

          <div class="q-ma-10">
            <el-tag :key="item.code"
                    :type="selectTagClass(item)"
                    @click="chooseItem(item)"
                    class="tag-style cursor-pointer"
                    v-for="item in dialog.source.IllnessList">{{ item.name }}</el-tag>
          </div>
        </div>
      </template>

      <template v-if="dialog.title === '过敏史'">
        <div style="margin: 10px 0;">
          <p>常见{{ dialog.title }}</p>

          <div class="q-ma-10">
            <el-tag :key="item.code"
                    :type="selectTagClass(item)"
                    @click="chooseItem(item)"
                    class="tag-style cursor-pointer"
                    v-for="item in dialog.source.allergens">{{ item.name }}</el-tag>
          </div>
        </div>
      </template>

      <div class="q-mb-10 text-center">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button @click="saveItem"
                   type="primary">保存</el-button>
      </div>
    </peace-dialog>

    <peace-dialog width="500px"
                  title="库存提示"
                  v-bind:visible.sync="stock.visible">
      <div class="q-pa-md">
        <div class="q-mb-md">
          <p v-for="(item, index) in stock.data"
             v-bind:key="index">
            {{ item }}
          </p>
          <p>以上药品不可开具处方！请修改~</p>
        </div>

        <div class="q-mb-lg">
          <span>缺货药品已登记，联系电话：</span>
          <span class="text-primary">{{ stock.operatorContact }}</span>
        </div>

        <div class="text-center">
          <el-button type="primary"
                     v-on:click="stock.visible = false">知道了</el-button>
        </div>
      </div>
    </peace-dialog>

  </div>
</template>


<script>
import { mutations, store } from '../../store'
import Service from '../../service/index'
import RecipeAudit from '@src/views/components/recipe/RecipeAudit'
import DrugSelect from '@src/views/components/drug/DrugSelect'

export default {
  components: {
    RecipeAudit,
    DrugSelect
  },

  props: {
    session: Object
  },

  data() {
    return {
      prescriptionTag: undefined,

      /** 体重 */
      weight: undefined,

      /** 病历详情 */
      caseInfo: {
        doctorInfo: {},
        patientInfo: {}
      },

      /** 药品列表 */
      drugList: [],

      /** 前置审方 */
      audit: {
        visible: false,
        data: {}
      },

      /** 诊断 */
      diagnoseList: [],

      /** 过敏史 */
      allergyHistory: [],

      /** 主诉 */
      chiefComplaint: '',

      model: {
        present_history: [],
        allergy_history: []
      },

      /** 库存提示 */
      stock: {
        visible: false,
        operatorContact: '',
        data: []
      },

      dialog: {
        visible: false,
        chooseData: [],
        // 当前选中项
        chooseItem: '',

        // 远程搜素数据源
        source: {
          present_history: [],
          allergy_history: [],
          // 诊断
          IllnessList: [],
          // 过敏史
          allergens: []
        }
      },

      sending: false
    }
  },

  computed: {
    docInfo() {
      return Peace.$store.state.user?.userInfo?.list?.docInfo
    },

    patientInfo() {
      return store.activePatient
    }
  },

  created() {
    Promise.all([this.getCommonDiagnosis(), this.getCommonAllergy(), this.getPatientDetailInfo()]).then(() => {
      this.resetDataFromCache()
    })
  },

  methods: {
    resetDataFromCache() {
      const recipeCache = store.activePatient.patientId && Peace.cache.sessionStorage.get(store.activePatient.patientId)

      if (recipeCache) {
        this.weight = recipeCache.weight
        this.drugList = recipeCache.drugList
        this.prescriptionTag = recipeCache.prescriptionTag
        this.allergyHistory = recipeCache.allergyHistory
        this.chiefComplaint = recipeCache.chiefComplaint
        this.diagnoseList = recipeCache.diagnoseList
      }
    },

    // 获取患者信息
    getPatientDetailInfo() {
      const params = {
        patientNo: this.patientInfo.patientNo,
        patientId: this.patientInfo.patientId,
        familyId: this.patientInfo.familyId
      }

      Service.getBaseInfo(params).then((res) => {
        this.caseInfo = res.data
      })
    },

    /**
     * 设置tag的选中样式
     *
     */
    selectTagClass(item) {
      return this.dialog.chooseData.findIndex((existItem) => existItem.code === item.code) === -1 ? 'info' : 'primary'
    },

    /**
     * 获取常见诊断
     */
    getCommonDiagnosis() {
      Peace.service.patient.IllnessList().then((res) => {
        this.dialog.source.IllnessList = res.data.list
      })
    },

    /**
     * 获取常见过敏史
     */
    getCommonAllergy() {
      Peace.service.patient.allergens().then((res) => {
        this.dialog.source.allergens = res.data.list
      })
    },

    /**
     * 获取诊断
     *
     */
    getPresent(query) {
      if (query !== '' && query.length > 0) {
        const params = { name: query }
        Peace.service.patient.getDiseaseInfo(params).then((res) => {
          this.dialog.source.present_history = res.data.list
        })
      } else {
        this.dialog.source.present_history = []
      }
    },

    /**
     * 获取过敏史
     *
     */
    getAllergy(query) {
      if (query !== '' && query.length > 0) {
        const params = { name: query }
        Peace.service.patient.allergenList(params).then((res) => {
          this.dialog.source.allergy_history = res.data.list
        })
      } else {
        this.dialog.source.allergy_history = []
      }
    },

    /**
     * 发送处方
     */
    send() {
      if (this.diagnoseList.length === 0) {
        return Peace.util.warning('请添加诊断')
      }

      if (this.allergyHistory.length === 0) {
        return Peace.util.warning('请添加过敏史')
      }

      if (Peace.validate.isEmpty(this.chiefComplaint)) {
        return Peace.util.warning('请输入主诉')
      }

      const validObject = this.$refs.drugSelect.validDrugList()

      if (validObject.isValid === false) {
        return Peace.util.warning(validObject.message)
      }

      if (this.drugList.length < 1) {
        return Peace.util.warning('请添加处方药品')
      }

      if (this.drugList.some((drug) => drug.drugStatus === 'disable')) {
        return Peace.util.confirm('处方内含有停用药品，是否删除该药品', '提示', { type: 'error' }, () => {
          this.drugList = this.drugList.filter((drug) => drug.drugStatus === 'enable')
        })
      }

      const allergyHistoryString = this.allergyHistory.map((item) => item.name).join(',')
      const diagnoseInfos = [...this.diagnoseList].map((item) => {
        return {
          diagnoseCode: item.code,
          diagnoseName: item.name
        }
      })

      Peace.util.confirm('确认发送处方给患者？', '提示', {}, () => {
        this.sending = true

        const params = {
          openId: this.docInfo?.openid,
          patientNo: this.caseInfo.patientInfo.patientNo,
          patientId: this.caseInfo.patientInfo.patientId,
          familyId: this.caseInfo.patientInfo.familyId,
          weight: this.weight,
          allergyHistory: allergyHistoryString,
          baseIllness: this.chiefComplaint,
          diagnoseList: diagnoseInfos,
          drugList: this.drugList
        }

        Service.sendRecipe(params)
          .then((res) => {
            // 缺货提醒
            if (res.data.stockWarnStatus === 1) {
              const config = Peace.cache.sessionStorage.get('config')
              const operatorContact = config?.operatorContact

              this.stock.visible = true
              this.stock.data = res.data.noticeList
              this.stock.operatorContact = operatorContact
            }
            // 前置审方
            else if (res.data.isAdopt === false) {
              this.audit.visible = true
              this.audit.data = res.data.result
              this.audit.prescriptionNo = res.data.result.prescriptionNo
            }
            // 系统验证成功，发送处方成功
            else {
              Peace.util.success(res.msg)

              mutations.setShowWriteRecipe(false)
            }
          })
          .finally(() => {
            this.sending = false
          })
      })
    },

    /**
     * 确认发送处方
     */
    sendConfirm() {
      this.sending = true

      const params = {
        openId: this.docInfo?.openid,
        businessNo: this.inquiryNo || this.consultNo,
        prescriptionNo: this.audit.prescriptionNo
      }

      Service.confirmSend(params)
        .then((res) => {
          Peace.util.success(res.msg)
          mutations.setShowWriteRecipe(false)
        })
        .finally(() => {
          this.sending = false
        })
    },

    close() {
      const recipeCache = {
        weight: this.weight,
        prescriptionTag: this.prescriptionTag,
        diagnoseList: this.diagnoseList,
        allergyHistory: this.allergyHistory,
        chiefComplaint: this.chiefComplaint,
        drugList: this.drugList
      }

      store.activePatient.patientId && Peace.cache.sessionStorage.set(store.activePatient.patientId, recipeCache)

      mutations.setShowWriteRecipe(false)
    },

    showDialog(title) {
      this.dialog.title = title
      this.dialog.chooseData = []

      this.dialog.visible = true
    },

    changeDialog(title) {
      this.showDialog(title)
      this.$nextTick(function() {
        if (this.dialog.title === '过敏史') {
          this.dialog.chooseData = [...this.allergyHistory]
        } else if (this.dialog.title === '疾病诊断') {
          this.dialog.chooseData = [...this.diagnoseList]
        }
      })
    },

    chooseItem(item) {
      if (!item.code) {
        item = {
          name: item,
          code: item.code
        }
      }

      if (this.dialog.title === '过敏史') {
        if (item.name === '无') {
          this.dialog.chooseData = []
        } else {
          const index = this.dialog.chooseData.findIndex((existItem) => existItem.name === '无')

          if (index !== -1) {
            this.dialog.chooseData.splice(index, 1)
          }
        }
      }

      const index = this.dialog.chooseData.findIndex((existItem) => {
        return existItem.code === item.code && existItem.name === item.name
      })

      if (index === -1) {
        this.dialog.chooseData.push(item)

        // 选中后， 清空状态
        this.dialog.chooseItem = ''
        this.dialog.source.present_history = []
        this.dialog.source.allergy_history = []
      }
    },

    closeItem(item) {
      const index = this.dialog.chooseData.findIndex((existItem) => existItem === item)

      if (index !== -1) {
        this.dialog.chooseData.splice(index, 1)
      }
    },

    saveItem() {
      if (this.dialog.title === '过敏史') {
        this.allergyHistory = [...this.dialog.chooseData]
      } else if (this.dialog.title === '疾病诊断') {
        this.diagnoseList = [...this.dialog.chooseData]
      }

      this.dialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-title-style {
  padding: 12px;
  background-color: #f9f9f9;
  font-size: 18px;
  margin: 0px;
}

.require-style {
  &::before {
    content: '*';
    color: red;
    margin: 0 4px 0 0;
  }
}

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.el-divider--horizontal {
  margin: 12px 0;
}

.tag-style {
  margin: 2px 10px 2px 0;
  min-width: 62px;
  text-align: center;
  border: none;
  border-radius: 2px;
  height: 28px;
  line-height: 28px;
}
</style>