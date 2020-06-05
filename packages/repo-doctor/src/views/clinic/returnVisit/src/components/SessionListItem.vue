<template>
  <div class="session-list-item flex column cursor-pointer q-py-md q-px-sm"
       v-bind:class="{ active : this.active}">
    <div class="flex justify-between items-baseline q-mb-sm">
      <div class="flex items-end">

        <template v-if="unread">
          <el-badge v-bind:value="unread"
                    class="q-mr-md">
            <span class="text-bold"> {{ patientInfo.familyName }} </span>
          </el-badge>
        </template>
        <template v-else>
          <span class="q-mr-md text-bold"> {{ patientInfo.familyName }} </span>
        </template>

        <span class="q-mr-sm text-caption"> {{ patientInfo.familySex }} </span>
        <span class="q-mr-sm text-caption"> {{ `${ patientInfo.familyAge }岁` }} </span>
      </div>
      <div>
        <el-tag effect="plain"
                v-bind:style="inquiryStatusTextStyle">{{ inquiryStatusText }}</el-tag>
      </div>
    </div>
    <div class="full-width q-mb-md text-caption ellipsis"
         style="max-height: 24px;">
      <span v-html="lastMessage"></span>
    </div>
    <div class="text-right footer">
      <!-- 复诊续方没有图标和类型 -->
      <!-- 
      <div class="flex items-center text-grey text-caption">
        <q-icon class="q-mr-xs"
                v-bind:name="`img:${inquiryTypeImage}`"></q-icon>
        <span>{{ inquiryTypeText }}</span>
      </div> 
      -->
      <div class="text-grey text-caption">
        <PeaceCountdown v-bind:time="1000 * 60 * 60 * 24 * 365">
          <template slot-scope="props">
            {{ getInquriyTimer(props) }}
          </template>
        </PeaceCountdown>
      </div>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Type from '@src/type'

export default {
  props: {
    active: Boolean,
    session: Object
  },

  data() {
    return {
      countdownTime: 1000,
      beginTime: new Date()
    }
  },

  created() {
    setInterval(() => {
      this.countdownTime = 2000
    }, 1000)
  },

  computed: {
    unread() {
      return this.session?.unread
    },

    inquiryInfo() {
      return this.session?.content?.inquiryInfo ?? {}
    },

    patientInfo() {
      return this.session?.content?.patientInfo ?? {}
    },

    inquiryTypeText() {
      return Object.keys(Type.INQUIRY.INQUIRY_TYPE).find((key) => Type.INQUIRY.INQUIRY_TYPE[key] === this.inquiryInfo?.inquiryType)
    },

    inquiryTypeImage() {
      if (this.inquiryInfo?.inquiryType === Type.INQUIRY.INQUIRY_TYPE.图文问诊) {
        return require('./../assets/img/chat_icon_pic@2x.png')
      } else if (this.inquiryInfo?.inquiryType === Type.INQUIRY.INQUIRY_TYPE.视频问诊) {
        return require('./../assets/img/chat_icon_video@2x.png')
      }

      return ''
    },

    inquiryStatusText() {
      return Object.keys(Type.INQUIRY.INQUIRY_STATUS).find((key) => Type.INQUIRY.INQUIRY_STATUS[key] === this.inquiryInfo?.inquiryStatus)
    },

    inquiryStatusTextStyle() {
      if (this.inquiryInfo?.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.待接诊) {
        return {
          ['background']: '#e3f0f0',
          ['color']: '#4395f5',
          ['border-radius']: '20px',
          ['border-color']: '#4395f5'
        }
      } else {
        return {
          ['background']: '#dafaf6',
          ['color']: '#00c6ae',
          ['border-radius']: '20px',
          ['border-color']: '#00c6ae'
        }
      }
    },

    lastMessage() {
      const messageType = this.session.lastMsg.type
      const messageTypeMap = {
        ['text']: this.session.lastMsg.text,
        ['image']: '【图片】',
        ['video']: '【视频】',
        ['custom']: this.session.lastMsg.content?.data?.showTextInfo?.doctorClientText || '【系统消息】'
      }

      return messageTypeMap[messageType]
    }
  },

  methods: {
    // 格式化
    formatDuration(beginDate, overDate) {
      const durationString = Peace.util.formatDuration(beginDate, overDate)

      return durationString
    },

    /**
     * 问诊计时器
     *
     * 待接诊：显示【系统自动退诊】倒计时
     * 问诊中：显示【问诊中】正计时
     */
    getInquriyTimer() {
      // 待接诊
      if (this.inquiryInfo?.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.待接诊) {
        const timerEnd = this.inquiryInfo?.startTime?.toDate()?.getTime() + Type.INQUIRY.自动退诊时间 * 60 * 60 * 1000

        return this.formatDuration(new Date(), timerEnd)
      }
      // 问诊中
      else if (this.inquiryInfo?.inquiryStatus === Type.INQUIRY.INQUIRY_STATUS.问诊中) {
        const timerBegin = this.inquiryInfo?.acceptTime?.toDate()?.getTime()

        return this.formatDuration(timerBegin, new Date())
      }

      return new Error('会话必须为【待接诊】/【问诊中】状态')
    }
  }
}
</script>

<style lang="scss" scoped>
.session-list-item {
  border-bottom: 1px solid #efefef;

  &.active {
    background: #f4f4f4;
  }
}
</style>