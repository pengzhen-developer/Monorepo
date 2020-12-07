<template>
  <div class="reminder">
    <div class="title"><span>配送订单-提醒节点</span></div>
    <div class="content">
      <div class="content-item"
           v-for="(item,index) in remarks"
           v-bind:key="index"><span>{{item}}</span></div>
    </div>
    <div class="title">
      <span>提醒设置</span>
      <i class="zyy-icon zyy-xiugai1 text-primary"
         size="14"
         @click="editFlag=true"></i>
    </div>
    <div class="content setting">
      <div class="content-item">
        <span>同步异常短信提醒:</span>
        <span v-if="!editFlag">{{model.Status?'开启':'未开启'}}</span>
        <el-switch v-if="editFlag"
                   v-model="model.Status"></el-switch>
      </div>
      <template v-if="hasSelect&&!editFlag">
        <div class="content-item">
          <span>提醒人号码:</span>{{model.Phone}}
        </div>
      </template>
      <template v-if="editFlag">
        <div class="content-item">
          <span>提醒人号码:</span>
          <el-input v-model="model.Phone"></el-input>
        </div>
        <div class="content-item center">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="save"
                     type="primary">保存</el-button>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'exception-reminder',
  props: {
    info: Object
  },
  data() {
    return {
      model: {
        Id: 0, //主键ID，新增传0
        Code: '',
        Phone: '',
        Status: false
      },
      hasSelect: false,
      editFlag: false,
      remarks: []
    }
  },
  watch: {
    info: {
      handler(val) {
        if (val) {
          this.remarks = Object.assign({}, val.Remarks)
          this.hasSelect = val.Smsremind?.Status ?? false
          this.model.Id = val.Smsremind?.Id ?? 0
          this.model.Status = val.Smsremind?.Status ?? false
          this.model.Phone = val.Smsremind?.Phone ?? ''
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    save() {
      if (this.editFlag && this.model.Status) {
        if (this.model.Phone == '') {
          Peace.util.warning('手机号码必填')
          return false
        } else if (!/^1[3456789]\d{9}$/.test(this.model.Phone)) {
          Peace.util.warning('请填写正确的手机号')
          return false
        }
      }

      this.model.Code = this.info.Code

      const params = peace.util.deepClone(this.model)
      Service.smsRemindSave(params).then((res) => {
        Peace.util.success(res.msg)
        this.hasSelect = params.Status
        this.editFlag = false
        // this.$emit('onCancel')
      })
    },
    cancel() {
      this.editFlag = false
      this.model.Status = this.info?.Smsremind?.Status
      this.model.Phone = this.info?.Smsremind?.Phone
      // this.$emit('onCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 12px;
  position: relative;
  &::before {
    content: ' ';
    display: block;
    width: 4px;
    height: 16px;
    background: var(--q-color-primary);
    border-radius: 2px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.content {
  padding: 20px 13px;
  &.setting {
    .content-item {
      margin-bottom: 20px;
    }
  }
  .content-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    &.center {
      justify-content: center;
      .el-button {
        width: 88px;
        &:first-child {
          margin-right: 20px;
        }
      }
    }
    span {
      margin-right: 5px;
    }
    .el-input {
      width: 50%;
    }
  }
}
</style>