<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form :model="search"
               class="search"
               label-width="auto"
               label-suffix="："
               inline>
        <el-form-item label="广告名称">
          <el-input placeholder="请输入广告名称"
                    v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="展示位置">
          <el-select clearable
                     v-model="search.displayPosition">
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in displayPositions"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告功能">
          <el-select clearable
                     v-model="search.usefulness">
            <el-option :key="item.value"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in usefulnessList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button @click="getList(1)"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <div class="q-mb-lg">
        <el-button @click="openAdvertisementModelDialog('新增广告')"
                   type="primary">新增广告</el-button>
        <el-button @click="openDraggableDialog"
                   plain
                   type="primary">拖拽排序</el-button>
      </div>
      <peace-table :data="list"
                   class="list"
                   size="medium">
        <peace-table-column label="ID"
                            prop="id"></peace-table-column>
        <peace-table-column label="名称"
                            prop="name"></peace-table-column>
        <peace-table-column label="属性"
                            min-width="70">
          <template slot-scope="scope">
            <div>{{ scope.row.attribute | filterDictionary(CONSTANT.DisplayAttr, '--')  }}</div>
          </template>
        </peace-table-column>
        <peace-table-column label="展示位置"
                            min-width="110">
          <template slot-scope="scope">
            <div>{{ scope.row.displayPosition |  filterDictionary(CONSTANT.AdvertisementPosition, '--') }}</div>
          </template>
        </peace-table-column>
        <peace-table-column label="功能"
                            min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.usefulness | filterDictionary(CONSTANT.AdvertisementFeature, '--') }}</div>
          </template>
        </peace-table-column>
        <peace-table-column label="生效/失效"
                            width="180">
          <template slot-scope="scope">
            <div v-html="scope.row.effectiveTime"></div>
          </template>
        </peace-table-column>
        <peace-table-column label="图片"
                            min-width="100">
          <template slot-scope="scope">
            <img :src="baseUrl + scope.row.imgUrl"
                 alt="广告图片"
                 class="dept-image" />
          </template>
        </peace-table-column>
        <peace-table-column label="关联内容"
                            prop="content"></peace-table-column>
        <peace-table-column fixed="right"
                            label="操作">
          <template slot-scope="scope">
            <el-button @click="openAdvertisementModelDialog('编辑广告', scope.row)"
                       type="text">修改</el-button>
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
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :title="title"
                  :visible.sync="advertisementModelDialogVisible"
                  v-if="advertisementModelDialogVisible"
                  append-to-body
                  width="500px">
      <AdvertisementModel :info="currentAdvertisementModel"
                          @close="closeAdvertisementModel"
                          @create="create"
                          @update="update" />
    </peace-dialog>
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="draggableDialogVisible"
                  append-to-body
                  class="scroll-body"
                  title="广告排序"
                  v-if="draggableDialogVisible"
                  width="500px">
      <AdvertisementDraggable :list="dragList"
                              @getSorts="getSorts" />
    </peace-dialog>
  </div>
</template>
<script>
import AdvertisementService from './service'
import CONSTANT from './constant'
import AdvertisementModel from './components/AdvertisementModel'
import AdvertisementDraggable from './components/AdvertisementDraggable'

export default {
  name: 'Advertising',
  components: { AdvertisementModel, AdvertisementDraggable },
  data() {
    return {
      CONSTANT,
      baseUrl: process.env.VUE_APP_API_BASE + 'nethospital/',
      title: '编辑广告',
      search: {
        name: '',
        displayPosition: '',
        usefulness: '',
        pageNumber: 1,
        pageSize: 10
      },
      dragList: [],
      list: [],
      count: 0,
      currentAdvertisementModel: {
        attribute: 0,
        displayPosition: 0
      },
      advertisementModelDialogVisible: false,
      draggableDialogVisible: false
    }
  },
  computed: {
    displayPositions() {
      return CONSTANT.AdvertisementPosition
    },
    usefulnessList() {
      return CONSTANT.AdvertisementFeature
    }
  },
  methods: {
    // 获取列表
    getList(number) {
      if (number && this.search.pageNumber !== number) {
        this.search.pageNumber = number
      }
      const { name, usefulness, pageNumber, pageSize } = this.search
      const displayPosition = this.search.displayPosition || 1

      AdvertisementService.getAdvertisements({ name: name, displayPosition: displayPosition, usefulness: usefulness, p: pageNumber, size: pageSize }).then(
        (res) => {
          const data = res.data
          this.list = this.computeEffectiveTime(data.list)
          this.count = data.total
        }
      )
    },
    // 计算有效/失效显示
    computeEffectiveTime(list) {
      const currentTime = new Date().getTime()
      list.forEach((item) => {
        if (item.isLongTerm === 1) {
          item.effectiveTime = '长期有效'
        } else if (new Date(item.endTime.replace(/-/g, '/')).getTime() < currentTime) {
          item.effectiveTime = '已失效'
        } else {
          item.effectiveTime = `${item.startTime}<br />${item.endTime}`
        }
      })
      return list
    },
    // 打开 新增/编辑广告 Dialog
    openAdvertisementModelDialog(title, row) {
      this.title = title
      this.currentAdvertisementModel = row || {
        attribute: 1,
        displayPosition: 2,
        usefulness: 1
      }
      this.advertisementModelDialogVisible = true
    },
    // 关闭 新增/编辑广告  Dialog
    closeAdvertisementModel() {
      this.advertisementModelDialogVisible = false
      this.getList(1)
    },
    // 新增广告
    create(params) {
      let { id, name, attribute, displayPosition, usefulness, startTime, endTime, imgUrl, contentId } = params
      let data = {
        id,
        name,
        attribute,
        displayPosition,
        usefulness,
        startTime,
        endTime,
        imgUrl,
        contentId,
        type: 1
      }
      AdvertisementService.createAdvertisement(data).then((res) => {
        const msg = res.msg || '广告新增成功'
        Peace.util.success(msg)
        this.closeAdvertisementModel()
      })
    },
    // 更新广告
    update(params) {
      let { id, name, attribute, displayPosition, usefulness, startTime, endTime, imgUrl, contentId } = params
      let data = {
        id,
        name,
        attribute,
        displayPosition,
        usefulness,
        startTime,
        endTime,
        imgUrl,
        contentId,
        type: 2
      }
      AdvertisementService.updateAdvertisement(data).then((res) => {
        const msg = res.msg || '广告修改成功'
        Peace.util.success(msg)
        this.closeAdvertisementModel()
      })
    },
    // 进入拖拽排序
    openDraggableDialog() {
      AdvertisementService.getAdvertisements({ name: '', displayPosition: 1, usefulness: '', p: 1, size: this.count }).then((res) => {
        const list = res.data.list
        // 过滤不展示的科室
        this.dragList = list.filter((item) => {
          item.isCurrent = true
          const isNotEffective = item.endTime && new Date().getTime() > new Date(item.endTime.replace(/-/g, '/')).getTime()

          return item.attribute === 1 && !isNotEffective
        })
        this.draggableDialogVisible = true
      })
    },
    // 获取排序
    getSorts(param) {
      const list = param

      list.forEach((element, index) => {
        element.sort = index + 1
      })
      const data = new FormData()
      data.append('list', JSON.stringify(list))

      AdvertisementService.updateSorts(data)
        .then(() => {
          Peace.util.success('广告排序已更新！')
          this.getList(1)
        })
        .finally(() => {
          this.draggableDialogVisible = false
        })
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList(1)
    })
  }
}
</script>
<style lang="scss" scoped>
.dept-image {
  height: 30px;
  display: inline-block;
  vertical-align: middle;
}
</style>
