<template>
  <div :class="{'no-bottom-line':noBottomLine}">
    <van-field label="姓名"
               class="is__require"
               :class="{'is__error':error.name}"
               placeholder="请输入"
               input-align="right"
               :error-message="error.name"
               v-model="model.name"
               @blur="checkName"></van-field>
    <van-field label="身份证号"
               :class="{'is__require':needIdCard,'is__error':error.idcard}"
               placeholder="请输入"
               input-align="right"
               :error-message="error.idcard"
               v-model.trim="model.idcard"
               @blur="checkIdCard"></van-field>
    <van-field @click="showPopupRelation"
               label="关系"
               class="is__require"
               :class="{'is__error':error.relation}"
               placeholder="请选择"
               input-align="right"
               readonly
               right-icon="arrow"
               :error-message="error.relation"
               v-model="model.relation"></van-field>
    <van-field @click="showPopupSex"
               label="性别"
               class="is__require"
               :class="{'is__error':error.sex}"
               placeholder="请选择"
               input-align="right"
               readonly
               right-icon="arrow"
               :error-message="error.sex"
               v-model="model.sex"></van-field>
    <van-field @click="showPopupBirthday"
               label="生日"
               class="is__require"
               :class="{'is__error':error.birthday}"
               placeholder="请选择"
               input-align="right"
               readonly
               right-icon="arrow"
               :error-message="error.birthday"
               v-model="model.birthday"></van-field>
    <van-field @click="showPopupNations"
               label="民族"
               placeholder="请选择"
               input-align="right"
               readonly
               right-icon="arrow"
               v-model="model.nationName"></van-field>
    <template v-if="canShowGuardian">

      <van-field label="就诊人未满6岁，请填写监护人信息"
                 label-width="18em"
                 readonly
                 :right-icon="hasGuardian?'arrow':''"
                 @click-right-icon="selectGuardian">
      </van-field>
      <van-field label="监护人姓名"
                 label-width="7em"
                 class="is__require no-margin"
                 :class="{'is__error':error.guardianName}"
                 placeholder="若无证件，则此处必填"
                 input-align="right"
                 :error-message="error.guardianName"
                 v-model="model.guardianName"
                 @blur="checkGuardianName"></van-field>
      <van-field label="监护人身份证"
                 label-width="7em"
                 class="is__require no-margin"
                 :class="{'is__error':error.guardianIdCard}"
                 placeholder="若无证件，则此处必填"
                 input-align="right"
                 :error-message="error.guardianIdCard"
                 v-model.trim="model.guardianIdCard"
                 @blur="checkguardianIdCard"></van-field>
    </template>

    <!-- 关系 -->
    <van-popup position="bottom"
               v-model="showRelation">
      <van-picker :columns="relations"
                  @cancel="closeAllPopup('relations')"
                  @confirm="setRelation"
                  show-toolbar>
      </van-picker>
    </van-popup>
    <!-- 性别 -->
    <van-popup position="bottom"
               v-model="showSex">
      <van-picker :columns="sexs"
                  @cancel="closeAllPopup('sex')"
                  @confirm="setSex"
                  show-toolbar>
      </van-picker>
    </van-popup>
    <!-- 生日 -->
    <van-popup position="bottom"
               v-model="showBirthday">
      <van-datetime-picker :max-date="maxDate"
                           :min-date="minDate"
                           @cancel="closeAllPopup('birthday')"
                           @confirm="selectTime"
                           type="date"
                           v-model="currentDate">
      </van-datetime-picker>
    </van-popup>
    <!-- 民族 -->
    <van-popup position="bottom"
               v-model="showNations">
      <van-picker :columns="nations"
                  @cancel="closeAllPopup"
                  @confirm="setNations"
                  show-toolbar>
      </van-picker>
    </van-popup>
    <!-- 监护人列表 -->
    <peace-dialog :title="gDialog.title"
                  :visible.sync="gDialog.visible"
                  @update:visible="checkguardianIdCard">
      <GuardianList :data="gDialog.data"
                    :from="'selectGuardian'"
                    @setGardianInfo="setGardianInfo" />
    </peace-dialog>

    <CheckIdCardAgain v-model="idcardDialog.visible"
                      :info="idcardDialog"
                      @cancelAgain="cancelAgain"
                      @confirmAgain="confirmAgain"></CheckIdCardAgain>
  </div>
</template>

<script>
import peace from '@src/library'
import GuardianList from '@src/views/setting/family/GuardianList.vue'
import CheckIdCardAgain from '@/src/views/components/CheckIDCardAgain.vue'
export default {
  name: 'add-patient-card',
  components: { GuardianList, CheckIdCardAgain },
  props: {
    canShowSelf: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    hasGuardian: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    noBottomLine: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      model: {
        name: '',
        idcard: '',
        relation: '',
        nationName: '',
        nationCode: '',
        sex: '',
        birthday: '',
        guardianName: '',
        guardianIdCard: '',
        isReconfirm: '',
        isReconfirmGuardian: ''
      },
      error: {
        name: '',
        idcard: '',
        relation: '',
        sex: '',
        birthday: '',
        guardianName: '',
        guardianIdCard: ''
      },
      idcardDialog: {
        visible: false,

        error: {
          idcard: ''
        },

        model: {
          idcard: '',
          name: '',
          type: 'self'
        }
      },
      showRelation: false,
      showSex: false,
      showBirthday: false,
      showNations: false,
      ageLimit: 6,
      age: null,
      relations: ['本人', '父母', '爱人', '孩子', '挚友'],
      sexs: ['男', '女'],
      nations: [],
      nationCode: '',
      minDate: new Date().proDate('{%y-150}'),
      currentDate: new Date(),
      maxDate: new Date(),
      nationsMap: [],

      gDialog: {
        data: null,
        title: '选择监护人',
        visible: false
      }
    }
  },
  computed: {
    needIdCard() {
      //小于6岁 身份证非必填
      return this.age != null && this.age < this.ageLimit ? false : true
    },
    canShowGuardian() {
      //小于6岁 监护人必填
      return this.age != null && this.age < this.ageLimit ? true : false
    }
  },
  watch: {
    needIdCard(value) {
      if (!value) {
        this.error.idcard = ''
      } else {
        this.modol.guardianIdCard = ''
        this.model.guardianName = ''
        this.error.guardianIdCard = ''
        this.error.guardianName = ''
      }
    },

    // 根据身份证解析性别和生日
    'model.idcard'(val) {
      if (peace.validate.idCard(val)) {
        if (val.length == 15) {
          if (!this.model.sex) {
            let sexKey = val.toString().charAt(14) % 2
            this.model.sex = sexKey ? '男' : '女'
          }
          if (!this.model.birthday) {
            this.model.birthday = '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
          }
        }
        if (val.length == 18) {
          if (!this.model.sex) {
            let sexKey = val.toString().charAt(16) % 2
            this.model.sex = sexKey ? '男' : '女'
          }
          if (!this.model.birthday) {
            this.model.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
          }
        }
      }
    },
    'model.birthday'(val) {
      if (val) {
        this.age = this.getAgeByBirthday(val)
      }
    },
    canShowSelf: {
      handler() {
        if (!this.canShowSelf) {
          this.relations.splice(0, 1)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getNationList()
  },
  methods: {
    //二要素检验
    checkFamilyIdCard(params) {
      return new Promise((resolve) => {
        peace.service.patient
          .CheckFamilyIdCard(params)
          .then((res) => {
            //1：正常  2：库中无此身份证号码
            if (params.type == 'self') {
              this.model.isReconfirm = res.data?.status == 2 ? 1 : 0
            } else {
              this.model.isReconfirmGuardian = res.data?.status == 2 ? 1 : 0
            }

            if (res.data.status == 2) {
              this.idcardDialog.model.idcard = params.idCard
              this.idcardDialog.model.name = params.name
              this.idcardDialog.model.type = params.type
              this.idcardDialog.visible = true
              this.update()
              resolve(false)
            } else if (res.data.status == 1) {
              resolve(true)
            }
          })
          .catch((err) => {
            if (err.data.code == '202') {
              if (params.type == 'self') {
                this.error.idcard = err.data.msg
              } else {
                this.error.guardianIdCard = err.data.msg
              }
            } else {
              peace.util.alert(err.data.msg)
            }
          })
      })
    },

    cancelAgain(result) {
      if (result.model.type == 'self') {
        this.model.isReconfirm = ''
      } else {
        this.model.isReconfirmGuardian = ''
      }
      this.update()
    },
    confirmAgain(result) {
      if (result.status) {
        if (result.model.type == 'self') {
          this.model.idcard = result.model.idcard
          this.model.isReconfirm = result.isReconfirm
        } else {
          this.model.guardianIdCard = result.model.idcard
          this.model.isReconfirmGuardian = result.isReconfirm
        }
      }
      this.update()
    },
    getNationList() {
      peace.service.patient.getNationList().then((res) => {
        let nations = res.data.list
        this.nationsMap = nations
        this.nations = nations.map((item) => {
          return item.name
        })
      })
    },
    getNationCodeByName(name) {
      let code = ''
      this.nationsMap.map((item) => {
        if (item.name == name) {
          code = item.code
        }
      })
      return code
    },
    selectTime(value) {
      this.showBirthday = false
      this.model.birthday = value.formatDate()
      this.update()
    },

    setRelation(val) {
      this.model.relation = val
      this.closeAllPopup('relations')
      this.update()
    },

    setSex(val) {
      this.model.sex = val
      this.closeAllPopup()
      this.update()
    },
    setNations(val) {
      let code = this.getNationCodeByName(val)
      this.model.nationCode = code
      this.model.nationName = val
      this.closeAllPopup()
      this.update()
    },
    showPopupRelation() {
      this.showRelation = true
    },

    showPopupSex() {
      this.showSex = true
    },

    showPopupBirthday() {
      this.showBirthday = true
      if (this.model.birthday) {
        this.currentDate = new Date(this.model.birthday.replaceAll('-', '/'))
      }
    },

    showPopupNations() {
      this.showNations = true
    },
    // 关闭所有弹出层
    closeAllPopup() {
      this.showRelation = false
      this.showSex = false
      this.showBirthday = false
      this.showNations = false
    },
    selectGuardian() {
      if (this.hasGuardian) {
        this.gDialog.visible = true
      }
    },
    setGardianInfo(item) {
      this.model.guardianName = item.name
      this.model.guardianIdCard = item.idCard
      this.checkguardianIdCard()
      this.checkGuardianName()
      this.gDialog.visible = false
      this.update()
    },
    update() {
      this.$emit('update', { model: this.model })
    },
    getAgeByIdCard(identityCard) {
      var len = (identityCard + '').length
      if (len == 0) {
        return 0
      } else {
        if (len != 15 && len != 18) {
          //身份证号码只能为15位或18位其它不合法
          return 0
        }
      }
      var strBirthday = ''
      if (len == 18) {
        //处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2)
      }
      if (len == 15) {
        strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
      }
      //时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--
      }
      return age
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
    checkName() {
      this.error.name = !this.model.name ? '姓名不能为空' : ''
      this.model.isReconfirm = ''
      this.update()
    },

    checkIdCard() {
      if (!this.model.idcard) {
        if (this.needIdCard) {
          this.error.idcard = '身份证不能为空'
        } else {
          this.error.idcard = ''
        }
      } else {
        if (!peace.validate.idCard(this.model.idcard)) {
          this.error.idcard = '身份证式错误'
        } else {
          this.error.idcard = ''
        }
      }
      this.model.isReconfirm = ''
      this.update()
    },
    checkRelation() {
      this.error.relation = !this.model.relation ? '请选择关系' : ''
      this.update()
    },
    checkSex() {
      this.error.sex = !this.model.sex ? '请选择性别' : ''
      this.update()
    },
    checkBirthday() {
      this.error.birthday = !this.model.birthday ? '请选择生日' : ''
      this.update()
    },

    checkGuardianName() {
      this.error.guardianName = !this.model.guardianName ? '监护人姓名不能为空' : ''
      this.model.isReconfirmGuardian = ''
      this.update()
    },
    checkguardianIdCard() {
      if (!this.model.guardianIdCard) {
        this.error.guardianIdCard = '监护人身份证不能为空'
      } else {
        if (!peace.validate.idCard(this.model.guardianIdCard)) {
          this.error.guardianIdCard = '监护人身份证格式错误'
        } else {
          if (this.getAgeByIdCard(this.model.guardianIdCard) < 18) {
            this.error.guardianIdCard = '监护人年龄不得小于18岁'
          } else {
            this.error.guardianIdCard = ''
          }
        }
      }
      this.model.isReconfirmGuardian = ''
      this.update()
    }
  }
}
</script>

<style lang="scss" scoped>
.no-bottom-line {
  .van-cell:last-child::after,
  .van-cell--borderless::after {
    display: none;
  }
}
.van-cell.no-margin {
  ::v-deep.van-field__label {
    margin-right: 0.1em;
  }
}
</style>