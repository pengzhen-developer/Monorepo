<template>
  <div>
    <el-form :model="viewModel" inline>
      <el-form-item label="随访状态">
        <el-select placeholder v-model="viewModel.status">
          <el-option :key="item.key" :label="item.status" :value="item.key" v-for="item in dataSource.status"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select multiple placeholder style="width: 400px;" v-model="viewModel.tag">
          <el-option :key="item.tag" :label="item.tag" :value="item.tag" v-for="item in dataSource.tag"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label=" ">
        <el-button @click="get" type="primary">查询</el-button>
      </el-form-item>
    </el-form>

    <hr />

    <peace-table pagination ref="table">
      <el-table-column label="患者姓名" prop="familyName" width="100"></el-table-column>
      <el-table-column label="性别" prop="sex" width="100"></el-table-column>
      <el-table-column label="年龄" prop="age" width="100"></el-table-column>
      <el-table-column :formatter="(r, c, v) => formatStatus(r, c, v)" label="随访状态" prop="followStatus" width="100"></el-table-column>
      <el-table-column label="标签" prop="tag">
        <template slot-scope="scope">
          <el-tag :key="item" class="tag" type="info" v-for="item in scope.row.tag">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="病程记录" prop="courseCount" width="100">
        <template slot-scope="scope">
          <el-button @click="view(scope.row)" type="text">{{ scope.row.courseCount }}</el-button>
        </template>
      </el-table-column>
    </peace-table>

    <peace-dialog :visible.sync="dialog.visible" title="病程记录">
      <DiseaseCourse :id="dialog.id"></DiseaseCourse>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import DiseaseCourse from './../patientDetail/DiseaseCourse'

export default {
  components: {
    DiseaseCourse
  },

  data() {
    return {
      viewModel: {
        status: '',
        tag: ''
      },

      dataSource: {
        status: [],
        tag: []
      },

      dialog: {
        visible: false,
        id: ''
      }
    }
  },

  created() {
    peace.service.follow.getFollowStatus().then(res => {
      this.dataSource.status = res.data
    })

    peace.service.follow.getTags({ type: 'disease' }).then(res => {
      this.dataSource.tag = res.data
    })
  },

  mounted() {
    this.$nextTick(function() {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = peace.service.follow.followPatientList
      const params = this.viewModel

      this.$refs.table.loadData({
        fetch,
        params
      })
    },

    view(row) {
      this.dialog.visible = true
      this.dialog.id = row.familyId
    },

    formatStatus(r, c, v) {
      return this.dataSource.status.find(item => item.key === v).status
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .tag {
  border: 0;
  margin: 0 5px 5px 0;
}
</style>
