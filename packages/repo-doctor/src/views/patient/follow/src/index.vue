<template>
  <div class="layout-route">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="viewModel">
        <el-form-item label="随访状态：">
          <el-select placeholder="全部"
                     v-model="viewModel.status">
            <el-option :key="item.key"
                       :label="item.status"
                       :value="item.key"
                       v-for="item in dataSource.status"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标签：">
          <el-select multiple
                     placeholder="全部"
                     style="width: 400px;"
                     v-model="viewModel.tag">
            <el-option :key="item.tag"
                       :label="item.tag"
                       :value="item.tag"
                       v-for="item in dataSource.tag"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn label="患者姓名"
                          prop="familyName"
                          width="100"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          prop="sex"
                          width="100"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          prop="age"
                          width="100"></PeaceTableColumn>
        <PeaceTableColumn :formatter="(r, c, v) => formatStatus(r, c, v)"
                          label="随访状态"
                          prop="followStatus"
                          width="100"></PeaceTableColumn>
        <PeaceTableColumn label="标签"
                          prop="tag">
          <template slot-scope="scope">
            <el-tag :key="item"
                    class="tag"
                    type="info"
                    v-for="item in scope.row.tag">{{ item }}</el-tag>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="病程管理"
                          prop="courseCount"
                          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.courseCount">
              <el-button @click="view(scope.row)"
                         type="text">{{ scope.row.courseCount }}</el-button>
            </template>
            <template v-else>
              暂无
            </template>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="dialog.visible"
                 title="病程管理">
      <DiseaseCourse :id="dialog.id"></DiseaseCourse>
    </PeaceDialog>
  </div>
</template>

<script>
import DiseaseCourse from '@src/views/patient/patientDetail/src/components/DiseaseCourse'

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
    Peace.service.follow.getFollowStatus().then((res) => {
      this.dataSource.status = res.data
      this.viewModel.status = res.data[0] && res.data[0].key
    })

    Peace.service.follow.getTags({ type: 'disease' }).then((res) => {
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
      const fetch = Peace.service.follow.followPatientList
      const params = this.viewModel

      this.$refs.table.loadData({
        fetch,
        params
      })
    },

    view(row) {
      if (row.courseCount) {
        this.dialog.visible = true
        this.dialog.id = row.familyId
      } else {
        Peace.util.success('暂无病程管理')
      }
    },

    formatStatus(r, c, v) {
      return this.dataSource.status.find((item) => item.key === v).status
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .tag {
  border: 0;
  margin: 0 5px 5px 0;
}
</style>
