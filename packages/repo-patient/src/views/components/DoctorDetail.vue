<template>
  <div class="doctor-detail">
    <template v-if="!isLoading">
      <div class="header">
        <div class="header-left">
          <van-image round
                     cover
                     :src="doctor.doctorInfo.avartor"
                     class="header-left-logo" />
          <div style="margin-left:16px;display: flex;flex-direction:column;justify-content: center;">
            <div>
              <span class="name">{{ doctor.doctorInfo.name }}</span>
              <span class="level">{{ doctor.doctorInfo.doctorTitle }}</span>
            </div>
            <!-- <div class="tag-work tag-online"
                 v-if="doctor.doctorInfo.workStatus==1">在线</div>
            <div class="tag-work tag-outline"
                 v-else-if="doctor.doctorInfo.workStatus==2">离线</div> -->
          </div>

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
            <van-image class="body-card-logo"
                       :src="require('@src/assets/images/ic_mechanism.png')" />
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
              <van-image class="body-card-logo"
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
              <van-image class="body-card-logo"
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
                           :src="require('@src/assets/images/ic_more.png')"></van-image>
              </div>
              <div @click="showMore"
                   v-if="!fold"
                   class="row flex center">
                <span style="margin: 0 4px 0 0;">收起</span>
                <van-image round
                           style="transform: rotate(180deg)"
                           :src="require('@src/assets/images/ic_more.png')"></van-image>
              </div>
            </div>
          </div>
        </div>

        <!-- 复诊开药 -->
        <div class="body-card"
             v-if="returnVisitList.length>0">
          <div class="row flex column">
            <div class="row flex">
              <van-image class="body-card-logo"
                         :src="require('@src/assets/images/ic_consultation.png')" />
              <h4 class="body-card-title">复诊开药</h4>
              <div class=" flex flex-1 end"
                   @click="gotoAppointPage(returnVisitList[0].timeSharing,'more')">
                <span class="see-more">查看更多</span>
                <van-image class="more-logo"
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
              <div class="fz-card-time">{{item.timeSharing}} <span>{{item.AMPM == "AM" ? "上午" : "下午"}}</span></div>
              <div class="fz-card-tag">{{item.sourceLevelType == 1 ? "普通门诊" : "专家门诊"}}</div>
              <div class="flex between"
                   style="width:100%;">
                <peace-price class="fz-card-price"
                             v-bind:price="item.unitPrice"></peace-price>
                <!-- @click.stop="showDialog(item,'returnVisit')" -->
                <van-button round
                            @click="gotoAppointPage(item.timeSharing,'appoint')"
                            size="small"
                            :class="{'full':item.state==='full'}"
                            :type="item.state!=='full'?'primary':''">{{item.state!=='full'?'预约':'约满'}}</van-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 在线问诊 -->
        <div class="body-card">
          <div class="row flex column">
            <div class="row flex">
              <van-image class="body-card-logo"
                         :src="require('@src/assets/images/ic_interrogation.png')" />
              <h4 class="body-card-title">在线问诊</h4>
            </div>
            <div class="row body-card-tip">
              医生提供图文或视频健康指导，不进行医学判断
            </div>
          </div>
          <div class="row flex col-two ">
            <!-- 图文问诊-->
            <div class=" row flex column center"
                 @click="showDialog(serviceImageInfo, 'image')">
              <van-image v-if="serviceImageInfo.status=='1'"
                         class="inquiry-logo"
                         :src="require('@src/assets/images/ic_tuwen_open.png')"></van-image>
              <van-image v-else
                         class="inquiry-logo"
                         :src="require('@src/assets/images/ic_tuwen.png')"></van-image>

              <div class="service-consult-content auto">
                <div class="row flex column"
                     style="margin: 0;">
                  <span class="service-consult-content-name">图文问诊</span>
                  <span v-if="serviceImageInfo.status=='1'"
                        class="row flex">
                    <peace-price v-bind:size="12"
                                 v-bind:color="'#f2223b'"
                                 v-bind:transformOrigin="'right'"
                                 v-bind:price="serviceImageInfo.price"></peace-price>
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

            <!-- 视频问诊-->
            <div class=" row flex column center"
                 @click="showDialog(serviceImageInfo, 'video')">
              <!-- 视频问诊尚未开通 -->
              <van-image v-if="serviceVideoInfo.status=='1'"
                         class="inquiry-logo"
                         :src="require('@src/assets/images/ic_video_open.png')"></van-image>
              <van-image v-else
                         class="inquiry-logo"
                         :src="require('@src/assets/images/ic_video.png')"></van-image>

              <div class="service-consult-content auto">
                <div class="row flex column"
                     style="margin: 0;">
                  <span class="service-consult-content-name">视频问诊</span>
                  <span v-if="serviceVideoInfo.status=='1'"
                        class="row flex">
                    <peace-price v-bind:size="12"
                                 v-bind:color="'#f2223b'"
                                 v-bind:transformOrigin="'right'"
                                 v-bind:price="serviceVideoInfo.price"></peace-price>
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
        <div class="body-card"
             v-if="servicePackage.info">
          <div class="row flex">
            <div class="row flex">
              <van-image class="body-card-logo"
                         :src="require('@src/assets/images/ic_service.png')" />
              <h4 class="body-card-title">服务包</h4>
              <div class=" flex flex-1 end"
                   @click="gotoServicePageListPage"
                   v-if="servicePackage.total>1">
                <span class="see-more">查看更多</span>
                <van-image class="more-logo"
                           :src="require('@src/assets/images/ic_more_right.png')" />
              </div>
            </div>

            <div>
            </div>
          </div>

          <div class="service row flex"
               @click="gotoServicePackageDeatilPage(servicePackage.info.servicePackageId)">
            <div class="service-consult-content full-width">
              <div class="row flex between"
                   style="margin: 0;">
                <div class="service-consult-content-name ellipsis">{{servicePackage.info.servicePackageName}}</div>
                <div class=" flex">
                  <peace-price v-bind:color="'#f2223b'"
                               v-bind:transformOrigin="'right'"
                               v-bind:price="servicePackage.info.price"></peace-price>
                  <span class="service-consult-content-unit"> /{{servicePackage.info.effectiveDays}}天</span>
                </div>
              </div>
              <div style="marginTop:5px">
                <div class="service-consult-content-description ellipsis">{{servicePackage.info.equityText}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 挂号服务 -->
        <div class="body-card"
             v-if="doctor.registerData&&doctor.registerData.length > 0">
          <div class="row flex between">
            <div class="row flex">
              <van-image class="body-card-logo"
                         :src="require('@src/assets/images/ic_register.png')" />
              <h4 class="body-card-title">挂号服务</h4>
              <div class=" flex flex-1 end"
                   @click="goRegisterList(doctor.registerData[0].timeSharing)">
                <span class="see-more">查看更多</span>
                <van-image class="more-logo"
                           :src="require('@src/assets/images/ic_more_right.png')" />
              </div>
            </div>
            <div>

            </div>
          </div>
          <template v-for="(registerItem, index) in doctor.registerData">

            <div class="service row flex"
                 v-if="index<2"
                 :key="index">
              <div class="service-consult-content">
                <div class="row flex"
                     style="margin: 0 0 4px 0;">
                  <span class="service-consult-content-name">
                    {{ registerItem.timeSharing }}
                    {{ registerItem.AMPM == "AM" ? "上午" : "下午" }}
                  </span>
                  <!-- <van-tag style="margin: 0 12px; font-size: 12px;"
                         color="#f1f1f1"
                         text-color="#999999">
                  {{ index === 0 ? "号源一" : index === 1 ? "号源二" : "" }}
                </van-tag> -->
                </div>
                <div>
                  <div>
                    <span class="service-consult-content-description"
                          style="font-size: 13px; margin: 0 10px 0 0;">{{
                    registerItem.sourceLevelType == 1 ? "普通门诊" : "专家门诊"
                  }}</span>
                    <peace-price v-bind:color="'#f2223b'"
                                 v-bind:size="13"
                                 v-bind:price="registerItem.unitPrice"></peace-price>
                  </div>
                </div>
              </div>
              <van-button round
                          @click="goRegisterList(registerItem.timeSharing)"
                          size="small"
                          type="primary">预约</van-button>
            </div>
          </template>
        </div>

        <!-- 医生排班 -->
        <div class="body-card"
             v-if="doctor.workOnLine || doctor.workUnderLine">
          <div class="row flex">
            <div class="row flex">
              <van-image class="body-card-logo"
                         :src="require('@src/assets/images/ic_scheduling.png')" />
              <h4 class="body-card-title">医生排班</h4>
            </div>
          </div>

          <van-tabs v-model="activeTab">
            <van-tab title="复诊开药时间">
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
              <van-image class="body-card-logo"
                         :src="require('@src/assets/images/ic_evaluate.png')" />
              <h4 class="body-card-title">{{'患者评价('+common.count+')'}}</h4>
            </div>
          </div>
          <div class="flex impress">
            <span class="primary">患者对我的主要印象：{{commonTagText}}</span>
          </div>
          <van-list v-model="loading"
                    :finished="finished"
                    @load="getCommentList">
            <div class="flex commen"
                 v-for="(item,index) in common.lists"
                 :key="index">
              <van-image class="common-logo"
                         :src="item.iconHead" />
              <div class="main">
                <div class="flex between main-top">
                  <div class="name">{{item.familyInfo.name}}</div>
                  <van-rate v-model="item.starLevel"
                            readonly
                            :icon="require('@src/assets/images/ic_star_active.png')"
                            :void-icon="require('@src/assets/images/ic_star.png')" />
                </div>
                <div class="main-middle color-666">
                  {{item.content}}
                </div>
                <div class="main-time color-999">{{item.createdTime}}</div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
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
               align="center"
               style="height:100vh;">
        <van-loading type="spinner" />
      </van-row>

    </template>

    <!-- 问诊提示 ,复诊提示-->
    <UserServiceNotice v-model="dialog.visible"
                       v-bind:info="dialog.data"
                       @onSucces="gotoInquiryApplyPage"></UserServiceNotice>
  </div>

</template>

<script>
import UserServiceNotice from '@src/views/components/UserServiceNotice'
import peace from '@src/library'
import Vue from 'vue'
import { Dialog, Rate } from 'vant'

Vue.use(Rate)
export default {
  components: { UserServiceNotice },
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
      common: {
        lists: [],
        tags: [],
        count: 0
      },
      showFamily: false, //判断是否弹出弹框
      isEwm: 0,
      dialog: {
        visible: false,
        data: undefined
      },
      returnVisitList: [],
      inquiryList: [],
      servicePackage: {
        total: 0,
        info: null
      },
      isLoading: true,
      enter_time: '',

      p: 0,
      size: 20,
      finished: false,
      loading: false
    }
  },
  computed: {
    commonTagText() {
      if (this.common.tags && Array.isArray(this.common.tags)) {
        return this.common.tags.join(' 、')
      } else {
        return ''
      }
    }
  },
  activated() {
    //登录之后返回医生主页，从缓存取分享标识isEWm
    if (peace.cache.get(peace.type.SYSTEM.IS_EWM)) {
      this.isEwm = peace.cache.get(peace.type.SYSTEM.IS_EWM)
    } else {
      //通过分享进入医生首页 获取分享标识isEwm字段并存在缓存中
      this.isEwm = peace.util.decode(this.$route.params.json).isEwm ? 1 : 0
      if (peace.util.decode(this.$route.params.json).isEwm) {
        peace.cache.set(peace.type.SYSTEM.EWM_STATUS, 'begin')
        peace.cache.set(peace.type.SYSTEM.IS_EWM, this.isEwm)
        peace.cache.set(peace.type.SYSTEM.EWM_INFO, {
          ewmScene: 'doctorQrcode',
          doctorId: peace.util.decode(this.$route.params.json).doctorId
        })
      }
    }

    this.getDoctorInfo()
    if (!this.hasLogin() && this.isEwm) {
      this.goLogin()
    }
    this.dialog.visible = false
  },

  deactivated() {
    if (this.isEwm && this.hasLogin()) {
      peace.cache.remove(peace.type.SYSTEM.IS_EWM)
      peace.cache.remove(peace.type.SYSTEM.EWM_INFO)
    }
  },
  created() {
    this.enter_time = new Date().getTime()
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy()
    next()
  },
  destroyed() {
    this.trackByLeave()
  },
  methods: {
    trackByLeave() {
      const params = {
        page_name: '医生主页',
        event_duration: (new Date().getTime() - this.enter_time) / 1000
      }
      peace.service.sensors.globalPageStop(params)
    },
    trackByClcik(click_object, page_area) {
      const params = {
        click_object,
        page_area
      }
      peace.service.sensors.clickDoctorHomePage(params)
    },
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

    //复诊开药查看更多
    gotoAppointPage(time, type) {
      this.trackByClcik(type === 'more' ? '复诊续方查看更多' : '复诊续方预约', '服务区')
      let json = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid,
        time: time.substring(5),
        date: new Date(),
        serviceType: 'returnVisit'
      })
      this.$router.push(`/appoint/doctor/appointDoctorSelect/${json}`)
    },
    closeDialog() {
      this.dialog.visible = false
    },

    showDialog(serviceInfo, type) {
      if (type === 'image' || type === 'video') {
        this.trackByClcik(type === 'image' ? '在线问诊图文问诊' : '在线问诊视问诊', '服务区')
      }
      if (!this.hasLogin()) {
        this.goLogin()
        return
      }

      if (type === 'video') {
        return peace.util.alert('H5版本暂不支持视频问诊')
      }
      if (type === 'image' || type === 'video') {
        if (serviceInfo.status !== 1) {
          return peace.util.alert('暂未开通')
        }
        this.dialog.data = Object.assign({}, serviceInfo, { type: type })
        this.dialog.visible = true
      } else if (type === 'returnVisit') {
        this.dialog.data = Object.assign({}, serviceInfo, { type: type })
        const params = {
          doctorId: this.doctor.doctorInfo.doctorId,
          timeSharing: this.dialog.data.timeSharing,
          sourceCode: this.dialog.data.sourceCode,
          bookingStart: this.dialog.data.startTime,
          bookingEnd: this.dialog.data.endTime,
          sourceDisType: 0
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
      // serviceType  服务类别（inquiry：在线问诊 returnVisit：复诊 ）
      //在线问诊
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
      //复诊问诊
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

          this.doctor = res.data
          this.getCommentList(type)
          this.getServiceList()
          //医生主页-扫码

          let status = peace.cache.get(peace.type.SYSTEM.EWM_STATUS)
          if (this.hasLogin() && this.isEwm) {
            if (status === 'begin') {
              this.shareDoctor()
              peace.cache.set(peace.type.SYSTEM.EWM_STATUS, 'ongoing')
              const json = peace.util.encode({
                doctorInfo: this.doctor.doctorInfo
              })
              this.$router.push({ path: `/components/PatientReport/${json}` })
            } else if (status === 'completed') {
              peace.util.alert('报到成功')
              peace.cache.remove(peace.type.SYSTEM.IS_EWM)
              peace.cache.remove(peace.type.SYSTEM.EWM_INFO)
            } else if (status === 'ongoing') {
              peace.cache.remove(peace.type.SYSTEM.IS_EWM)
              peace.cache.remove(peace.type.SYSTEM.EWM_INFO)
            }
          }
          //医生主页-分享
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
      this.trackByClcik('展开', '基础资料')
    },

    shareDoctor() {
      const params = {
        doctorId: this.doctor.doctorInfo.doctorId,
        link: 3
      }
      //关注后不让取消
      if (this.doctor.doctorInfo.attentionStatus) {
        return
      }
      peace.service.patient.attention(params).then(() => {
        this.doctor.doctorInfo.attentionStatus = true

        this.trackByClcik('关注', '基础资料')
      })
    },

    goMap(doctorInfo) {
      if (doctorInfo.address || (doctorInfo.latitude && doctorInfo.longitude)) {
        this.trackByClcik('所属机构', '基础资料')

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
      if (serviceInfo.status !== 1) {
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
    },

    goRegisterList(time) {
      const params = peace.util.encode({
        doctorId: this.doctor.doctorInfo.doctorId,
        hospitalCode: this.doctor.doctorInfo.nethospitalid,
        time: time.substring(5),
        serviceType: 'appointment'
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
    gotoServicePageListPage() {
      this.trackByClcik('服务包查看更多', '服务区')
      const params = peace.util.encode({ doctorId: this.doctor.doctorInfo.doctorId })
      this.$router.push(`/servicePackage/list/${params}`)
    },
    gotoServicePackageDeatilPage(servicePackageId) {
      this.trackByClcik('服务包查看详情', '服务区')
      const params = peace.util.encode({ servicePackageId: servicePackageId })
      this.$router.push(`/servicePackage/detail/${params}`)
    },
    getServiceList() {
      const params = {
        doctorId: this.doctor.doctorInfo.doctorId,
        p: 1,
        size: 1
      }
      peace.service.servicePackage.getServicePackageList(params).then((res) => {
        res.data.list.map((item) => {
          item.equityText = ''
          item.equities.map((e, i) => {
            item.equityText += `${e.equitiesName}${e.num}次`
            item.equityText += i < item.equities.length - 1 ? '，' : ''
          })
        })
        this.servicePackage.total = res.data.total
        this.servicePackage.info = res.data.list[0]
      })
    },
    getCommentList(type) {
      if (type == 'refuresh') {
        this.p = 0
      }
      this.p++
      const params = {
        doctorId: this.doctor.doctorInfo.doctorId,
        p: this.p,
        size: this.size
      }
      peace.service.group.commentLists(params).then((res) => {
        let list = res.data.lists || []

        this.common.tags = res.data.tags || []
        this.common.count = res.data.count
        this.common.lists = this.common.lists.concat(list)

        this.loading = false
        if (this.p * this.size >= res.data.count) {
          this.finished = true
        }
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
.more-logo {
  width: 13px;
  height: 13px;
}
.inquiry-logo {
  width: 27px;
  height: 27px;
  margin: 0 10px 0 0;
}
.common-logo {
  width: 30px;
  height: 30px;
}
.van-button {
  &.full {
    background: rgba(51, 51, 51, 0.05);
    color: rgba(51, 51, 51, 0.4);
    border: none;
  }
}
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
    background-image: url('~@src/assets/images/xingji.png');
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
      ::v-deep .van-rate__icon {
        font-size: 12px;
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

    background-image: url('~@src/assets/images/bg-1.png');
    background-repeat: no-repeat;
    background-size: 100% 105px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .header-left {
      margin-top: -10px;
      display: flex;

      color: #fff;
      .header-left-logo {
        width: 50px;
        height: 50px;
      }
      .name {
        font-weight: bold;
        font-size: 18px;
        margin: 0 8px 0 0;
      }
      .level {
        font-size: 14px;
      }
    }
    .tag-work {
      height: 18px;
      width: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      line-height: normal;
      border: 1px solid #fff;
      border-radius: 4px;
      &.tag-online {
        color: $primary;
        border-color: #d9f7f3;
        background: #d9f7f3;
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
    padding: 15px 16px;

    .body-card {
      &:first-child {
        margin-top: -35px;
      }
      &:last-child {
        margin-bottom: 0;
      }
      background: #fff;
      min-height: 60px;
      margin: 0 0 16px 0;
      padding: 15px 16px;
      border-radius: 7px;
      .body-card-logo {
        width: 32px;
        height: 32px;
      }
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
          border-radius: 8px;
          padding: 8px;
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
              &.ellipsis {
                flex-basis: 13em;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
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
        overflow-x: auto;
        .fz-card {
          align-items: flex-start;
          flex: none;
          width: 142px;
          // width: calc(50% - 5px);
          height: 103px;
          background: rgba(51, 51, 51, 0.05);
          border-radius: 8px;
          margin-right: 10px;
          margin-bottom: 0;
          padding: 10px 10px 16px;
          &:last-child {
            margin-right: 0;
          }
          .fz-card-time {
            font-size: 15px;
            color: #333;
            font-weight: 600;
            margin-right: -10px;
            span {
              font-weight: normal;
            }
          }
          .fz-card-tag {
            color: #999;
            font-size: 13px;
            margin-bottom: 8px;
            span {
              font-size: 12px;
              margin-left: 5px;
            }
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
        word-wrap: break-word;
        word-break: break-all;
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
        &.full-width {
          flex: none;
          width: 100%;
        }
        .service-consult-content-name {
          color: #333333;
          font-size: 16px;
          font-weight: bold;
          &.ellipsis {
            flex-basis: 13em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .service-consult-content-unit {
          font-size: 12px;
          color: #999;
          white-space: nowrap;
          line-height: normal;
        }

        .service-consult-content-description {
          color: #999999;
          font-size: 12px;
          &.ellipsis {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .more {
        color: #999999;
        margin: 8px 0 0 0;
        .van-image {
          width: 13px;
          height: 13px;
        }
      }
    }
  }

  ::v-deep .van-tabs {
    .van-tabs__line {
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
