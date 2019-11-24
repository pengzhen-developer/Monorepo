<template>
  <div class="container">
    <template v-if="isEdit">
      <!--       <div class="card-name">{{cardName}}</div>-->
      <div class="card-title">电子健康卡</div>
      <div class="card"
           v-for="(cardItem, index) in cardList"
           :key="'item' + index"
           @click="goToDetail(cardItem)">
        <div class="qrcode"
             id="qrcode"
             :style="{backgroundImage:'url(data:image/png;base64,'+ cardItem.base64 + ')'}"></div>
        <div class="name">{{cardItem.name}}</div>
        <div class="idcard">{{cardItem.idcard}}</div>
      </div>
      <div class="card no-card"
           v-if="!model.isExistCard"></div>
      <div claas="card-list-content">
        <div class="item"></div>
      </div>
      <!--      <div class="jz-card-title">就诊卡</div>-->
      <!--      <div class="jz-card-list">-->
      <!--        <div class="item" @click="goToDetail()">-->
      <!--          <div class="icon"></div>-->
      <!--          <div class="right">-->
      <!--            <span class="jz-title">-->
      <!--              中山大学附属第三医院-->
      <!--            </span>-->
      <!--            <div class="jz-content">-->
      <!--              <span>* 杰杰</span>-->
      <!--              <span>就诊卡：6000166206</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="form form-for-family"
           v-if="!model.isExistCard">
        <van-field :disabled="isEdit"
                   label="姓名"
                   placeholder="请输入姓名"
                   v-model="model.name" />
        <van-field :disabled="isEdit"
                   label="身份证号"
                   placeholder="请输入身份证号"
                   v-model="model.idcard" />
        <van-field :disabled="isEdit"
                   label="关系"
                   placeholder="请选择"
                   readonly
                   v-model="model.relation" />
        <van-field :disabled="isEdit"
                   label="性别"
                   placeholder="请选择"
                   readonly
                   v-model="model.sex" />
        <van-field :disabled="isEdit"
                   label="生日"
                   placeholder="请输入"
                   readonly
                   v-model="model.birthday" />
        <template v-if="isNationExist">
          <van-field :disabled="isEdit"
                     label="民族"
                     readonly
                     v-model="model.nationName" />
        </template>
        <template v-else>
          <van-field @click="showPopupNations"
                     label="民族"
                     placeholder="请输入"
                     required
                     right-icon="arrow"
                     v-model="model.nationName" />
        </template>

        <!--        <van-field :value="model.allergic_history" @click="showAllergicHistory= true" clickable label="药物过敏" placeholder="请选择" readonly right-icon="arrow" />-->
        <!--        <van-field :value="model.foodAllergy" @click="showFoodAllergy= true" clickable label="食物/接触物过敏" class="wid"  placeholder="请选择" readonly right-icon="arrow" />-->
        <!--        <peace-dialog :visible.sync="showAllergicHistory">-->
        <!--          <AddAllergicHistory @onSave="showAllergicHistory = false" v-model="model.allergic_history"></AddAllergicHistory>-->
        <!--        </peace-dialog>-->
        <!--        <peace-dialog :visible.sync="showFoodAllergy">-->
        <!--          <AddFoodAllergy @onSave="showFoodAllergy = false" v-model="model.foodAllergy"></AddFoodAllergy>-->
        <!--        </peace-dialog>-->
      </div>
      <div class="bottom">
        <van-button @click="deleted"
                    plain>删除家人</van-button>
        <van-button @click="submit"
                    type="primary"
                    v-if="!isNationExist">完善资料</van-button>
      </div>
    </template>

    <template v-if="from == 'add'">
      <!--      <div class="card no-card"></div>-->
      <div class="form form-for-family">
        <van-field label="姓名"
                   placeholder="请输入姓名"
                   required
                   v-model="model.name" />
        <van-field label="身份证号"
                   placeholder="请输入身份证号"
                   required
                   v-model="model.idcard" />
        <van-field @click="showPopupRelation"
                   label="关系"
                   placeholder="请选择"
                   readonly
                   required
                   right-icon="arrow"
                   v-model="model.relation" />
        <van-field @click="showPopupSex"
                   label="性别"
                   placeholder="请选择"
                   readonly
                   required
                   right-icon="arrow"
                   v-model="model.sex" />
        <van-field @click="showPopupBirthday"
                   label="生日"
                   placeholder="请输入"
                   readonly
                   required
                   right-icon="arrow"
                   v-model="model.birthday" />
        <van-field @click="showPopupNations"
                   label="民族"
                   placeholder="请输入"
                   readonly
                   required
                   right-icon="arrow"
                   v-model="model.nationName" />

        <van-cell-group v-if="gardianSet || (age!= null && age < this.ageLimit)">
          <van-cell value="就诊人未满6岁，请填写监护人信息"
                    is-link
                    @click="goToGardian"
                    v-if="age!= null && age < this.ageLimit" />
          <van-cell title="监护人姓名"
                    :value="gardianName"
                    v-if="gardianSet" />
          <van-cell title="监护人身份证号"
                    :value="gardianId"
                    v-if="gardianSet" />
        </van-cell-group>
        <!--        <van-field :value="model.allergic_history" @click="showAllergicHistory= true" clickable label="药物过敏" placeholder="请选择" readonly right-icon="arrow" />-->
        <!--        <van-field :value="model.foodAllergy" @click="showFoodAllergy= true" clickable label="食物/接触物过敏" placeholder="请选择" readonly right-icon="arrow" />-->
        <peace-dialog :visible.sync="showAllergicHistory">
          <AddAllergicHistory @onSave="showAllergicHistory = false"
                              v-model="model.allergic_history"></AddAllergicHistory>
        </peace-dialog>
        <peace-dialog :visible.sync="showFoodAllergy">
          <AddFoodAllergy @onSave="showFoodAllergy = false"
                          v-model="model.foodAllergy"></AddFoodAllergy>
        </peace-dialog>

        <peace-dialog :title="gDialog.title"
                      :visible.sync="gDialog.visible">
          <GuardianList :data="gDialog.data"
                        @setGardianInfo="setGardianInfo" />
        </peace-dialog>
      </div>
      <div class="bottom">
        <van-button @click="submit"
                    type="primary">保存</van-button>
      </div>
    </template>

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

import AddAllergicHistory from '@src/views/components/AddAllergicHistory'
import AddFoodAllergy from '@src/views/components/AddFoodAllergy'
import GuardianList from '../setting/GuardianList'
import { Dialog } from 'vant'
export default {
  components: {
    GuardianList,
    AddAllergicHistory,
    AddFoodAllergy
  },

  props: {
    // data: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       name: '',
    //       idcard: '',
    //       relation: '',
    //       sex: '',
    //       birthday: '',
    //       allergic_history: '',
    //       foodAllergy: ''
    //     }
    //   }
    // },

    canShowSelf: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  data() {
    return {
      // isFromHospital: false,
      cardName: '',
      from: '',
      model: {
        name: '',
        idcard: '',
        relation: '',
        sex: '',
        birthday: '',
        allergic_history: '',
        foodAllergy: ''
      },
      familyId: '',
      isNationExist: false,
      ageLimit: 6,
      age: null,
      gardianSet: false,
      gardianId: '',
      gardianName: '',
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
      showAllergicHistory: false,
      showFoodAllergy: false,
      showRelation: false,
      showSex: false,
      showBirthday: false,
      showNations: false
    }
  },

  computed: {
    isEdit() {
      return !!this.familyId
    }
  },

  watch: {
    // 根据身份证解析性别和生日
    'model.idcard'(val) {
      if (peace.validate.idCard(val)) {
        if (val.length == 15) {
          this.model.sexKey = val.toString().charAt(14) % 2
          this.model.sex = this.model.sexKey ? '男' : '女'
          this.model.birthday =
            '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
        }
        if (val.length == 18) {
          this.model.sexKey = val.toString().charAt(16) % 2
          this.model.sex = this.model.sexKey ? '男' : '女'
          this.model.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
        }
        this.age = this.getAgeByIdCard(val)
        console.log(this.age)
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
    let json = peace.util.decode(this.$route.params.json)
    if (json.type != 'add') {
      this.getFamilyInfo()
    } else {
      this.from = 'add'
      // 添加页面 只需加载民族列表
      this.getNationList()
    }
  },

  methods: {
    getFamilyInfo() {
      let params = peace.util.decode(this.$route.params.json)
      peace.service.patient.getFamilyInfo(params).then(res => {
        this.model = res.data
        this.familyId = res.data.id
        if (this.model) {
          this.isNationExist = this.model.nationCode && this.model.nationName
          this.cardName = this.model.name
          this.getNationList()
          this.getCardList()
        }
        // this.dialog.data = res.data
        // this.dialog.data.familyId = item.familyId
        // this.dialog.title = '家人信息'
        // this.dialog.visible = true
      })
    },
    setGardianInfo(item) {
      this.gardianId = item.idCard
      this.gardianName = item.name
      this.gardianSet = true
      this.gDialog.visible = false
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
        strBirthday =
          identityCard.substr(6, 4) +
          '/' +
          identityCard.substr(10, 2) +
          '/' +
          identityCard.substr(12, 2)
      }
      if (len == 15) {
        strBirthday =
          '19' +
          identityCard.substr(6, 2) +
          '/' +
          identityCard.substr(8, 2) +
          '/' +
          identityCard.substr(10, 2)
      }
      //时间字符串里，必须是“/”
      var birthDate = new Date(strBirthday)
      var nowDateTime = new Date()
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
      if (
        nowDateTime.getMonth() < birthDate.getMonth() ||
        (nowDateTime.getMonth() == birthDate.getMonth() &&
          nowDateTime.getDate() < birthDate.getDate())
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
    goToDetail(item) {
      let { backgroundCode } = item
      let familyId = this.model.id
      const json = peace.util.encode({
        familyId,
        backgroundCode
      })
      this.$router.push(`/setting/cardDetail/${json}`)
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

    // 保存
    submit() {
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
      console.log(
        'tag',
        this.age && this.age < this.ageLimit && this.gardianName == '' && this.gardianId == ''
      )
      if (this.age && this.age < this.ageLimit && this.gardianName == '' && this.gardianId == '') {
        return peace.util.alert('请选择监护人')
      }
      if (this.isEdit) {
        if (this.isNationExist) {
          // 存在民族情况，此时为删除
          const params = {
            familyId: this.model.famialyId,
            allergic_history: this.model.allergic_history,
            foodAllergy: this.model.foodAllergy
          }

          peace.service.patient.upbindFamily(params).then(res => {
            peace.util.alert(res.msg)

            this.$emit('onComplete')
          })
        } else {
          // 没有民族情况，则开始完善资料。
          this.perfectInfo()
        }
      } else {
        // 添加家人情况
        this.saveFamily()
      }
    },
    saveFamily() {
      let params = this.model
      params.type = 1
      params.nethospitalid = peace.cache.get($peace.type.SYSTEM.NETHOSPITALID)
      params.source = params.nethospitalid && params.nethospitalid != '' ? 2 : 1
      if (this.gardianId != '') {
        params.guardianName = this.gardianName
        params.guardianIdCard = this.gardianId
      }
      peace.service.patient.bindFamily(params).then(res => {
        peace.util.alert(res.msg)

        const params = peace.util.decode(this.$route.params.json)
        if (params.emit) {
          $peace.$emit(params.emit, res)
        }
        this.$router.go(-1)
      })
    },
    perfectInfo() {
      let familyId = this.model.id
      let nationCode = this.model.nationCode
      let nationName = this.model.nationName
      let params = { familyId, nationCode, nationName }
      peace.service.patient.perfectInfo(params).then(res => {
        peace.util.alert(res.msg)
        this.$router.go(-1)
      })
    },
    // 删除
    deleted() {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否删除家人信息'
      }).then(() => {
        const params = {
          familyId: this.model.id
        }

        peace.service.patient.DelFamily(params).then(res => {
          peace.util.alert(res.msg)

          this.$router.go(-1)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .card-name {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ebedf0;
  }
  .card-title,
  .jz-card-title {
    height: 53px;
    font-size: 16px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 53px;
    background: url('../../assets/images/card-icon.png') no-repeat;
    background-size: 25px 20px;
    background-position: 15px 15px;
    padding-left: 55px;
  }
  .parent {
    .van-cell__title {
      flex: auto !important;
    }
  }
  .jz-card-title {
    background: url('../../assets/images/huiyuanqia.png') no-repeat;
    background-size: 25px 20px;
    background-position: 15px 15px;
  }
  .jz-card-list {
    .item {
      width: 343px;
      height: 94px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 5px 0px rgba(238, 238, 238, 0.5);
      border-radius: 6px;
      border: 1px solid rgba(238, 238, 238, 1);
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 15px;
      .icon {
        width: 30px;
        height: 20px;
        background: url('../../assets/images/tubiao_huaban.png') no-repeat;
        background-size: cover;
        margin-right: 15px;
      }
      .jz-title {
        font-size: 15px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .jz-content {
        font-size: 12px;
        font-weight: bold;
        color: rgba(102, 102, 102, 1);
        margin-top: 5px;
      }
    }
  }
  .card {
    width: 343px;
    height: 195px;
    position: relative;
    background: url('../../assets/images/shangdong.png');
    background-size: 100% 100%;
    margin: 0 auto 0;
    &.no-card {
      background: url('../../assets/images/ic_empty_card.png');
      background-size: 100% 100%;
    }
    .qrcode {
      position: absolute;
      width: 80px;
      height: 80px;
      background-size: cover;
      top: 59px;
      right: 22px;
    }
    .name {
      position: absolute;
      top: 100px;
      left: 20px;
    }
    .idcard {
      position: absolute;
      top: 120px;
      left: 20px;
    }
  }
  .form {
    flex: 1;
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
  /deep/ .van-cell__title {
    flex: 1;
    width: auto;
  }
}
/deep/
  .form.form-for-family
  > .van-cell
  > .van-cell__value
  > .van-field__body
  > .van-field__control {
  color: #666;
  text-align: right;
  &::placeholder {
    color: #ccc;
  }
}
</style>
