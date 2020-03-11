<template>
  <div class="inquriy layout">
    <div class="layout-header"
         ref="layoutHeader">
      <span class="text avtive">导诊接待</span>
      <span class="space">------</span>
      <span class="text">医生接诊</span>
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
             :key="item.question">
          <div class="message-layout left"
               v-if="item.question">
            <div class="message in"
                 v-html="item.question"></div>
          </div>

          <template v-if="item.field === ANSWER_FIELD.ATTACHMENT && Array.isArray(item.answer)">
            <van-image-preview v-model="imagePreview.visible"
                               :start-position="imagePreview.position"
                               :images="item.answer.map(file => file.content)">
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
                     :src="file.content"
                     @click="viewImage(file, fileIndex)">
              </div>
              <span v-if="canShowChange(index) && fileIndex === item.answer.length - 1"
                    style="color:#00c6ae;font-size:14px;margin: 4px 0 0 0;"
                    @click="backQuestion">点击修改</span>
            </div>
          </template>
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
      <template v-if="questionDone">
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

        <transition-group tag="div"
                          name="van-slide-left">
          <van-sticky key="doctor"
                      :offset-top="offsetTop"
                      @scroll="hasFixed">
            <van-row type="flex"
                     align="center"
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
                  <van-image width="35"
                             height="35"
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
                  <div>
                    <span style="color: #333333; font-size: 15px; font-weight: bold;  margin: 0 8px 0 0;">
                      {{ getSerivceType() }}
                    </span>
                    <span style="color: #333333; font-size: 12px; color: #F2223B;">
                      {{ getSerivceUnit() }}
                    </span>
                    <span style="color: #333333; font-size: 14px; color: #F2223B;">
                      {{ getSerivceMoney() }}
                    </span>
                  </div>
                </van-row>
                <van-row type="flex"
                         justify="center"
                         align="center"
                         v-else>
                  <div>
                    <span style="color: #333333; font-size: 16px; font-weight: bold; margin: 0 8px 0 0;">
                      {{ doctor.doctorInfo.name }}
                    </span>
                  </div>
                  <div>
                    <span style="color: #333333; font-size: 12px;  margin: 0 8px 0 0;">
                      {{ getSerivceType() }}
                    </span>
                    <span style="color: #333333; font-size: 12px; color: #F2223B;">
                      {{ getSerivceUnit() }}
                    </span>
                    <span style="color: #333333; font-size: 14px; color: #F2223B;">
                      {{ getSerivceMoney() }}
                    </span>
                  </div>
                </van-row>
              </van-row>
              <van-row>
                <van-button style="width: 90px; height: 32px; line-height: 1;"
                            @click="apply"
                            type="primary"
                            :round="true"
                            :disabled="sending">去咨询</van-button>
              </van-row>
            </van-row>
          </van-sticky>
        </transition-group>

        <transition-group tag="div"
                          name="van-slide-left">
          <div class="message-layout left"
               key="supplementary">
            <div class="supplementary">
              <span class="supplementary__title">补充信息</span>
              <span class="supplementary__info">可选择补充如下信息，让医生全面了解您的病情。</span>
              <span v-for="child in supplementaryList"
                    :key="child.mode"
                    class="supplementary__content"
                    :class="child.hasAnswer ? 'supplementary__content--focus' : ''"
                    @click="onMutationSupplementaryMode(child)">
                {{ child.msg }}</span>
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
             :key="current.question"
             :class="current.field">

          <!-- Q1: 描述 -->
          <template v-if="current.field === ANSWER_FIELD.ILLNESS_DESCRIBE">
            <van-field ref="input"
                       v-model.trim="current.answer"
                       clearable
                       class="inp"
                       placeholder="请输入您的详细症状，至少5个字">
              <van-button @click="answer"
                          slot="button"
                          round
                          type="primary">发送</van-button>
            </van-field>
          </template>

          <!-- Q2: 家人 -->
          <template v-if="current.field === ANSWER_FIELD.FAMILY">
            <van-button v-for="item in current.answerList"
                        round
                        :key="item.value"
                        @click="answer(item)">{{ item.label }}</van-button>
            <br>
            <van-button round
                        @click="answer('')">添加新的就诊人</van-button>
          </template>

          <!-- Q3: 是否复诊 -->
          <template v-if="current.field === ANSWER_FIELD.IS_AGAIN">
            <van-button round
                        @click="answer('是')">是</van-button>
            <van-button round
                        @click="answer('否')">否</van-button>
          </template>

          <!-- Q4: 是否确认非复诊 -->
          <template v-if="current.field === ANSWER_FIELD.IS_AGAIN_CONFIRM">
            <van-button round
                        @click="answer('继续咨询')">继续咨询</van-button>
            <van-button round
                        @click="answer('我要复诊')">我要复诊</van-button>
          </template>

          <!-- Q5 & Q6: 附件与确认遗失 -->
          <template v-if="current.field === ANSWER_FIELD.ATTACHMENT">
            <van-button @click="answer('上传')"
                        type="primary"
                        round>上传凭证</van-button>

            <template v-if="current.mode === ANSWER_MODE.FILE">
              <van-button @click="answer('我已遗失')"
                          round>我已遗失</van-button>
            </template>
            <template v-if="current.mode === ANSWER_MODE.FILE_CONFIRM">
              <van-button @click="answer('确认遗失')"
                          round>确认遗失</van-button>
            </template>
          </template>

          <!-- Q7 初步诊断 -->
          <template v-if="current.field === ANSWER_FIELD.ILLNESS_CONFIRM">
            <van-button @click="answer('点击选择初诊诊断')"
                        type="primary"
                        round>点击选择初诊诊断</van-button>
          </template>
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
            <van-button @click="onClickSupplementaryAnswerButton('allergies', true)"
                        slot="button"
                        round
                        type="primary">选择过敏史</van-button>
            <div class="button-space"></div>
            <van-button @click="onClickSupplementaryAnswerButton('allergies', false)"
                        slot="button"
                        round
                        type="default">暂无过敏史</van-button>
          </div>
          <div class=""
               v-if="supplementaryMode === SUPPLEMENTARY_MODE.WOMAN">
            <van-button @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.PRE_PREGNANCY)"
                        slot="button"
                        round
                        type="default">备孕期</van-button>
            <van-button @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.PREGNANCY)"
                        slot="button"
                        round
                        type="default">怀孕期</van-button>
            <van-button @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.LACTATION)"
                        slot="button"
                        round
                        type="default">哺乳期</van-button>
            <van-button @click="onClickSupplementaryAnswerButton('woman', WOMAN_TYPE.NORMAL)"
                        slot="button"
                        round
                        type="default">不在特殊时期</van-button>
          </div>

          <div class="images-button-area"
               v-if="supplementaryMode === SUPPLEMENTARY_MODE.IMAGES">
            <van-button @click="onClickSupplementaryAnswerButton('images')"
                        slot="button"
                        round
                        type="primary">上传患处图片</van-button>
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
  ILLNESS_CONFIRM: 'illnessConfirm'
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
  /** 问诊描述 */
  ILLNESS_DESCRIBE: 'illnessDescribe',
  /** 就诊人 */
  FAMILY: 'family',
  /** 是否复诊 */
  IS_AGAIN: 'isAgain',
  /** 确认是否继续 */
  IS_AGAIN_CONFIRM: 'isAgainConfirm',
  /** 附件 */
  ATTACHMENT: 'attachment',
  /** 初诊诊断 */
  ILLNESS_CONFIRM: 'confirmIllness'
}

const IMAGES_UPLOAD_TYPE = {
  // 凭证上传
  ATTACHMENT: 1,
  // 患处
  AFFECTED_IMAGES: 2
}

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
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
        // 是否复诊
        isAgain: true,
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
        affectedImages: []
      },

      // 附件
      attachment: [],

      // 欢迎语
      welcomeList: [],

      // 问题列表
      questionList: [
        {
          no: 0,
          answerList: [],
          field: ANSWER_FIELD.ILLNESS_DESCRIBE,
          question: '请问您要咨询什么问题？（您可输入病情描述，如发病时间、主要病症、治疗经过、目前状况等。）',
          mode: ANSWER_MODE.INPUT
        },
        {
          no: 1,
          answerList: [],
          field: ANSWER_FIELD.FAMILY,
          question: '请问您要为哪位就诊人咨询？',
          mode: ANSWER_MODE.CHECK
        },
        {
          no: 2,
          answerList: [],
          field: ANSWER_FIELD.IS_AGAIN,
          question: '就诊人是否为复诊？',
          mode: ANSWER_MODE.CHECK
        },
        {
          no: 3,
          answerList: [],
          field: ANSWER_FIELD.IS_AGAIN_CONFIRM,
          question: '根据国家相关规定，线上不支持首诊开处方服务，是否继续咨询？',
          mode: ANSWER_MODE.CHECK
        },
        {
          no: 4,
          answerList: [],
          field: ANSWER_FIELD.ATTACHMENT,
          question: '请问您是否需要补充病历、处方、检查报告等图片？',
          mode: ANSWER_MODE.FILE
        },
        {
          no: 5,
          answerList: [],
          field: ANSWER_FIELD.ATTACHMENT,
          question: '互联网医院复诊需上传复诊凭证，无凭证医生或将无法为您开具处方，请您知悉。',
          mode: ANSWER_MODE.FILE_CONFIRM
        },
        {
          no: 6,
          answerList: [],
          field: ANSWER_FIELD.ILLNESS_CONFIRM,
          question: '请选择您的初诊诊断(多选)',
          mode: ANSWER_MODE.ILLNESS_CONFIRM
        }
      ],

      // 答题路径
      questionPath: [],

      // 答题完毕
      questionDone: false,

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
          hasAnswer: false
        },
        {
          mode: SUPPLEMENTARY_MODE.WOMAN,
          msg: SUPPLEMENTARY_MODE_MSG_MAP[SUPPLEMENTARY_MODE.WOMAN],
          hasAnswer: false
        },
        {
          mode: SUPPLEMENTARY_MODE.IMAGES,
          msg: SUPPLEMENTARY_MODE_MSG_MAP[SUPPLEMENTARY_MODE.IMAGES],
          hasAnswer: false
        }
      ],

      supplementaryMode: null,

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
      isFixed: false
    }
  },

  computed: {
    current() {
      if (this.questionIndex > -1) {
        return this.questionList[this.questionIndex]
      }

      return {}
    }
  },

  watch: {
    answerList() {
      this.$nextTick().then(() => {
        this.scrollToBottom()
      })
    }
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
    this.getWapDoctorInfo()
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
      const index = this.chatList.findIndex(chat => {
        return chat.id === id
      })
      // ChatList中需要删除的回答
      const Answer = this.chatList[index]
      const qIndex = this.chatList.findIndex(chat => {
        return chat.id === Answer.qid
      })
      // ChatList中需要删除的问题
      const question = this.chatList[qIndex]
      if (question === undefined) throw new Error('Question could not be found')
      // 需要将该问题设置为 未回答
      const sup = this.supplementaryList.find(sup => {
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
      $peace.$on(
        peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_ALLERGIES_SAVE,
        this.supplementaryAllergiesSaveCallback
      )
      $peace.$on(
        peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_UPLOAD,
        this.doctorInquiryApplySupplementaryUploadCallback
      )
    },

    offEmits() {
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_UPLOAD)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_ILLNESS)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_ALLERGIES_SAVE)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_SUPPLEMENTARY_UPLOAD)
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
      const index = this.supplementaryList.findIndex(el => {
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
      // console.log(period)
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
      if (res.data.result) {
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
      this.model.foodAllergy = foodAllergy.map(item => item.value).toString()
      this.model.drugAllergy = drugAllergy.map(item => item.value).toString()
      this.model.allergicHistory = drugAllergy
        .concat(foodAllergy)
        .map(item => item.value)
        .toString()

      const context = this.model.allergicHistory
      const mode = SUPPLEMENTARY_MODE.ALLERGIES

      this.pushToChatList({ context })

      this.onAfterSupplementaryAnswer(mode)
    },

    pushToChatList(params, others = {}) {
      const { chatMode = 'a', type = 'text', context, images } = params

      if (chatMode === 'q') {
        const chat = Object.assign(others, {
          id: this.uniqKey++,
          position: 'left',
          type,
          context,
          images,
          ifShowUpdateBtn: false
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
          ifShowUpdateBtn: true,
          qid: question.id
        })

        this.chatList.push(chat)
      }
    },

    doctorInquiryApplySupplementaryUploadCallback(result) {
      this.affectedImages = result
      this.pushToChatList({
        type: 'images',
        images: result
      })
      const mode = SUPPLEMENTARY_MODE.IMAGES

      this.onAfterSupplementaryAnswer(mode)
    },

    setModel() {
      const params = peace.util.decode(this.$route.params.json)
      this.model.doctorId = params.doctorId
      this.model.consultingType = params.consultingType
    },

    getFamilyList() {
      peace.service.patient.getMyFamilyList().then(res => {
        const famliyQuestion = this.questionList.find(item => item.field === this.ANSWER_FIELD.FAMILY)
        const familyList = res.data
        familyList.forEach(item => {
          item.label = item.name
          item.value = item.id
        })

        famliyQuestion.answerList = familyList
      })
    },

    getWapDoctorInfo() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.doctor.getWapDoctorInfo(params).then(res => {
        this.doctor = res.data
      })
    },

    getSerivceType() {
      const params = peace.util.decode(this.$route.params.json)

      const consultInfo = this.doctor.consultationList[params.consultingType]

      return consultInfo && consultInfo.tagName
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
      return this.questionDone ? index === this.answerList.length - 1 : index === this.answerList.length - 2
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
          answerList: this.current.answerList
        })
      })
    },

    backQuestion() {
      const length = this.questionDone ? 1 : 2

      const nextQuestionIndex = this.questionPath[this.questionPath.length - length] || 0

      this.questionDone = false
      this.doneList = []
      this.answerList.splice(this.answerList.length - length, length)
      this.questionPath.splice(this.questionPath.length - length, length)
      this.questionIndex = nextQuestionIndex

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
        } else {
          this.beginQuestion(nextQuestionIndex)
        }

        this.$nextTick().then(() => {
          this.scrollToBottom()
        })
      }, 500)
    },

    beginDoneMessage() {
      this.questionDone = true
      this.doneList.push({
        message: '基础情况收集完毕，请及时咨询医生，进行专业的临床诊断。本次咨询基础情况将自动推送给医生。'
      })
    },

    answer() {
      if (this.setAnswer(arguments)) {
        this.beginNextQuestion()

        this.resetCurrentQuestion()
      }
    },

    setAnswer(params) {
      let answer = ''

      // 获取问题答案

      // 问诊描述
      if (this.current.field === this.ANSWER_FIELD.ILLNESS_DESCRIBE) {
        if (typeof this.current.answer == 'undefined' || this.current.answer == '') {
          peace.util.alert('请输入您的详细症状')
          return false
        }
        if (this.current.answer) {
          if (this.current.answer.length < 5) {
            peace.util.alert('请输入至少5个字')
            return false
          }
          answer = this.current.answer

          this.model.illnessDescribe = answer
        } else {
          return false
        }
      }

      // 选择家人
      else if (this.current.field === this.ANSWER_FIELD.FAMILY) {
        if (params[0].id) {
          answer = params[0].label
          this.model.familyName = params[0].label
          this.model.familyId = params[0].value
          //家人男性过滤女性特殊时期问题
          if (params[0].sex == '男') {
            this.supplementaryList.splice(1, 1)
          }
          // 检查健康卡
          this.checkHealthCard()
        } else {
          // 跳转新增家人
          const json = peace.util.encode({
            type: 'add',
            emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY
          })
          this.$router.push({ path: `/setting/familyMember/${json}` })

          return false
        }
      }

      // 是否复诊
      else if (this.current.field === this.ANSWER_FIELD.IS_AGAIN) {
        answer = params[0]

        this.model.isAgain = params[0] === '是' ? '1' : '0'
      }

      // 是否复诊确认
      else if (this.current.field === this.ANSWER_FIELD.IS_AGAIN_CONFIRM) {
        answer = params[0]

        this.model.isAgainConfrim = params[0] === '继续咨询' ? '1' : '0'
      }

      // 上传附件
      else if (this.current.field === this.ANSWER_FIELD.ATTACHMENT) {
        if (params[0] !== '上传') {
          answer = params[0]

          this.attachment = params[0]
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

      // 是否复诊
      if (this.current.field === this.ANSWER_FIELD.IS_AGAIN) {
        if (this.model.isAgain === '1') {
          nextQuestionIndex = currentQuestionIndex + 2
        } else {
          nextQuestionIndex = currentQuestionIndex + 1
        }
      }

      // 非复诊确认
      else if (this.current.field === this.ANSWER_FIELD.IS_AGAIN_CONFIRM) {
        if (this.model.isAgainConfrim === '1') {
          nextQuestionIndex = -1
        } else {
          nextQuestionIndex = currentQuestionIndex + 1
        }
      }

      // 上传凭证
      else if (this.current.field === this.ANSWER_FIELD.ATTACHMENT) {
        if (this.attachment === '我已遗失' || this.attachment === '确认遗失') {
          nextQuestionIndex = currentQuestionIndex + 1
        } else {
          nextQuestionIndex = 6
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

      peace.service.patient.isExistCardRelation(params).then(res => {
        if (!res.data.result) {
          Dialog.confirm({
            title: '提示',
            message: '该就诊人还没有电子健康卡，是否现在领取？',
            confirmButtonText: '现在领取'
          }).then(() => {
            peace.service.patient
              .createHealthcard(params)
              .then(res => {
                if (res.data.result) {
                  peace.util.alert('领取成功，请填写信息后提交问诊！')
                }
              })
              .catch(res => {
                if (res.data.code === 202) {
                  Dialog.confirm({
                    title: '提示',
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

      await Promise.all([
        this.uploadHandler(this.attachment, this.IMAGES_UPLOAD_TYPE.ATTACHMENT),
        this.uploadHandler(this.affectedImages, this.IMAGES_UPLOAD_TYPE.AFFECTED_IMAGES)
      ])
      await this.applyHandler()

      this.sending = false
    },

    uploadHandler(dataArray, type) {
      return new Promise((resolve, reject) => {
        if (Array.isArray(dataArray) && dataArray.length) {
          // 压缩
          const compress = () => {
            return new Promise(resolve => {
              const files = []
              for (let i = 0; i < dataArray.length; i++) {
                new Compressor(dataArray[i].file, {
                  quality: 0.6,
                  convertSize: 50000,
                  success: fileBlob => {
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
          compress().then(files => {
            const params = new FormData()

            params.append('source', 'inquiryApply')
            params.append('type', type)
            files.forEach(file => {
              params.append('file[]', file)
            })

            peace.service.inquiry
              .images(params)
              .then(res => {
                if (type === this.IMAGES_UPLOAD_TYPE.ATTACHMENT) {
                  this.model.attachment = res.data
                } else if (type === this.IMAGES_UPLOAD_TYPE.AFFECTED_IMAGES) {
                  this.model.affectedImages = res.data
                }

                resolve()
              })
              .catch(error => {
                reject(error)
              })
          })
        } else {
          resolve()
        }
      })
    },

    applyHandler() {
      // const params = this.model
      let params = {}
      for (let key in this.model) {
        params[key] = this.model[key]
      }
      return peace.service.inquiry.apply(params).then(res => {
        // 订单提交成功
        if (res.data.errorState === 0) {
          // 需要支付，跳转支付
          if (res.data.inquiryStatus === 1) {
            this.goToPay(res.data)
          }
          // 不需要支付，跳转订单
          else {
            this.goToConsultDetail(res.data)
          }
        }

        // 订单提交失败
        // errorState:1 存在未支付订单， 跳转订单
        if (res.data.errorState === 1) {
          return Dialog.confirm({
            title: '提示',
            message: res.msg,
            confirmButtonText: '去看看'
          }).then(() => {
            this.goToConsultDetail(res.data)
          })
        }

        // errorState:2 存在未结束订单，跳转咨询
        if (res.data.errorState === 2) {
          return Dialog.confirm({
            title: '提示',
            message: res.msg,
            confirmButtonText: '继续咨询'
          }).then(() => {
            this.goToMessage(res.data)
          })
        }
      })
    },

    goToPay(data) {
      // console.log(data)
      const json = peace.util.encode({
        money: data.orderMoney,
        typeName: data.inquiryType === 'image' ? '图文问诊' : '',
        doctorId: data.data,
        doctorName: data.doctorName,
        orderNo: data.orderNo,
        inquiryId: data.inquiryId
      })
      this.$router.replace(`/components/doctorInquiryPay/${json}`)
    },

    goToMessage(data) {
      const params = peace.util.encode({
        id: 'p2p-' + this.model.doctorId,
        scene: 'p2p',
        beginTime: data.startTime.toDate().getTime(),
        to: this.model.doctorId
      })

      // 跳转聊天详情
      this.$router.replace(`/components/messageList/${params}`)
    },

    goToConsultDetail(data) {
      const params = {
        inquiryId: data.inquiryId
      }

      let json = peace.util.encode(params)
      this.$router.replace(`/setting/userConsultDetail/${json}`)
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
      padding: 10px;
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
          border-radius: 0 0 7px 7px;
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
