<template>
  <div>
    <el-dialog width="500px" v-bind:visible.sync="visible" v-bind:title="title">
      <el-form ref="form" label-width="90px" v-bind:model="model" v-bind:rules="rules">
        <!-- 待审核 -->
        <template v-if="data.checkStatus === 1">
          <el-form-item label="审核结果" prop="checkStatus">
            <el-radio-group v-model="model.checkStatus">
              <el-radio :label="3">通过</el-radio>
              <el-radio :label="2">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="model.checkStatus === 2" label="备注" prop="reason">
            <el-input
              type="textarea"
              placeholder="请填写驳回原因"
              v-bind:rows="4"
              maxlength="200"
              show-word-limit
              v-model="model.reason"
            ></el-input>
          </el-form-item>
          <div class="dialog-btn">
            <el-button v-on:click="visible = false">取 消</el-button>
            <el-button type="primary" v-bind:loading="isLoading" v-on:click="doCheck">确 定</el-button>
          </div>
        </template>
      </el-form>

      <el-form label-width="90px">
        <!-- 已通过  -->
        <template v-if="data.checkStatus === 3">
          <el-form-item label="审核结果">
            <span>通过</span>
          </el-form-item>
          <el-form-item label="审核时间">
            <span>{{ data.checkTime }}</span>
          </el-form-item>
        </template>
        <!-- 未通过 -->
        <template v-if="data.checkStatus === 2">
          <el-form-item label="审核结果">
            <span>驳回</span>
          </el-form-item>
          <el-form-item label="备注">
            <span>{{ checkInfo.reason }}</span>
          </el-form-item>
        </template>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CONSTANT from "./../constant";
import Peace from "@src/library";
import Service from "./../service";

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },

    title: String,

    data: Object
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find(key => ENUM[key] === value);
    }
  },

  data() {
    let checkStatusEmpty = (rule, value, callback) => {
      if (Peace.validate.isEmpty(value)) {
        return callback(new Error());
      }
      callback();
    };
    let checkReasonEmpty = (rule, value, callback) => {
      if (this.model.checkStatus === 2) {
        if (Peace.validate.isEmpty(value)) {
          return callback(new Error());
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      CONSTANT,

      isLoading: false,
      visible: this.value,

      model: {
        checkStatus: "",
        reason: ""
      },

      checkInfo: {},

      rules: {
        checkStatus: [
          {
            validator: checkStatusEmpty,
            message: "请选择审核结果",
            trigger: "change"
          }
        ],
        reason: [
          {
            validator: checkReasonEmpty,
            message: "请填写驳回原因",
            trigger: "blur"
          }
        ]
      }
    };
  },

  watch: {
    value(value) {
      this.visible = value;
    },

    visible(value) {
      this.$emit("input", value);

      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });

      if (this.data.checkStatus === 2) {
        this.getReason();
      }
    }
  },

  methods: {
    doCheck() {
      this.validateForm().then(() => {
        this.isLoading = true;

        const params = Peace.util.deepClone(this.model);
        params.accountServiceId = this.data.id;

        Service.doCheck(params)
          .then(res => {
            Peace.util.success(res.msg);
            this.visible = false;
            this.$emit("refresh");
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
          });
      });
    },

    validateForm() {
      return new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
    },

    getReason() {
      const params = {
        accountServiceId: this.data.id
      };

      Service.getReason(params)
        .then(res => {
          this.checkInfo = res.data;
        })
        .finally(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  position: relative;
  padding-right: 30px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: "：";
    position: absolute;
    top: 0;
    right: 18px;
  }
}

.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}

.dialog-btn {
  padding-top: 30px;
  text-align: center;
  .el-button {
    width: 120px;
    & + .el-button {
      margin-left: 40px;
    }
  }
}
</style>
