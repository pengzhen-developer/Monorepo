<template>
  <div class="page"
       v-if="loaded">
    <div class="main">
      <div class="doctor">
        <div class="content">
          <div class="name">{{doctorInfo.name}}</div>
          <div class="title">
            <div>{{doctorInfo.deptName}}</div>
            <div>丨</div>
            <div>{{doctorInfo.doctorTitle}}</div>
          </div>
          <div>{{doctorInfo.hospitalName}}</div>
        </div>
        <van-image v-bind:src="doctorInfo.avartor"
                   round></van-image>
        <div class="tip">
          欢迎来到我的线上门诊，请耐心填写患者信息，选择就诊人，方便医生找到您。
        </div>
      </div>

      <div class=" card add"
           v-if="familyList.length === 0|| showAddCard">
        <div class="title">新增就诊人</div>
        <PatientAdd :hasGuardian="hasGuardian"
                    :canShowSelf="canShowSelf"
                    :noBottomLine="true"
                    ref="add"
                    @update="updateModel"></PatientAdd>
      </div>

      <div class="card list"
           v-if="familyList.length>0&& !showAddCard">
        <div class="title">请选择就诊人</div>
        <div class="list">
          <PatientList :familyList="familyList"
                       @selectFamily="selectFamily"
                       @addFamily="addFamily"></PatientList>
        </div>
      </div>
    </div>

    <div class="footer">
      <van-button type="primary"
                  :disabled="!canSubmit"
                  :loading="hasClick"
                  @click="submit">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import PatientList from '@src/views/components/PatientList.vue'
import PatientAdd from '@src/views/components/PatientAdd.vue'
export default {
  name: 'patient-report',
  components: { PatientList, PatientAdd },
  data() {
    return {
      params: {},
      doctorInfo: {},
      loaded: false,
      showAddCard: false,
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
      canShowSelf: true,
      hasGuardian: false,

      familyList: [],

      checkId: -1,
      familyId: '',
      familyInfo: {},

      hasClick: false,

      gDialog: {
        data: null,
        title: '选择监护人',
        visible: false
      }
    }
  },
  watch: {
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
        this.age = this.getAgeByIdCard(val)
      }
    },
    'model.birthday'(val) {
      if (val) {
        this.age = this.getAgeByBirthday(val)
      }
    }
  },
  computed: {
    canSubmit() {
      let result = false
      if (this.familyList.length > 0 && !this.showAddCard) {
        result = this.familyId ? true : false
      } else {
        if (this.needIdCard) {
          if (
            this.model.name &&
            this.model.idcard &&
            this.model.relation &&
            this.model.sex &&
            this.model.birthday &&
            peace.validate.idCard(this.model.idcard)
          ) {
            result = true
          } else {
            result = false
          }
        } else {
          if (
            this.model.name &&
            this.model.relation &&
            this.model.sex &&
            this.model.birthday &&
            this.model.guardianName &&
            this.model.guardianIdCard &&
            peace.validate.idCard(this.model.guardianIdCard) &&
            ((this.model.idcard && peace.validate.idCard(this.model.idcard)) || this.model.idcard == '')
          ) {
            result = true
          } else {
            result = false
          }
        }
      }
      return result
    },
    needIdCard() {
      //小于6岁 身份证非必填
      return this.age != null && this.age < this.ageLimit ? false : true
    },
    canShowGuardian() {
      //小于6岁 监护人必填
      return this.age != null && this.age < this.ageLimit ? true : false
    }
  },

  mounted() {
    this.params = peace.util.decode(this.$route.params.json)
    this.doctorInfo = this.params.doctorInfo
    this.getFamilyList()
  },

  methods: {
    updateModel(result) {
      this.model = Object.assign({}, this.model, result.model)
    },

    selectFamily(result) {
      this.familyId = result.familyId
    },
    addFamily(showAddCard) {
      this.showAddCard = showAddCard
    },
    async submit() {
      if (!this.canSubmit) {
        return
      }
      if (this.hasClick) {
        return
      }
      this.hasClick = true
      if (this.familyList.length > 0 && !this.showAddCard) {
        if (!this.familyId) {
          return peace.util.alert('请选择一位就诊人')
        } else {
          this.saveFamily()
        }
      } else {
        if (!this.model.name) {
          return peace.util.alert('姓名不能为空')
        }
        if (!this.model.idcard && this.needIdCard) {
          return peace.util.alert('身份证不能为空')
        }
        if (!this.model.relation) {
          return peace.util.alert('请选择关系')
        }
        if (!this.model.sex) {
          return peace.util.alert('请选择性别')
        }
        if (!this.model.birthday) {
          return peace.util.alert('请选择生日')
        }
        // if (!this.model.nationName) {
        //   return peace.util.alert('请选择民族')
        // }
        if (this.canShowGuardian) {
          if (!this.model.guardianName) {
            return peace.util.alert('监护人姓名不能为空')
          }
          if (!this.model.guardianIdCard) {
            return peace.util.alert('监护人身份证不能为空')
          }
        }
        // 添加家人情况
        if (this.model.idcard && this.model.isReconfirm === '') {
          // 第一次二要素检验
          const params = {
            idCard: this.model.idcard,
            name: this.model.name,
            type: 'self'
          }
          const result = await this.$refs.add.checkFamilyIdCard(params)
          if (!result) {
            this.hasClick = false
            return
          }
        }

        if (this.model.guardianIdCard && this.model.isReconfirmGuardian === '') {
          const params = {
            idCard: this.model.guardianIdCard,
            name: this.model.guardianName,
            type: 'guardian'
          }
          const result = await this.$refs.add.checkFamilyIdCard(params)
          if (!result) {
            this.hasClick = false
            return
          }
        }

        this.saveFamily()
      }
    },

    saveFamily() {
      let params = {}
      if (this.familyList.length > 0 && !this.showAddCard) {
        params.familyId = this.familyId
      } else {
        params.name = this.model.name
        params.idCard = this.model.idcard
        params.birthday = this.model.birthday
        params.nation = this.model.nationName
        params.nationCode = this.model.nationCode
        params.relation = this.model.relation
        params.sex = this.model.sex === '男' ? 1 : 2
        params.guardianName = this.model.guardianName
        params.guardianIdCard = this.model.guardianIdCard
      }
      params.source = 2
      params.doctorId = this.doctorInfo.doctorId

      peace.service.group
        .addData(params)
        .then((res) => {
          //新增家人后断连接IM
          peace.service.IM.initNIMS({ type: 'add', ...res.data })

          if (this.params.emit) {
            $peace.$emit(this.params.emit, true)
          }
          peace.cache.set(peace.type.SYSTEM.EWM_STATUS, 'completed')

          const json = peace.util.encode({
            doctorId: this.doctorInfo.doctorId
          })
          this.$router.replace(`/components/DoctorDetail/${json}`)
        })
        .finally(() => {
          setTimeout(() => {
            this.hasClick = false
          }, 0)
        })
    },
    getFamilyList() {
      peace.service.patient.getMyFamilyList().then((res) => {
        this.familyList = res.data || []
        if (this.familyList.length > 0) {
          this.familyList.map((item) => {
            if (item.relation === '本人') {
              this.canShowSelf = false
            }
            //已有家人为监护人（》=18岁），若当前用户下家人无大于18岁家人，则不展示选择家人按钮【>】
            if (this.getAgeByBirthday(item.birthday) >= 18) {
              this.hasGuardian = true
            }
            if (item.sex === '1') {
              item.sex = '男'
            } else if (item.sex === '0') {
              item.sex = '女'
            }
          })
        }
        this.loaded = true
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
    getAgeByIdCard(identityCard) {
      this.gardianSet = false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .doctor {
      padding: 16px 16px 0 16px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      background: url('~@src/assets/images/bg_patient_report.png') no-repeat;
      background-size: 100% 100%;
      min-height: 196px;
      position: relative;
      .tip {
        position: absolute;
        width: calc(100% - 32px);
        padding: 12px;
        background: #fff4db;
        left: 16px;
        right: 16px;
        bottom: 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #eba40a;
        letter-spacing: 0;
        line-height: 20px;
        border-radius: 8px;
        &::before {
          position: absolute;
          top: -6px;
          right: 28px;
          content: '';
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #fff4db;
        }
      }
      .van-image {
        width: 64px;
        height: 64px;
        margin-left: 9px;
      }
      .content {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 24px;
        flex: 1;
        .name {
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 20px;
          margin-bottom: 8px;
        }
        .title {
          display: flex;

          div {
            &:first-child {
              max-width: 10em;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            // &:last-child {
            //   max-width: 6em;
            //   white-space: nowrap;
            //   text-overflow: ellipsis;
            //   overflow: hidden;
            // }
          }
        }
      }
    }
    .card {
      margin: 0;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      width: calc(100% - 32px);
      flex-direction: column;
      &.list {
        padding: 0 8px;
      }
      .title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 40px;
        padding-left: 8px;
        font-weight: bold;
      }
    }
  }

  .footer {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 8px 16px 24px;
    .van-button {
      width: 100%;
      height: 48px;
      border-radius: 24px;
    }
    .van-button--disabled {
      opacity: 0.6;
    }
  }
}
</style>