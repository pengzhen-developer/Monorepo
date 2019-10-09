<template>
  <div class="doctor-inquiry-apply">
    <div class="content">
      <div class="title">
        <div class="title-avatar">
          <img :src="doctor.doctorInfo.avartor" />
        </div>

        <div class="title-info">
          <div class="title-doctor">
            <span class="title-doctor-name">{{ doctor.doctorInfo.name }}</span>
            <span>{{ doctor.doctorInfo.doctorTitle }}</span>
            <span>{{ doctor.doctorInfo.deptName }}</span>
          </div>
          <div class="title-hospital">
            <span>{{ doctor.doctorInfo.hospitalName }}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <van-cell-group>
        <van-field :value="model.familyName"
                   @click="checkFamily"
                   clickable
                   label="就诊人"
                   placeholder="请选择就诊人"
                   readonly
                   required
                   right-icon="arrow" />
        <van-popup position="bottom"
                   v-model.trim="showFamily">
          <van-picker :columns="source.familyList"
                      @cancel="showFamily = false"
                      @confirm="selectFamily"
                      show-toolbar
                      value-key="name" />
        </van-popup>
      </van-cell-group>

      <van-cell-group>
        <van-field autosize
                   label="病情描述"
                   maxlength="255"
                   placeholder="请输入病情描述，如发病时间、主要病症、治疗经过、目前状况等，最少输入5字。"
                   required
                   rows="5"
                   type="textarea"
                   v-model.trim="model.illnessDescribe" />
      </van-cell-group>

      <van-cell-group>
        <van-field label="附件上传">
          <van-uploader :after-read="afterRead"
                        :max-count="4"
                        multiple
                        slot="input"
                        v-model.trim="attachment" />
        </van-field>
      </van-cell-group>

      <van-cell-group>
        <van-field label="是否复诊">
          <van-switch active-color="#00c6ae"
                      size="20px"
                      slot="right-icon"
                      v-model.trim="model.isAgain" />
        </van-field>
      </van-cell-group>

      <div v-show="model.isAgain">
        <div class="divider"></div>

        <van-cell-group>
          <van-field :value="model.confirmIllness"
                     @click="showAddIllnessHistory = true"
                     clickable
                     label="初诊诊断"
                     placeholder="请选择诊断"
                     readonly
                     required
                     right-icon="arrow" />

          <peace-dialog :visible.sync="showAddIllnessHistory">
            <AddIllnessHistory @onSave="showAddIllnessHistory = false"
                               v-model.trim="model.confirmIllness"></AddIllnessHistory>
          </peace-dialog>
        </van-cell-group>

        <van-cell-group>
          <van-field :value="model.confirmTime"
                     @click="showConfirmTime = true"
                     clickable
                     label="初诊时间"
                     placeholder="请选择初诊时间"
                     readonly
                     required
                     right-icon="arrow" />
          <van-popup position="bottom"
                     v-model.trim="showConfirmTime">
            <van-datetime-picker :max-date="new Date()"
                                 :value="new Date()"
                                 @cancel="showConfirmTime = false"
                                 @confirm="selectConfirmTime"
                                 type="date" />
          </van-popup>
        </van-cell-group>

        <van-cell-group>
          <van-field autosize
                     label="既往用药"
                     placeholder="请输入既往用药"
                     required
                     rows="2"
                     type="textarea"
                     v-model.trim="model.pastDrug" />
        </van-cell-group>

        <van-cell-group>
          <van-field :value="model.allergicHistory"
                     @click="showAddAllergicHistory= true"
                     clickable
                     label="过敏史"
                     placeholder="请选择过敏史"
                     readonly
                     required
                     right-icon="arrow" />

          <peace-dialog :visible.sync="showAddAllergicHistory">
            <AddAllergicHistory @onSave="showAddAllergicHistory = false"
                                v-model.trim="model.allergicHistory"></AddAllergicHistory>
          </peace-dialog>
        </van-cell-group>

        <van-cell-group v-show="showPregnancy">
          <van-field label="是否怀孕"
                     required>
            <van-radio-group slot="right-icon"
                             style="display: inline-flex;"
                             v-model.trim="model.isPregnancy">
              <van-radio :name="true"
                         style="margin: 0 10px 0 0;">是</van-radio>
              <van-radio :name="false"
                         style="margin: 0;">否</van-radio>
            </van-radio-group>
          </van-field>
        </van-cell-group>

        <van-cell-group>
          <van-field label="是否不良反应"
                     required>
            <van-radio-group slot="right-icon"
                             style="display: inline-flex;"
                             v-model.trim="model.isBadEffect">
              <van-radio :name="true"
                         style="margin: 0 10px 0 0;">是</van-radio>
              <van-radio :name="false"
                         style="margin: 0;">否</van-radio>
            </van-radio-group>
            <!-- <van-switch active-color="#00c6ae" size="20px" slot="right-icon" v-model.trim="model.isBadEffect" /> -->
          </van-field>
          <van-field placeholder="请输入不良反应"
                     required
                     v-if="model.isBadEffect"
                     v-model.trim="model.isBadEffectText" />
        </van-cell-group>

        <van-cell-group>
          <van-field label="本次复诊情况"
                     required>
            <van-radio-group slot="right-icon"
                             v-model.trim="model.againType">
              <van-radio name="1">本院同医生复诊</van-radio>
              <van-radio name="2">本院非同医生复诊</van-radio>
              <van-radio name="3">非本院复诊</van-radio>
            </van-radio-group>
          </van-field>
        </van-cell-group>
      </div>
    </div>

    <div class="footer">
      <van-checkbox v-model.trim="model.informedConsent">
        <span>我已阅读并同意</span>
        <a @click.stop="showInformedConsent = true"
           class="informed-consent">《知情同意书》</a>
      </van-checkbox>

      <van-button :disabled="!model.informedConsent || sending"
                  @click="apply"
                  style="width: 100%;"
                  type="primary">提交</van-button>
      <!--      <van-button @click="applyOrder" style="width: 100%;" type="primary">提交订单 - 跳转支付</van-button>-->
    </div>

    <peace-dialog :visible.sync="showInformedConsent">
      <InformedConsent></InformedConsent>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import AddAllergicHistory from '@src/views/components/AddAllergicHistory'
import AddIllnessHistory from '@src/views/components/AddIllnessHistory'
import InformedConsent from '@src/views/components/InformedConsent'

import Vue from 'vue'
import { Dialog } from 'vant'
Vue.use(Dialog)

export default {
  components: {
    AddAllergicHistory,
    AddIllnessHistory,
    InformedConsent
  },

  data() {
    return {
      sending: false,

      // 显示确认疾病
      showAddAllergicHistory: false,
      // 显示过敏史
      showAddIllnessHistory: false,
      // 显示知情同意书
      showInformedConsent: false,
      // 显示是否怀孕
      showPregnancy: true,

      // 显示家人弹框
      showFamily: false,
      // 显示确认时间弹框
      showConfirmTime: false,
      // 附件列表
      attachment: [],

      // 医生信息
      doctor: {
        doctorInfo: {}
      },

      model: {
        // 医生 (医生 ID)
        doctorId: '',
        // 就诊人 (家人 ID)
        familyName: '',
        familyId: '',
        // 问诊类型
        consultingType: 'image',
        // 问诊类型
        consultingTypeId: '',
        // 病情描述
        illnessDescribe: '',
        // 附件
        attachment: [],
        // 是否复诊
        isAgain: true,
        // 确认疾病(既往史)
        confirmIllness: '',
        // 确认时间
        confirmTime: '',
        // 既往用药
        pastDrug: '',
        // 过敏史
        allergicHistory: '',
        // 是否怀孕
        isPregnancy: undefined,
        // 是否不良反应
        isBadEffect: undefined,
        isBadEffectText: '',
        // 本次复诊情况
        againType: '3',
        // 知情同意
        informedConsent: false
      },

      source: {
        familyList: [],

        confirmIllness: [],
        pastDrug: [],
        allergicHistory: []
      }
    }
  },

  watch: {
    'model.isAgain'() {
      if (this.model.isAgain === false) {
        // this.model.confirmIllness = ''
        // this.model.confirmTime = ''
        // this.model.pastDrug = ''
        // this.model.allergicHistory = ''
        // this.model.isPregnancy = false
        // this.model.isBadEffect = false
        // this.model.isBadEffectText = ''
        // this.model.againType = '3'
      }
    }
  },

  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.model.doctorId = params.doctorId
    this.model.consultingType = params.consultingType
    this.model.consultingTypeId = params.consultingTypeId

    peace.service.doctor.getDoctorInfo(params).then(res => {
      this.doctor = res.data
    })

    peace.service.patient.getMyFamilyList().then(familyList => {
      this.source.familyList = familyList.data

      if (familyList.length !== 0) {
        peace.service.patient.getLast({ doctorId: params.doctorId }).then(lastFamily => {
          // 1. 优先选中最后一个就诊人
          // 2. 其次选中关系为本人
          // 3. 最后选中家人列表的第一个就诊人

          let family = undefined

          if (!family) {
            family = this.source.familyList.find(item => item.id === lastFamily.data.familyId)
          }

          if (!family) {
            family = this.source.familyList.find(item => item.relation === '本人')
          }

          if (!family) {
            family = this.source.familyList.find(
              item => item.familyId === this.source.familyList[0].id
            )
          }

          if (family) {
            this.model.familyName = family.name
            this.model.familyId = family.familyId
            this.model.allergicHistory = family.allergicHistory

            // 判断否能显示是否怀孕
            if (family.sex === '女' && family.age >= 14) {
              this.showPregnancy = true
            } else {
              this.showPregnancy = false
            }
          }
        })
      }

      this.source.familyList.push({ id: undefined, name: '添加就诊人' })
    })
  },

  methods: {
    redirect() {
      this.$router.push({
        name: '/components/informedConsent',
        params: {
          keepAlive: false
        }
      })
    },

    afterRead(file) {
      console.log(file)
    },

    selectFamily(familyObject) {
      this.showFamily = false

      if (familyObject.id === undefined && familyObject.name === '添加就诊人') {
        this.$router.push({
          name: '/setting/myFamilyMembers',
          params: {
            back: true,
            addFamily: true
          }
        })
      } else {
        this.model.familyName = familyObject.name
        this.model.familyId = familyObject.id
        this.model.allergicHistory = familyObject.allergicHistory

        // 判断否能显示是否怀孕
        if (familyObject.sex === '女' && familyObject.age >= 14) {
          this.showPregnancy = true
        } else {
          this.showPregnancy = false
          this.model.isPregnancy = ''
        }
      }
    },

    selectConfirmTime(value) {
      this.showConfirmTime = false
      this.model.confirmTime = value.formatDate()
    },

    showIllnessHistory() {
      this.showAddIllnessHistory = true
    },

    showAllergicHistory() {
      this.showAddAllergicHistory = true
    },

    checkFamily() {
      if (this.source.familyList && this.source.familyList.length > 1) {
        this.showFamily = true
      } else {
        this.$router.push({
          name: '/setting/myFamilyMembers',
          params: {
            back: true,
            addFamily: true
          }
        })
      }
    },

    apply() {
      //验证
      if (!this.model.familyName) {
        return peace.util.alert('请选择就诊人')
      }
      if (!(this.model.illnessDescribe && this.model.illnessDescribe.length >= 5)) {
        return peace.util.alert('请输入不少于5个字的病情描述')
      }

      //复诊必填验证
      if (this.model.isAgain) {
        if (!this.model.confirmIllness) {
          return peace.util.alert('请选择初诊诊断')
        }
        if (!this.model.confirmTime) {
          return peace.util.alert('请选择初诊时间')
        }
        if (!this.model.pastDrug) {
          return peace.util.alert('请输入既往用药')
        }
        if (!this.model.allergicHistory) {
          return peace.util.alert('请选择过敏史')
        }
        if (this.model.isBadEffect && !this.model.isBadEffectText) {
          return peace.util.alert('请输入不良反应')
        }
        if (this.model.againType === 0) {
          return peace.util.alert('请选择本次复诊情况')
        }
      }

      this.uploadHandler().then(() => {
        this.applyHandler()
      })
    },
    goToPay(data) {
      let { doctorId, orderNo, orderMoney, inquiryType, doctorName } = data
      let typeName = inquiryType == 'image' ? '图文问诊' : ''
      let money = orderMoney
      let json = { money, typeName, doctorName, orderNo, doctorId }
      json = peace.util.encode(json)
      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },
    applyOrder(data) {
      const json = peace.util.encode({
        inquiryId: data.inquiryId,
        orderNo: data.orderNo,
        money: data.orderMoney,
        doctorName: this.doctor.doctorInfo.name,
        type: 0, // 支付类型
        typeName: '图文咨询'
      })

      this.$router.push(`/components/doctorInquiryPay/${json}`)
    },

    uploadHandler() {
      if (this.attachment.length > 0) {
        const params = new FormData()

        for (var i = 0; i < this.attachment.length; i++) {
          params.append('file[]', this.attachment[i].file)
        }
        params.append('source', 'inquiryApply')

        return peace.service.inquiry.images(params).then(res => {
          this.model.attachment = res.data
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    },

    applyHandler() {
      this.sending = true
      const params = this.model
      peace.service.inquiry.apply(params).then(res => {
        this.sending = false
        // 订单提交成功
        if (res.data.errorState === 0) {
          // 待支付状态
          if (res.data.inquiryStatus === 1) {
            this.goToPay(res.data)
            return
          } else {
            //免费问诊
            // 延迟1000ms， 跳转消息页， 最大限度确认消息通知已推送
            setTimeout(() => {
              this.$router.push({
                name: '/message/index',
                params: {
                  sessionId: 'p2p-' + this.model.doctorId
                }
              })
            }, 1000)
            return peace.util.alert(res.msg)
          }
        }
        // 订单提交失败 [errorState:1存在未支付订单 2存在未结束订单]
        if (res.data.errorState === 1) {
          return Dialog.confirm({
            title: '提示',
            message: res.msg,
            confirmButtonText: '去看看'
          }).then(() => {
            // 前往咨询订单详情页
            //console.log(res.data.inquiryId);
            // const json = peace.util.encode({
            //   inquiryId: res.data.inquiryId
            // })
            let inquiryId = res.data.inquiryId

            this.$router.push({ path: `/setting/userConsultList`, query: { inquiryId } })
          })
        }
        if (res.data.errorState === 2) {
          return Dialog.confirm({
            title: '提示',
            message: res.msg,
            confirmButtonText: '继续咨询'
          })
            .then(() => {
              // 延迟1000ms， 跳转消息页， 最大限度确认消息通知已推送
              setTimeout(() => {
                this.$router.push({
                  name: '/message/index',
                  params: {
                    sessionId: 'p2p-' + this.model.doctorId
                  }
                })
              }, 1000)
            })
            .catch(() => {
              // on cancel
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-inquiry-apply {
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    overflow: auto;

    .title {
      background: #fff;
      display: flex;
      align-items: center;
      height: 80px;
      padding: 0 20px;

      .title-avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(241, 248, 255, 1);
          border: 1px solid rgba(221, 225, 234, 1);
        }
      }

      .title-info {
        margin: 0 0 0 20px;

        .title-doctor {
          color: #000000;
          margin: 0 0 5px 0;

          .title-doctor-name {
            font-size: 18px;
            font-weight: 600;
          }

          span {
            margin: 0 10px 0 0;
          }
        }

        .title-hospital {
          margin: 0 0 5px 0;
          color: #000000;
        }
      }
    }

    /deep/ .van-uploader__upload,
    /deep/ .van-uploader__preview-image {
      width: 50px;
      height: 50px;
    }

    /deep/ .van-radio {
      margin: 0 0 10px 0;
    }

    .divider {
      height: 10px;
      background: #f5f5f5;
    }
  }

  .footer {
    height: 100px;
    text-align: center;
    background: #f5f5f5;
    padding: 20px 10px;

    .informed-consent {
      color: $-color--primary;
    }

    .van-checkbox {
      margin: 0 0 10px 0;
      justify-content: center;
    }
  }
}
</style>
