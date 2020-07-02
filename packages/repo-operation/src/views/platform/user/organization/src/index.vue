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
      <el-form-item label="联系人：">
        <el-input v-model="model.linkman" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input v-model="model.tel" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="所属机构：">
        <el-input v-model="model.hospitalName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="账号状态：">
        <el-select v-model="model.isOpen" placeholder clearable>
          <el-option label="全部" value></el-option>
          <el-option
            v-for="(value, label) in source.ENUM_IS_OPEN"
            v-bind:key="value"
            v-bind:label="label"
            v-bind:value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" icon="el-icon-search" v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button
      style="margin-bottom: 30px;"
      type="primary"
      icon="el-icon-plus"
      v-on:click="addOrganization"
    >新增</el-button>

    <PeaceTable ref="table" size="mini" pagination>
      <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column min-width="180px" label="机构名称" align="center" prop="hospitalName"></el-table-column>
      <el-table-column min-width="100px" label="机构类型" prop="role"></el-table-column>
      <el-table-column min-width="100px" label="联系人" prop="linkman"></el-table-column>
      <el-table-column min-width="120px" label="手机号码" prop="tel"></el-table-column>
      <el-table-column min-width="100px" label="入驻方式" align="center" prop="source"></el-table-column>
      <el-table-column min-width="100px" label="账号状态" align="center" prop="isOpen">
        <template slot-scope="scope">{{ scope.row.isOpen | getEnumLabel(source.ENUM_IS_OPEN) }}</template>
      </el-table-column>
      <el-table-column width="100px" label="认证时间" align="center" prop="checkTime"></el-table-column>
      <el-table-column min-width="180px" align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-on:click="toDetail(scope.row)">基本信息</el-button>
          <el-button type="text" v-on:click="toService(scope.row)">已选服务</el-button>
        </template>
      </el-table-column>
    </PeaceTable>

    <OrganizationDetail v-model="detailDialog.visible" v-bind:data="detailDialog.data"></OrganizationDetail>

    <ServiceList v-model="serviceDialog.visible" v-bind:data="serviceDialog.data"></ServiceList>

    <AddOrganization v-model="addDialog.visible" v-on:refresh="get"></AddOrganization>
  </div>
</template>

<script>
import OrganizationDetail from "./components/OrganizationDetail";
import ServiceList from "./components/ServiceList";
import AddOrganization from "./components/AddOrganization";

import Peace from "@src/library";
import Service from "./service";
import CONSTANT from "./constant";

export default {
  components: {
    OrganizationDetail,
    ServiceList,
    AddOrganization
  },

  filters: {
    getEnumLabel: function(value, ENUM) {
      return Object.keys(ENUM).find(key => ENUM[key] === value);
    }
  },

  data() {
    return {
      model: {
        linkman: "",
        tel: "",
        hospitalName: "",
        isOpen: ""
      },

      detailDialog: {
        visible: false,
        data: {}
      },

      serviceDialog: {
        visible: false,
        data: {}
      },

      addDialog: {
        visible: false
      },

      source: {
        ENUM_CHECK_STATUS: CONSTANT.ENUM_CHECK_STATUS,
        ENUM_IS_OPEN: CONSTANT.ENUM_IS_OPEN
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

    // 基本信息
    toDetail(row) {
      this.detailDialog.visible = true;
      this.detailDialog.data = row;
    },

    // 已选服务
    toService(row) {
      this.serviceDialog.visible = true;
      this.serviceDialog.data = row;
    },

    // 新增机构
    addOrganization() {
      this.addDialog.visible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>