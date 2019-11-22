<template>
  <div class="inquriy layout">

    <div class="layout-header">
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
            <div class="message-layout right"
                 v-for="(file, fileIndex) in item.answer"
                 :key="fileIndex">
              <div class="message out">
                <img style="max-height: 300px; max-width: 100%; width: unset;"
                     :src="file.content">
              </div>
              <span v-if="canShowChange(index)"
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
          <van-row key="doctor"
                   type="flex"
                   align="center"
                   justify="space-between"
                   class="doctor">
            <van-row type="flex"
                     justify="space-between">
              <div style="margin: 0 10px 0 0;">
                <van-image width="50"
                           height="50"
                           round
                           :src="doctor.doctorInfo.avartor" />
              </div>
              <van-row type="flex"
                       justify="center"
                       style="flex-direction: column;">
                <div>
                  <span
                        style="color: #333333; font-size: 16px; font-weight: bold; margin: 0 8px 0 0;">
                    {{ doctor.doctorInfo.name }}
                  </span>
                  <span style="color: #333333; font-size: 14px; ">
                    {{ doctor.doctorInfo.doctorTitle }}
                  </span>
                </div>
                <div>
                  <span
                        style="color: #333333; font-size: 14px; font-weight: bold;  margin: 0 8px 0 0;">
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
              <van-button round
                          @click="apply"
                          style="width: 90px; height: 32px; line-height: 1;"
                          type="primary">去咨询</van-button>
            </van-row>
          </van-row>
        </transition-group>
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
                       v-model="current.answer"
                       clearable
                       placeholder="请输入您的详细症状…">
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

          <!-- Q4 & Q5: 附件与确认遗失 -->
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

          <!-- Q6 初步诊断 -->
          <template v-if="current.field === ANSWER_FIELD.ILLNESS_CONFIRM">
            <van-button @click="answer('点击选择初诊诊断')"
                        type="primary"
                        round>点击选择初诊诊断</van-button>
          </template>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'

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

const ANSWER_FIELD = {
  /** 问诊描述 */
  ILLNESS_DESCRIBE: 'illnessDescribe',
  /** 就诊人 */
  FAMILY: 'family',
  /** 是否复诊 */
  IS_AGAIN: 'isAgain',
  /** 附件 */
  ATTACHMENT: 'attachment',
  /** 初诊诊断 */
  ILLNESS_CONFIRM: 'confirmIllness'
}

export default {
  components: {
    [Dialog.Component.name]: Dialog.Component
  },

  data() {
    return {
      ANSWER_MODE: ANSWER_MODE,
      ANSWER_FIELD: ANSWER_FIELD,

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
        isAgain: true
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
          question:
            '请问您要咨询什么问题？（您可输入病情描述，如发病时间、主要病症、治疗经过、目前状况等。）',
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
          field: ANSWER_FIELD.ATTACHMENT,
          question: '请问您是否需要补充病历、处方、检查报告等图片？',
          mode: ANSWER_MODE.FILE
        },
        {
          no: 4,
          answerList: [],
          field: ANSWER_FIELD.ATTACHMENT,
          question: '互联网医院复诊需上传复诊凭证，无凭证医生或将无法为您开具处方，请您知悉？',
          mode: ANSWER_MODE.FILE_CONFIRM
        },
        {
          no: 5,
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

      // 医生详情
      doctor: {
        consultationList: [],
        doctorInfo: {}
      }
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
  },

  destroyed() {
    this.offEmits()
  },

  methods: {
    onEmits() {
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY, this.addFamilyCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_UPLOAD, this.uploaderCallback)
      $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_ILLNESS, this.illnessCallback)
    },

    offEmits() {
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_UPLOAD)
      $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_ILLNESS)
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

    setModel() {
      const params = peace.util.decode(this.$route.params.json)
      this.model.doctorId = params.doctorId
      this.model.consultingType = params.consultingType
    },

    getFamilyList() {
      peace.service.patient.getMyFamilyList().then(res => {
        const famliyQuestion = this.questionList.find(
          item => item.field === this.ANSWER_FIELD.FAMILY
        )
        const familyList = res.data
        familyList.forEach(item => {
          item.label = item.name
          item.value = item.id
        })

        famliyQuestion.answerList = familyList
      })
    },

    getDoctorInfo() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.doctor.getDoctorInfo(params).then(res => {
        this.doctor = res.data
      })
    },

    getSerivceType() {
      const params = peace.util.decode(this.$route.params.json)

      const consultInfo = this.doctor.consultationList.find(
        item => item.tag === params.consultingType
      )

      return consultInfo && consultInfo.tagName
    },

    getSerivceUnit() {
      return '￥'
    },

    getSerivceMoney() {
      const params = peace.util.decode(this.$route.params.json)

      const consultInfo = this.doctor.consultationList.find(
        item => item.tag === params.consultingType
      )

      return consultInfo && consultInfo.money
    },

    canShowChange(index) {
      return this.questionDone
        ? index === this.answerList.length - 1
        : index === this.answerList.length - 2
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
        message:
          '基础情况收集完毕，请及时咨询医生，进行专业的临床诊断。本次咨询基础情况将自动推送给医生。'
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
        if (this.current.answer) {
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
          nextQuestionIndex = currentQuestionIndex + 1
        } else {
          nextQuestionIndex = -1
        }
      }
      // 上传凭证
      else if (this.current.field === this.ANSWER_FIELD.ATTACHMENT) {
        if (this.attachment === '我已遗失' || this.attachment === '确认遗失') {
          nextQuestionIndex = currentQuestionIndex + 1
        } else {
          nextQuestionIndex = 5
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

    apply() {
      this.uploadHandler().then(() => {
        this.applyHandler()
      })
    },

    uploadHandler() {
      return new Promise(resolve => {
        // 获取
        if (Array.isArray(this.attachment) && this.attachment.length) {
          const params = new FormData()

          for (var i = 0; i < this.attachment.length; i++) {
            params.append('file[]', this.attachment[i].file)
            params.append('source', 'inquiryApply')
          }

          peace.service.inquiry.images(params).then(res => {
            this.model.attachment = res.data

            resolve()
          })
        } else {
          resolve()
        }
      })
    },

    applyHandler() {
      const params = this.model

      peace.service.inquiry.apply(params).then(res => {
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
      const json = peace.util.encode({
        money: data.orderMoney,
        typeName: data.inquiryType === 'image' ? '图文问诊' : '',
        doctorId: data.data,
        doctorName: data.doctorName,
        orderNo: data.orderNo
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
      this.$router.push(`/setting/userConsultDetail/${json}`)
    },

    scrollToBottom() {
      const $layout = this.$el.querySelector('.layout-content')
      $layout.scrollTop = $layout.scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.inquriy {
  font-size: 16px;
  height: 100%;
  background: #f5f5f5;

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
      overflow: auto;
      padding: 20px 15px;

      .notify {
        background: rgba(229, 232, 232, 1);
        border-radius: 8px;
        padding: 6px 12px;
        display: inline-block;
        text-align: justify;

        font-size: 12px;
        color: #969a99;
        margin: 0 0 18px 0;

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
        margin: 8px 0 32px 0;
      }
    }

    .layout-footer {
      background-color: #ffffff00;

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

        &.confirmIllness {
          text-align: center;
        }
      }
    }
  }
}
</style>