<template>
  <div class="layout-route">
    <div class="card setup">
      <div class="setup-list">
        <div class="b">转诊设置</div>
        <div class="setup-item">
          <div class="item">
            <img src="./assets/images/ic_setup_bg.png"
                 alt="">
            <div class="title">医生发起转诊免审核</div>
            <el-switch :active-value="2"
                       :inactive-value="1"
                       active-color="#3099A6"
                       v-model="isAutomaticAuditReferralHair"
                       @change="set('referral','hair',isAutomaticAuditReferralHair)">
            </el-switch>
          </div>
          <div class="item">
            <img src="./assets/images/ic_setup_bg.png"
                 alt="">
            <div class="title">医院接受转诊免审核</div>
            <el-switch :active-value="2"
                       :inactive-value="1"
                       active-color="#3099A6"
                       v-model="isAutomaticAuditReferralInvite"
                       @change="set('referral','invite',isAutomaticAuditReferralInvite)">
            </el-switch>
          </div>
        </div>
      </div>
      <div class="setup-list">
        <div class="b">会诊设置</div>
        <div class="setup-item">
          <div class="item">
            <img src="./assets/images/ic_setup_bg.png"
                 alt="">
            <div class="title">医生发起会诊免审核</div>
            <el-switch :active-value="2"
                       :inactive-value="1"
                       active-color="#3099A6"
                       v-model="isAutomaticAuditConsultHair"
                       @change="set('consult','hair' ,isAutomaticAuditConsultHair)">
            </el-switch>
          </div>
          <div class="item">
            <img src="./assets/images/ic_setup_bg.png"
                 alt="">
            <div class="title">医院接受会诊免审核</div>
            <el-switch :active-value="2"
                       :inactive-value="1"
                       active-color="#3099A6"
                       v-model="isAutomaticAuditConsultInvite"
                       @change="set('consult','invite',isAutomaticAuditConsultInvite)">
            </el-switch>
          </div>
        </div>
      </div>
      <div class="setup-list">
        <div class="b">复诊设置</div>
        <div class="setup-item other">
          <div class="item">
            <!-- <img src="./assets/images/ic_setup_bg.png"
                 alt=""> -->
            <div class="title">接收系统确认在本院有诊疗记录的复诊患者</div>
            <el-switch :active-value="2"
                       :inactive-value="1"
                       active-color="#3099A6"
                       v-model="isAffirmFirstClinicalVisit"
                       @change="change()">
            </el-switch>
          </div>
          <div class="item">
            <!-- <img src="./assets/images/ic_setup_bg.png"
                 alt=""> -->
            <div class="title">接收上传诊疗记录的复诊患者</div>
            <el-switch :active-value="2"
                       :inactive-value="1"
                       active-color="#3099A6"
                       v-model="isUploadFirstClinicalVisit"
                       @change="change()">
            </el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './service'
export default {
  name: 'ServiceSetting',
  data() {
    return {
      isAutomaticAuditConsultHair: '',
      isAutomaticAuditConsultInvite: '',
      isAutomaticAuditReferralHair: '',
      isAutomaticAuditReferralInvite: '',
      isAffirmFirstClinicalVisit: '',
      isUploadFirstClinicalVisit: ''
    }
  },
  watch: {
    isAffirmFirstClinicalVisit: {
      handler(val) {
        this.isUploadFirstClinicalVisit = val == 2 ? 1 : 2
      },
      immediate: true
    },
    isUploadFirstClinicalVisit: {
      handler(val) {
        this.isAffirmFirstClinicalVisit = val == 2 ? 1 : 2
      },
      immediate: true
    }
  },
  mounted() {
    this.get()
  },
  methods: {
    get() {
      Service.getAutomaticAudit().then((res) => {
        let info = res.data.info
        this.isAutomaticAuditConsultHair = info.isAutomaticAuditConsultHair
        this.isAutomaticAuditConsultInvite = info.isAutomaticAuditConsultInvite
        this.isAutomaticAuditReferralHair = info.isAutomaticAuditReferralHair
        this.isAutomaticAuditReferralInvite = info.isAutomaticAuditReferralInvite
        this.isAffirmFirstClinicalVisit = info.isAffirmFirstClinicalVisit
        this.isUploadFirstClinicalVisit = info.isUploadFirstClinicalVisit
      })
    },
    set(type, action, status) {
      this.$confirm(
        `是否确认${status === 2 ? '开通' : '关闭'}医生${action === 'invite' ? '接受' : '发起'}${type === 'referral' ? '转诊' : '会诊'}免审核`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false,
          callback: (res) => {
            if (res === 'confirm') {
              let param = { type, action, status: status }
              Service.setAutomaticAudit(param).then(() => {
                Peace.util.success('设置成功！')
                this.get()
              })
            } else {
              this.get()
            }
          }
        }
      )
    },
    change() {
      this.$confirm('切换设置后立即生效，该设置将只对新订单有效。是否切换？', '提示', {
        confirmButtonText: '确认切换',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
        callback: (res) => {
          if (res === 'confirm') {
            this.$nextTick(() => {
              const param = {
                isAffirmFirstClinicalVisit: this.isAffirmFirstClinicalVisit,
                isUploadFirstClinicalVisit: this.isUploadFirstClinicalVisit
              }
              Service.isFirstClinicalVisit(param)
                .then(() => {
                  Peace.util.success('设置成功！')
                })
                .finally(() => {
                  this.get()
                })
            })
          } else {
            this.get()
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.setup {
  background-color: #fff;
  padding: 20px 26px;
  height: 100%;
  .setup-list {
    margin-bottom: 14px;
    .setup-item {
      display: flex;
      padding: 10px 0;
      &.other {
        flex-direction: column;
        .item {
          width: 520px;
          height: 60px;
          justify-content: space-between;
          margin-bottom: 5px;
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
      ::v-deep.el-switch__core {
        background: #fff;
        border: 2px solid rbg(201, 213, 233);
        &::after {
          box-shadow: 2px 2px 5px #aaa;
        }
      }
    }
    .b {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      margin-bottom: 10px;
      &::before {
        display: inline-block;
        content: '';
        width: 5px;
        height: 16px;
        background: var(--q-color-primary);
        margin-right: 12px;
        margin-bottom: -2px;
      }
    }
  }

  .item {
    position: relative;
    width: 250px;
    height: 110px;
    display: flex;
    border: 1px solid #f5f5f5;
    align-items: center;
    justify-content: center;
    margin-right: 24px;
    padding: 10px;
    background: #fbfbfb;
    img {
      position: absolute;
      width: 75px;
      height: 87px;
      left: 0;
      bottom: 0;
      z-index: 0;
    }
    .title {
      margin-right: 20px;
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
