<template>
  <div class="layout-route">
    <div class='card client-bg'>
      <div class="title">公众号H5</div>
      <div class="sub-title">医院主页示例</div>
      <div class="content">
        <el-image :src="require('./assets/images/ic_hospital.png')"></el-image>
        <div class="right">
          <el-steps direction="vertical"
                    :active="active">
            <el-step>f
              <div slot="title">生成H5医院主页 <el-button type="primary"
                           class="step-btn"
                           :disabled="active>0"
                           @click="createWechatH5">{{active==0?'立即生成':'已生成'}}</el-button>
              </div>
              <div slot="description">
                <div>H5页面可嵌入公众号菜单。如未注册微信公众号，可前往“微信公众平台”注册微信公众号。</div>
                <template v-if="active>0">
                  <el-image class="scarcd"
                            :preview-src-list="[info.hospitalQrcode]"
                            :src="info.hospitalQrcode"></el-image>
                  <div>
                    扫码预览H5详情 链接地址：
                    <span @click="openHospitalPage"
                          style="cursor: pointer;">{{info.hospitalUrl}}</span>
                    <el-link class="line"
                             v-clipboard:copyhttplist="info.hospitalUrl"
                             v-clipboard:success="onCopy">复制链接</el-link>
                  </div>
                </template>
              </div>

            </el-step>
            <el-step>
              <div slot="title">确认H5支付收款方</div>
              <div slot="description">
                <div>与平台运营人员确认支付收款方并完成相应商户号关联</div>
              </div>
            </el-step>
            <el-step>
              <div slot="title">开通医院提供的服务</div>
              <div slot="description">
                <div>前往【设置中心-服务设置】选择医院可提供的服务，完成设置</div>
              </div>
            </el-step>
            <el-step>
              <div slot="title">配置公众号菜单</div>
              <div slot="description">
                <div>查看 <el-button type="text"
                             @click="openExplain"
                             class="step-btn-text cpkw">配置说明</el-button>
                </div>
              </div>
            </el-step>
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import Service from './service'
export default {
  data() {
    return {
      active: 0,
      info: {}
    }
  },
  created() {
    this.getWechatH5()
  },
  methods: {
    onCopy() {
      Peace.util.success('复制成功！')
    },

    openHospitalPage() {
      window.open(this.info.hospitalUrl)
    },
    openExplain() {
      window.open(this.info.explain)
    },
    getWechatH5() {
      Service.getWechatH5().then((res) => {
        if (res.data.createStatus == 1) {
          this.info = res.data
          this.active = 1
          if (res.data.isOpen == 1) {
            this.active = 3
          }
        }
      })
    },
    createWechatH5() {
      Service.createWechatH5().then((res) => {
        if (res.data.createStatus == 1) {
          this.info = Object.assign({}, this.info, res.data)
          this.active = 1
          if (res.data.isOpen == 1) {
            this.active = 3
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.client-bg {
  background: #fff;
  .title {
    font-weight: 500;
    font-size: 20px;
  }
  .sub-title {
    margin: 10px 0 15px 0;
    font-weight: 500;
    font-size: 16px;
  }
  .line {
    color: var(--q-color-primary);
    margin-left: 10px;
  }
  .content {
    display: flex;
    .right {
      flex: 1;
    }
    .el-image {
      margin-right: 60px;
      width: 320px;
      height: 680px;
    }
    .scarcd {
      width: 100px;
      height: 100px;
      padding: 5px;
    }
    ::v-deep.el-step {
      min-height: 15%;
      flex-basis: auto !important;
      .el-step__head {
        .el-step__icon-inner {
          color: #fff;
        }
        .el-step__icon {
          &.is-text {
            background: #d9d9d9;
            border-color: #d9d9d9;
          }
        }
        &.is-finish,
        &.is-process {
          .el-step__icon {
            &.is-text {
              background: var(--q-color-primary);
              border-color: var(--q-color-primary);
            }
          }
        }
      }
      .el-step__title {
        &.is-wait {
          color: #333;
        }
        &.is-finish {
          color: #333;
        }
      }
      .el-step__description {
        &.is-finish {
          color: #666;
        }
      }
      .el-step__main {
        padding-bottom: 40px;
      }
      .step-btn {
        padding: 4px 15px;
        margin-left: 10px;
      }
      .step-btn-text {
        padding: 4px 5px;
        font-size: 12px;
      }
    }
  }
}
</style>