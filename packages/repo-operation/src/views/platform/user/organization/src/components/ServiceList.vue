<template>
  <div>
    <el-dialog width="600px" v-bind:visible.sync="visible" title="已选服务">
      <el-table :data="list" v-loading="isLoading" style="width: 100%">
        <el-table-column prop="hospitalName" label="服务名称"></el-table-column>
        <el-table-column prop="serviceName" label="服务类型"></el-table-column>
        <el-table-column prop="checkTime" label="开通时间" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Service from "./../service";

export default {
  props: {
    value: {
      required: true,
      type: Boolean
    },

    data: Object
  },

  filters: {},

  data() {
    return {
      isLoading: false,
      visible: this.value,

      list: []
    };
  },

  computed: {},

  watch: {
    value(value) {
      this.visible = value;
    },

    visible(value) {
      this.$emit("input", value);
      this.list = []
      if (value) {
        this.getService();
      }
    }
  },

  methods: {
    getService() {
      this.isLoading = true;
      const params = {
        accountId: this.data.id
      };

      Service.getService(params)
        .then(res => {
          this.list = res.data.list;
        })
        .finally(() => {
          this.isLoading = false;
        });
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
  &.inline-half {
    display: inline-block;
    vertical-align: middle;
    width: 50%;
  }

  &.is-error {
    margin-bottom: 24px;
  }
}

.info {
  &-item {
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 24px;
    &:last-child {
      border-bottom: none;
    }
  }
  &-title {
    position: relative;
    padding-left: 14px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    &::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 0;
      width: 4px;
      height: 16px;
      background-color: var(--q-color-primary);
      border-radius: 2px;
    }
  }
  &-img {
    width: 130px;
    height: 130px;
    margin-right: 20px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
  }
}

::v-deep .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}
</style>
