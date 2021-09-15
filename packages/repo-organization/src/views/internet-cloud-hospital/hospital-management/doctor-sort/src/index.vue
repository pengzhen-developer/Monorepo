<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="姓名">
          <PeaceInput v-model.trim="model.docName"
                      maxlength="50"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item label="二级科室">
          <PeaceSelect v-model="model.deptId"
                       clearable
                       filterable
                       placeholder="请选择">
            <el-option v-for="item in secondDeptList"
                       :key="item.id"
                       :label="item.netdept_name"
                       :value="item.id"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item label="推荐医生">
          <PeaceSelect v-model="model.isRecommend"
                       clearable
                       placeholder="请选择">
            <el-option v-for="item in source.ENUM_RECOMMEND"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </PeaceSelect>
        </el-form-item>
        <el-form-item label="排序号">
          <PeaceInput v-model.trim="model.sort"
                      maxlength="50"
                      placeholder="请输入"></PeaceInput>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  size="mini"
                  pagination
                  v-loading="loading">
        <PeaceTableColumn width="80px"
                          label="序号">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="姓名"
                          min-width="100"
                          prop="docName"></PeaceTableColumn>
        <PeaceTableColumn label="二级科室"
                          min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.netdeptChild || '—' }}</div>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="推荐医生"
                          min-width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isRecommend"
                       @change="setRecommend(scope.row)"
                       :active-value="1"
                       :inactive-value="0"></el-switch>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="排序"
                          min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.docId !== currentId">{{scope.row.sort}}</span>
            <el-input v-else
                      class="input-sort"
                      maxlength="5"
                      v-model.trim="currentSort"></el-input>
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          fixed="right"
                          width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.docId !== currentId"
                       type="text"
                       v-on:click="edit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.docId === currentId"
                       type="text"
                       v-on:click="save()">保存</el-button>
            <el-button v-if="scope.row.docId === currentId"
                       type="text"
                       v-on:click="cancel()">取消</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service'

export default {
  name: 'DoctorsSort',
  components: {},
  data() {
    return {
      loading: true,
      source: {
        ENUM_RECOMMEND: CONSTANT.ENUM_RECOMMEND
      },
      secondDeptList: [],
      model: {
        docName: '',
        deptId: '',
        isRecommend: '',
        sort: ''
      },
      currentId: '',
      currentSort: ''
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getSecondDept()
      this.fetch()
    })
  },
  methods: {
    fetch() {
      this.loading = true
      const fetch = Service.getSortDoctorList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).finally(() => {
        this.loading = false
      })
    },

    //获取二级科室列表接口
    getSecondDept() {
      const params = {}
      Service.getSecondDept(params).then((res) => {
        this.secondDeptList = res.data
      })
    },

    // 设置推荐医生
    setRecommend(row) {
      this.$confirm(`是否${row.isRecommend === 1 ? '开启' : '关闭'}推荐医生？`, '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          let params = {
            docId: row.docId,
            isRecommend: row.isRecommend
          }
          Service.setRecommendDoctor(params)
            .then((res) => {
              Peace.util.success(res.msg)
              this.fetch()
            })
            .catch(() => {
              row.isRecommend = row.isRecommend === 1 ? 0 : 1
            })
        })
        .catch(() => {
          row.isRecommend = row.isRecommend === 1 ? 0 : 1
        })
    },

    edit(row) {
      this.currentSort = row.sort
      this.currentId = row.docId
    },

    cancel() {
      this.currentSort = ''
      this.currentId = ''
    },

    // 排序医生
    save() {
      if (Peace.validate.isEmpty(this.currentSort) || this.currentSort.length > 5 || !Peace.validate.isPInterger(this.currentSort)) {
        Peace.util.warning('序号为正整数，最多五位数，不允许为空')
        return false
      }
      let params = {
        docId: this.currentId,
        sortNumber: this.currentSort
      }
      Service.sortDoctor(params).then(() => {
        this.currentSort = ''
        this.currentId = ''
        this.fetch()
      })
    }
  }
}
</script>

<style scoped>
.input-sort {
  width: 88px;
}
</style>