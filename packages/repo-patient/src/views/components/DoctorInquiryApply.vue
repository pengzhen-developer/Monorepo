<template>
  <div class="inquriy layout">
    <div class="layout-header"
         ref="layoutHeader">
      <InquiryStageMark :type="model.serviceType"
                        :positon="false"
                        :current="'smartAssistant'"></InquiryStageMark>
    </div>

    <div class="layout-content">
      <transition-group tag="div"
                        name="van-slide-left">
        <div class="notify"
             key="notify">
          <span>请先了解</span>
          <span @click="showInformedConsent"
                class="link">《知情同意书》</span>
          <span>，如继续咨询表明您已知悉相关内容。您的信息严格保密，请放心咨询！</span>
        </div>
      </transition-group>

      <!-- 欢迎语 -->
      <transition-group tag="div"
                        name="van-slide-left">
        <div class="message-layout left"
             v-for="item in welcomeList"
             :key="item.message">
          <div class="robot">
            <van-image width="36px"
                       height="36px"
                       :src="require('@src/assets/images/ic_robot.png')"></van-image>
          </div>
          <div class="message in"
               v-html="item.message"></div>
        </div>
      </transition-group>

      <!-- 已回答 -->
      <transition-group tag="div"
                        name="van-slide-left">
        <div v-for="(item, index) in answerList"
             :key="item.field+index">
          <div class="message-layout left"
               v-if="item.question&&item.field === ANSWER_FIELD.SELECT_CASE">

            <component v-bind:is="item.component"
                       class="message in select"
                       v-bind:data="caseList"
                       v-on:answer="answer"></component>
          </div>

          <div class="message-layout left"
               v-if="item.question&&item.field !== ANSWER_FIELD.SELECT_CASE">
            <div class="message in"
                 v-html="item.question"></div>
          </div>
          <!-- 上传图片 -->
          <template v-if="item.field === ANSWER_FIELD.ATTACHMENT && Array.isArray(item.answer)">
            <van-image-preview v-model="imagePreview.visible"
                               :start-position="imagePreview.position"
                               :images="item.answer.map(file => file.path)">
              <template v-slot:cover>
                <van-button icon="cross"
                            type="primary"
                            round
                            @click="imagePreview.visible = false" />
              </template>
            </van-image-preview>

            <div class="message-layout right"
                 v-for="(file, fileIndex) in item.answer"
                 :key="fileIndex">
              <div class="message out img">

                <img style="max-width: 140px; max-height: 140px; width: auto; height: auto; border-radius: 8px;"
                     :src="file.path"
                     @click="viewImage(file, fileIndex)">
              </div>
              <span v-if="canShowChange(index) && fileIndex === item.answer.length - 1"
                    style="color:#00c6ae;font-size:14px;margin: 4px 0 0 0;"
                    @click="backQuestion">点击修改</span>
            </div>
          </template>
          <!-- 选择病历 -->
          <div class="message-layout right"
               v-if="item.answer&&item.field === ANSWER_FIELD.SELECT_CASE">
            <div class="message out"
                 v-html="item.answer"
                 v-if="selectCase==false">
            </div>
            <component class="message out"
                       v-if="selectCase==true"
                       v-bind:is="item.component"
                       v-bind:show="true"
                       v-bind:data="item.answer"></component>
            <span v-if="canShowChange(index)"
                  style="color:#00c6ae;font-size:14px;margin: 4px 0 0 0;"
                  @click="backQuestion">点击修改</span>
          </div>
          <template v-else>
            <div class="message-layout right"
                 v-if="item.answer">
              <div class="message out"
                   v-html="item.answer">
              </div>
              <span v-if="canShowChange(index)"
                    style="color:#00c6ae;font-size:14px;margin: 4px 0 0 0;"
                    @click="backQuestion">点击修改</span>
            </div>
          </template>

        </div>
      </transition-group>

      <!-- 已完成 -->
      <template v-if="questionDone!=null">
        <transition-group tag="div"
                          name="van-slide-left">
          <div class="message-layout left"
               v-for="item in doneList"
               :key="item.message">
            <div class="message in">
              {{ item.message }}
            </div>
          </div>
        </transition-group>

        <!-- 医生卡片 -->
        <transition-group tag="div"
                          name="van-slide-left"
                          v-if="questionDone==true">
          <van-sticky key="doctor"
                      :offset-top="offsetTop"
                      @scroll="hasFixed">
            <van-row type="flex"
                     justify="space-between"
                     class="doctor"
                     :class="isFixed&&'nmp'">
              <van-row type="flex"
                       justify="space-between">
                <div style="margin:0 10px 0 0;">
                  <van-image width="50"
                             height="50"
                             round
                             :src="doctor.doctorInfo.avartor"
                             v-if="!isFixed" />
                  <van-image width="38"
                             height="38"
                             round
                             :src="doctor.doctorInfo.avartor"
                             v-else />
                </div>
                <van-row type="flex"
                         justify="center"
                         style="flex-direction: column;"
                         v-if="!isFixed">
                  <div>
                    <span style="color: #333333; font-size: 18px; font-weight: bold; margin: 0 8px 0 0;">
                      {{ doctor.doctorInfo.name }}
                    </span>
                    <span style="color: #333333; font-size: 14px; ">
                      {{ doctor.doctorInfo.doctorTitle }}
                    </span>
                  </div>
                  <div style="display:flex;align-items:center;">
                    <van-image :src="getServiceImage()"
                               width="16px"
                               height="16px"></van-image>
                    <span style="color: #333333; font-size: 15px; font-weight: bold;  margin: 0 12px 0 5px;">
                      {{ doctor.doctorInfo.serviceName }}
                    </span>
                    <span style=" font-size: 11px; color: #F2223B;">
                      {{ getSerivceUnit() }}
                    </span>
                    <span style=" font-size: 16px; color: #F2223B;">
                      {{ doctor.doctorInfo.serviceMoney }}
                    </span>
                  </div>
                </van-row>
                <van-row type="flex"
                         justify="center"
                         style="flex-direction: column;"
                         v-else>
                  <div>
                    <span style="color: #333333; font-size: 16px; font-weight: bold; margin: 0 8px 0 0;">
                      {{ doctor.doctorInfo.name }}
                    </span>
                    <span style="color: #666666; font-size: 14px; ">
                      {{ doctor.doctorInfo.doctorTitle }}
                    </span>
                  </div>
                  <div style="display:flex;align-items:center;">
                    <span style="color: #333333; font-size: 15px; font-weight: bold;  margin: 0 4px 0 0;">
                      {{ doctor.doctorInfo.serviceName }}
                    </span>
                    <span style=" font-size: 11px; color: #F2223B;">
                      {{ getSerivceUnit() }}
                    </span>
                    <span style=" font-size: 16px; color: #F2223B;">
                      {{ doctor.doctorInfo.serviceMoney }}
                    </span>
                  </div>
                </van-row>
              </van-row>
              <div>
                <van-button style="width: 72px; height: 25px; line-height: 1;box-shadow: -1px 2px 4px 0px rgba(255, 126, 107, 0.5);"
                            @click="apply"
                            color="linear-gradient(143deg, #FE7057 0%, #FA9882 100%)"
                            :round="true"
                            size="mini"
                            :disabled="sending">
                  <div slot="default"
                       style="display:flex;align-items:center;">
                    <span>立即咨询</span>
                    <van-icon name="arrow"
                              size="10" />
                  </div>

                </van-button>
              </div>
            </van-row>
          </van-sticky>
        </transition-group>
        <transition-group tag="div"
                          name="van-slide-left">
          <div class="message-layout left"
               v-if="questionDone&&supplementaryFlag"
               key="supplementary">
            <div class="supplementary">
              <span class="supplementary__title">补充信息</span>
              <span class="supplementary__info">可选择补充如下信息，让医生全面了解您的病情。</span>
              <template v-for="child in supplementaryList">
                <span :key="child.mode"
                      v-if="!child.hidden"
                      class="supplementary__content"
                      :class="child.hasAnswer ? 'supplementary__content--focus' : ''"
                      @click="onMutationSupplementaryMode(child)">
                  {{ child.msg }}</span>
              </template>
            </div>
          </div>
        </transition-group>

        <jzt-chat :list="chatList"
                  @after-refresh="onAfterRefresh"
                  @click-update-btn="onClickUpdateBtn"></jzt-chat>

      </template>
    </div>
    <!-- 当前问题 -->
    <div class="layout-footer">
      <transition name="van-slide-up">
        <div class="layout-footer-content"
             v-if="current.field"
             :key="current.field"
             :class="current.field">

          <!--描述 -->
          <template v-if="current.field === ANSWER_FIELD.ILLNESS_DESCRIBE">
            <van-field ref="input"
                       v-model.trim="illnessDescribe"
                       class="inp"
                       placeholder="请输入您的详细症状，至少5个字">
              <peace-button round
                            slot="button"
                            throttle
                            :throttleTime="1000"
                            type="primary"
                            @click="answer">发送</peace-button>
            </van-field>
          </template>

          <!--家人 -->
          <template v-if="current.field === ANSWER_FIELD.FAMILY">
            <peace-button v-for="item in current.answerList"
                          round
                          :key="item.value"
                          throttle
                          :throttleTime="1000"
                          @click="answer(item)">{{ item.label }}</peace-button>
            <br>
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          @click="answer('')">添加新的就诊人</peace-button>
          </template>

          <!-- 附件与确认遗失 -->
          <template v-if="current.field === ANSWER_FIELD.ATTACHMENT">
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          type="primary"
                          @click="answer('上传')">上传凭证</peace-button>

            <template v-if="current.mode === ANSWER_MODE.FILE">
              <peace-button round
                            throttle
                            :throttleTime="1000"
                            @click="answer('我已遗失')">我已遗失</peace-button>
            </template>
            <template v-if="current.mode === ANSWER_MODE.FILE_CONFIRM">
              <peace-button round
                            throttle
                            :throttleTime="1000"
                            @click="answer('确认遗失')">确认遗失</peace-button>
            </template>
          </template>

          <!-- 初步诊断 -->
          <template v-if="current.field === ANSWER_FIELD.ILLNESS_CONFIRM">
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          type="primary"
                          @click="answer('点击选择初诊诊断')">点击选择初诊诊断</peace-button>
          </template>

          <!-- 选择病历 -->

        </div>
      </transition>
      <transition name="van-slide-up"
                  mode="out-in">
        <div class="supplementary-button-wrapper"
             :key="supplementaryMode"
             v-if="questionDone && (supplementaryMode !== null)"
             :class="current.field">

          <div class="allergies-button-area"
               v-if="supplementaryMode === SUPPLEMENTARY_MODE.ALLERGIES">
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          type="primary"
                          slot="button"
                          @click="onClickSupplementaryAnswerButton('allergies', true)">选择过敏史</peace-button>
            <div class="button-space"></div>
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          slot="button"
                          @click="onClickSupplementaryAnswerButton('allergies', false)">暂无过敏史</peace-button>
          </div>
          <div class=""
               v-if="supplementaryMode === SUPPLEMENTARY_MODE.WOMAN">
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          slot="button"
                          type="default"
                          @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.PRE_PREGNANCY)">备孕期</peace-button>
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          slot="button"
                          type="default"
                          @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.PREGNANCY)">怀孕期</peace-button>
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          slot="button"
                          type="default"
                          @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.LACTATION)">哺乳期</peace-button>
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          slot="button"
                          type="default"
                          @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.NORMAL)">不在特殊时期</peace-button>
          </div>

          <div class="images-button-area"
               v-if="supplementaryMode === SUPPLEMENTARY_MODE.IMAGES">
            <peace-button round
                          throttle
                          :throttleTime="1000"
                          slot="button"
                          type="primary"
                          @click="onClickSupplementaryAnswerButton('images')">上传患处图片</peace-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sticky } from 'vant'

Vue.use(Sticky)
import peace from '@src/library'

import { Dialog } from 'vant'
import Compressor from 'compressorjs'

import InquiryStageMark from '@src/views/components/InquiryStageMark'
const ANSWER_MODE = {
  /** 输入 */
  INPUT: 'input',
  /** 选择 */
  CHECK: 'check',
  /** 上传 */
  FILE: 'file',
  /** 上传确认 */
  FILE_CONFIRM: 'fileConfirm',
  /** 问诊确认 */
  ILLNESS_CONFIRM: 'illnessConfirm',
  /** 选择病历 */
  SELECT_CASE: 'selectCase'
}

const WOMAN_TYPE = {
  NORMAL: 1,
  // 备孕
  PRE_PREGNANCY: 2,
  // 怀孕
  PREGNANCY: 3,
  // 哺乳期
  LACTATION: 4
}

const WOMAN_TYPE_TEXT_MAP = {
  [WOMAN_TYPE.NORMAL]: '不在特殊时期',
  [WOMAN_TYPE.PRE_PREGNANCY]: '备孕期',
  [WOMAN_TYPE.PREGNANCY]: '怀孕期',
  [WOMAN_TYPE.LACTATION]: '哺乳期'
}

const SUPPLEMENTARY_MODE = {
  ALLERGIES: 'allergies',
  WOMAN: 'woman',
  IMAGES: 'images'
}

const SUPPLEMENTARY_MODE_MSG_MAP = {
  [SUPPLEMENTARY_MODE.ALLERGIES]: '请选择您的过敏史?',
  [SUPPLEMENTARY_MODE.WOMAN]: '您是否属于女性特殊时期?',
  [SUPPLEMENTARY_MODE.IMAGES]: '请补充患处图片'
}

const ANSWER_FIELD = {
  /** 就诊人 */
  FAMILY: 'family',
  /** 问诊描述 */
  ILLNESS_DESCRIBE: 'illnessDescribe',
  /** 附件 */
  ATTACHMENT: 'attachment',
  /** 初诊诊断 */
  ILLNESS_CONFIRM: 'confirmIllness',
  /** 选择病历 */
  SELECT_CASE: 'selectCase'
}

const IMAGES_UPLOAD_TYPE = {
  // 凭证上传
  ATTACHMENT: 1,
  // 患处
  AFFECTED_IMAGES: 2
}
/**在线咨询 INQUIRY_QUESTION_LISI*/
const INQUIRY_QUESTION_LISI = [
  {
    no: 0,
    answerList: [],
    field: ANSWER_FIELD.FAMILY,
    question: '请问您要为哪位就诊人咨询？',
    mode: ANSWER_MODE.CHECK
  },
  {
    no: 1,
    answerList: [],
    field: ANSWER_FIELD.ILLNESS_DESCRIBE,
    question: '请描述您的病情，如发病时间、主要病症、治疗经过、目前状况等。',
    mode: ANSWER_MODE.INPUT
  }
]
const FUZHEN_HAS_HIS_QUESTION_LISI = [
  {
    no: 0,
    answerList: [],
    field: ANSWER_FIELD.FAMILY,
    question: '请问您要为哪位就诊人咨询？',
    mode: ANSWER_MODE.CHECK
  },
  {
    no: 1,
    answerList: [],
    field: ANSWER_FIELD.SELECT_CASE,
    question: '选择病历',
    component: () => import('./InquiryCaseCard'),
    mode: ANSWER_MODE.SELECT_CASE
  },
  {
    no: 2,
    answerList: [],
    field: ANSWER_FIELD.ILLNESS_DESCRIBE,
    question: '请描述您的病情，如发病时间、主要病症、治疗经过、目前状况等。',
    mode: ANSWER_MODE.INPUT
  }
]
/**复诊续方 FUZHEN_QUESTION_LISI*/
const FUZHEN_QUESTION_LISI = [
  {
    no: 0,
    answerList: [],
    field: ANSWER_FIELD.FAMILY,
    question: '请问您要为哪位就诊人咨询？',
    mode: ANSWER_MODE.CHECK
  },
  {
    no: 1,
    answerList: [],
    field: ANSWER_FIELD.SELECT_CASE,
    question: '选择病历',
    component: () => import('./InquiryCaseCard'),
    mode: ANSWER_MODE.SELECT_CASE
  },
  {
    no: 2,
    answerList: [],
    field: ANSWER_FIELD.ATTACHMENT,
    question: '请问您是否需要补充病历、处方、检查报告等图片？',
    mode: ANSWER_MODE.FILE
  },
  {
    no: 3,
    answerList: [],
    field: ANSWER_FIELD.ATTACHMENT,
    question: '互联网医院复诊需上传复诊凭证，无凭证医生或将无法为您开具处方，请您知悉。',
    mode: ANSWER_MODE.FILE_CONFIRM
  },
  {
    no: 4,
    answerList: [],
    field: ANSWER_FIELD.ILLNESS_CONFIRM,
    question: '请选择您的初诊诊断(多选)',
    mode: ANSWER_MODE.ILLNESS_CONFIRM
  },
  {
    no: 5,
    answerList: [],
    field: ANSWER_FIELD.ILLNESS_DESCRIBE,
    question: '请描述您的病情，如发病时间、主要病症、治疗经过、目前状况等。',
    mode: ANSWER_MODE.INPUT
  }
]

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    InquiryStageMark
  },

  data() {
    return {
      ANSWER_MODE: ANSWER_MODE,
      ANSWER_FIELD: ANSWER_FIELD,
      SUPPLEMENTARY_MODE,
      SUPPLEMENTARY_MODE_MSG_MAP,
      WOMAN_TYPE,
      WOMAN_TYPE_TEXT_MAP,
      IMAGES_UPLOAD_TYPE,
      illnessDescribe: '',
      model: {
        // 医生 (医生 ID)
        doctorId: '',
        // 病情描述
        illnessDescribe: '',
        // 就诊人 (家人 ID)
        familyName: '',
        familyId: '',
        // 附件
        attachment: [],
        // 初诊诊断
        confirmIllness: '',
        // 问诊类型
        consultingType: '',
        //区分咨询、复诊
        serviceType: '',
        // 是否复诊
        isAgain: false,
        // 非复诊确认
        isAgainConfrim: true,
        // 特殊时期
        isPregnancy: null,
        // 过敏史
        allergicHistory: '',
        // 食物过敏
        foodAllergy: '',
        // 食物过敏
        drugAllergy: '',
        // 患处图片
        affectedImages: [],
        //价格
        price: '',
        //号源code
        sourceCode: '',
        //预约日期
        appointmentDate: '',
        //预约开始时间
        appointmentStartTime: '',
        //预约结束时间
        appointmentEndTime: '',
        recordNo: ''
      },
      //病历列表
      caseList: [],
      // 附件
      attachment: [],

      // 欢迎语
      welcomeList: [],

      // 问题列表
      questionList: [],

      // 答题路径
      questionPath: [],

      // 答题完毕
      questionDone: null,

      // 已答题列表
      answerList: [],

      // 当前答题
      questionIndex: -1,

      // 回答完毕提示语
      doneList: [],

      // 回答完毕后点击补充的提示语
      supplementaryList: [
        {
          mode: SUPPLEMENTARY_MODE.ALLERGIES,
          msg: SUPPLEMENTARY_MODE_MSG_MAP[SUPPLEMENTARY_MODE.ALLERGIES],
          hasAnswer: false,
          hidden: false
        },
        {
          mode: SUPPLEMENTARY_MODE.WOMAN,
          msg: SUPPLEMENTARY_MODE_MSG_MAP[SUPPLEMENTARY_MODE.WOMAN],
          hasAnswer: false,
          hidden: false
        },
        {
          mode: SUPPLEMENTARY_MODE.IMAGES,
          msg: SUPPLEMENTARY_MODE_MSG_MAP[SUPPLEMENTARY_MODE.IMAGES],
          hasAnswer: false,
          hidden: false
        }
      ],

      supplementaryMode: null,

      supplementaryFlag: false,

      chatList: [],

      uniqKey: 0,

      // 医生详情
      doctor: {
        consultationList: [],
        doctorInfo: {}
      },

      sending: false,

      imagePreview: {
        visible: false,
        position: 0
      },

      offsetTop: 0,
      isFixed: false,
      selectFamilyStatus: false,

      debounceParam: {
        wait: 1000,
        start: ''
      },
      selectCase: null,
      isFirstOptionRecord: null,
      isAcceptNotHasFirstOptionRecord: null
    }
  },

  computed: {
    current() {
      if (this.questionIndex > -1) {
        return peace.util.deepClone(this.questionList[this.questionIndex])
      }

      return {}
    }
  },

  watch: {
    answerList() {
      this.$nextTick().then(() => {
        this.scrollToBottom()
      })
    },
    questionDone(val) {
      if (val) {
        this.onAfterRefresh()
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.fullPath.indexOf('/setting/myFamilyMembers') != -1) {
        // 从家人列表回来刷新我的家人列表
        vm.getFamilyList()
      }
    })
  },

  activated() {
    this.$nextTick().then(() => {
      this.scrollToBottom()
    })
  },

  created() {
    this.onEmits()

    // 获取字典数据
    this.getFamilyList()
    // 获取当前医生详情
    this.getDoctorInfo()
    // 设置参数
    this.setModel()
  },

  mounted() {
    // 使用 setTimeout 延迟动画进入效果
    setTimeout(() => {
      this.beginWelcomeMessage()
    }, 0)

    setTimeout(() => {
      this.beginQuestion(0)
    }, 500)

    this.offsetTop = this.$refs.layoutHeader.offsetHeight - 2
  },

  destroyed() {
    this.offEmits()
  },

  methods: {
    hasFixed(e) {
      this.isFixed = e.isFixed
    },
    deleteQA(id) {
      const index = this.chatList.findIndex((chat) => {
        return chat.id === id
      })
      // ChatList中需要删除的回答
      const Answer = this.chatList[index]
      const qIndex = this.chatList.findIndex((chat) => {
        return chat.id === Answer.qid
      })
      // ChatList中需要删除的问题
      const question = this.chatList[qIndex]
      if (question === undefined) throw new Error('Question could not be found')
      // 需要将该问题设置为 未回答
      const sup = this.supplementaryList.find((sup) => {
        return sup.mode === question.mode
      })
      if (sup === undefined) throw new Error('Supplementary could not be found')
      sup.hasAnswer = false

      // 具体删除
      this.chatList.splice(index, 1)
      this.chatList.splice(qIndex, 1)
    },
    // jzt-chat 中点击「点击修改」的回调
    onClickUpdateBtn(id) {
      this.deleteQA(id)
    },

    onAfterRefresh() {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },

    onClickSupplementaryAnswerButton(mode, value = null) {
      const typeActionMap = {
        allergies: this.typeActionAllergies,
        woman: this.typeActionWoman,
        images: this.typeActionImages
      }
      const typeSet = new Set(Object.keys(typeActionMap))
      if (typeSet.has(mode)) {
        const fn = typeActionMap[mode]
        fn(value)
      } else {
        throw new Error('Type error!')
      }
    },

    onAfterSupplementaryAnswer(mode) {
      this.setHasAnswer(mode)
      this.supplementaryMode = null
    },

    onMutationSupplementaryMode({ mode, hasAnswer }) {
      // 如果已经回答 无反应
      if (hasAnswer) return
      // this.supplementaryList.find(item=>item.)
      const prev = this.chatList[this.chatList.length - 1]
      // 上一条没有回答的话 撤销
      if (prev !== undefined && prev.position === 'left') this.chatList.pop()
      const context = SUPPLEMENTARY_MODE_MSG_MAP[mode]

      this.pushToChatList({ context, chatMode: 'q' }, { mode })

      this.supplementaryMode = mode
    },

    onEmits() {
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY, this.addFamilyCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_UPLOAD, this.uploaderCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_ILLNESS, this.illnessCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_ALLERGIES_SAVE, this.supplementaryAllergiesSaveCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_UPLOAD, this.doctorInquiryApplySupplementaryUploadCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_RETURNVISIT_RESELECT_NUMBER, this.reselcetNumerCallback)
    },

    offEmits() {
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_UPLOAD)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_ILLNESS)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_ALLERGIES_SAVE)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_UPLOAD)
      $peace.$off(peace.type.EMIT.DOCTOR_RETURNVISIT_RESELECT_NUMBER)
    },

    getLatestQuestionIndex() {
      let index = this.chatList.length - 1
      while (index >= 0) {
        const chat = this.chatList[index]
        if (chat.position === 'left') break
        index--
      }

      return index
    },

    getLatestQuestion() {
      const questionIndex = this.getLatestQuestionIndex()
      if (questionIndex === -1) {
        throw new Error('Latest question error!')
      }
      const question = this.chatList[questionIndex]

      return question
    },

    setHasAnswer(mode) {
      const index = this.supplementaryList.findIndex((el) => {
        return el.mode === mode
      })
      if (index === -1) throw new Error('Period error!')
      this.supplementaryList[index].hasAnswer = true
    },

    typeActionAllergies(hasAllergies) {
      if (hasAllergies) {
        this.goSupplementaryAllergies()
      } else {
        // 暂无过敏史
        const context = '暂无过敏史'
        this.pushToChatList({ context })

        this.model.allergicHistory = '无'
        this.model.foodAllergy = '无'

        const mode = SUPPLEMENTARY_MODE.ALLERGIES
        this.onAfterSupplementaryAnswer(mode)
      }
    },

    typeActionWoman(period) {
      this.model.isPregnancy = period
      const context = this.WOMAN_TYPE_TEXT_MAP[period]
      this.pushToChatList({ context })

      const mode = SUPPLEMENTARY_MODE.WOMAN
      this.onAfterSupplementaryAnswer(mode)
    },

    typeActionImages() {
      this.$router.push({
        name: `/components/uploader`,
        params: {
          emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_UPLOAD
        }
      })
    },

    goSupplementaryAllergies() {
      const json = peace.util.encode({
        type: 'add',
        emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_ALLERGIES_SAVE
      })
      this.$router.push({
        name: `/components/supplementaryAllergies`,
        params: {
          json
        }
      })
    },

    addFamilyCallback(res) {
      //新增我的家人
      if (res.success) {
        this.getFamilyList()
      }
    },

    uploaderCallback(res) {
      // 兼容 answer auguments
      if (res && res.length) {
        this.answer(res)
      } else {
        peace.util.alert('请至少选择一张图片')
      }
    },

    illnessCallback(res) {
      // 兼容 answer auguments
      if (res) {
        this.answer(res)
      } else {
        peace.util.alert('请至少选择一项初诊诊断')
      }
    },

    supplementaryAllergiesSaveCallback({ foodAllergy, drugAllergy }) {
      this.model.foodAllergy = foodAllergy.map((item) => item.value).toString()
      this.model.drugAllergy = drugAllergy.map((item) => item.value).toString()
      this.model.allergicHistory = drugAllergy
        .concat(foodAllergy)
        .map((item) => item.value)
        .toString()

      const context = this.model.allergicHistory
      const mode = SUPPLEMENTARY_MODE.ALLERGIES

      this.pushToChatList({ context })

      this.onAfterSupplementaryAnswer(mode)
    },

    reselcetNumerCallback(res) {
      if (res) {
        console.log('cb', res)
      }
    },

    pushToChatList(params, others = {}) {
      const { chatMode = 'a', type = 'text', context, images } = params

      if (chatMode === 'q') {
        const chat = Object.assign(others, {
          id: this.uniqKey++,
          position: 'left',
          type,
          context,
          images
        })
        this.chatList.push(chat)
      } else {
        const question = this.getLatestQuestion()

        const chat = Object.assign(others, {
          id: this.uniqKey++,
          position: 'right',
          type,
          context,
          images,
          qid: question.id
        })

        this.chatList.push(chat)
      }
    },

    doctorInquiryApplySupplementaryUploadCallback(result) {
      if (result.length) {
        this.affectedImages = result
        this.model.affectedImages = this.affectedImages
        this.pushToChatList({
          type: 'images',
          images: result
        })
        const mode = SUPPLEMENTARY_MODE.IMAGES
        this.onAfterSupplementaryAnswer(mode)
      }
    },

    setModel() {
      const params = peace.util.decode(this.$route.params.json)

      this.model.doctorId = params.doctorId
      this.model.consultingType = params.consultingType
      this.model.serviceType = params.serviceType
      this.model.appointmentDate = params.appointmentDate || ''
      this.model.appointmentStartTime = params.appointmentStartTime || ''
      this.model.appointmentEndTime = params.appointmentEndTime || ''
      this.model.sourceCode = params.sourceCode || ''
      this.model.sourceItemCode = params.sourceItemCode || ''
      this.model.isAgain = params.serviceType == 'returnVisit' ? '1' : '0'
      this.model.price = Number(params.price)
      this.model.AMPM = params.AMPM || ''
      this.questionList = params.serviceType == 'returnVisit' ? FUZHEN_QUESTION_LISI : INQUIRY_QUESTION_LISI
      this.supplementaryFlag = params.serviceType == 'returnVisit' ? true : false
    },
    getFirstOptionList(familyId) {
      const params = {
        familyId: familyId,
        doctorId: this.model.doctorId
      }
      return peace.service.yibao.GetFirstOptionList(params).then((res) => {
        if (res.data == null || !res.data.firstOptionList || res.data.firstOptionList.length == 0) {
          return false
        } else {
          let list = res.data.firstOptionList
          const temp = {}
          // 遍历时间
          const timeList = new Set(list.map((item) => item.createdTime.toDate().formatDate('yyyy-MM-dd')))
          if (timeList.size) {
            timeList.forEach((time) => {
              temp[time] = list.filter((item) => item.createdTime.toDate().formatDate('yyyy-MM-dd') === time)
            })
          }
          this.caseList = temp
          return true
        }
      })
    },
    getFamilyList() {
      peace.service.IM.getImlist().then((res) => {
        const famliyQuestion = this.questionList.find((item) => item.field === this.ANSWER_FIELD.FAMILY)

        const familyList = res.data
        familyList.forEach((item) => {
          item.label = item.name
          item.value = item.accid
        })

        famliyQuestion.answerList = familyList
        this.current.answerList = familyList
      })
    },

    getDoctorInfo() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.doctor.getDoctorInfo(params).then((res) => {
        let doctor = res.data,
          serviceName = '',
          serviceMoney = 0
        serviceMoney = Number(params.price)
        if (this.model.serviceType == 'returnVisit') {
          serviceName = '复诊续方'
        } else {
          serviceName = this.model.consultingType == 'video' ? '视频咨询' : '图文咨询'
          doctor.doctorInfo.service.inquiry.forEach((item) => {
            if (item.type == this.model.consultingType) {
              serviceMoney = Number(item.price)
            }
          })
        }
        this.model.price = serviceMoney
        serviceMoney = serviceMoney.toString().toFixed(2)
        doctor.doctorInfo = Object.assign({}, doctor.doctorInfo, { serviceName, serviceMoney })
        this.doctor = doctor
      })
    },

    getSerivceType() {
      const params = peace.util.decode(this.$route.params.json)

      const consultInfo = this.doctor.consultationList[params.consultingType]

      return consultInfo && consultInfo.tagName
    },
    getServiceImage() {
      return this.model.consultingType == 'video'
        ? require('@src/assets/images/icons/icon_01_01_07.jpg')
        : require('@src/assets/images/icons/icon_01_01_06.jpg')
    },
    getSerivceUnit() {
      return '￥'
    },

    getSerivceMoney() {
      const params = peace.util.decode(this.$route.params.json)

      const consultInfo = this.doctor.consultationList[params.consultingType]

      return consultInfo && consultInfo.money
    },

    canShowChange(index) {
      return this.questionDone != null ? index === this.answerList.length - 1 : index === this.answerList.length - 2
    },

    showInformedConsent() {
      this.$router.push('/components/informedConsent')
    },

    beginWelcomeMessage() {
      this.welcomeList.push({ message: '您好我是医生助手，需要了解您的情况以辅助医生诊断。' })
    },

    beginQuestion(index) {
      this.questionIndex = index
      this.questionPath.push(index)

      this.$nextTick().then(() => {
        // 将当前问题添加到已答题列表
        this.answerList.push({
          field: this.current.field,
          mode: this.current.mode,
          question: this.current.question,
          answerList: this.current.answerList,
          component: this.current.component
        })
      })
    },

    backQuestion() {
      const length = this.questionDone != null ? 1 : 2

      const nextQuestionIndex = this.questionPath[this.questionPath.length - length] || 0

      this.questionDone = null
      this.doneList = []
      this.answerList.splice(this.answerList.length - length, length)
      this.questionPath.splice(this.questionPath.length - length, length)
      this.questionIndex = nextQuestionIndex
      this.illnessDescribe = ''
      this.$nextTick(function() {
        this.beginQuestion(nextQuestionIndex)
      })
    },

    beginNextQuestion() {
      const nextQuestionIndex = this.getNextQuestionIndex()
      // 等待当前效果完成
      // 根据策略模式，开始下一题
      setTimeout(() => {
        if (nextQuestionIndex === -1) {
          this.beginDoneMessage()
        } else if (nextQuestionIndex === -2) {
          this.beginDoneMessage('error')
        } else {
          this.beginQuestion(nextQuestionIndex)
        }

        this.$nextTick().then(() => {
          this.scrollToBottom()
        })
      }, 500)
    },

    beginDoneMessage(type = '') {
      this.questionDone = type == 'error' ? false : true
      const message =
        type == 'error'
          ? '您未选择任何在院就诊记录，不可以进行在线复诊'
          : '基础情况收集完毕，请及时咨询医生，进行专业的临床诊断。本次咨询基础情况将自动推送给医生。'
      this.doneList.push({
        message: message
      })
    },
    FamilyInquriyStatus(familyId) {
      return new Promise((resolve) => {
        peace.service.patient
          .inquiryStatus(this.model.doctorId, familyId, this.model.consultingType, this.model.serviceType)
          .then((res) => {
            //0没有问诊过 1待支付 2待接诊 3问诊中 7随访中 8没有签名

            resolve(res)
          })
          .catch((res) => {
            resolve(res)
            if (res.data.code == 202) {
              let param = {}
              switch (res.data.data.inquiryStatus) {
                case 1:
                case 2:
                  Dialog.confirm({
                    title: '温馨提示',
                    message: res.data.msg,
                    confirmButtonText: '去看看'
                  }).then(() => {
                    const params = peace.util.encode({
                      inquiryId: res.data.data.inquiryId,
                      familyId: familyId
                    })
                    //跳转订单详情
                    this.$router.replace(`/setting/userConsultDetail/${params}`)
                  })

                  break
                case 3:
                case 7:
                  Dialog.confirm({
                    title: '温馨提示',
                    message: res.data.msg,
                    confirmButtonText: '去看看'
                  }).then(() => {
                    param = peace.util.encode({
                      id: 'p2p-' + this.doctor.doctorInfo.doctorId,
                      scene: 'p2p',
                      beginTime: res.data.data.createTime.toDate().getTime(),
                      to: this.doctor.doctorInfo.doctorId,
                      familyId: familyId
                    })
                    // 清除聊天记录
                    peace.service.IM.resetInquirySessionMessages()
                    // 跳转聊天详情
                    this.$router.replace(`/components/messageList/${param}`)
                  })

                  break
                default:
                  peace.util.alert(res.data.msg)
              }
            } else {
              Dialog.confirm({
                title: '温馨提示',
                message: res.data.msg,
                confirmButtonText: '确认',
                // confirmButtonText: '重新选择就诊人',
                showCancelButton: false
              })
            }
          })
      })
    },
    async answer() {
      let result = await this.setAnswer(arguments)
      if (result) {
        this.beginNextQuestion()

        this.resetCurrentQuestion()
      }
    },

    async setAnswer(params) {
      let answer = ''

      // 获取问题答案

      // 问诊描述
      if (this.current.field === this.ANSWER_FIELD.ILLNESS_DESCRIBE) {
        if (typeof this.illnessDescribe == 'undefined' || this.illnessDescribe == '') {
          peace.util.alert('请输入您的详细症状')
          return false
        }
        if (this.illnessDescribe) {
          if (this.illnessDescribe.length < 5) {
            peace.util.alert('请输入至少5个字')
            return false
          }
          answer = this.illnessDescribe

          this.model.illnessDescribe = answer
        } else {
          return false
        }
      }

      // 选择家人
      else if (this.current.field === this.ANSWER_FIELD.FAMILY) {
        if (this.selectFamilyStatus) {
          return
        }
        this.selectFamilyStatus = true
        if (params[0].value) {
          // 判断该家人与当前医生是否有进行中的问诊

          let resultData = await this.FamilyInquriyStatus(params[0].value)
          // 检查健康卡
          this.selectFamilyStatus = false
          if (resultData.code == 200) {
            if (this.model.consultingType == 'returnVisit') {
              //机构是否接收上传有诊疗记录的复诊患者
              // `isAffirmFirstClinicalVisit` tinyint(1) DEFAULT '1' COMMENT '接收系统确认在本院有诊疗记录的复诊患者（1、关闭 2、开启）',
              // `isUploadFirstClinicalVisit` tinyint(1) DEFAULT '2' COMMENT '接收上传有诊疗记录的复诊患者（1、关闭 2、开启）',
              this.isAcceptNotHasFirstOptionRecord = resultData?.data?.hospitalInfo.isAffirmFirstClinicalVisit == 1 ? true : false
              //是否有his诊疗记录
              this.isFirstOptionRecord = resultData?.data?.isFirstOptionRecord

              if (!this.isAcceptNotHasFirstOptionRecord && this.isFirstOptionRecord !== 1) {
                Dialog.confirm({
                  title: '温馨提示',
                  message: '该就诊人无在本院的就诊记录，不可进行在线复诊',
                  confirmButtonText: '确认',
                  // confirmButtonText: '重新选择就诊人',
                  showCancelButton: false
                })
                return false
              }
            }
            //选择家人后获取当前家人的病历列表
            await this.getFirstOptionList(params[0].value)
            //如果

            answer = params[0].label + '，' + params[0].sex + '，' + params[0].age
            this.model.familyName = params[0].label
            this.model.familyId = params[0].value
            const data = this.supplementaryList.find((item) => item.mode == this.SUPPLEMENTARY_MODE.WOMAN)
            data.hidden = params[0].sex === '女' && params[0].intAge >= 14 ? false : true

            //更换家人-重置家人已选择的补充信息

            this.model.isPregnancy = null
            this.model.allergicHistory = ''
            this.model.foodAllergy = ''
            this.model.drugAllergy = ''
            this.model.affectedImages = []
            this.supplementaryList.map((item) => (item.hasAnswer = false))
            this.chatList = []
            this.selectCase = false
            //更换家人-先选择第一个家人的病历，然后撤回 重选家人 需重置问题列表
            if (this.model.serviceType === 'returnVisit') {
              this.questionList = [].concat(FUZHEN_QUESTION_LISI)
            }
            //电子健康卡检验仅适用于五莲县人民医院，故屏蔽
            // this.checkHealthCard()
          } else {
            return false
          }
        } else {
          // 跳转新增家人
          this.selectFamilyStatus = false
          if (this.current.answerList.length >= 4) {
            Dialog.confirm({
              title: '温馨提示',
              message: '您的家人数量已达上限，请删除后再新增',
              confirmButtonText: '去新增'
            }).then(() => {
              this.$router.push({ path: `/setting/myFamilyMembers` })
            })
          } else {
            let canShowSelf = !this.current.answerList.find((item) => item.relation === '本人') ? 1 : 2
            const json = peace.util.encode({
              type: 'add',
              emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY,
              canShowSelf: canShowSelf
            })
            this.$router.push({ path: `/setting/familyMember/${json}` })
          }

          return false
        }
        //选择病历
      } else if (this.current.field === this.ANSWER_FIELD.SELECT_CASE) {
        answer = params[0] || params[1]
        this.model.recordNo = params[1]
        this.model.caseInfo = params[0]
        this.selectCase = !params[0] ? false : true
        if (this.selectCase) {
          this.questionList = [].concat(FUZHEN_HAS_HIS_QUESTION_LISI)
          // 重新设置问题列表后，更新家人列表至问题列表
          this.getFamilyList()
        }
      }

      // 上传附件
      else if (this.current.field === this.ANSWER_FIELD.ATTACHMENT) {
        if (params[0] !== '上传') {
          answer = params[0]

          this.attachment = params[0]
          this.model.attachment = Array.isArray(params[0]) ? params[0] : []
        } else {
          this.$router.push({
            name: `/components/uploader`,
            params: {
              emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_UPLOAD
            }
          })

          return false
        }
      }

      // 选择初诊诊断
      else if (this.current.field === this.ANSWER_FIELD.ILLNESS_CONFIRM) {
        if (params[0] !== '点击选择初诊诊断') {
          answer = params[0]

          this.model.confirmIllness = params[0]
        } else {
          this.$router.push({
            name: `/components/addIllnessHistory`,
            params: {
              emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_ILLNESS
            }
          })

          return false
        }
      }

      // 将当前答案添加到已答题列表的最后一项
      this.answerList[this.answerList.length - 1].answer = answer
      this.answerList = this.answerList.concat([])

      return true
    },

    getNextQuestionIndex() {
      const currentQuestionIndex = this.questionIndex
      let nextQuestionIndex = -1

      //选择家人
      if (this.current.field === this.ANSWER_FIELD.FAMILY) {
        //是否可以选病历或者上传病历
        if (this.isAcceptNotHasFirstOptionRecord && this.isFirstOptionRecord != 1) {
          nextQuestionIndex = currentQuestionIndex + 2
        } else {
          nextQuestionIndex = currentQuestionIndex + 1
        }
      }

      // 上传凭证
      else if (this.current.field === this.ANSWER_FIELD.ATTACHMENT) {
        if (this.attachment === '我已遗失' || this.attachment === '确认遗失') {
          nextQuestionIndex = currentQuestionIndex + 1
        } else {
          nextQuestionIndex = this.questionList.length - 1
        }
      }

      //选择病历
      else if (this.current.field === this.ANSWER_FIELD.SELECT_CASE) {
        //医院只允许选择his病历
        if (!this.selectCase && this.isFirstOptionRecord == 1) {
          nextQuestionIndex = -2
        } else {
          nextQuestionIndex = currentQuestionIndex + 1
        }
      }

      // 正常情况下一步
      else {
        nextQuestionIndex = currentQuestionIndex + 1
      }

      // 当前回答已完成
      if (nextQuestionIndex >= this.questionList.length) {
        nextQuestionIndex = -1
      }

      return nextQuestionIndex
    },

    resetCurrentQuestion() {
      this.questionIndex = -1
    },

    checkHealthCard() {
      const params = {
        familyId: this.model.familyId,
        nethospitalid: this.doctor.doctorInfo.nethospitalid
      }

      peace.service.patient.isExistCardRelation(params).then((res) => {
        if (!res.data.result) {
          Dialog.confirm({
            title: '温馨提示',
            message: '该就诊人还没有电子健康卡，是否现在领取？',
            confirmButtonText: '现在领取'
          }).then(() => {
            peace.service.patient
              .createHealthcard(params)
              .then((res) => {
                if (res.data.result) {
                  peace.util.alert('领取成功，请填写信息后提交问诊！')
                }
              })
              .catch((res) => {
                if (res.data.code === 202) {
                  Dialog.confirm({
                    title: '温馨提示',
                    message: '该就诊人尚未完善资料，请前去完善！',
                    confirmButtonText: '去完善'
                  }).then(() => {
                    this.$router.push(`/setting/myFamilyMembers`)
                  })
                }
              })
          })
        }
      })
    },

    async apply() {
      this.sending = true

      await this.applyHandler()

      this.sending = false
    },

    uploadHandler(dataArray, type) {
      return new Promise((resolve, reject) => {
        if (Array.isArray(dataArray) && dataArray.length) {
          // 压缩
          const compress = () => {
            return new Promise((resolve) => {
              const files = []
              for (let i = 0; i < dataArray.length; i++) {
                new Compressor(dataArray[i].file, {
                  quality: 0.4,
                  convertSize: 50000,
                  success: (fileBlob) => {
                    files.push(new File([fileBlob], fileBlob.name, { type: fileBlob.type }))

                    if (files.length === dataArray.length) {
                      resolve(files)
                    }
                  }
                })
              }
            })
          }

          // 上传
          compress()
            .then((files) => {
              let Promises = files.map((item) => {
                return this.uploader(item, type)
              })
              Promise.all(Promises).then((datas) => {
                if (type === this.IMAGES_UPLOAD_TYPE.ATTACHMENT) {
                  this.model.attachment = datas
                } else if (type === this.IMAGES_UPLOAD_TYPE.AFFECTED_IMAGES) {
                  this.model.affectedImages = datas
                }
                this.sending = false
              })
            })
            .catch((err) => {
              this.sending = false
              peace.util.alert('图片上传失败，请稍后再试')
              reject(err)
            })
        } else {
          resolve()
        }
      })
    },
    uploader(file, type) {
      const params = new FormData()
      params.append('source', 'inquiryApply')
      params.append('type', type)
      params.append('file[]', file)

      return new Promise((resolve, reject) => {
        peace.service.inquiry
          .images(params)
          .then((res) => {
            resolve(res.data[0])
          })
          .catch((error) => {
            peace.util.alert('图片上传失败，请稍后再试')
            reject(error)
          })
      })
    },
    applyHandler() {
      const json = peace.util.deepClone(this.model)
      const model = peace.util.encode(json)
      if (json.serviceType !== 'returnVisit') {
        this.$router.replace(`/components/ConsultDetailBefore/${model}`)
        return
      }
      const params = {
        doctorId: json.doctorId,
        timeSharing: json.appointmentDate,
        sourceCode: json.sourceCode,
        bookingStart: json.appointmentStartTime,
        bookingEnd: json.appointmentEndTime,
        sourceDisType: 0,
        caseinfo: this.model.caseInfo
      }
      return peace.service.inquiry
        .checkSource(params)
        .then(() => {
          this.$router.replace(`/components/ConsultDetailBefore/${model}`)
        })
        .catch((res) => {
          if (res.data.code == '202') {
            return Dialog.confirm({
              title: '温馨提示',
              message: res.data.msg,
              onfirmButtonText: '确定'
            })
              .then(() => {
                //重新选择号源
                this.goToReSelectSource()
              })
              .finally(() => {
                this.sending = false
              })
          } else {
            peace.util.alert(res.data.msg)
            this.sending = false
          }
        })
    },

    goToReSelectSource() {
      const param = {
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid,
        time: this.model.appointmentDate.substring(5),
        date: new Date(),
        from: true,
        isAgain: true
      }
      const model = peace.util.deepClone(this.model)
      let json = peace.util.encode({ model, ...param })
      this.$router.replace(`/appoint/doctor/appointDoctorSelect/${json}`)
    },
    viewImage(file, fileIndex) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
    },

    scrollToBottom() {
      const $layout = this.$el.querySelector('.layout-content')
      $layout.scrollTop = $layout.scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.reSelect {
  &.van-dialog.van-button {
    width: 50%;
    background: $primary;
    color: #fff;
    border-radius: 5px;
  }
}
/deep/.van-field__body {
  input::-webkit-input-placeholder {
    /*WebKit browsers*/
    font-size: 15px;
  }

  input::-moz-input-placeholder {
    /*Mozilla Firefox*/
    font-size: 15px;
  }

  input::-ms-input-placeholder {
    /*Internet Explorer*/
    font-size: 15px;
  }
}
.inquriy {
  font-size: 16px;
  height: 100%;
  background: #f5f5f5;

  /deep/ .van-image-preview__index {
    top: 24px;
  }

  /deep/ .van-image-preview__cover {
    position: absolute;
    top: 24px;
    left: 24px;

    .van-button--round {
      border-radius: 50%;
      width: 26px;
      height: 26px;
      padding: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #2a2a2a;
      background-color: #999999;
      border: 1px solid #999999;

      .van-button__icon {
        line-height: 1;
      }
    }
  }

  &.layout {
    display: flex;
    flex-direction: column;

    .layout-header {
      background: #fff;
      // padding: 10px;
      text-align: center;

      .text {
        color: #999999;
        font-size: 14px;
      }
      .avtive {
        color: $-color--primary;
      }
      .space {
        width: 40px;
        color: #eeeeee;
        margin: 0 30px;
      }
    }

    .layout-content {
      flex: 1;
      /*
       * [!!Luci Modify] 2020/01/02
       * 在撤回对话，对话框从左右撤出时，使用之前的 「overflow: auto」，会出现动画BUG
       * 待确定修改后会不会出现新的BUG
       */
      /*overflow: auto;*/
      overflow-x: hidden;
      overflow-y: scroll;

      padding: 20px 15px;

      .notify {
        background: rgba(229, 232, 232, 1);
        border-radius: 8px;
        padding: 6px 12px;
        display: inline-block;
        text-align: justify;

        font-size: 12px;
        color: #969a99;
        // margin: 0 0 18px 0;

        .link {
          color: $-color--primary;
        }
      }

      .message-layout {
        margin: 16px 0;

        &.left {
          text-align: justify;
        }
        &.right {
          text-align: justify;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: flex-end;
        }

        .robot {
          margin: 0 0 -8px 4px;
        }

        .message {
          display: inline-flex;
          padding: 12px 16px;
          max-width: 80%;
          &.select {
            max-width: 100%;
            display: block;
            width: 100%;
          }

          &.img {
            background: transparent !important;
            padding: 0 !important;
          }

          &.in {
            background: #fff;
            color: #38485c;
            border-radius: 0px 20px 20px 20px;
          }
          &.out {
            background: $_color__primary;
            color: #fff;
            border-radius: 20px 0px 20px 20px;
          }
        }
      }

      .doctor {
        padding: 15px 10px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 4px 6px 1px rgba(229, 229, 229, 0.5);
        border-radius: 7px;
        margin: 8px 0 8px 0;
        &.nmp {
          margin: 0;
          padding: 7.5px 10px;
          border-radius: 0;
          border-top: 1px solid #eee;
        }
      }

      .supplementary {
        display: inline-flex;
        flex-direction: column;
        padding: 12px 16px;
        width: 86%;
        background: #fff;
        color: #38485c;
        border-radius: 0px 20px 20px 20px;

        &__title {
          padding-bottom: 0.18rem;
          border-bottom: 1px solid #eee;
          margin-bottom: 8px;
          font-weight: bold;
        }

        &__info {
          font-size: 12px;
          color: #aaa;
        }

        &__content {
          margin-top: 8px;
          color: #00c6ae;
          cursor: pointer;

          &--focus {
            color: #aaa;
          }
        }
      }
    }

    .layout-footer {
      background-color: #ffffff00;

      .supplementary-button-wrapper {
        padding: 16px 0 0 20px;
        background: #fff;
        box-shadow: 0px 0px 13px 8px rgba(0, 0, 0, 0.04);

        .van-button {
          margin-right: 20px;
          margin-bottom: 16px;
        }

        .allergies-button-area {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .images-button-area {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      /deep/ .layout-footer-content {
        padding: 16px 20px;
        background: #fff;
        box-shadow: 0px 0px 13px 8px rgba(0, 0, 0, 0.04);

        &.illnessDescribe {
          .van-cell {
            padding: 0;
            display: flex;
            align-items: center;

            .van-button {
              width: 60px;
              height: 36px;
              font-size: 16px;
              line-height: 1;
              padding: 0;
            }

            .van-field__control {
              font-size: 16px;
              border-radius: 18px;
              height: 36px;
              padding: 2px 16px;
              background: #f5f5f5;
            }
          }
        }

        &.family {
          .van-button {
            font-size: 16px;
            margin: 0 15px 15px 0;
          }
        }

        &.attachment {
          text-align: center;
          .van-button {
            font-size: 16px;
            margin: 0 15px 15px 0;
          }
        }

        &.isAgain {
          text-align: center;
          .van-button {
            min-width: 80px;
            font-size: 16px;
            margin: 0 15px 15px 0;
          }
        }

        &.isAgainConfirm {
          text-align: center;
          .van-button {
            min-width: 80px;
            font-size: 16px;
            margin: 0 15px 15px 0;
          }
        }

        &.confirmIllness {
          text-align: center;
        }

        &.selectCase {
          padding: 0;
        }
      }
    }
  }
}

@keyframes jzt-slide-left-enter {
  from {
    transform: translate3d(-100%, 0, 0);
  }
}
.jzt-slide-left {
  animation: jzt-slide-left-enter 0.3s ease both;
}
</style>
