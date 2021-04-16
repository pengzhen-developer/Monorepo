<template>
  <div class="layout-route full-width flex">
    <div class=" hos-content full-width bg-white">
      <div class="hos-list flex full-width q-pt-28 q-pb-4 q-pr-24 ">
        <div class="hos-item flex column justify-between q-ml-24 q-mb-24 q-pa-16"
             v-for="(item,index) in list"
             :key="index">
          <div class="flex q-mb-12 no-wrap">
            <el-image style="width:36px;height: 36px;"
                      :src="require('../assets/images/ic_hospital.png')"></el-image>
            <span class="text-bold q-ml-8"
                  style="font-size:20px;width: 12em;">{{item.hosName}}</span>
          </div>
          <div class="flex justify-between items-end"
               style="line-height:1;">
            <div style="font-size:16px;">用户总数：<span class="text-primary text-bold"
                    style="font-size:36px;">{{item.patientCount}}</span></div>
            <div class="text-primary flex items-center cursor-pointer"
                 style="font-size:12px;"
                 @click="onClick(item)">查看详情<i class="el-icon-arrow-right el-icon--right"></i> </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'HospitalList',
  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    onClick(item) {
      this.$emit('onItemClick', item)
    },
    getList() {
      Service.getPatientListByOrg().then((res) => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hos-content {
  box-shadow: 0px 1px 4px 0px #e0e0e0;
  border-radius: 2px;
  color: rgba(0, 0, 0, 0.85);
  .hos-item {
    min-height: 150px;
    background: #f9f9f9;
    border-radius: 4px;
    width: calc((100% / 3) - 24px);
    min-width: 330px;
  }
}
</style>