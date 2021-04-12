<template>
  <div class="layout-route bg-grey-2">
    <div class="serve-config">
      <el-row class="drag-item drug-head">
        <el-col class="drag-cell"
                :span="8">服务名称</el-col>
        <el-col class="drag-cell"
                :span="8">服务状态</el-col>
        <el-col class="drag-cell"
                :span="8">操作</el-col>
      </el-row>
      <draggable v-model="serviceList"
                 @change="listSort">
        <transition-group>
          <el-row class="drag-item"
                  v-for="item in serviceList"
                  :key="item.id">
            <el-col class="drag-cell"
                    :span="8">{{item.serviceName}}</el-col>
            <el-col class="drag-cell"
                    :span="8">{{item.isOpen == 1 ? '已启用':(item.isOpen == 2 ? '已禁用':'')}}</el-col>
            <el-col class="drag-cell"
                    :span="8">
              <svg t="1602500148261"
                   class="icon drag-icon"
                   viewBox="0 0 1228 1024"
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   p-id="4498"
                   width="32"
                   height="32">
                <path d="M320 315.733333c8.533333 8.533333 17.066667 12.8 29.866667 12.8 8.533333 0 17.066667-4.266667 25.6-8.533333 17.066667-12.8 17.066667-38.4 4.266666-55.466667L226.133333 98.133333c-12.8-17.066667-42.666667-17.066667-55.466666 0L17.066667 264.533333c-12.8 17.066667-12.8 38.4 4.266666 55.466667 17.066667 12.8 38.4 12.8 55.466667-4.266667l89.6-93.866666v584.533333l-89.6-93.866667c-12.8-17.066667-38.4-17.066667-55.466667-4.266666-17.066667 12.8-17.066667 38.4-4.266666 55.466666L170.666667 930.133333l4.266666 4.266667h4.266667s4.266667 0 4.266667 4.266667h25.6s4.266667 0 4.266666-4.266667h4.266667l4.266667-4.266667 153.6-166.4c12.8-17.066667 12.8-38.4-4.266667-55.466666-17.066667-12.8-38.4-12.8-55.466667 4.266666l-89.6 93.866667V221.866667l93.866667 93.866666z m657.066667-38.4H490.666667c-25.6 0-46.933333-21.333333-46.933334-42.666666s21.333333-42.666667 46.933334-42.666667h486.4c25.6 0 46.933333 21.333333 46.933333 42.666667s-21.333333 42.666667-46.933333 42.666666z m0 277.333334H490.666667c-25.6 0-46.933333-21.333333-46.933334-42.666667 0-25.6 21.333333-42.666667 46.933334-42.666667h486.4c25.6 0 46.933333 21.333333 46.933333 42.666667s-21.333333 42.666667-46.933333 42.666667z m0 277.333333H490.666667c-25.6 0-46.933333-21.333333-46.933334-42.666667 0-25.6 21.333333-42.666667 46.933334-42.666666h486.4c25.6 0 46.933333 21.333333 46.933333 42.666666s-21.333333 42.666667-46.933333 42.666667z"
                      fill="#3099A6"
                      p-id="4499"></path>
              </svg>
              <el-switch :active-value="1"
                         :inactive-value="2"
                         v-model="item.isOpen"
                         @change="switchService(item)"></el-switch>
            </el-col>
          </el-row>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import Service from './service'

export default {
  name: 'ServiceSetting',
  components: {
    draggable
  },
  data() {
    return {
      serviceList: []
    }
  },
  created() {
    this.getConfigList({})
  },
  methods: {
    // 获取机构下已开通服务机构的列表
    getConfigList(item) {
      Service.getServiceConfig().then((res) => {
        let data = res.data.list
        this.serviceList = data.map((item, index) => {
          return Object.assign(item, { order: index + 1 })
        })
        const obj = data.find((item) => item.serviceName == '复诊续方')
        if (item.type == 'switch' && item.serviceName == '复诊续方' && obj.isOpen == 1 && item.confirm) {
          this.$confirm('开启复诊续方服务，需对提供复诊续方服务的医生进行排班，否则患者无法在线预约复诊续方', '提示', {
            confirmButtonText: '去排班',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            this.$router.push({ path: '/internet-cloud-hospital/setting-center/return-visit-setting/scheduling' })
          })
        }
      })
    },
    // 切换服务配置
    switchService(info) {
      let data = this.serviceList.filter((item) => {
        return item.id === info.id
      })
      if (data.length === 1) {
        let { id, serviceName, isOpen } = data[0]
        this.$confirm(`是否确认${isOpen === 2 ? '关闭' : '开通'}${serviceName}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        })
          .then(() => {
            Service.setServiceConfig({ id }).then(() => {
              Peace.util.success('设置成功！')
              this.getConfigList({ type: 'switch', serviceName, confirm: true })
            })
          })
          .catch(() => {
            this.getConfigList({ type: 'switch', serviceName, confirm: false })
          })
      } else {
        Peace.util.error('数据有误！')
      }
    },
    // 服务列表排序
    listSort() {
      // 降序排列
      let serviceList = Peace.util.deepClone(this.serviceList).reverse()
      serviceList = serviceList.map((item, index) => {
        return {
          serviceId: item.serviceId,
          serviceName: item.serviceName,
          sort: index + 1
        }
      })
      Service.sortServiceConfig({ serviceList: serviceList })
    }
  }
}
</script>

<style lang="scss" scoped>
.serve-config {
  min-height: 100%;
  padding: 30px 32px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  .drag-item {
    display: flex;
    height: 54px;
    border-bottom: 1px solid #e8e8e8;
    &.drug-head {
      font-weight: 600;
      background-color: #fafafa;
      border-radius: 4px 4px 0px 0px;
    }
  }
  .drag-cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .drag-icon {
    margin-right: 52px;
    width: 24px;
    height: 20px;
    color: var(--q-color-primary);
    cursor: pointer;
  }
}
</style>
