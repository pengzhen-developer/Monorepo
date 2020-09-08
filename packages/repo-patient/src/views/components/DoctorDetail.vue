<template>
  <div class="doctor-detail">
    <template v-if="!isLoading">
      <div class="header">
        <div class="header-left">
          <van-image round
                     width="50px"
                     height="50px"
                     cover
                     :src="doctor.doctorInfo.avartor" />
          <span class="name">{{ doctor.doctorInfo.name }}</span>
          <span class="level">{{ doctor.doctorInfo.doctorTitle }}</span>
          <div class="tag-work tag-online"
               v-if="doctor.doctorInfo.workStatus==1">接诊中</div>
          <div class="tag-work tag-outline"
               v-else-if="doctor.doctorInfo.workStatus==2">休息中</div>
        </div>

        <div class="header-right">
          <van-button v-if="doctor.doctorInfo.attentionStatus==1"
                      class="star"
                      round
                      size="small"
                      disabled
                      style="font-weight: bold;">已关注</van-button>

          <van-button v-else
                      @click="shareDoctor(doctor.doctorInfo)"
                      class="star"
                      round
                      :icon="require('@src/assets/images/ic_follow.png')"
                      size="small"
                      style="font-weight: bold;">关注</van-button>
        </div>
      </div>

      <div class="body">
        <!-- 所属机构 -->
        <div class="body-card">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/file/ic_mechanism.png')" />
            <h4 class="body-card-title">所属机构</h4>
          </div>

          <div class="row flex between">
            <div>
              <span class="hospital">{{ doctor.doctorInfo.hospitalName }}</span>
              <span class="deparment">{{ doctor.doctorInfo.deptName }}</span>
            </div>
            <div>
              <van-icon name="arrow"
                        @click="goMap(doctor.doctorInfo)" />
            </div>
          </div>

          <van-divider />

          <div class="row">
            <div class="row flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_be good at.png')" />
              <h4 class="body-card-title">专业擅长</h4>
            </div>
            <div class="body-card-description"
                 :class="{ fold: fold, unfold: !fold }"
                 v-html="doctor.doctorInfo.specialSkill || '暂未填写'"></div>
          </div>

          <div class="row"
               v-show="!fold">
            <van-divider />

            <div class="row flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_brief introduction.png')" />
              <h4 class="body-card-title">医生简介</h4>
            </div>

            <div class="body-card-description"
                 :class="{ fold: fold, unfold: !fold }"
                 v-html="doctor.doctorInfo.summary || '暂未填写'"></div>
          </div>

          <div class="row flex center">
            <div class="more">
              <div @click="showMore"
                   v-if="fold"
                   class="row flex center">
                <span style="margin: 0 4px 0 0;">查看更多</span>
                <van-image round
                           width="13px"
                           height="13px"
                           :src="require('@src/assets/images/ic_more.png')"></van-image>
              </div>
              <div @click="showMore"
                   v-if="!fold"
                   class="row flex center">
                <span style="margin: 0 4px 0 0;">收起</span>
                <van-image round
                           width="13px"
                           height="13px"
                           style="transform: rotate(180deg)"
                           :src="require('@src/assets/images/ic_more.png')"></van-image>
              </div>
            </div>
          </div>
        </div>

        <!-- 问诊服务 -->
        <div class="body-card">
          <div class="row flex column">
            <div class="row flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_interrogation.png')" />
              <h4 class="body-card-title">在线咨询</h4>
            </div>
            <div class="row body-card-tip">
              医生提供图文或视频健康指导，不进行医学判断
            </div>
          </div>
          <div class="row flex col-two ">
            <!-- 图文咨询  @click="goApply(serviceImageInfo, 'image')"-->
            <div class=" row flex column center"
                 @click="showDialog(serviceImageInfo, 'image')">
              <van-image width="27px"
                         height="27px"
                         v-if="serviceImageInfo.status=='1'"
                         style="margin: 0 10px 0 0;"
                         :src="require('@src/assets/images/ic_tuwen_open.png')"></van-image>
              <van-image width="27px"
                         height="27px"
                         v-else
                         style="margin: 0 10px 0 0;"
                         :src="require('@src/assets/images/ic_tuwen.png')"></van-image>

              <div class="service-consult-content auto">
                <div class="row flex column"
                     style="margin: 0;">
                  <span class="service-consult-content-name">图文咨询</span>
                  <span v-if="serviceImageInfo.status=='1'">
                    <span class="service-consult-content-fee">
                      <span class="service-consult-content-fee-sub">￥</span>{{ serviceImageInfo.price }}
                    </span>
                    <span class="service-consult-content-unit"> / 次</span>
                  </span>
                  <span v-else
                        style="line-height: 24px;"
                        class="service-consult-content-description">
                    暂未开通
                  </span>
                </div>
              </div>
            </div>

            <!-- 视频咨询 @click="goApply(serviceVideoInfo, 'video')"-->
            <div class=" row flex column center"
                 @click="showDialog(serviceImageInfo, 'video')">
              <!-- 视频咨询尚未开通 -->
              <van-image round
                         width="27px"
                         height="27px"
                         v-if="serviceVideoInfo.status=='1'"
                         style="margin: 0 10px 0 0;"
                         :src="require('@src/assets/images/ic_video_open.png')"></van-image>
              <van-image round
                         width="27px"
                         height="27px"
                         v-else
                         style="margin: 0 10px 0 0;"
                         :src="require('@src/assets/images/ic_video.png')"></van-image>

              <div class="service-consult-content auto">
                <div class="row flex column"
                     style="margin: 0;">
                  <span class="service-consult-content-name">视频咨询</span>
                  <span v-if="serviceVideoInfo.status=='1'">
                    <span class="service-consult-content-fee">
                      <span class="service-consult-content-fee-sub">￥</span>{{ serviceVideoInfo.price }}
                    </span>
                    <span class="service-consult-content-unit"> / 次</span>
                  </span>
                  <span v-else
                        class="service-consult-content-description">
                    暂未开通
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 复诊续方 -->
        <div class="body-card"
             v-if="returnVisitList.length>0">
          <div class="row flex column">
            <div class="row flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_consultation.png')" />
              <h4 class="body-card-title">复诊续方</h4>
              <div class=" flex flex-1 end"
                   @click="gotoAppointPage">
                <span class="see-more">查看更多</span>
                <van-image width="13px"
                           height="13px"
                           :src="require('@src/assets/images/ic_more_right.png')" />
              </div>
            </div>
            <div class="row body-card-tip">
              可以在线开具处方、开药、开检查化验
            </div>
          </div>
          <div class="row flex fz-card-list">
            <div class="fz-card flex column row"
                 v-for="(item,index) in returnVisitList"
                 :key='index'>
              <div class="fz-card-time">{{item.timeSharing}} {{item.AMPM == "AM" ? "上午" : "下午"}}</div>
              <div class="fz-card-tag">{{item.sourceLevelType == 1 ? "普通门诊" : "专家门诊"}}</div>
              <div class="flex between"
                   style="width:100%;">
                <div class="fz-card-price">￥{{Number(item.unitPrice).toFixed(2)}}</div>
                <van-button round
                            @click.stop="showDialog(item,'returnVisit')"
                            size="small"
                            type="primary">预约</van-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 挂号服务 -->
        <div class="body-card"
             v-if="doctor.registerData&&doctor.registerData.length > 0">
          <div class="row flex between">
            <div class="row flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_register.png')" />
              <h4 class="body-card-title">挂号服务</h4>
            </div>
            <div>
              <van-icon name="arrow"
                        @click="goRegisterList" />
            </div>
          </div>

          <div class="service row flex"
               v-for="(registerItem, index) in doctor.registerData"
               :key="index">
            <div class="service-consult-content">
              <div class="row flex"
                   style="margin: 0 0 4px 0;">
                <span class="service-consult-content-name">
                  {{ registerItem.timeSharing }}
                  {{ registerItem.AMPM == "AM" ? "上午" : "下午" }}
                </span>
                <van-tag style="margin: 0 12px; font-size: 12px;"
                         color="#f1f1f1"
                         text-color="#999999">
                  {{ index === 0 ? "号源一" : index === 1 ? "号源二" : "" }}
                </van-tag>
              </div>
              <div>
                <span>
                  <span class="service-consult-content-description"
                        style="font-size: 13px; margin: 0 10px 0 0;">{{
                    registerItem.sourceLevelType == 1 ? "普通门诊" : "专家号"
                  }}</span>
                  <span class="service-consult-content-fee"
                        style="font-size: 13px;">￥{{ registerItem.unitPrice }}</span>
                </span>
              </div>
            </div>

            <van-button round
                        size="small"
                        type="primary"
                        @click="goRegisterDetail(registerItem)">预约</van-button>
          </div>
        </div>

        <!-- 健康服务 -->
        <!-- <div class="body-card"
           v-if="servicePrivateInfo.consultingTypeId"
           @click="goApply(servicePrivateInfo, 'private')">
        <div class="row flex">
          <div class="row flex">
            <van-image width="30px"
                       height="30px"
                       :src="require('@src/assets/images/ic_service.png')" />
            <h4 class="body-card-title">健康服务</h4>
          </div>
          <div>
          </div>
        </div>

        <div class="service row flex">
          <van-image round
                     width="30px"
                     height="30px"
                     style="margin: 0 10px 0 0;"
                     :src="require('@src/assets/images/file/ic_doctor.png')"></van-image>

          <div class="service-consult-content">
            <div class="row flex between"
                 style="margin: 0;">
              <span class="service-consult-content-name">私人医生</span>
              <span>
                <span class="service-consult-content-fee">
                  <span>￥</span>
                  {{ servicePrivateInfo.money }}
                </span>
                <span class="service-consult-content-unit">
                  <span>/</span>
                  {{ privateTimeType[servicePrivateInfo.type] }}
                </span>
              </span>
            </div>
            <div>
              <span class="service-consult-content-description">购买一定服务期，期限内可免费提供问诊</span>
            </div>
          </div>
        </div>
      </div> -->

        <!-- 医生排班 -->
        <div class="body-card"
             v-if="doctor.workOnLine || doctor.workUnderLine">
          <div class="row flex">
            <div class="row flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_scheduling.png')" />
              <h4 class="body-card-title">医生排班</h4>
            </div>
          </div>

          <van-tabs v-model="activeTab">
            <van-tab title="复诊续方时间">
              <table class="time-table">
                <thead>
                  <tr>
                    <th class="time-table-col border"></th>
                    <th class="time-table-col border">周一</th>
                    <th class="time-table-col border">周二</th>
                    <th class="time-table-col border">周三</th>
                    <th class="time-table-col border">周四</th>
                    <th class="time-table-col border">周五</th>
                    <th class="time-table-col border">周六</th>
                    <th class="time-table-col border">周日</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="time-table-col border">上午</td>
                    <td :key="item.id"
                        class="time-table-col border primary"
                        v-for="item in doctor.workOnLine[0].weekList">
                      <span v-if="item.status">
                        <van-icon name="success" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="time-table-col border">下午</td>
                    <td :key="item.id"
                        class="time-table-col border primary"
                        v-for="item in doctor.workOnLine[1].weekList">
                      <span v-if="item.status">
                        <van-icon name="success" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="time-table-col border">晚上</td>
                    <td :key="item.id"
                        class="time-table-col border primary"
                        v-for="item in doctor.workOnLine[2].weekList">
                      <span v-if="item.status">
                        <van-icon name="success" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </van-tab>
            <van-tab title="线下门诊时间">
              <table class="time-table">
                <thead>
                  <tr>
                    <th class="time-table-col border"></th>
                    <th class="time-table-col border">周一</th>
                    <th class="time-table-col border">周二</th>
                    <th class="time-table-col border">周三</th>
                    <th class="time-table-col border">周四</th>
                    <th class="time-table-col border">周五</th>
                    <th class="time-table-col border">周六</th>
                    <th class="time-table-col border">周日</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="time-table-col border">上午</td>
                    <td :key="item.id"
                        class="time-table-col border primary"
                        v-for="item in doctor.workUnderLine[0].weekList">
                      <span v-if="item.status">
                        <van-icon name="success" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="time-table-col border">下午</td>
                    <td :key="item.id"
                        class="time-table-col border primary"
                        v-for="item in doctor.workUnderLine[1].weekList">
                      <span v-if="item.status">
                        <van-icon name="success" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="time-table-col border">晚上</td>
                    <td :key="item.id"
                        class="time-table-col border primary"
                        v-for="item in doctor.workUnderLine[2].weekList">
                      <span v-if="item.status">
                        <van-icon name="success" />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </van-tab>
          </van-tabs>
        </div>

        <!-- 患者评价 -->
        <div class="body-card"
             v-if="common&&common.count>0">
          <div class=" flex between">
            <div class=" flex">
              <van-image width="30px"
                         height="30px"
                         :src="require('@src/assets/images/ic_evaluate.png')" />
              <h4 class="body-card-title">{{'患者评价('+common.count+')'}}</h4>
            </div>
            <!-- <div class=" flex"
               @click="common.count>0&&seeMoreComment()">
            <span class="see-more">查看详情</span>
            <van-image width="10.5px"
                       height="10.5px"
                       :src="require('@src/assets/images/ic_more_right.png')" />
          </div> -->
          </div>
          <div class="flex impress">
            <span class="primary">患者对我的主要印象：{{common.tags.join(' 、')}}</span>
          </div>
          <div class="flex commen"
               v-for="(item,index) in common.lists"
               :key="index">
            <van-image width="30px"
                       height="30px"
                       :src="item.iconHead" />
            <div class="main">
              <div class="flex between main-top">
                <div class="name">{{item.familyInfo.name}}</div>
                <van-rate v-model="item.starLevel"
                          readonly
                          size="10"
                          :icon="require('@src/assets/images/ic_star_active.png')"
                          :void-icon="require('@src/assets/images/ic_star.png')" />
              </div>
              <div class="main-middle color-666">
                {{item.content}}
              </div>
              <div class="main-time color-999">{{item.createdTime}}</div>
            </div>
          </div>

        </div>
      </div>
    </template>

    <!-- 就诊人信息 -->
    <template>
      <AddPatientMsg :doctor="doctor.doctorInfo"
                     :showFamily.sync="showFamily"
                     type='doctorDetail'
                     @changeFlag="changeFlag"></AddPatientMsg>
    </template>
    <!-- 医生账号禁用 -->
    <template v-if="!doctorStatus">
      <div class="none-page-doctor">
        <van-image width="75px"
                   height="75px"
                   class="none-image"
                   :src="require('@src/assets/images/ic_cry.png')"></van-image>
        <div class="none-text">医生暂时将不能为您提供服务</div>
      </div>
    </template>
    <!-- loading -->
    <template v-if="isLoading">
      <van-row type="flex"
               justify="center"
               style="height:100vh;">
      </van-row>

    </template>
    <!-- 咨询提示 ,复诊提示-->
    <div class="shadow"
         v-if="dialog.visible"
         @click="closeDialog"></div>
    <div class="dialog"
         v-if="dialog.visible">
      <img :src="require('@src/assets/images/ic_cha.png')"
           @click="closeDialog">
      <div class="dialog-title">{{dialog.data.title}}</div>
      <div class="dialog-content">
        <template v-if="dialog.data.list&&dialog.data.list.length>0">
          <span v-for="(item,index) in dialog.data.list"
                :key="index">{{item}}</span>
        </template>
        <template v-else>
          {{dialog.data.content}}
        </template>
      </div>
      <div class="dialog-message"
           v-if="dialog.data.message"
           v-html="dialog.data.message"></div>
      <van-button round
                  size="large"
                  type="primary"
                  @click.stop="gotoInquiryApplyPage">{{dialog.data.btn}}</van-button>
    </div>
  </div>

</template>

<script>
import AddPatientMsg from '@src/views/components/AddPatientMsg'
import peace from '@src/library'
import Vue from 'vue'
import { Dialog, Rate } from 'vant'

Vue.use(Rate)
export default {
  components: { AddPatientMsg },
  data() {
    return {
      fold: true,
      doctorStatus: 1,
      activeTab: '',

      doctor: {
        doctorInfo: {},
        consultationList: {},
        registerData: []
      },

      serviceImageInfo: {},
      serviceVideoInfo: {},
      servicePrivateInfo: {},

      privateTimeType: {
        0: '次',
        1: '周',
        2: '月',
        3: '季',
        4: '半年',
        5: '年'
      },
      common: {},
      showFamily: false, //判断是否弹出弹框
      isEwm: 0,
      consult: {
        title: '温馨提示',
        list: [],
        content: '医生基于患者自述病情所发表的言论，仅作为健康咨询类建议，不能作为诊断、治疗、处方等诊疗性依据。若是急、重症患者，请务必及时前往医院就诊。',
        message: '咨询时间：<br>8:00 - 17:00请在对应时间段内咨询',
        btn: '确认'
      },
      subsequent: {
        title: '用户服务须知',
        list: [
          '急重症问题请您线下进行就医，以免耽误病情。',
          '全额预缴诊疗费用，医生接诊时进行结算，就诊日医生未接诊将全额退款。',
          '医生对复诊患者可开具检査检验，给出进一步诊疗建议，符合条件的患者可开具处方。',
          '急重症问题请您线下进行就医，以免耽误病情医生给出结论后手动结束复诊。',
          '药品配送到家，因药品为特殊商品，经发出不得退换。'
        ],
        content: '',
        message: '',
        btn: '同意'
      },
      dialog: {
        visible: false,
        data: undefined
      },
      returnVisitList: [],
      inquiryList: [],
      isLoading: true
    }
  },
  activated() {
    //登录之后返回医生主页，从缓存取分享标识isEWm
    if (peace.cache.get('isEwm')) {
      this.isEwm = peace.cache.get('isEwm')
    } else {
      //通过分享进入医生首页 获取分享标识isEwm字段并存在缓存中
      this.isEwm = peace.util.decode(this.$route.params.json).isEwm ? 1 : 0
      peace.cache.set('isEwm', this.isEwm)
    }
    this.getDoctorInfo()
    if (!this.hasLogin() && this.isEwm) {
      this.goLogin()
    }
    this.dialog.visible = false
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      if (peace.cache.get('isEwm') && from.fullPath.indexOf('login') != -1) {
        peace.cache.remove('isEwm')
      }
    })
  },

  methods: {
    hasLogin() {
      return peace.cache.get(peace.type.USER.INFO) == null ? false : true
    },
    goLogin() {
      peace.util.alert('为保障您的数据安全，请登录后使用。')
      this.$router.push({ path: '/login', query: { referrer: this.$route.fullPath } })
    },
    changeFlag(flag) {
      this.showFamily = !this.showFamily
      if (flag) {
        this.getWapDoctorInfo()
      }
    },
    //复诊续方查看更多
    gotoAppointPage() {
      let json = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid,
        time: this.doctor.doctorInfo.service.returnVisit[0].timeSharing.substring(5),
        date: new Date(),
        from: true
      })
      this.$router.push(`/appoint/doctor/appointDoctorSelect/${json}`)
    },
    closeDialog() {
      this.dialog.visible = false
    },

    showDialog(serviceInfo, type) {
      if (!this.hasLogin()) {
        this.goLogin()
        return
      }

      if (type === 'video') {
        return peace.util.alert('H5版本暂不支持视频问诊')
      }
      if (type === 'image' || type === 'video') {
        if (!serviceInfo.status) {
          return peace.util.alert('暂未开通')
        }
        this.dialog.data = Object.assign({}, this.consult, serviceInfo, { type: type })
        this.dialog.visible = true
      } else if (type === 'returnVisit') {
        this.dialog.data = Object.assign({}, this.subsequent, serviceInfo, { type: type })
        const params = {
          doctorId: this.doctor.doctorInfo.doctorId,
          timeSharing: this.dialog.data.timeSharing,
          sourceCode: this.dialog.data.sourceCode,
          bookingStart: this.dialog.data.startTime,
          bookingEnd: this.dialog.data.endTime
        }
        peace.service.inquiry
          .checkSource(params)
          .then(() => {
            this.dialog.visible = true
          })
          .catch((res) => {
            return Dialog.confirm({
              title: '温馨提示',
              message: res.data.msg,
              onfirmButtonText: '确定',
              showCancelButton: false
            }).finally(() => {
              this.getDoctorInfo('refuresh')
            })
          })
      }
    },

    gotoInquiryApplyPage() {
      // serviceType  服务类别（inquiry：在线咨询 returnVisit：复诊 ）
      //在线咨询
      if (this.dialog.data.type === 'image') {
        const json = peace.util.encode({
          doctorId: this.doctor.doctorInfo.doctorId,
          consultingType: this.dialog.data.type,
          serviceType: 'inquiry'
        })
        this.$router.push(`/components/doctorInquiryApply/${json}`)
      }
      // 视频问诊
      else if (this.dialog.data.type === 'video') {
        return peace.util.alert('H5版本暂不支持视频问诊')
      }
      //复诊咨询
      else if (this.dialog.data.type === 'returnVisit') {
        const json = peace.util.encode({
          doctorId: this.doctor.doctorInfo.doctorId,
          consultingType: 'returnVisit',
          serviceType: 'returnVisit',
          appointmentDate: this.dialog.data.timeSharing,
          appointmentStartTime: this.dialog.data.startTime,
          appointmentEndTime: this.dialog.data.endTime,
          sourceDisType: 0,
          sourceCode: this.dialog.data.sourceCode,
          sourceItemCode: this.dialog.data.sourceItemCode,
          price: this.dialog.data.unitPrice,
          AMPM: this.dialog.data.AMPM
        })
        this.$router.push(`/components/doctorInquiryApply/${json}`)
      }
    },
    //type refuresh 刷新 firstInit初次进入
    getDoctorInfo(type = 'firstInit') {
      if (type == 'firstInit') {
        this.isLoading = true
      }

      const params = peace.util.decode(this.$route.params.json)

      peace.service.doctor
        .getDoctorInfo(params)
        .then((res) => {
          this.doctorStatus = res.data.doctorInfo.doctorStatus

          if (res.data.doctorInfo.service) {
            this.returnVisitList = res.data.doctorInfo.service.returnVisit
            this.inquiryList = res.data.doctorInfo.service.inquiry
            this.inquiryList.forEach((item) => {
              if (item.type == 'image') {
                this.serviceImageInfo = item || {}
              } else if (item.type == 'video') {
                this.serviceVideoInfo = item || {}
              } else if (item.type == 'prvivateDoctor') {
                this.servicePrivateInfo = item || {}
              }
            })
          }

          let isAddPatient = res.data.doctorInfo.isAddPatient //是否添加就诊人

          if (this.hasLogin() && this.isEwm && !isAddPatient) {
            setTimeout(() => {
              this.showFamily = true
            }, 500)
          }
          this.doctor = res.data
          this.getCommentList()
          let obj = {
            url: '',
            title: this.doctor.doctorInfo.name + ' ' + this.doctor.doctorInfo.doctorTitle,
            desc: this.doctor.doctorInfo.specialSkill,
            imgUrl: this.doctor.doctorInfo.avartor
          }

          peace.wx.share.share(obj)
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    showMore() {
      this.fold = !this.fold
    },

    shareDoctor(doctorInfo) {
      const params = {
        doctorId: doctorInfo.doctorId,
        link: 3
      }

      peace.service.patient.attention(params).then(() => {
        doctorInfo.attentionStatus = true
      })
    },

    goMap(doctorInfo) {
      if (doctorInfo.address || (doctorInfo.latitude && doctorInfo.longitude)) {
        const json = peace.util.encode({
          name: doctorInfo.hospitalName,
          address: doctorInfo.address,
          latitude: doctorInfo.latitude,
          longitude: doctorInfo.longitude
        })

        this.$router.push(`/home/map/${json}`)
      }
    },

    goApply(serviceInfo, type) {
      if (!serviceInfo.status) {
        return peace.util.alert('暂未开通')
      }

      if (type === 'image') {
        const json = peace.util.encode({
          doctorId: this.doctor.doctorInfo.doctorId,
          consultingType: serviceInfo.tag,
          consultingTypeId: serviceInfo.consultingTypeId
        })
        this.$router.push(`/components/doctorInquiryApply/${json}`)
      }
      // 视频问诊
      else if (type === 'video') {
        return peace.util.alert('H5版本暂不支持视频问诊')
      }
      // 私人医生
      else if (type === 'private') {
        return peace.util.alert('暂未开放，敬请期待')
      }
    },

    goRegisterList() {
      const params = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid
      })

      this.$router.push(`/appoint/doctor/appointDoctorSelect/${params}`)
    },

    goRegisterDetail(item) {
      let timeSharing = item.timeSharing
      let timeArr = timeSharing.split('-')
      const params = peace.util.encode({
        doctorInfo: {
          ...item,
          nethospitalId: this.doctor.doctorInfo.nethospitalid,
          avatar: this.doctor.doctorInfo.avartor,
          name: this.doctor.doctorInfo.name,
          doctorTitle: this.doctor.doctorInfo.doctorTitle,
          deptName: this.doctor.doctorInfo.deptName,
          hospitalName: this.doctor.doctorInfo.hospitalName
        },
        date: {
          date: timeArr[1] + '-' + timeArr[2],
          year: timeArr[0],
          week: item.week
        },
        source: {
          endTime: item.endTime,
          isExpire: 0,
          number: 1,
          sourceCode: item.sourceCode,
          sourceLevelType: item.sourceLevelType,
          startTime: item.startTime,
          type: item.AMPM,
          unitPrice: item.unitPrice
        }
      })

      this.$router.push(`/appoint/order/appointOrderSubmit/${params}`)
    },

    getCommentList() {
      // , p: 1, size: 3
      peace.service.group.commentLists({ doctorId: this.doctor.doctorInfo.doctorId }).then((res) => {
        this.common = res.data
      })
    },
    seeMoreComment() {
      let json = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId
      })
      this.$router.push(`/components/CommentList/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.van-button--small {
  height: 26px;
  line-height: normal;
}
.none-page-doctor {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 666;
  display: flex;
  flex-direction: column;
  align-items: center;

  .none-image {
    margin-top: 150px;
    margin-bottom: 20px;
  }
  .none-text {
    color: #fff;
    font-size: 16px;
  }
}
.shadow {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
}
.dialog {
  position: fixed;
  background: rgb(255, 255, 255);
  width: calc(100% - 55px);
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  z-index: 1000;
  border-radius: 7px;
  padding: 25px 24px;
  color: #333;
  img {
    position: absolute;
    padding: 12px;
    right: 0;
    top: 0;
    z-index: 1001;
    width: 43px;
    height: 43px;
    display: block;
  }
  .dialog-title {
    height: 25px;
    font-size: 18px;
    text-align: center;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .dialog-content {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
    margin-top: 8px;
    margin-bottom: 20px;
    span {
      display: block;
      padding-left: 12px;
      position: relative;
      &::before {
        content: ' ';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #333;
        position: absolute;
        left: 0;
        top: 10px;
      }
    }
  }
  .dialog-message {
    margin-bottom: 20px;
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;
    color: rgba(51, 51, 51, 1);
    padding: 12px 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 15px;
    line-height: 21px;
  }
  .van-button {
    height: 45px;
    line-height: 45px;
  }
}
.family {
  position: fixed;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  width: 100%;
  z-index: 1000;
  left: 0;
  transition: bottom 0.5s ease;
  &.no-family {
    height: 84.5%;
    bottom: -84.5%;
    &.show {
      bottom: 0;
    }
  }
  &.has-family {
    min-height: 60%;
    max-height: 84.5%;
    bottom: -84.5%;
    &.show {
      bottom: 0;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
  &.commen {
    align-items: flex-start;
  }
  &.flex-1 {
    flex: 1;
  }
  &.end {
    justify-content: flex-end;
  }
  .see-more {
    margin-right: 5px;
    color: #999;
    font-size: 12px;
  }
}
.impress {
  height: 35px;
  background: rgba(240, 252, 250, 1);
  border-radius: 8px;
  padding: 8px 15px 8px 45px;
  box-sizing: border-box;
  margin-top: 10px;
  position: relative;
  span {
    font-size: 12px;
  }
  &::before {
    position: absolute;
    content: ' ';
    background-image: url('~@/assets/images/xingji.png');
    background-size: cover;
    width: 15px;
    height: 14px;
    left: 15px;
    top: 10px;
  }
}
.commen {
  border-bottom: 1px solid #eee;
  padding-top: 10px;
  padding-bottom: 15px;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 5px;
  }
  .van-image {
    margin-right: 8px;
  }
  .main {
    flex: 1;
    .main-top {
      height: 30px;
      .name {
        color: #000;
      }
    }
    .color-666 {
      color: #666;
      font-size: 12px;
    }
    .color-999 {
      color: #999;
      font-size: 12px;
    }
  }
}

.doctor-detail {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    min-height: 105px;
    height: 105px;

    background-image: url('~@/assets/images/bg-1.png');
    background-repeat: no-repeat;
    background-size: 100% 105px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .header-left {
      margin-top: -10px;
      display: flex;
      align-items: center;
      color: #fff;

      .name {
        font-weight: bold;
        font-size: 18px;
        margin: 0 8px 0 16px;
      }
      .level {
        font-size: 14px;
      }
    }
    .tag-work {
      height: 15px;
      width: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: normal;
      box-sizing: content-box;
      border: 1px solid #fff;
      border-radius: 3px;
      margin-left: 10px;
      &.tag-online {
        color: $primary;
        border-color: $primary;
        background-color: #fff;
      }
      &.tag-outline {
        color: #fff;
      }
    }
    .header-right {
      margin-top: -10px;

      .star {
        background: rgba(229, 249, 246, 1);
        color: $-color--primary !important;

        i {
          font-weight: bold !important;
          display: flex;
          align-items: center;
        }

        display: flex;
        justify-content: center;
        align-items: center;

        height: none;
        line-height: normal;
      }
    }
  }

  .body {
    flex: 1;
    background: #f5f5f5;
    padding: 15px 12.5px;

    .body-card {
      &:first-child {
        margin-top: -35px;
      }
      &:last-child {
        margin-bottom: 0;
      }
      background: #fff;
      min-height: 60px;
      margin: 0 0 10px 0;
      padding: 15px;
      border-radius: 7px;

      .row {
        margin: 0 0 5px 0;
        width: 100%;
        &.flex {
          display: flex;
          align-items: center;
        }
        &.column {
          flex-direction: column;
        }
        &.between {
          justify-content: space-between;
        }
        &.center {
          justify-content: center;
        }
        &.service {
          border-radius: 14px;
          padding: 10px;
          background: #f9f9f9;
          margin: 0 0 10px 0;
        }
        &:last-child {
          margin: 0;
        }
        &.col-two {
          > .row {
            padding: 10px 0;
            width: calc(50% - 7.5px);
            border-radius: 7px;
            margin-bottom: 0;
            &:first-child {
              margin-right: 15px;
              background-color: rgba(0, 198, 174, 0.06);
            }
            &:last-child {
              background-color: rgba(64, 169, 255, 0.06);
            }
            .service-consult-content-name {
              margin: 6px 0 3px 0;
              font-size: 16px;
              line-height: 23px;
            }
          }
        }
      }

      .body-card-title {
        margin: 0 8px;
        font-weight: bold;
        font-size: 16px;
      }
      .body-card-tip {
        color: #999;
        font-size: 12px;
        padding-bottom: 10px;
      }

      .fz-card-list {
        overflow-y: auto;
        .fz-card {
          align-items: flex-start;
          flex: none;
          // width: 142px;
          width: calc(50% - 5px);
          height: 102px;
          background: rgba(249, 249, 249, 1);
          border-radius: 7px;
          margin-right: 10px;
          margin-bottom: 0;
          padding: 15px 10px;
          &:last-child {
            margin-right: 0;
          }
          .fz-card-time {
            font-size: 15px;
            color: #333;
            font-weight: bold;
          }
          .fz-card-tag {
            color: #999;
            font-size: 13px;
          }
          .fz-card-price {
            flex: 1;
            color: #f2223b;
            font-size: 13px;
            font-weight: bold;
          }
        }
      }

      .hospital,
      .department,
      .body-card-description {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        margin: 0 8px 0 0;
        text-align: justify;
      }

      .body-card-description {
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        &.fold {
          -webkit-line-clamp: 2;
        }
        &.unfold {
          -webkit-line-clamp: 99;
        }
      }

      .service-consult-content {
        flex: 1;
        margin: 0 0 0 0;
        &.auto {
          flex: none;
        }
        .service-consult-content-name {
          color: #333333;
          font-size: 15px;
          font-weight: bold;
        }

        .service-consult-content-fee {
          font-weight: bold;
          color: #f2223b;
          font-size: 16px;
          line-height: 22px;
          .service-consult-content-fee-sub {
            font-size: 12px;
            font-weight: normal;
          }
        }

        .service-consult-content-unit {
          font-size: 12px;
          color: #999;
        }

        .service-consult-content-description {
          color: #999999;
          font-size: 12px;
        }
      }

      .more {
        color: #999999;
        margin: 8px 0 0 0;
      }
    }
  }

  /deep/ .van-tabs {
    .van-tabs__line {
      background-color: #00c6ae;
      width: 25px !important;
    }

    .van-hairline--top-bottom::after,
    .van-cell:not(:last-child)::after {
      border: 0;
    }

    .van-tabs--line .van-tabs__wrap {
      height: 20px;
    }

    .time-table {
      width: 100%;
      margin: 10px 0 0 0;
      border-left: 1px solid #f2f2f2;
      border-top: 1px solid #f2f2f2;

      .time-table-col {
        text-align: center;
        padding: 5px 2px;
        width: 12.5%;

        &.border {
          border-bottom: 1px solid #f2f2f2;
          border-right: 1px solid #f2f2f2;
        }

        &.primary {
          color: #00c6ae;
        }
      }
    }
  }
}
</style>
