// 发处方

<template>
  <div>
    <el-alert type="success"
              v-bind:closable="false">
      <div slot="title">
        <span>开处方</span>
        <i v-on:click="close"
           class="el-alert__closebtn el-icon-error"></i>
      </div>
    </el-alert>

    <div class="q-px-md q-mt-sm">
      <div class="q-mb-md text-center">
        <p class="text-subtitle1">{{ docInfo.netHospital_name }}</p>
        <p class="text-h5">普通处方笺</p>
      </div>

      <div class="row q-mb-md">
        <div class="col">
          <span class="text-grey-7">姓名</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.patient_name }}</span>
        </div>
        <div class="col">
          <span class="text-grey-7">性别</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.sex }}</span>
        </div>
        <div class="col">
          <span class="text-grey-7">年龄</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.age }}</span>
        </div>
        <div class="col">
          <span class="text-grey-7">科别</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.netdept_child }}</span>
        </div>
        <div class="col"
             v-if="showPayType">
          <span class="text-grey-7">费用</span>
          <span class="q-mx-sm">：</span>
          <span>{{ payTypeText }}</span>
        </div>
      </div>

      <div class="row q-mb-md">
        <div class="col-12 flex items-center">
          <span class="text-grey-7 text-justify"
                style="width: 60px;">体重</span>
          <span class="q-mx-sm">：</span>
          <div class="flex">
            <el-input-number style="width: 120px;"
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
          <span class="text-grey-7 text-justify"
                style="width: 60px;">初步诊断</span>
          <span class="q-mx-sm">：</span>
          <!-- <span>{{ caseInfo.diagnose }}</span> -->

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
          <span class="text-grey-7 text-justify"
                style="width: 60px;">过敏史</span>
          <span class="q-mx-sm">：</span>
          <span>{{ caseInfo.allergy_history || '无' }}</span>
        </div>
      </div>

      <el-divider style="margin: 8px 0;"></el-divider>

      <div class="q-mb-sm">
        <span class="text-subtitle1 text-weight-bold">处方药品</span>
        <span class="text-body2 text-grey-5">（最多可添加 5 种药品）</span>
      </div>

      <div class="q-mb-sm">
        <DrugSelect ref="drugSelect"
                    v-bind:data="drugList"
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

      <template>
        <div class="q-mx-10">
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

      <div class="q-mb-10 text-center">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button @click="saveItem"
                   type="primary">保存</el-button>
      </div>
    </peace-dialog>

  </div>
</template>


<script>
import Service from './service'
import Type from '@src/type'
import RecipeAudit from './RecipeAudit'
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
      /** 体重 */
      weight: undefined,

      /** 病历详情 */
      caseInfo: {},

      /** 药品列表 */
      drugList: [],

      /** 前置审方 */
      audit: {
        visible: false,
        data: {}
      },

      /** 诊断 */
      diagnoseList: [],

      model: {
        present_history: [],
        allergy_history: []
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
          IllnessList: []
        }
      },

      sending: false
    }
  },

  computed: {
    docInfo() {
      return $peace.$store.state.user?.userInfo?.list?.docInfo
    },

    inquiryNo() {
      return this.session?.content?.inquiryInfo?.inquiryNo
    },

    showPayType() {
      return this.session?.content?.inquiryInfo?.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      return Object.keys(Type.INQUIRY.INQUIRY_PAY_TYPE).find((key) => Type.INQUIRY.INQUIRY_PAY_TYPE[key] === this.session?.content?.inquiryInfo?.paymentType)
    },

    consultNo() {
      return this.session?.content?.consultInfo?.consultNo
    }
  },

  created() {
    this.resetModel()
  },

  beforeMount() {
    this.$nextTick(function () {
      this.getCase()
      this.getCommonDiagnosis()
    })
  },

  methods: {
    setModel() {
      const drugList = this.$refs.drugSelect.getModel()

      const params = {
        weight: this.weight,
        drugList: drugList,
        diagnoseList: this.diagnoseList
      }

      Peace.cache.sessionStorage.set(this.inquiryNo, params)
    },

    resetModel() {
      const recipeCache = Peace.cache.sessionStorage.get(this.inquiryNo)

      if (recipeCache) {
        this.weight = recipeCache.weight
        this.drugList = recipeCache.drugList
        this.diagnoseList = recipeCache.diagnoseList
      }
    },

    /**
     * 设置tag的选中样式
     *
     */
    selectTagClass(item) {
      return this.dialog.chooseData.findIndex((existItem) => existItem.code === item.code) === -1 ? 'info' : 'primary'
    },

    /**
     * 获取病历，展示患者基本信息
     *
     */
    getCase() {
      // 兼容会诊和问诊
      const params = {
        inquiry_no: this.inquiryNo,
        consultNo: this.consultNo
      }

      return Service.getCase(params).then((res) => {
        this.caseInfo = res.data

        // 判断是否存在本地缓存数据，如果有本地缓存数据设置成本地缓存的
        if (this.diagnoseList && this.diagnoseList.length > 0) {
          this.dialog.chooseData = [...this.diagnoseList]
        } else {
          const tmp = res.data.diagnoseList.map((item) => {
            item.name = item.diagnoseName
            item.code = item.diagnoseCode
            return item
          })

          this.diagnoseList = tmp
          this.dialog.chooseData = tmp
        }
      })
    },

    /**
     * 获取常见断
     *
     */
    getCommonDiagnosis() {
      peace.service.patient.IllnessList().then((res) => {
        this.dialog.source.IllnessList = res.data.list
      })
    },

    /**
     * 获取诊断
     *
     */
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

    /**
     * 发送处方
     */
    send() {
      const validObject = this.$refs.drugSelect.validModel()
      const drugList = this.$refs.drugSelect.getModel()

      if (validObject.isValid === false) {
        return Peace.util.warning(validObject.message)
      }

      if (drugList.length < 1) {
        return Peace.util.warning('请添加处方药品')
      }

      if (drugList.some((drug) => drug.drugStatus === 'disable')) {
        return Peace.util.confirm('处方内含有停用药品，是否删除该药品', '提示', { type: 'error' }, () => {
          this.drugList = drugList.filter((drug) => drug.drugStatus === 'enable')
        })
      }

      Peace.util.confirm('确认发送处方给患者？', '提示', {}, () => {
        // 诊断上传 JSON 数据 ，此处需要转换上传参数
        const diagnoseInfos = [...this.diagnoseList].map((item) => {
          item.diagnoseCode = item.code
          item.diagnoseName = item.name
          return item
        })

        const params = {
          openId: this.docInfo?.openid,
          weight: this.weight,
          inquiryNo: this.inquiryNo,
          consultNo: this.consultNo,
          diagnose: this.caseInfo.diagnose,
          diagnoseList: diagnoseInfos,
          allergyHistory: this.caseInfo.allergy_history,
          drugList: drugList
        }

        this.sending = true
        if (this.inquiryNo) {
          Service.subPrescrip(params)
            .then((res) => {
              // 前置审方不合法，显示前置审方审核结果
              if (res.data.isAdopt === false) {
                this.audit.visible = true
                this.audit.data = res.data.result
                this.audit.prescriptionNo = res.data.result.prescriptionNo
              } else {
                Peace.cache.sessionStorage.remove(this.inquiryNo)
                Peace.util.success(res.msg)

                this.$emit('close')
              }
            })
            .finally(() => {
              this.sending = false
            })
        } else if (this.consultNo) {
          Service.offlineSubPrescrip(params)
            .then((res) => {
              // 前置审方不合法，显示前置审方审核结果
              if (res.data.isAdopt === false) {
                this.audit.visible = true
                this.audit.data = res.data.result
                this.audit.prescriptionNo = res.data.result.prescriptionNo
              } else {
                Peace.cache.sessionStorage.remove(this.inquiryNo)
                Peace.util.success(res.msg)

                this.$emit('close')
              }
            })
            .finally(() => {
              this.sending = false
            })
        }
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

      if (this.consultNo) {
        params.sourceAction = 'offline'
      }

      Service.confirmSend(params)
        .then((res) => {
          Peace.cache.sessionStorage.remove(this.inquiryNo)
          Peace.util.success(res.msg)

          this.$emit('close')
        })
        .finally(() => {
          this.sending = false
        })
    },

    close() {
      // 处方关闭前，缓存当前处方数据
      this.setModel()

      this.$emit('close')
    },

    showDialog(title) {
      this.dialog.title = title
      this.dialog.chooseData = []

      this.dialog.visible = true
    },

    changeDialog(title) {
      this.showDialog(title)
      this.$nextTick(function () {
        this.dialog.chooseData = [...this.diagnoseList]
      })
    },

    chooseItem(item) {
      if (!item.code) {
        item = {
          name: item,
          code: item.code
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
      this.diagnoseList = [...this.dialog.chooseData]

      this.dialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
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