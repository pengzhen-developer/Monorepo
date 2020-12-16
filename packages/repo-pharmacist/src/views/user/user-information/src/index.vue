<template>
  <div class="layout-route bg-grey-2">
    <!-- 基本信息 -->
    <div class="personal bg-white  q-mb-20 q-pb-44">
      <div class="personal-item row justify-between q-mb-26">
        <div class="personal-title">基本信息</div>
        <el-button type="primary"
                   style="width:88px;"
                   v-on:click="editBasicinfo">编辑</el-button>
      </div>
      <el-row class="row">
        <el-col style="width:400px">
          <div class="row q-mb-26">
            <div class="form-label">
              <span class="em-4">姓名</span>
            </div>
            <div class="form-value">梁晓艳</div>
          </div>
          <div class="row  q-mb-26">
            <div class="form-label ">
              <span class="em-4">身份证号</span>
            </div>
            <div class="form-value">422823*******0248</div>
          </div>
          <div class="row  q-mb-26">
            <div class="form-label">
              <span class="em-6">任职资格类型</span>
            </div>
            <div class="form-value">药学专业技术资格证书</div>
          </div>
          <div class="row  q-mb-26">
            <div class="form-label ">
              <span class="em-4">资质级别</span>
            </div>
            <div class="form-value">中级（主管中药师）</div>
          </div>
        </el-col>
        <el-col style="flex:1">
          <div class="row  q-mb-26">
            <div class="form-label">
              <span class="em-4">证书编号</span>
            </div>
            <div class="form-value">422823</div>
          </div>
          <div class="row ">
            <div class="form-label">
              <span class="em-4">证书图片</span>
            </div>
            <div class="form-upload">
              <!-- <img :src='require("./assets/img/add.png")'> -->
              <img class="icon-add"
                   :src='require("./assets/img/add.png")'>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 账户信息 -->
    <div class="personal bg-white  q-mb-20 q-pb-4">
      <div class="personal-item row q-mb-26">
        <div class="personal-title">账户信息</div>
      </div>
      <div>
        <div class="row  q-mb-26">
          <div class="form-label left ">
            <span class="em-4">所属部门</span>
          </div>
          <div class="form-value">药师顶级部门</div>
        </div>
        <div class="row  q-mb-26">
          <div class="form-label  left">
            <span class="em-4">账户角度</span>
          </div>
          <div class="form-value">审方药师</div>
        </div>
        <div class="row  q-mb-26">
          <div class="form-label  left">
            <span class="em-4">账户</span>
          </div>
          <div class="form-value form-width">13812345678</div>
          <i class="zyy-icon zyy-xiugai1 text-primary "
             size="12"
             v-on:click="updateAccount">修改</i>
        </div>
        <div class="row  q-mb-26">
          <div class="form-label  left">
            <span class="em-4">密码</span>
          </div>
          <div class="form-value form-width">******</div>
          <i class="zyy-icon zyy-xiugai1 text-primary "
             size="12"
             v-on:click="updatePass">修改</i>
        </div>
      </div>
    </div>
    <!-- 数字签名 -->
    <div class="personal bg-white  q-pb-38">
      <div class="personal-item row q-mb-26">
        <div class="personal-title">数字签名</div>
      </div>
      <div class="row justify-between flex-start">
        <div>
          <p>根据《医疗机构处方审核规范》中关于处方审核流程的规定，药师需在电子处方上进行电子签名，处方才能进入收费环节。</p>
          <span class="el-icon-warning text-warning">系统检测到您尚未设置数字签名，请设置签名。否则您将无法在线审方</span>
          <!-- <span>您已设置数字签名，可正常进行医嘱点评、处方点评、处方审核等工作</span> -->
        </div>
        <el-popover placement="top"
                    width="247"
                    trigger="click"
                    offset=100>
          <div class="sign-tips">设置数字签名指引</div>
          <el-timeline :reverse="reverse">
            <div class="el-timeline-item"
                 v-for="(activity, index) in activities"
                 :key="index.toString()">
              <div class="el-timeline-item__tail"></div>
              <div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--">{{index+1}}</div>
              <div class="el-timeline-item__wrapper">
                <div class="el-timeline-item__content">{{activity.content}}</div>
              </div>
            </div>
          </el-timeline>
          <el-button type="primary"
                     style="width:88px;"
                     class="q-mt-4"
                     slot="reference">设置签名</el-button>
        </el-popover>

      </div>
    </div>
    <!-- 修改基本信息 -->
    <PeaceDialog width="480px"
                 v-bind:visible.sync="dialog.visible"
                 :title="dialog.title"
                 custom-class='accountDialog'>
      <EditBasicinfo v-if="dialog.visible"
                     v-on:close="dialog.visible = false"></EditBasicinfo>
    </PeaceDialog>

    <!-- 修改账号 -->
    <PeaceDialog width="425px"
                 v-bind:visible.sync="accountDialog.visible"
                 :title="accountDialog.title"
                 custom-class='accountDialog'>
      <UpdateAccount v-if="accountDialog.visible"
                     v-on:close="accountDialog.visible = false"></UpdateAccount>
    </PeaceDialog>

    <!-- 修改密码 -->
    <PeaceDialog width="425px"
                 v-bind:visible.sync="passDialog.visible"
                 :title="passDialog.title"
                 custom-class='accountDialog'>
      <UpdatePass v-if="passDialog.visible"
                  v-on:close="passDialog.visible = false"></UpdatePass>
    </PeaceDialog>

  </div>
</template>

<script>
import EditBasicinfo from './components/EditBasicinfo'
import UpdateAccount from './components/UpdateAccount'
import UpdatePass from './components/UpdatePass'
export default {
  name: 'UserInformation',

  components: {
    EditBasicinfo,
    UpdateAccount,
    UpdatePass
  },

  data() {
    return {
      dialog: {
        title: '修改基本信息',
        visible: false
      },
      accountDialog: {
        title: '修改账号',
        visible: false
      },
      passDialog: {
        title: '修改密码',
        visible: false
      },
      activities: [
        {
          content: '下载【医网信】APP'
        },
        {
          content: '使用账号登录APP'
        },
        {
          content: '下载证书并设置签名'
        },
        {
          content: '医网信签名审核通过'
        }
      ]
    }
  },

  created() {},
  methods: {
    editBasicinfo() {
      this.dialog.visible = true
    },
    updateAccount() {
      this.accountDialog.visible = true
    },
    updatePass() {
      this.passDialog.visible = true
    }
  }
}
</script>

<style  lang="scss" scoped>
.personal {
  border-radius: 4px;
  padding-left: 32px;
  padding-right: 32px;
}
.personal-item {
  align-items: center;
  height: 54px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 16px;
}
.personal-title:before {
  content: '';
  display: inline-block;
  position: relative;
  top: 3px;
  margin-right: 10px;
  width: 4px;
  height: 16px;
  background: rgba(48, 153, 166, 1);
  border-radius: 2px;
}
.form-label {
  position: relative;
  text-align: right;
  width: 8em;
  padding-right: 0.2em;
  &.left {
    width: 5.6em;
    text-align: left;
  }
  span {
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
    margin-right: 0.1em;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
  &::after {
    content: '：';
    display: inline-block;
  }
}
.form-width {
  width: 103px;
}
.form-value {
  color: rgba(0, 0, 0, 0.65);
}
.form-upload {
  width: 130px;
  height: 130px;
  border-radius: 4px;
  border: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  .icon-add {
    width: 54px !important;
    height: 54px !important;
    display: block;
  }
}
.zyy-xiugai1 {
  font-size: 14px;
  cursor: pointer;
}
.zyy-xiugai1:before {
  padding-right: 8px;
}
.el-icon-warning {
  color: #ea940f !important;
  line-height: 20px;
}
.el-icon-warning:before {
  padding-right: 2px;
}
.flex-start {
  align-items: flex-start;
}
.el-timeline {
  padding-left: 6px;
}
.el-timeline-item__node-- {
  top: -2px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid var(--q-color-primary);
  color: var(--q-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.el-timeline-item__tail {
  left: 6px;
  height: 46%;
  top: 16px;
  width: 1px;
  border: none;
  background: var(--q-color-primary-light-2);
}
.el-timeline-item {
  padding-bottom: 16px;
}
.el-timeline-item:last-child {
  padding-bottom: 4px;
}
.sign-tips {
  color: rgba(0, 0, 0, 0.85);
  margin-left: 6px;
  margin-bottom: 16px;
}
</style>