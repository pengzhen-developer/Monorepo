<template>
  <div class="container">

    <template v-if="loading">
      <!-- 身份证 -->
      <template>
        <div class="id-card-container">
          <div class="id-card">
            <div class="edit"
                 v-if="!isNationExist">
              <van-icon :name="require('@src/assets/images/ic_edit.png')"
                        color="#00C6AE"
                        @click="updataInfo" />
            </div>
            <van-image class="id-card-logo"
                       :src="model.sex=='男'?require('@src/assets/images/avatar_boy.png'):require('@src/assets/images/avatar_girl.png')"></van-image>
            <div class="id-card-content">
              <div class="id-card-content-item">
                <div class="key"><span>姓名</span>:</div>
                <div class="value">{{model.name}}</div>
              </div>
              <div class="id-card-content-item">
                <div class="key"><span>关系</span>:</div>
                <div class="value">{{model.relation}}</div>
              </div>
              <div class="id-card-content-item">
                <div class="key"><span>性别</span>:</div>
                <div class="value">{{model.sex}}</div>
              </div>
              <div class="id-card-content-item">
                <div class="key"><span>民族</span>:</div>
                <div class="value">{{model.nationName}}</div>
              </div>
              <div class="id-card-content-item">
                <div class="key"><span>身份证</span>:</div>
                <div class="value">{{model.idcard}}</div>
              </div>
            </div>

          </div>
          <div class="id-gardian"
               v-if="model.guardianName&&model.guardianIdCard">
            <span>监护人：</span><span>{{model.guardianName}} | {{model.guardianIdCard}}</span>
          </div>
        </div>
      </template>
      <!-- 电子健康卡 -->
      <!--       <div class="card-name">{{cardName}}</div>-->
      <template v-if="cardList.length>0">

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
      </template>
      <!-- 医保卡 -->
      <div class="card-title yiyao">
        医保卡
        <span @click="addYiBaoCard"
              v-if="!hasYiBaoCard">填写医保卡</span>
      </div>
      <template v-if="hasYiBaoCard">
        <div class="yiyao-card"
             v-for="item in yibaoCardList"
             @click="updateYiBaoCard(item)"
             :key="item.id">
          <div class="delete"
               @click.stop="delYibaoCard(item.id)">
            <van-icon name="delete"
                      color="#fff" />
          </div>
          <van-image :src="require('@src/assets/images/ic_yibao_logo.png')"></van-image>
          <div>
            <div class="name">{{item.region}}市医保卡</div>
            <div class="idcard">{{item.medCardNo}}</div>
          </div>
        </div>
      </template>

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

      <div class="bottom">
        <van-button @click="deleted"
                    round
                    size="large"
                    class="bottom-del"
                    plain>删除家人</van-button>
      </div>
      <YibaoCardAdd v-model="showCard"
                    :familyInfo="model"
                    :cardInfo="currentYibaoCard"
                    :serviceTel="serviceTel"
                    @onSuccess="onSuccess"></YibaoCardAdd>
    </template>
    <!-- 添加家人 -->
    <template v-if="from == 'add'||from == 'addGuardian'">
      <div class="add-tip">国家卫健委要求，就医行为必须实名登记</div>
      <div class="form form-for-family">
        <PatientAdd :hasGuardian="hasGuardian"
                    :canShowSelf="canShowSelf"
                    ref="add"
                    @update="updateModel"></PatientAdd>
      </div>
      <div class="bottom">
        <van-button @click="submit"
                    :disabled="!canSubmit"
                    :loading="hasClick"
                    size="large"
                    round
                    type="primary">保存</van-button>
      </div>
    </template>

    <!-- 民族 -->
    <van-popup position="bottom"
               v-model="showNations">
      <van-picker :columns="nations"
                  @cancel="closeAllPopup"
                  @confirm="setNations"
                  show-toolbar />
    </van-popup>

    <!-- 修改家人信息 -->
    <van-popup position="bottom"
               closeable
               round
               class="popup-info"
               :close-icon="require('@src/assets/images/ic_close@2x.png')"
               v-model="showUpdateInfo">
      <div class="form form-for-family">
        <van-field :disabled="isEdit"
                   label="姓名"
                   placeholder="请输入姓名"
                   v-model="model.name" />
        <van-field :disabled="isEdit"
                   label="身份证"
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
          <van-field :disabled="isEdit"
                     @click="showPopupNations"
                     label="民族"
                     placeholder="请选择"
                     right-icon="arrow"
                     v-model="editModel.nationName" />
        </template>
        <template v-if="model.isGuardian">
          <van-field :disabled="isEdit"
                     label="监护人姓名"
                     placeholder="请输入姓名"
                     v-model="model.guardianName" />
          <van-field :disabled="isEdit"
                     label-width="7.2em"
                     label="监护人身份证号"
                     placeholder="请输入身份证号"
                     v-model="model.guardianIdCard" />
        </template>
        <van-button @click="submit"
                    :disabled="!canSubmit"
                    :loading="hasClick"
                    size="large"
                    round
                    type="primary">保存</van-button>
      </div>
    </van-popup>

  </div>
</template>
<script>
import peace from '@src/library'

import YibaoCardAdd from '@src/views/components/YibaoCardAdd'
import PatientAdd from '@src/views/components/PatientAdd.vue'
import { Dialog } from 'vant'

export default {
  components: {
    YibaoCardAdd,
    PatientAdd
  },

  data() {
    return {
      yibaoCardList: [],
      cardList: [],
      currentYibaoCard: {},
      showCard: false,
      showUpdateInfo: false,
      cardName: '',
      from: '',

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
        isReconfirm: '',
        isReconfirmGuardian: ''
      },
      editModel: {
        nationCode: '',
        nationName: ''
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
          name: '',
          type: ''
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
      params: null,
      nationName: '',
      relations: ['本人', '父母', '爱人', '孩子', '挚友'],
      sexs: ['男', '女'],
      nations: [],
      nationCode: '',
      minDate: new Date().proDate('{%y-150}'),
      currentDate: new Date(),
      maxDate: new Date(),
      nationsMap: [],
      showNations: false,
      addGardian: false,
      childInfo: {},
      canShowSelf: true,
      hasGuardian: false,
      loading: false,
      hasClick: false,

      serviceTel: ''
    }
  },

  computed: {
    isEdit() {
      return !!this.familyId
    },
    hasYiBaoCard() {
      return this.yibaoCardList.length > 0
    },
    canShowGardian() {
      return !this.addGardian && this.from != 'addGuardian' && (this.gardianSet || (this.age != null && this.age < this.ageLimit))
    },
    needIdCard() {
      //小于6岁 身份证非必填
      return this.age != null && this.age < this.ageLimit ? false : true
    },
    canSubmit() {
      let result = false
      //修改民族不用判断-直接通过
      if (this.isEdit && !this.isNationExist) {
        return true
      }
      if (this.needIdCard) {
        if (this.model.name && this.model.idcard && this.model.relation && this.model.sex && this.model.birthday && peace.validate.idCard(this.model.idcard)) {
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
          this.getAgeByIdCard(this.model.guardianIdCard) >= 18 &&
          ((this.model.idcard && peace.validate.idCard(this.model.idcard)) || this.model.idcard == '')
        ) {
          result = true
        } else {
          result = false
        }
      }

      return result
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
  beforeRouteLeave(to, from, next) {
    if (this.addGardian) {
      for (let i in this.childInfo) {
        this.model[i] = this.childInfo[i]
      }
      this.gDialog.visible = true
      this.addGardian = false
      next(false)
    } else {
      next(true)
    }
  },
  mounted() {
    let json = peace.util.decode(this.$route.params.json)
    this.params = json
    if (json.type == 'add' || json.type == 'addGuardian') {
      this.from = json.type
      // 添加页面 只需加载民族列表
      this.getNationList()
    } else {
      this.getFamilyInfo()
    }
    if (json.canShowSelf) {
      this.canShowSelf = json.canShowSelf == 1 ? true : false
    }
    if (json.hasGuardian) {
      this.hasGuardian = json.hasGuardian
    }
    this.getOrganizationTelephone()
  },

  methods: {
    updateModel(result) {
      this.model = Object.assign({}, this.model, result.model)

      this.gardianName = this.model.guardianName
      this.gardianId = this.model.guardianIdCard
    },
    getOrganizationTelephone() {
      const params = {
        hosoitalId: peace.cache.get(peace.type.SYSTEM.NETHOSPITALID) || ''
      }
      peace.service.hospital.getOrganizationTelephone(params).then((res) => {
        this.serviceTel = res.data.serviceTel
      })
    },

    checkIdCardAgain() {
      if (!this.idcardDialog.model.idcard) {
        this.idcardDialog.error.idcard = '身份证号不能为空'
        return false
      } else {
        if (!peace.validate.idCard(this.idcardDialog.model.idcard)) {
          this.idcardDialog.error.idcard = '身份证号不正确'
          return false
        } else {
          this.idcardDialog.error.idcard = ''
          return true
        }
      }
    },
    checkIdCard() {
      if (!this.model.idcard) {
        this.error.idcard = '身份证号不能为空'
      } else {
        if (!peace.validate.idCard(this.model.idcard)) {
          this.error.idcard = '身份证号不正确'
        } else {
          let gardianAge = this.getAgeByIdCard(this.model.idcard)
          if ((this.from == 'addGuardian' || this.addGardian) && gardianAge < 18) {
            this.error.idcard = '监护人年龄不能小于18岁'
          } else {
            this.error.idcard = ''
          }
        }
      }
    },

    updataInfo() {
      this.showUpdateInfo = true
      this.currentYibaoCard = {}
    },
    onSuccess(result) {
      if (result) {
        const params = { id: this.familyId, source: 2 }
        this.getFamilyInfo(params)
      }
    },
    addYiBaoCard() {
      this.showCard = true
    },
    updateYiBaoCard(item) {
      this.showCard = true
      this.currentYibaoCard = item
    },
    delYibaoCard(id) {
      Dialog.confirm({
        title: '温馨提示',
        message: '是否家人删除医保卡信息'
      }).then(() => {
        const params = { id }
        peace.service.yibao.DelMedicareCard(params).then(() => {
          this.getMedicareCardList()
          this.currentYibaoCard = {}
        })
      })
    },
    getMedicareCardList() {
      return new Promise((resolve) => {
        const params = {
          familyId: this.familyId,
          region: '天津'
        }
        peace.service.yibao
          .GetMedicareCardList(params)
          .then((res) => {
            this.yibaoCardList = res.data.list
          })
          .finally(() => {
            resolve(true)
          })
      })
    },
    getFamilyInfo(params) {
      if (!params?.id) {
        params = peace.util.decode(this.$route.params.json)
      }

      peace.service.patient.getFamilyInfo(params).then((res) => {
        this.model = res.data
        this.familyId = res.data.id
        if (this.model) {
          this.isNationExist = this.model.nationCode && this.model.nationName
          this.cardName = this.model.name
          this.getNationList()
          Promise.all([this.getCardList(), this.getMedicareCardList()]).then(() => {
            this.loading = true
          })
        }
      })
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
    goToGardian() {
      if (!this.addGardian) {
        this.childInfo = Object.assign({}, this.model)
      }
      this.gDialog.visible = true
    },
    getCardList() {
      return new Promise((resolve) => {
        if (this.model.isExistCard) {
          let familyId = this.model.id
          let params = { familyId }
          peace.service.patient
            .getCardList(params)
            .then((res) => {
              this.cardList = res.data.list
            })
            .finally(() => {
              resolve(true)
            })
        } else {
          resolve(true)
        }
      })
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
    goToDetail(item) {
      let { backgroundCode } = item
      let familyId = this.model.id
      const json = peace.util.encode({
        familyId,
        backgroundCode
      })
      this.$router.push(`/setting/cardDetail/${json}`)
    },

    setNations(val) {
      let code = this.getNationCodeByName(val)
      this.editModel.nationCode = code
      this.editModel.nationName = val
      this.closeAllPopup()
    },

    showPopupNations() {
      this.showNations = true
    },
    // 关闭所有弹出层
    closeAllPopup() {
      this.showNations = false
    },

    // 保存
    async submit() {
      if (!this.canSubmit) {
        return
      }

      if (this.hasClick) {
        return
      }
      this.hasClick = true
      if (this.isEdit) {
        if (this.isNationExist) {
          // 存在民族情况，此时为删除
          const params = {
            familyId: this.model.famialyId,
            allergic_history: this.model.allergic_history,
            foodAllergy: this.model.foodAllergy
          }
          peace.service.patient.upbindFamily(params).then((res) => {
            peace.util.alert(res.msg)
            this.$emit('onComplete')
          })
        } else {
          // 没有民族情况，则开始完善资料。
          this.perfectInfo()
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
      let params = this.model
      params.type = 1
      params.nethospitalid = peace.cache.get($peace.type.SYSTEM.NETHOSPITALID)
      params.source = params.nethospitalid && params.nethospitalid != '' ? 2 : 1
      if (this.gardianId != '') {
        params.guardianName = this.gardianName
        params.guardianIdCard = this.gardianId
      }

      peace.service.patient
        .bindFamily(params)
        .then((res) => {
          const params = peace.util.decode(this.$route.params.json)
          if (this.from == 'addGuardian') {
            const info = {
              name: this.model.name,
              idCard: this.model.idcard
            }
            this.bindFamilyGuardian(info)
          } else {
            if (this.addGardian) {
              this.gardianName = this.model.name
              this.gardianId = this.model.idcard
              for (let i in this.childInfo) {
                this.model[i] = this.childInfo[i]
              }
              this.gDialog.visible = false
              this.addGardian = false
              this.gardianSet = true
            } else {
              peace.util.alert(res.msg)
              //新增家人后断连接IM
              peace.service.IM.initNIMS({ type: 'add', ...res.data })
              this.familyId = res.data.accid
              if (params.emit) {
                $peace.$emit(params.emit, { res, status: true, success: true, familyInfo: { familyId: res.data.accid, name: this.model.name } })
                this.$router.go(-1)
              } else {
                this.getFamilyInfo({ id: res.data.accid, source: 2 })
                this.from = ''
                this.idcardDialog.visible = false
              }
            }
          }
        })
        .finally(() => {
          this.hasClick = false
        })
    },
    bindFamilyGuardian(info) {
      const param = {
        guardianName: info.name,
        guardianIdCard: info.idCard,
        familyId: this.params.childrenId
      }
      peace.service.patient
        .bindFamilyGuardian(param)
        .then((res) => {
          peace.util.alert(res.msg)
          if (this.params.emit) {
            $peace.$emit(this.params.emit, res)
            this.$router.go(-2)
          }
        })
        .catch((err) => {
          peace.util.alert(err.data.msg)
        })
    },
    perfectInfo() {
      let familyId = this.model.id
      let nationCode = this.editModel.nationCode
      let nationName = this.editModel.nationName
      let params = { familyId, nationCode, nationName }
      peace.service.patient
        .perfectInfo(params)
        .then((res) => {
          peace.util.alert(res.msg)
          this.model.nationCode = this.editModel.nationCode
          this.model.nationName = this.editModel.nationName
          this.showUpdateInfo = false
        })
        .finally(() => {
          //完善家人信息后刷新
          this.getFamilyInfo({ id: this.model.id, source: 2 })
          this.hasClick = false
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

        peace.service.patient.DelFamily(params).then((res) => {
          peace.util.alert(res.msg)
          //删除家人后断联该家人IM
          peace.service.IM.initNIMS({ type: 'delete', accid: this.model.id })
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
  width: 100%;
  min-height: 100%;
  padding-top: 10px;
  .id-card-container {
    width: 343px;
    margin: 0 auto 0;
    border-radius: 4px;
    background-color: rgb(245, 245, 245);
    overflow: hidden;
  }
  .id-card {
    display: flex;
    height: 160px;
    align-items: center;
    padding: 20px;
    position: relative;
    .edit {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: rgba(0, 198, 174, 0.06);
      position: absolute;
      right: 10px;
      top: 10px;
      border-radius: 50%;
      .van-icon {
        font-size: 15px;
      }
    }
    .id-card-logo {
      width: 105px;
      height: 99px;
      margin-right: 20px;
    }
    .id-card-content-item {
      display: flex;
      align-items: center;
      font-size: 13px;
      padding-bottom: 10px;
      .key {
        width: 4.3em;
        display: flex;
        align-items: center;
        height: 13px;
        line-height: 13px;
        span {
          line-height: 13px;
          height: 13px;
          width: 3.4em;
          text-align: justify;
          text-align-last: justify;
          display: inline-block;
          margin-right: 0.2em;
          &::after {
            content: '';
            display: inline-block;
            width: 100%;
            height: 0px;
          }
        }
      }
      .value {
        color: #666;
        line-height: 13px;
        height: 13px;
      }
    }
  }
  .id-gardian {
    border-top: 1px dashed rgba(0, 0, 0, 0.2);
    padding: 0 16px;
    height: 44px;
    display: flex;
    align-items: center;
    span {
      color: #999;
      &:last-child {
        color: #666;
      }
    }
  }
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
    background: url('~@src/assets/images/card-icon.png') no-repeat;
    background-size: 25px 20px;
    background-position: 15px 15px;
    padding-left: 55px;
  }
  .card-title.yiyao {
    background: url('~@src/assets/images/ic_yibao_icon.png') no-repeat;
    background-size: 25px 20px;
    background-position: 15px 15px;
    padding-left: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
    span {
      text-align: right;
      color: $primary;
      font-weight: normal;
    }
  }
  .yiyao-card {
    width: 343px;
    height: 94px;
    margin: 0 auto 10px;
    background: url('~@src/assets/images/ic_yibao_bg.png') no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #fff;
    position: relative;
    .delete {
      position: absolute;
      width: 27px;
      height: 27px;
      padding: 6px;

      right: 6px;
      top: 6px;
      .van-icon {
        font-size: 15px;
      }
    }
    .van-image {
      width: 56px;
      height: 40px;
      margin-right: 10px;
    }
    .name {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 2px;
    }
  }
  .parent {
    .van-cell__title {
      flex: auto !important;
    }
  }
  .jz-card-title {
    background: url('~@src/assets/images/huiyuanqia.png') no-repeat;
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
        background: url('~@src/assets/images/tubiao_huaban.png') no-repeat;
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
    background: url('~@src/assets/images/shangdong.png');
    background-size: 100% 100%;
    margin: 0 auto 0;
    &.no-card {
      background: url('~@src/assets/images/ic_empty_card.png');
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
    background: #fff;
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
  text-align: right;
  // &::placeholder {
  //   color: #ccc;
  // }
}
::v-deep.form-for-family .require .van-cell__title > span::after {
  content: '*';
  width: 5px;
  color: #f00;
  font-size: 14px;
  margin-left: 3px;
  vertical-align: middle;
  display: inline-block;
}

.popup-info {
  padding: 50px 16px 10px;
  ::v-deep.van-cell {
    padding-left: 0;
    padding-right: 0;
    &::after {
      left: 0;
      right: 0;
    }
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
    font-weight: bold;
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
