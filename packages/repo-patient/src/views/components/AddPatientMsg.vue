<template>
  <div>
    <transition name="van-slide-up">
      <div key="page">
        <div class="shadow"
             @click="changeFlag(false)"
             v-if="showFamily"></div>
        <div class="family no-family"
             :class="hasFamily==1&&showFamily&&'show'">
          <div class="navWrap">
            <template v-if="type=='doctorDetail'">
              <div class="title">您已关注{{doctor.name}} {{doctor.doctorTitle}}
              </div>
              <div class="subTitle">请填写您的就诊信息</div>
            </template>
            <template v-else-if="type=='recordCondition'">
              <div class="title">请填写您的就诊信息</div>
            </template>
          </div>
          <div class="form form-for-family">
            <van-field label="姓名"
                       placeholder="请输入姓名"
                       v-model="model.name">
            </van-field>
            <van-field label="身份证号"
                       placeholder="请输入身份证号"
                       v-model="model.idcard" />
            <van-field @click="showPopupRelation"
                       label="关系"
                       placeholder="请选择"
                       readonly
                       right-icon="arrow"
                       v-model="model.relation" />
            <van-field @click="showPopupSex"
                       label="性别"
                       placeholder="请选择"
                       readonly
                       right-icon="arrow"
                       v-model="model.sex" />
            <van-field @click="showPopupBirthday"
                       label="生日"
                       placeholder="请输入"
                       readonly
                       right-icon="arrow"
                       v-model="model.birthday" />
            <van-field @click="showPopupNations"
                       label="民族"
                       placeholder="请输入"
                       readonly
                       right-icon="arrow"
                       v-model="model.nationName" />
            <div class="group"
                 v-if="age!= null && age < this.ageLimit">
              <van-cell value="就诊人未满6岁，请填写监护人信息" />
              <van-field class="w6"
                         label="监护人姓名"
                         placeholder="请输入姓名"
                         v-model="model.guardianName">
              </van-field>
              <van-field class="w8"
                         label="监护人身份证号"
                         placeholder="请输入身份证号"
                         v-model="model.guardianIdCard" />
            </div>

            <peace-dialog :visible.sync="showAllergicHistory">
              <AddAllergicHistory @onSave="showAllergicHistory = false"
                                  v-model="model.allergic_history"></AddAllergicHistory>
            </peace-dialog>
            <peace-dialog :visible.sync="showFoodAllergy">
              <AddFoodAllergy @onSave="showFoodAllergy = false"
                              v-model="model.foodAllergy"></AddFoodAllergy>
            </peace-dialog>
          </div>
          <div class="bottom">
            <van-button @click="submit"
                        round
                        type="primary">{{submitTxt}}</van-button>
          </div>
        </div>
        <div class="family has-family"
             :class="hasFamily==2&&showFamily&&'show'">
          <div class="navWrap">
            <template v-if="type=='doctorDetail'">
              <div class="title">您已关注{{doctor.name}} {{doctor.doctorTitle}}
              </div>
              <div class="subTitle">请填写您的就诊信息</div>
            </template>
            <template v-else-if="type=='recordCondition'">
              <div class="title">请填写您的就诊信息</div>
            </template>
          </div>
          <div class="mainWrap">
            <div class="familyWrap">
              <div class="family-item"
                   :class="{'checked':checkId==index,'report': type=='recordCondition'}"
                   @click="selcetMyFamily(item,index)"
                   v-for="(item,index) in familyList"
                   :key="index">
                <div class="item-top"
                     :class="checkId==index&&'checked'">
                  {{item.name}}
                  <span :class="checkId==index&&'checked'">{{item.relation}}</span>
                </div>
                <div class="item-bottom"
                     :class="checkId==index&&'checked'">{{item.sex}} {{item.age+'岁'}}</div>
              </div>
              <div class="addWrap"
                   @click="addFamily"
                   v-if="familyList.length<4">
                <van-image width="20px"
                           height="20px"
                           :src="require('@src/assets/images/ic_add.png')"></van-image>
                <span>新增家人</span>
              </div>
            </div>

          </div>
          <div class="h47"></div>
          <div class="footWrap"
               @click="submit">{{submitTxt}}</div>

        </div>
      </div>

    </transition>
    <!-- 关系 -->
    <van-popup position="bottom"
               v-model="showRelation">
      <van-picker :columns="relations"
                  @cancel="closeAllPopup"
                  @confirm="setRelation"
                  show-toolbar />
    </van-popup>
    <!-- 性别 -->
    <van-popup position="bottom"
               v-model="showSex">
      <van-picker :columns="sexs"
                  @cancel="closeAllPopup"
                  @confirm="setSex"
                  show-toolbar />
    </van-popup>
    <!-- 生日 -->
    <van-popup position="bottom"
               v-model="showBirthday">
      <van-datetime-picker :max-date="maxDate"
                           :min-date="minDate"
                           @cancel="showBirthday = false"
                           @confirm="selectTime"
                           type="date"
                           v-model="currentDate" />
    </van-popup>

    <!-- 民族 -->
    <van-popup position="bottom"
               v-model="showNations">
      <van-picker :columns="nations"
                  @cancel="closeAllPopup"
                  @confirm="setNations"
                  show-toolbar />
    </van-popup>
  </div>
</template>

<script>
import peace from '@src/library'
const TXT_MAP = {
  recordCondition: '查询',
  doctorDetail: '提交'
}
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
      default: 'doctorDetail'
    }
  },
  data() {
    return {
      submitTxt: '',
      checkId: -1,
      hasSend: false,
      hasFamily: 0, //判断是否存在家人信息
      model: {
        name: '',
        idcard: '',
        nationName: '',
        sex: '',
        birthday: ''
      },
      familyId: '',
      familyInfo: {},
      isNationExist: false,
      age: null,
      ageLimit: 7, //测试为7 上线为6
      gDialog: {
        data: null,
        title: '选择监护人',
        visible: false
      },
      firstLoad: false,
      cardList: [],
      nationName: '',
      relations: ['本人', '父母', '爱人', '孩子', '挚友'],
      sexs: ['男', '女'],
      nations: [],
      nationCode: '',
      minDate: new Date().proDate('{%y-150}'),
      currentDate: new Date(),
      maxDate: new Date(),
      nationsMap: [],
      canShowSelf: true,
      showAllergicHistory: false,
      showFoodAllergy: false,
      showRelation: false,
      showSex: false,
      showBirthday: false,
      showNations: false,
      familyList: []
    }
  },
  watch: {
    // 根据身份证解析性别和生日
    'model.idcard'(val) {
      if (peace.validate.idCard(val)) {
        if (val.length == 15) {
          this.model.sexKey = val.toString().charAt(14) % 2
          this.model.sex = this.model.sexKey ? '男' : '女'
          this.model.birthday = '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
        }
        if (val.length == 18) {
          this.model.sexKey = val.toString().charAt(16) % 2
          this.model.sex = this.model.sexKey ? '男' : '女'
          this.model.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
        }
        this.age = this.getAgeByIdCard(val)
      }
    },

    canShowSelf: {
      handler() {
        if (!this.canShowSelf) {
          this.relations.splice(0, 1)
        }
      },
      immediate: true
    },
    showFamily: {
      handler() {
        if (this.showFamily) {
          this.getFamilyList()
          this.getNationList()
        }
      },
      immediate: true
    }
  },
  activated() {
    this.submitTxt = this.type && TXT_MAP[this.type]
    if (this.showFamily) {
      this.getFamilyList()
      this.getNationList()
    }
  },
  methods: {
    //选择就诊人 (家人)
    selcetMyFamily(item, index) {
      if (this.checkId == index) {
        this.checkId = -1
        this.familyId = ''
        this.familyInfo = {}
      } else {
        this.checkId = index
        this.familyId = item.familyId
        this.familyInfo = item
      }
    },
    addFamily() {
      if (this.familyList && this.familyList.length >= 4) {
        return peace.util.alert('您最多可添加 4 位家人')
      }
      let json = peace.util.encode({ type: 'add' })
      this.$router.push(`/setting/familyMember/${json}`)
    },
    changeFlag(flag) {
      this.$emit('changeFlag', flag)
      peace.cache.remove('isEwm')
    },
    getFamilyList() {
      peace.service.patient.getMyFamilyList().then(res => {
        this.familyList = res.data
        if (res.data.length > 0) {
          this.hasFamily = 2
          res.data.map(item => {
            if (item.sex === '1') {
              item.sex = '男'
            } else if (item.sex === '0') {
              item.sex = '女'
            }
          })
        } else {
          this.hasFamily = 1
        }
      })
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
        strBirthday =
          '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
      }
      //时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (
        nowDateTime.getMonth() < birthDate.getMonth() ||
        (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())
      ) {
        age--
      }
      return age
    },
    goToGardian() {
      this.gDialog.visible = true
    },
    getCardList() {
      if (this.model.isExistCard) {
        let familyId = this.model.id
        let params = { familyId }
        peace.service.patient.getCardList(params).then(res => {
          this.cardList = res.data.list
          this.firstLoad = true
        })
      }
    },
    getNationList() {
      peace.service.patient.getNationList().then(res => {
        let nations = res.data.list
        this.nationsMap = nations
        this.nations = nations.map(item => {
          return item.name
        })
      })
    },
    getNationCodeByName(name) {
      let code = ''
      this.nationsMap.map(item => {
        if (item.name == name) {
          code = item.code
        }
      })
      return code
    },
    selectTime(value) {
      this.showBirthday = false
      this.model.birthday = value.formatDate()
    },

    setRelation(val) {
      this.model.relation = val
      this.closeAllPopup()
    },

    setSex(val) {
      this.model.sex = val
      this.closeAllPopup()
    },
    setNations(val) {
      let code = this.getNationCodeByName(val)
      this.model.nationCode = code
      this.model.nationName = val
      this.closeAllPopup()
    },
    showPopupRelation() {
      this.showRelation = true
    },

    showPopupSex() {
      this.showSex = true
    },

    showPopupBirthday() {
      this.showBirthday = true
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
    submit() {
      let params = {}
      if (this.hasFamily == 2) {
        if (!this.familyId) {
          return peace.util.alert('请选择一位就诊人')
        }
        params.familyId = this.familyId
      } else {
        if (!this.model.name) {
          return peace.util.alert('请输入姓名')
        }
        if (!this.model.idcard) {
          return peace.util.alert('请输入身份证号')
        }
        if (!this.model.relation) {
          return peace.util.alert('请选择关系')
        }
        if (!this.model.sex) {
          return peace.util.alert('请选择性别')
        }
        if (!this.model.birthday) {
          return peace.util.alert('请选择出生日期')
        }
        if (!this.model.nationName) {
          return peace.util.alert('请选择民族')
        }
        if (this.age < this.ageLimit) {
          if (!this.model.guardianName) {
            return peace.util.alert('请输入监护人姓名')
          }
          if (!this.model.guardianIdCard) {
            return peace.util.alert('请输入监护人身份证号')
          }
        }
        params.name = this.model.name
        params.idCard = this.model.idcard
        params.birthday = this.model.birthday
        params.nation = this.model.nationName
        params.nationCode = this.model.nationCode
        params.relation = this.model.relation
        params.sex = this.model.sexKey
        params.guardianName = this.model.guardianName
        params.guardianIdCard = this.model.guardianIdCard
      }
      params.source = 2
      params.doctorId = this.doctor.doctorId
      if (this.hasSend) {
        return
      }
      this.hasSend = true
      if (this.type == 'doctorDetail') {
        peace.service.group
          .addData(params)
          .then(res => {
            peace.util.alert(res.msg)
            this.changeFlag(true)
          })
          .finally(() => {
            setTimeout(() => {
              this.hasSend = false
            }, 0)
          })
      } else if (this.type == 'recordCondition') {
        this.changeFlag({ flag: true, familyInfo: this.familyInfo })
        this.hasSend = false
      }
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
  &.no-family {
    padding: 20px 16px 0;
    height: 75%;
    bottom: -75%;
    &.show {
      bottom: 0;
    }
  }
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
  // min-height: 50px;
  // height: 50px;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .subTitle {
    font-size: 15px;
    color: #999;
  }
}
.mainWrap {
  flex: 1;
  width: 100%;
  padding: 10px 0;
  overflow: auto;
}
.familyWrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .family-item {
    width: 46%;
    margin-right: 8%;
    background: #f9f9f9;
    padding: 8px 13px;
    border: 1px solid #ddd;
    border-radius: 3px;
    height: 74px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 10px;
    &.checked {
      background: #e5f9f6;
      border-color: #00c6ae;
      position: relative;
      &.report {
        &::after {
          height: 0;
        }
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 35px;
        height: 29px;
        background-image: url('~@/assets/images/ic_checked.png');
        background-size: cover;
      }
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
    .item-top {
      color: #000;
      font-size: 16px;
      display: flex;
      align-items: center;
      &.checked {
        color: #00c6ae;
      }
      span {
        color: #999;
        font-size: 13px;
        padding: 2px 6px;
        line-height: 1.2;
        margin-left: 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        &.checked {
          color: #00c6ae;
          border-color: #00c6ae;
        }
      }
    }
    .item-bottom {
      color: #666;
      font-size: 14px;
      &.checked {
        color: #00c6ae;
      }
    }
  }
}
.addWrap {
  width: 46%;
  height: 74px;
  border-radius: 6px;
  border: 1px dashed rgba(187, 187, 187, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-left: 10px;
    color: #999;
    font-size: 14px;
  }
}
.h47 {
  height: 47px;
  width: 100%;
}
.footWrap {
  width: calc(100% - 32px);
  height: 47px;
  color: #fff;
  background-color: #00c6ae;
  border-radius: 30px;
  position: absolute;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  flex: 1;
  overflow: auto;
}
.bottom {
  padding: 10px 15px;
  display: flex;
  .van-button {
    flex: 1;
  }
  .van-button + .van-button {
    margin-left: 10px;
  }
}
.group {
  .w6 {
    /deep/.van-cell__title {
      width: 6em;
      span {
        width: 5.6em;
      }
    }
  }
  .w8 {
    /deep/.van-cell__title {
      width: 8em;
      span {
        width: 7.6em;
      }
    }
  }
  /deep/.van-cell__title {
    // width: 8.6em;
    // span {
    //   width: 8em;
    // }

    .van-field__control {
      text-align: right;
    }
  }
}
/deep/ .van-cell__title {
  width: 4.7em;
  height: 18px;
  span {
    height: 18px;
    font-size: 16px;
    line-height: 18px;
    color: #666;
    width: 4.3em;
    text-align: justify;
    text-align-last: justify;
    display: inline-block;
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 0px;
    }
  }
}
/deep/.van-field__body {
  position: relative;
  padding-left: 30px;
  &::before {
    position: absolute;
    left: 10px;
    top: 0;
    transform: translateY(5px);
    color: #ee0a24;
    font-size: 18px;
    line-height: 18px;
    content: '*';
  }
}
/deep/ .form.form-for-family > .group > .van-cell,
/deep/ .form.form-for-family > .van-cell {
  height: 50px;
  align-items: center;
  &:last-child {
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0.42667rem;
      border-bottom: 0.02667rem solid #ebedf0;
      transform: scaleY(0.5);
    }
  }
}
/deep/ .form.form-for-family > .group > .van-cell > .van-cell__value > .van-field__body > .van-field__control,
/deep/ .form.form-for-family > .van-cell > .van-cell__value > .van-field__body > .van-field__control {
  color: #666;
  font-size: 15px;
  text-align: right;
  &::placeholder {
    color: #ccc;
  }
}
</style>