<template>
  <el-drawer :visible.sync="drawer"
             :modal="false"
             :before-close="handleClose"
             :destroy-on-close="true"
             size="400px"
             style="margin-right: 90px;">
    <span class="title"
          slot="title">{{ titleStr }}</span>
    <Component ref="checkInput"
               :params="params"
               v-bind:is="ComponentInstance" />
  </el-drawer>
</template>

<script>
import peace from '@src/library'
import InquiryRecord from './Inquiry/InquiryRecord'
import DiseaseRecord from './CourseOfDisease/DiseaseRecord'
import AddDiseaseRecord from './CourseOfDisease/AddDiseaseRecord'
import FollowUpRecord from './FollowUp/FollowUpRecord'
import ReferralRecord from './Referral/ReferralRecord'
import ApplyReferral from './Referral/ApplyReferral'
import ConsultationRecord from './Consultation/ConsultationRecord'
import ApplyConsultation from './Consultation/ApplyConsultation'
import FollowUpScheme from './FollowUp/FollowUpScheme'

export default {
  props: {
    params: undefined
  },
  data() {
    return {
      drawer: false,
      innerDrawer: false,
      titleStr: '',
      ComponentInstance: undefined,
      currentIndex: undefined
    }
  },
  methods: {
    show(parameter) {
      this.currentIndex = parameter.index
      switch (parameter.index) {
        case peace.type.HEALTH_RECORD.ACTION_TYPE.咨询:
          {
            this.ComponentInstance = InquiryRecord
            this.titleStr = '咨询记录'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.病程:
          {
            this.ComponentInstance = DiseaseRecord
            this.titleStr = '病程管理'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.随访:
          {
            this.ComponentInstance = FollowUpRecord
            this.titleStr = '随访记录'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.转诊:
          {
            this.ComponentInstance = ReferralRecord
            this.titleStr = '转诊记录'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.会诊:
          {
            this.ComponentInstance = ConsultationRecord
            this.titleStr = '会诊记录'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.发起转诊:
          {
            this.ComponentInstance = ApplyReferral
            this.titleStr = '发起转诊'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.发起会诊:
          {
            this.ComponentInstance = ApplyConsultation
            this.titleStr = '发起会诊'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.添加随访方案:
          {
            this.ComponentInstance = FollowUpScheme
            this.titleStr = '随访方案库'
          }
          break
        case peace.type.HEALTH_RECORD.ACTION_TYPE.添加病程:
          {
            if (!peace.validate.isEmpty(parameter.item)) {
              this.params.item = parameter.item
            }
            this.ComponentInstance = AddDiseaseRecord
            this.titleStr = '添加病程'
          }
          break
      }

      this.drawer = true

      this.$nextTick(function () {
        setTimeout(() => {
          this.clearFocus()
        }, 60)
      })
    },
    clearFocus() {
      const focusElements = this.$el.querySelectorAll(':focus')
      focusElements.forEach((element) => {
        element.blur()
      })
    },
    isAllEmpty(params) {
      for (const key in params) {
        if (!peace.validate.isEmpty(params[key])) {
          return false // 终止程序
        }
      }
      return true
    },
    handleClose(done) {
      if (this.ComponentInstance === ApplyReferral && !this.isAllEmpty(this.$refs.checkInput.view.model)) {
        this.$confirm('关闭后将不保存当前内容，是否关闭？')
          .then(() => {
            $peace.$emit('hideDrawer', this.currentIndex)
            done()
          })
          .catch(() => {
            this.clearFocus()
          })
      } else if (this.ComponentInstance === ApplyConsultation && !this.isAllEmpty(this.$refs.checkInput.view.model)) {
        this.$confirm('关闭后将不保存当前内容，是否关闭？')
          .then(() => {
            $peace.$emit('hideDrawer', this.currentIndex)
            done()
          })
          .catch(() => {
            this.clearFocus()
          })
      } else if (this.ComponentInstance === AddDiseaseRecord && !this.isAllEmpty(this.$refs.checkInput.model)) {
        this.$confirm('关闭后将不保存当前内容，是否关闭？')
          .then(() => {
            $peace.$emit('hideDrawer', this.currentIndex)
            done()
          })
          .catch(() => {
            this.clearFocus()
          })
      } else {
        $peace.$emit('hideDrawer', this.currentIndex)
        done()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: center;
  /* 这里因为关闭按钮宽度为34px, 文字要居中设置偏移 */
  margin-left: 34px;
}

::v-depp .el-drawer {
  outline: none;
}

.el-drawer__wrapper {
  height: calc(100vh - 113px);
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  ::v-depp .el-drawer__header {
    margin-bottom: 20px;

    .el-drawer__close-btn {
      outline: none;
    }
  }

  ::v-depp .el-drawer__body {
    height: calc(100% - 66px);
  }
}
</style>
