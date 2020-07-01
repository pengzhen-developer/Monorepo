<template>
  <div class="content-bgd">

    <Steps v-bind:list='list'
           v-bind:active="active"
           v-on:increase='increase'></Steps>

    <div class="tab1"
         v-if="showTab1">
      <div class="content-tips">
        <i class="icon el-icon-info"></i>
        <p>为了保证您的账号安全，更换绑定手机前请先进行安全验证。</p>
        <i class="icon el-icon-close"></i>
      </div>
      <el-form ref="form"
               class="tab-content"
               label-width="100px">

        <el-form-item label="手机号码：">
          <el-input v-model="oldPhone"></el-input>
        </el-form-item>

        <el-form-item label="手机验证码：">
          <div class="phone-code">
            <el-input v-model="oldCode"
                      v-bind:minlength="6"
                      v-bind:maxlength="6"
                      placeholder="请输入验证码"></el-input>
            <el-button type="primary"
                       class="btn-getcode"
                       @click="getCodeNew()">获取验证码</el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button class="btn">取消</el-button>
          <el-button type="primary"
                     class="btn"
                     @click="nextPoint()">下一步</el-button>

        </el-form-item>
      </el-form>

    </div>

    <div class="tab2"
         v-else>
      <el-form ref="form"
               class="tab-content"
               label-width="100px">

        <el-form-item label="新手机号：">
          <el-input v-model="newPhone"></el-input>
        </el-form-item>

        <el-form-item label="手机验证码：">
          <div class="phone-code">
            <el-input v-model="newCode"
                      v-bind:minlength="6"
                      v-bind:maxlength="6"
                      placeholder="请输入验证码"></el-input>
            <el-button type="primary"
                       class="btn-getcode"
                       @click="getCodeNew()">获取验证码</el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     class="btn-confirm"
                     @click="nextPoint()">完成</el-button>

        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import Steps from './steps'

export default {
  components: { Steps },

  data() {
    return {
      showTab1: true,
      oldPhone: '12312313131',
      oldCode: '',
      newPhone: '213123131',
      newCode: '',
      active: 0,
      list: [
        {
          title: '选择机构类型'
        },
        {
          title: '完善机构信息'
        },
        {
          title: '提交审核'
        }
      ]
    }
  },

  methods: {
    nextPoint() {},
    getCode() {},
    getCodeNew() {},
    increase() {
      if (this.active == this.list.length - 1) return
      this.$emit('increase', this.active++)
    }
  }
}
</script>

<style  scoped>
p {
  margin: 0;
  padding: 0;
}
.content-bgd {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.steps {
  width: 744px;
}

.tab1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-tips {
  width: 744px;
  height: 40px;
  margin-top: 60px;
  background: #eaf4f6;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border: 1px var(--q-color-primary) solid;
  border-radius: 2px;
}

.content-tips p {
  flex: 1;
  color: #333333;
  font-size: 14px;
  margin-left: 8px;
}

.tab-content {
  width: 400px;
  margin-top: 50px;
}

.btn {
  font-size: 14px;
  margin-top: 30px;
  width: 120px;
}

.btn-confirm {
  font-size: 14px;
  color: white;
  margin-top: 30px;
  width: 280px;
}

.btn-getcode {
  padding: 6px 16px;
  margin-left: 10px;
}
.phone-code {
  display: flex;
}
</style>