<template>
  <div>
    <template v-if="showNotice === true">
      <SignNotice>
        <div slot="title">
          互联网医院诊疗办法规定：在互联网医院必须设置签名后才能开通服务，设置签名后，请刷新页面。
        </div>

        <div slot="notify"></div>

        <div slot="footer">
          <h3>请使用手机打开【万家云医】APP设置签名</h3>
          <p>未安装【万家云医】APP的用户</p>
          <p>使用手机扫描上面二维码可快捷安装APP</p>
        </div>
      </SignNotice>
    </template>

    <template v-else-if="showNotice === false">
      <div class="title">
        <h4>图文问诊</h4>
        <span>（开通后，患者可以向您发起图文问诊）</span>
        <el-switch :active-value="1"
                   :inactive-value="0"
                   v-model="view.model.inquiry.status"></el-switch>
      </div>

      <transition name="el-fade-in-linear">
        <div v-if="view.model.inquiry.status === 1">
          <div class="input">
            <span>咨询费用</span>
            <el-select placeholder
                       style="width: 100px; margin: 0 20px"
                       v-model="view.model.inquiry.money">
              <el-option :value="10"
                         label="10"></el-option>
              <el-option :value="20"
                         label="20"></el-option>
              <el-option :value="30"
                         label="30"></el-option>
              <el-option :value="50"
                         label="50"></el-option>
              <el-option label="自定义"
                         value="自定义"></el-option>
            </el-select>
            <el-input-number :max="500"
                             :min="0"
                             controls-position="right"
                             placeholder
                             v-if="view.model.inquiry.money === '自定义'"
                             v-model="view.model.inquiry.moneyForCustom"></el-input-number>
            <span style="margin: 0 0 0 -20px">
              .00
            </span>
            <span>元</span>
          </div>
          <div class="tip">
            <span>(温馨提示：费用修改后立即生效，费用最低0元，最高500元)</span>
          </div>
        </div>
      </transition>

      <hr>

      <div class="title">
        <h4>视频问诊</h4>
        <span>（开通后，患者可以向您发起视频问诊）</span>
        <el-switch :active-value="1"
                   :inactive-value="0"
                   v-model="view.model.video.status"></el-switch>
      </div>

      <transition name="el-fade-in-linear">
        <div v-if="view.model.video.status === 1">
          <div class="input">
            <span>咨询费用</span>
            <el-select placeholder
                       style="width: 100px; margin: 0 20px"
                       v-model="view.model.video.money">
              <el-option :value="10"
                         label="10"></el-option>
              <el-option :value="20"
                         label="20"></el-option>
              <el-option :value="30"
                         label="30"></el-option>
              <el-option :value="50"
                         label="50"></el-option>
              <el-option label="自定义"
                         value="自定义"></el-option>
            </el-select>
            <el-input-number :max="500"
                             :min="0"
                             controls-position="right"
                             placeholder
                             v-if="view.model.video.money === '自定义'"
                             v-model="view.model.video.moneyForCustom"></el-input-number>

            <span style="margin: 0 0 0 -20px">
              .00
            </span>
            <span>元</span>
          </div>
          <div class="tip">
            <span>(温馨提示：费用修改后立即生效，费用最低0元，最高500元)</span>
          </div>
        </div>
      </transition>

      <el-button @click="save"
                 type="primary">保存</el-button>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'
import SignNotice from '@src/views/components/SignNotice'

export default {
  components: {
    SignNotice
  },

  data() {
    return {
      showNotice: undefined,

      view: {
        model: {
          inquiry: {
            money: 10,
            status: 0
          },

          video: {
            money: 10,
            status: 0
          }
        }
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const params = {
        doctorId: this.$store.state.user.userInfo.list.docInfo.doctor_id
      }

      peace.service.personalCenter.getDoctorInfo(params).then(res => {
        if (res.data.ywqStatus !== 2) {
          this.showNotice = true
        } else {
          this.showNotice = false
        }
        if (
          res.data.doctor_consultation_setting &&
          res.data.doctor_consultation_setting.length > 0
        ) {
          this.view.model.inquiry = res.data.doctor_consultation_setting[0]
          this.view.model.video = res.data.doctor_consultation_setting[1]
        }
      })
    },

    save() {
      peace.http.all([this.saveInquiry(), this.saveVideo()]).then(
        peace.http.spread((inquiryRes, videoRes) => {
          peace.util.alert(videoRes.msg)

          this.get()
        })
      )
    },

    saveInquiry() {
      const params = {
        doctorId: this.$store.state.user.userInfo.list.docInfo.doctor_id,
        tag: 'image',
        status: this.view.model.inquiry.status,
        money: this.view.model.inquiry.status
          ? this.view.model.inquiry.money === '自定义'
            ? this.view.model.inquiry.moneyForCustom
            : this.view.model.inquiry.money
          : 0,
        inquiry_time: 0
      }

      return peace.service.personalCenter.upConsultationSet(params)
    },

    saveVideo() {
      const params = {
        doctorId: this.$store.state.user.userInfo.list.docInfo.doctor_id,
        tag: 'video',
        status: this.view.model.video.status,
        money: this.view.model.video.status
          ? this.view.model.video.money === '自定义'
            ? this.view.model.video.moneyForCustom
            : this.view.model.video.money
          : 0,
        inquiry_time: 0
      }

      return peace.service.personalCenter.upConsultationSet(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0 0 20px 0;

  h4 {
    margin: 0;
    display: inline-block;
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }

  span {
    font-size: 14px;
  }

  .el-switch {
    margin: 0 0 0 100px;
  }
}

.input {
  margin: 20px 0;

  .el-input-number {
    width: 100px;
    margin: 0 20px;
  }
}

.tip {
  margin: 20px 0;

  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px dashed #f2f2f2;
  margin: 30px 0 40px 0;
  padding: 0;
}
</style>
