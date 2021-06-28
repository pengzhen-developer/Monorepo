<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               class="search"
               label-width="auto"
               label-suffix="："
               inline>
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名"
                    v-model="search.patientName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input placeholder="请输入手机号"
                    v-model="search.tel"></el-input>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="getList(1)"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <peace-table :data="list"
                   size="medium">
        <peace-table-column label="序号"
                            type="index"
                            width="80px"></peace-table-column>
        <peace-table-column label="姓名"
                            prop="name"></peace-table-column>
        <peace-table-column label="基本信息">
          <template slot-scope="scope">
            <span>{{ scope.row.sex }} {{ scope.row.age && `，${ scope.row.age }` }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="联系方式">
          <template slot-scope="scope">
            <span>{{ scope.row.tels.join('/') }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="标签">
          <template slot-scope="scope">
            <span>{{ scope.row.diagnoseInfo.join('，') || '——' }}</span>
          </template>
        </peace-table-column>
        <peace-table-column label="问诊"
                            prop="inquiryTotal"></peace-table-column>
        <peace-table-column label="面诊"
                            prop="faceToFaceTotal"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)"
                       type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
      <el-pagination :current-page.sync="search.pageNumber"
                     :page-size.sync="search.pageSize"
                     :total="count"
                     @current-change="getList"
                     @size-change="getList(1)"
                     background
                     layout="total, sizes ,->, prev, pager,  next"
                     class="q-mt-10"></el-pagination>
    </div>
  </div>
</template>
<script>
import UserService from '../service'

export default {
  name: 'List',

  data() {
    return {
      viewType: 'list',

      search: {
        patientName: '',
        tel: '',
        pageNumber: 1,
        pageSize: 10
      },
      list: [],
      count: 0
    }
  },

  methods: {
    getList(number) {
      if (number && this.search.pageNumber !== number) {
        this.search.pageNumber = number
      }
      const { patientName, tel, pageNumber, pageSize } = this.search
      UserService.getFamilyInfo({ name: patientName, tel: tel, p: pageNumber, size: pageSize }).then((res) => {
        const data = res.data
        this.list = data.list
        this.count = data.total
      })
    },

    showDetail(row) {
      let obj = { id: row.patientNo, name: row.name }
      this.$emit('onBtnClick', obj)
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
