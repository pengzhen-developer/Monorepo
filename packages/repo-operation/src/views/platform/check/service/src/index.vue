<template>
  <div>
    <el-form
      v-bind:model="model"
      inline="inline"
      label-width="85px"
      label-position="right"
      label-suffix
      size="mini"
    >
      <el-form-item label="机构名称：">
        <el-input v-model="model.hospitalName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="机构类型：">
        <el-select v-model="model.role" placeholder="全部" clearable>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="(value, label) in source.ENUM_ORGANIZATION_TYPE"
            v-bind:key="value"
            v-bind:label="label"
            v-bind:value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请状态：">
        <el-select v-model="model.checkStatus" placeholder="全部" clearable>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="(value, label) in source.ENUM_APPLY_STATUS"
            v-bind:key="value"
            v-bind:label="label"
            v-bind:value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间：">
        <div class="date-wrap">
          <el-date-picker
            v-model="model.startTime"
            type="date"
            placeholder="开始日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :pickerOptions="startPickerOptions"
            style="width: 130px;"
          ></el-date-picker>
          <div class="date-separator"></div>
          <el-date-picker
            v-model="model.endTime"
            type="date"
            placeholder="结束时间"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :pickerOptions="endPickerOptions"
            style="width: 130px;"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" icon="el-icon-search" v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <PeaceTable ref="table" size="mini" pagination>
      <el-table-column width="50" label="序号" align="center" prop="code"></el-table-column>
      <el-table-column min-width="180px" label="机构名称" prop="hospitalName"></el-table-column>
      <el-table-column min-width="100px" label="机构类型" prop="role">
        <template
          slot-scope="scope"
        >{{ scope.row.role | getEnumLabel(source.ENUM_ORGANIZATION_TYPE) }}</template>
      </el-table-column>
      <el-table-column min-width="120px" label="服务名称" prop="serviceName"></el-table-column>
      <el-table-column width="100px" align="center" label="申请时间" prop="applyTime"></el-table-column>
      <el-table-column min-width="80px" align="center" label="申请状态" prop="checkStatus">
        <template slot-scope="scope">
          <span class="dot" v-bind:class="getColorType(scope.row)"></span>
          <span>{{ scope.row.checkStatus | getEnumLabel(source.ENUM_APPLY_STATUS) }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="审核时间" prop="checkTime"></el-table-column>
      <el-table-column min-width="80px" align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="canShowCheck(scope.row)" v-on:click="check(scope.row)">审核</el-button>
          <el-button type="text" v-if="canShowDetail(scope.row)" v-on:click="detail(scope.row)">详情</el-button>
          <span v-if="!canShowCheck(scope.row) && !canShowDetail(scope.row)">——</span>
        </template>
      </el-table-column>
    </PeaceTable>

    <CheckDetail
      v-model="checkDialog.visible"
      v-bind:title="checkDialog.title"
      v-bind:data="checkDialog.data"
      v-on:refresh="get"
    ></CheckDetail>
  </div>
</template>

<script>
import CheckDetail from "./components/CheckDetail";

import Peace from "@src/library";
import Service from "./service";
import CONSTANT from "./constant";

export default {
  components: {
    CheckDetail
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find(key => ENUM[key] === value);
    }
  },

  data() {
    return {
      model: {
        hospitalName: "",
        role: "",
        checkStatus: "",
        startTime: "",
        endTime: ""
      },

      startPickerOptions: {
        disabledDate: time => {
          if (this.model.endTime) {
            return time.getTime() > new Date(this.model.endTime).getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      endPickerOptions: {
        disabledDate: time => {
          if (this.model.startTime) {
            return (
              time.getTime() <
                new Date(this.model.startTime).setDate(
                  new Date(this.model.startTime).getDate() - 1
                ) || time.getTime() > Date.now()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },

      checkDialog: {
        visible: false,
        title: "",
        data: {}
      },

      source: {
        ENUM_ORGANIZATION_TYPE: CONSTANT.ENUM_ORGANIZATION_TYPE,
        ENUM_APPLY_STATUS: CONSTANT.ENUM_APPLY_STATUS
      }
    };
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get();
    });
  },

  methods: {
    get() {
      const fetch = Service.getList;
      const params = Peace.util.deepClone(this.model);

      this.$refs.table.loadData({ fetch, params }).then(res => {
        res?.data?.list?.forEach(row => {
          row.hospitalName = Peace.validate.isEmpty(row.hospitalName)
            ? "——"
            : row.hospitalName;
          row.checkTime = Peace.validate.isEmpty(row.checkTime)
            ? "——"
            : row.checkTime;
        });
        return res;
      });
    },

    canShowCheck(row) {
      return row.checkStatus === CONSTANT.ENUM_APPLY_STATUS.待审核
    },

    canShowDetail(row) {
      return row.checkStatus === CONSTANT.ENUM_APPLY_STATUS.未通过
    },

    check(row) {
      this.checkDialog.title = "审核";
      this.checkDialog.visible = true;
      this.checkDialog.data = row;
    },

    detail(row) {
      this.checkDialog.title = "审核详情";
      this.checkDialog.visible = true;
      this.checkDialog.data = row;
    },

    getColorType(row) {
      const dict = {
        1: "info",
        2: "danger",
        3: "success",
      };

      return dict[row.checkStatus];
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px 0 0;

  &.primary {
    background: #e4e4e4;
  }
  &.info {
    background: var(--q-color-warning);
  }
  &.success {
    background: var(--q-color-primary);
  }
  &.danger {
    background: var(--q-color-negative);
  }
}

.date-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .date-separator {
    width: 20px;
    margin: 0 10px;
    border-top: 1px solid #dddddd;
  }
}
</style>