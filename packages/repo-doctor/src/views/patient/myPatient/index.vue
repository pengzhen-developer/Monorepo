<template>
  <div>
    <el-form :model="view.model" inline>
      <el-form-item label="患者姓名">
        <el-input placeholder v-model="view.model.patient_name"></el-input>
      </el-form-item>
      <el-form-item label="患者来源">
        <el-select clearable placeholder="全部" v-model="view.model.source">
          <el-option :key="item.key" :label="item.source" :value="item.key" v-for="item in source.group_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-input placeholder v-model="view.model.group_name"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="get" round type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr>

    <peace-table pagination ref="table">
      <peace-table-column label="患者姓名" prop="real_name" width="140">
        <template slot-scope="scope">
          <span class="private-doctor" v-if="scope.row.isPrivateDoctor">私</span>

          <span>{{ scope.row.patient_remarks || scope.row.real_name || scope.row.weixin_name }}</span>
        </template>
      </peace-table-column>
      <peace-table-column label="联系方式" prop="contact" width="120"></peace-table-column>
      <peace-table-column align="left" label="最近咨询" min-width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.family_name }}</span>&nbsp;
          <span>{{ scope.row.family_sex }}</span>&nbsp;
          <span>{{ scope.row.family_age }}岁</span>&nbsp;
          <span>{{ scope.row.diagnose }}</span>&nbsp;
          <span>{{ scope.row.family_time }}</span>&nbsp;
        </template>
      </peace-table-column>
      <peace-table-column :formatter="(r,c,v) => { return this.source.group_name.find(item => item.key === v).source }" label="患者来源" prop="source"></peace-table-column>
      <peace-table-column align="left" label="所属分组" min-width="200" prop="group_names">
        <template slot-scope="scope">
          <el-tag :key="item" style="margin: 5px" type="info" v-for="item in scope.row.group_names.split(',')" v-show="item">{{ item }}</el-tag>
        </template>
      </peace-table-column>
      <peace-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
        </template>
      </peace-table-column>
    </peace-table>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      view: {
        model: {
          patient_name: undefined,
          source: undefined,
          group_name: undefined
        }
      },

      source: {
        group_name: []
      }
    }
  },

  created() {
    peace.service.patient.getSource().then(res => {
      this.source.group_name = res.data
    })
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = peace.service.patient.patientListPc
      const params = this.view.model

      this.$refs.table.loadData({ fetch, params })
    },

    showDetail(row) {
      const currentMenu = {
        id: 1,
        pid: null,
        closable: true,
        name: row.patient_remarks || row.real_name || row.weixin_name,
        title: row.patient_remarks || row.real_name || row.weixin_name,
        path: '/patient/myPatient/patientDetail/' + row.patient_id
      }

      // 将当前选中的项，添加到 tab
      this.$store.commit('layout/pushTab', currentMenu)

      // 选中当前 tab
      this.$store.commit('layout/selectTab', currentMenu.path)

      // 跳转当前路由
      this.$router.push(currentMenu.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.private-doctor {
  background: rgba(0, 198, 174, 1);
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
  padding: 0 4px;

  margin: 0 10px 0 0;
}

.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}

.el-form-item {
  margin-right: 40px;

  /deep/ .el-input {
    width: 140px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}
</style>
