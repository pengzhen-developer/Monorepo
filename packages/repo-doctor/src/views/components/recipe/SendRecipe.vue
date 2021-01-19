<template>
  <div v-loading="sending"
       element-loading-text="拼命加载中"
       element-loading-background="rgba(255, 255, 255, 0)">
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
            <div class="flex items-center q-px-sm"
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
            <el-tag v-bind:key="item.id"
                    class="tag-style"
                    type="info"
                    v-for="item in diagnoseList">{{ item.name }}</el-tag>
            <el-button v-on:click="changeDialog('疾病诊断')"
                       type="text">修改</el-button>
          </template>

          <template v-else>
            <el-button v-on:click="showDialog('疾病诊断')"
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
    <peace-dialog v-bind:title="'添加' + dialog.title"
                  v-bind:visible.sync="dialog.visible">
      <div class="q-mb-10">

        <el-select v-bind:remote-method="getPresent"
                   v-on:change="chooseItem"
                   allow-create
                   filterable
                   placeholder="请输入疾病诊断"
                   remote
                   style="width: 100%;"
                   v-model="dialog.chooseItem">
          <el-option v-bind:key="item.id"
                     v-bind:label="item.name"
                     v-bind:value="item.name"
                     v-for="item in dialog.source.present_history"></el-option>
        </el-select>
      </div>

      <div class="q-mx-10"
           v-if="dialog.chooseData.length > 0">
        <p>已选{{ dialog.title }}</p>

        <div class="q-ma-10">
          <el-tag v-bind:key="item.id"
                  v-on:close="closeItem(item)"
                  closable
                  class="tag-style"
                  v-for="item in dialog.chooseData">{{ item.name }}</el-tag>
        </div>
      </div>

      <template>
        <div class="q-mx-10">
          <p>常见{{ dialog.title }}</p>

          <div class="q-ma-10">
            <el-tag v-bind:key="item.code"
                    v-bind:type="selectTagClass(item)"
                    v-on:click="chooseItem(item)"
                    class="tag-style cursor-pointer"
                    v-for="item in dialog.source.IllnessList">{{ item.name }}</el-tag>
          </div>
        </div>
      </template>

      <div class="q-mb-10 text-center">
        <el-button v-on:click="dialog.visible = false">取消</el-button>
        <el-button v-on:click="saveItem"
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
    // 会话对象
    session: Object,

    // 缓存键，处理【问诊】、【复诊】、【面诊】、【会诊】等场景下的处方缓存
    cacheKey: String
  },

  data() {
    return {
      prescriptionTag: undefined,

      /** 体重 */
      weight: undefined,

      /** 病历详情 */
      caseInfo: {},

      /** 药品列表 */
      drugList: [],

      /** 库存提示 */
      stock: {
        visible: false,
        operatorContact: '',
        data: []
      },

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
      return Peace.$store.state.user?.userInfo?.list?.docInfo
    },

    inquiryNo() {
      return this.session?.content?.inquiryInfo?.inquiryNo
    },

    showPayType() {
      return this.inquiryNo && this.session?.content?.inquiryInfo?.paymentType != Type.INQUIRY.INQUIRY_PAY_TYPE.自费
    },

    payTypeText() {
      return Object.keys(Type.INQUIRY.INQUIRY_PAY_TYPE).find((key) => Type.INQUIRY.INQUIRY_PAY_TYPE[key] === this.session?.content?.inquiryInfo?.paymentType)
    },

    consultNo() {
      return this.session?.content?.consultInfo?.consultNo
    },

    familyId() {
      return this.session?.content?.patientInfo?.familyId
    }
  },

  created() {
    Promise.all([this.getCommonDiagnosis(), this.getCase(), this.getPrevInquiry()]).then(() => {
      this.resetDataFromCache()
    })
  },

  methods: {
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
        // 问诊 / 复诊取 [newDiagnoseList]
        // 会诊取 [diagnose]
        let data = this.inquiryNo ? res.data.newDiagnoseList : this.consultNo ? res.data.diagnose : []

        if (this.inquiryNo) {
          data.map((item) => {
            item.name = item.diagnoseName
            item.code = item.diagnoseCode
          })
        }

        if (this.consultNo) {
          data = data.split('|').map((item) => {
            return {
              name: item,
              code: ''
            }
          })
        }

        this.caseInfo = res.data
        this.diagnoseList = Peace.util.deepClone(data)
        this.dialog.chooseData = Peace.util.deepClone(data)
      })
    },

    getPrevInquiry() {
      const params = { familyId: this.familyId }
      const recipeCache = this.cacheKey && Peace.cache.sessionStorage.get(this.cacheKey)

      if (recipeCache) {
        return Promise.resolve()
      } else {
        return Service.getLastInfo(params).then((res) => {
          if (res.data.drugList?.length > 0) {
            Peace.util.success('当前预填处方信息是带入了就诊人上一次的处方，仅作为参考，可修改！')

            this.drugList = res.data.drugList
            this.prescriptionTag = res.data.prescriptionTag
          }
        })
      }
    },

    resetDataFromCache() {
      const recipeCache = this.cacheKey && Peace.cache.sessionStorage.get(this.cacheKey)

      if (recipeCache) {
        this.weight = recipeCache.weight
        this.drugList = recipeCache.drugList
        this.prescriptionTag = recipeCache.prescriptionTag

        this.diagnoseList = recipeCache.diagnoseList.concat([])
        this.dialog.chooseData = recipeCache.diagnoseList.concat([])
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
     * 获取常见诊断
     *
     */
    getCommonDiagnosis() {
      Peace.service.patient.IllnessList().then((res) => {
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
        Peace.service.patient.getDiseaseInfo(params).then((res) => {
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

      Peace.util.confirm('确认发送处方给患者？', '提示', {}, () => {
        this.sending = true

        const fetch = this.inquiryNo ? Service.subPrescrip : this.consultNo ? Service.offlineSubPrescrip : ''
        const params = {
          openId: this.docInfo?.openid,
          weight: this.weight,
          inquiryNo: this.inquiryNo,
          consultNo: this.consultNo,
          diagnose: this.caseInfo.diagnose,
          allergyHistory: this.caseInfo.allergy_history,
          drugList: this.drugList
        }

        if (this.inquiryNo) {
          // 诊断上传 JSON 数据 ，此处需要转换上传参数
          const diagnoseInfos = [...this.diagnoseList].map((item) => {
            item.diagnoseCode = item.code
            item.diagnoseName = item.name
            return item
          })

          params['diagnoseList'] = diagnoseInfos
        }

        fetch(params)
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
              this.cacheKey && Peace.cache.sessionStorage.remove(this.cacheKey)
              Peace.util.success(res.msg)

              this.$emit('close')
            }
          })
          .finally(() => {
            this.sending = false
          })
      })
    },

    /**
     * 前置审方失败，医生手动确认继续发送处方
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
          this.cacheKey && Peace.cache.sessionStorage.remove(this.cacheKey)
          Peace.util.success(res.msg)

          this.$emit('close')
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
        drugList: this.drugList
      }

      this.cacheKey && Peace.cache.sessionStorage.set(this.cacheKey, recipeCache)

      this.$emit('close')
    },

    showDialog(title) {
      this.dialog.title = title
      this.dialog.chooseData = []

      this.dialog.visible = true
    },

    changeDialog(title) {
      this.showDialog(title)
      this.$nextTick(function() {
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

<style lang="scss">
.message-short-stock {
  .el-message-box__header {
    background: #e9edf1;
    padding-top: 14px;

    .el-message-box__title {
      justify-content: flex-start;
    }
  }

  .el-message-box__content {
    padding: 24px 16px;
  }

  .el-message-box__btns {
    .el-button {
      min-width: 80px;
    }
  }
}
</style>

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

::v-deep .el-loading-spinner {
  z-index: 2005;
  width: 160px;
  left: 42%;
  padding: 30px;
  border-radius: 8px;
  background: white;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>