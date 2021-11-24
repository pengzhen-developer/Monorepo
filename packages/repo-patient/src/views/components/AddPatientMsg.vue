<template>
  <div>
    <transition name="van-slide-up">
      <div key="page">
        <div class="shadow"
             @click="changeFlag(false)"
             v-if="showFamily&&familyList.length>0"></div>
        <div class="family has-family"
             :class="showFamily&&familyList.length>0&&'show'">
          <div class="navWrap">
            <div class="title">请填写您的就诊信息</div>
          </div>
          <PatientList :familyList="familyList"
                       :checkedId="this.checkId"
                       @selectFamily="selectFamily"
                       @addFamily="addFamily"></PatientList>
          <div class="h47"></div>
          <div class="footWrap">
            <van-button @click="changeFlag(false)"
                        class="is__dialog"
                        round>取消</van-button>
            <van-button @click="submit"
                        class="is__dialog"
                        type="primary"
                        round>查询</van-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import peace from '@src/library'
import PatientList from '@src/views/components/PatientList.vue'

export default {
  props: {
    showFamily: {
      type: Boolean,
      default: false
    },
    doctor: {
      type: Object,
      default: () => {
        return {
          name: '',
          doctorTitle: ''
        }
      }
    },
    type: {
      type: String,
      default: 'recordCondition'
    },
    patientId: {
      type: String,
      default: ''
    }
  },
  components: { PatientList },
  data() {
    return {
      checkId: -1,
      hasSend: false,
      familyId: '',
      familyInfo: {},
      familyList: []
    }
  },
  watch: {
    showFamily: {
      handler() {
        if (this.showFamily) {
          if (this.familyList.length == 0) {
            this.addFamily()
          } else {
            this.getFamilyList()
          }
        }
      },
      immediate: true
    }
  },
  activated() {
    this.getFamilyList()
  },
  created() {
    $peace.$on(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY_GUARDIAN, this.addFamilyCallback)
  },

  destroyed() {
    $peace.$off(peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY_GUARDIAN)
  },
  methods: {
    selectFamily(result) {
      this.familyId = result.familyId
      this.familyInfo = result.familyInfo
    },

    addFamilyCallback(result) {
      //新增我的家人
      if (result.status) {
        if (this.familyList.length == 0) {
          this.changeFlag({ flag: true, familyInfo: result.familyInfo })
        }
        this.getFamilyList()
      }
    },

    addFamily() {
      if (this.familyList && this.familyList.length >= 4) {
        return peace.util.alert('您最多可添加 4 位家人')
      }
      let canShowSelf = !this.familyList.find((item) => item.relation === '本人') ? 1 : 2
      let hasGuardian = this.familyList.find((item) => this.getAgeByBirthday(item.birthday) >= 18) ? true : false
      let json = peace.util.encode({ type: 'add', canShowSelf, hasGuardian, emit: peace.type.EMIT.DOCTOR_INQUIRY_APPLY_FAMLIY_GUARDIAN })
      this.$router.push(`/setting/familyMember/${json}`)
    },
    changeFlag(flag) {
      this.$emit('changeFlag', flag)
    },
    getFamilyList() {
      peace.service.patient.getMyFamilyList().then((res) => {
        this.familyList = res.data || []
        if (res.data.length > 0) {
          res.data.map((item, index) => {
            if (item.sex === '1') {
              item.sex = '男'
            } else if (item.sex === '0') {
              item.sex = '女'
            }

            if (item.id === this.patientId) {
              this.checkId = index
            }
          })
        } else {
          if (this.showFamily) {
            this.changeFlag({ flag: false })
          }
        }
      })
    },
    getAgeByBirthday(time) {
      if (typeof time !== 'string') {
        return 0
      }
      //时间字符串里，必须是“/”
      let birthday = time.replaceAll('-', '/')
      let birthDate = new Date(birthday)
      let nowDateTime = new Date()
      let age = nowDateTime.getFullYear() - birthDate.getFullYear()
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
    submit() {
      if (!this.familyId) {
        return peace.util.alert('请选择一位就诊人')
      }
      this.changeFlag({ flag: true, familyInfo: this.familyInfo })
    }
  }
}
</script>

<style lang="scss" scoped>
.shadow {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
}
.family {
  position: fixed;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  padding: 16px;
  width: 100%;
  z-index: 1000;
  left: 0;
  transition: bottom 0.5s ease;
  display: flex;
  flex-direction: column;

  &.has-family {
    padding-top: 20px;
    min-height: 50%;
    max-height: 75%;
    bottom: -75%;
    &.show {
      bottom: 0;
    }
  }
}
.navWrap {
  padding: 0 16px;
  .title {
    font-size: 18px;
    font-weight: bold;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #333333;
    line-height: 24px;
    margin-bottom: 20px;
  }
}

.h47 {
  height: 47px;
  width: 100%;
}
.footWrap {
  width: calc(100% - 32px);
  height: 47px;
  position: absolute;
  background: #fff;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>