    <template>
  <div class="container">
    <div class="add-tip">国家卫健委要求，就医行为必须实名登记</div>
    <div class="form form-for-family">
      <van-field label="姓名"
                 readonly
                 class="is__require"
                 placeholder="请输入"
                 v-model="model.name" />
      <van-field label="身份证号"
                 readonly
                 label-width="6m"
                 class="is__require"
                 placeholder="请输入"
                 v-model="model.idcard" />
      <van-field label="关系"
                 class="is__require"
                 placeholder="请选择"
                 readonly
                 v-model="model.relation" />
      <van-field label="性别"
                 placeholder="请选择"
                 readonly
                 v-model="model.sex" />
      <van-field label="生日"
                 placeholder="请选择"
                 readonly
                 v-model="model.birthday" />
      <van-field label="民族"
                 placeholder="请选择"
                 readonly
                 v-model="model.nationName" />

      <van-cell-group>
        <van-row style="height:10px;background:#f9f9f9;width:calc(100% + 30px );margin:0 -15px;">
        </van-row>
        <van-cell :class="{'is__error':error.gardian}"
                  is-link
                  @click="goToGardian">
          <div>
            <div>就诊人未满6岁，请填写监护人信息</div>
            <div class="van-field__error-message"
                 v-if="error.gardian">{{error.gardian}}</div>
          </div>
        </van-cell>
        <van-cell title="监护人姓名"
                  :value="gardianName"
                  v-if="gardianName" />
        <van-cell title="监护人身份证号"
                  :value="gardianId"
                  v-if="gardianId" />
      </van-cell-group>
      <peace-dialog :title="gDialog.title"
                    :visible.sync="gDialog.visible"
                    @update:visible="checkGardian">
        <GuardianList :from="params.type"
                      :familyId="model.id"
                      :emit="params.emit"
                      :canShowSelf="params.canShowSelf"
                      @setGardianInfo="setGardianInfo" />
      </peace-dialog>
    </div>
    <div class="bottom">
      <van-button @click="submit"
                  size="large"
                  round
                  type="primary">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import GuardianList from './GuardianList'
export default {
  components: {
    GuardianList
  },
  data() {
    return {
      from: '',
      idcard: '',
      model: {
        name: '',
        idcard: '',
        relation: '',
        sex: '',
        birthday: '',
        allergic_history: '',
        foodAllergy: '',
        nationCode: '',
        nationName: '',
        isReconfirm: 0
      },
      error: {
        name: '',
        idcard: '',
        relation: '',
        sex: '',
        birthday: '',
        gardian: ''
      },
      idcardDialog: {
        visible: false,
        error: {
          idcard: ''
        },
        model: {
          idcard: '',
          name: ''
        }
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
      showNations: false,
      addGardian: false,
      childInfo: {},
      canShowSelf: true,
      loading: false,
      hasClick: false,
      params: {}
    }
  },
  activated() {
    this.gardianSet = false
    this.gardianId = ''
    this.gardianName = ''
    this.idcardDialog.error.idcard = ''
    this.gDialog.visible = false
  },

  mounted() {
    this.params = peace.util.decode(this.$route.params.json)

    //关系列表是否展示‘本人’
    if (this.params.canShowSelf != 1) {
      this.relations.splice(0, 1)
    }

    this.getFamilyInfo()
  },
  methods: {
    getFamilyInfo() {
      peace.service.patient.getFamilyInfo(this.params).then((res) => {
        this.model = res.data
        this.model.idcard = this.params.idcard
        this.age = this.getAgeByIdCard(this.params.idcard)
      })
    },
    submit() {
      this.checkGardian()
      if (this.gardianId == '' && this.gardianName == '') {
        return
      }
      if (this.hasClick) {
        return
      }
      this.hasClick = true
      const param = {
        guardianName: this.gardianName,
        guardianIdCard: this.gardianId,
        familyId: this.model.id
      }
      peace.service.patient
        .bindFamilyGuardian(param)
        .then((res) => {
          peace.util.alert(res.msg)
          if (this.params.emit) {
            $peace.$emit(this.params.emit, res)
            this.$router.go(-1)
          }
        })
        .catch((err) => {
          peace.util.alert(err.data.msg)
        })
        .finally(() => {
          this.hasClick = false
        })
    },
    setGardianInfo(item) {
      if (item.idCard) {
        this.gardianId = item.idCard
        this.gardianName = item.name
        this.gardianSet = true
        this.checkGardian()
      } else {
        //如果被监护人选择‘本人’则新增监护人不显示‘本人’
        if (this.model.relation == '本人') {
          this.canShowSelf = false
        }
        this.addGardian = true
        this.age = null
        this.model = {
          name: '',
          idcard: '',
          relation: '',
          sex: '',
          birthday: '',
          allergic_history: '',
          foodAllergy: '',
          nationCode: '',
          nationName: ''
        }
      }

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
    goToGardian() {
      if (!this.addGardian) {
        this.childInfo = Object.assign({}, this.model)
      }
      this.gDialog.visible = true
      peace.cache.remove('gardianInfo')
    },
    checkGardian() {
      if (this.addGardian) {
        let gardianAge = this.getAgeByIdCard(this.gardianId)
        if (gardianAge < 18) {
          this.error.gardian = '监护人年龄不能小于18岁'
        } else {
          this.error.gardian = ''
        }
      } else {
        if (this.age != null && this.age <= this.ageLimit && this.gardianName == '' && this.gardianId == '') {
          this.error.gardian = '请选择监护人'
        } else {
          this.error.gardian = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;

  .form {
    flex: 1;
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 15px;
    display: flex;
    .van-button {
      flex: 1;
    }
    .bottom-del {
      background: #fff;
      color: $primary;
      border: 1px solid $primary;
    }
  }
}
::v-deep .form.form-for-family > .van-cell > .van-cell__value > .van-field__body > .van-field__control {
  color: #666;
  text-align: right;
  &::placeholder {
    color: #ccc;
  }
}
::v-deep.form-for-family .require .van-cell__title > span::after {
  content: '*';
  width: 5px;
  color: #f00;
  font-size: 14px;
  margin-left: 3px;
}

.popup-info {
  padding: 50px 16px 10px;
  ::v-deep.van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  ::v-deep.van-field__control:disabled {
    color: #333 !important;
    -webkit-text-fill-color: #333;
  }
  .van-button {
    margin-top: 50px;
  }
}

.add-tip {
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fa8c16;
  height: 32.5px;
  background: #fffbe6;
  border-radius: 0px 0px 4px 4px;
  line-height: 32.5px;
  padding-left: 16px;
  margin-top: -10px;
}

.popup-card {
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(51, 51, 51, 0.16);
  border-radius: 16px 16px 0px 0px;
  padding: 20px 16px 24px;
  .header {
    height: 24px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    text-align: center;
  }
  .content {
    margin-top: 20px;
    margin-bottom: 16px;
    .title {
      height: 24px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      margin-bottom: 16px;
    }
    .van-field {
      padding-left: 0;
      padding-right: 0;

      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 24px;
      ::v-deep.van-field__label {
        width: 6em;
        flex: unset;
      }
      ::v-deep.van-field__control {
        text-align: right;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button {
      width: 156px;
      height: 48px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 26px;
      &:first-child {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      &:last-child {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00c6ae;
        line-height: 24px;
      }
    }
  }
}
::v-deep.van-cell__value--alone {
  overflow: visible;
  .van-field__error-message {
    transform: translateX(16px);
  }
}
::v-deep.van-cell__title {
  display: flex;
  align-items: center;
}
</style>
