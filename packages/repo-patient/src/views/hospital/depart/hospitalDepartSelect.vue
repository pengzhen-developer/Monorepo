<template>
  <div class="tree-select-box">
    <template v-if="loading&&items.length>0">
      <div class="card tree-select-header"
           ref="hsp">
        <div class="card-avatar">
          <img :src="hospitalInfo.icon||hospitalInfo.hosPhoto"
               class />
        </div>
        <div class="card-body">
          <div class="card-name">{{hospitalInfo.name||hospitalInfo.hospitalName}}</div>
          <div class="block">
            <div :key="index"
                 class="card-small"
                 v-for="(item,index) in hospitalInfo.deptList">{{ (index == 0 ? '' : ' / ' ) + item}}
            </div>
          </div>
          <div class="block">
            <div :key="item"
                 class="card-label"
                 v-for="item in hospitalInfo.tags">{{item}}</div>
          </div>
        </div>
      </div>
      <van-tree-select :active-id="activeId"
                       :items="items"
                       :main-active-index="mainActiveIndex"
                       @click-item="onItemClick"
                       @click-nav="onNavClick" />
    </template>

    <template v-if="loading&&!items.length">
      <div class="none-page">
        <div class="icon icon_none_source"></div>
        <div class="none-text">
          暂无排班信息
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {},
  data() {
    return {
      idMappingServe: {
        consult: 'getDeptList',
        appointment: 'getRealDeptByRegister',
        returnVisit: 'getBookingDept'
      },
      data: {},
      params: {},
      hospitalInfo: {},
      items: [],
      loading: false,
      checkDept: {},
      // 左侧高亮元素的index
      mainActiveIndex: '',
      // 被选中元素的id
      activeId: '',
      deptParent: [],
      deptChild: []
    }
  },
  mounted() {
    const params = peace.util.decode(this.$route.params.json)
    this.params = params || {}
    this.$nextTick(() => {
      this.getDeptList()
    })
  },

  methods: {
    getDeptList() {
      let data = {},
        items = []
      if (this.params.id === 'returnVisit') {
        data.hospitalId = this.params.netHospitalId
      } else {
        data.netHospitalId = this.params.netHospitalId
      }
      peace.service.hospital[this.idMappingServe[this.params.id]](data).then((res) => {
        this.hospitalInfo = res.data.hospitalInfo
        res.data.list.map((item) => {
          if (item.childDept.length === 0) {
            items.push({
              text: item.netdeptName || item.deptName,
              id: item.id,
              children: [
                {
                  text: item.netdeptName || item.deptName,
                  id: item.id
                }
              ]
            })
          } else {
            items.push({
              text: item.netdeptName || item.deptName,
              id: item.id,
              children: item.childDept.map((it) => {
                return {
                  text: it.netdeptName || it.deptName,
                  id: it.id
                }
              })
            })
          }
          return items
        })
        this.items = items
        this.loading = true
        // this.activeId = items[0].children[0] ? items[0].children[0].id : ''
        this.height = +(window.innerHeight - (this.$refs.hsp.offsetHeight + 52))
      })
    },
    onNavClick(index) {
      let item = this.items[index]

      this.mainActiveIndex = index
      if (!item.children.length && this.params.id == 'consult') {
        this.goDoctorListPage({
          netHospitalId: this.hospitalInfo.netHospitalId,
          level: 1,
          txtId: item.id,
          txt: item.text
        })
      }
    },
    onItemClick(data) {
      console.log('data', data)
      this.activeId = data.id
      this.goDoctorListPage({
        // 问诊入参
        netHospitalId: this.hospitalInfo.netHospitalId,
        level: 2,
        deptChildId: data.id,
        deptChild: data.text,
        // 预约入参
        hospitalCode: this.params.netHospitalId,
        twoLevelDeptId: data.id
      })
    },
    goDoctorListPage(obj) {
      if (this.params.id == 'consult') {
        let index = this.mainActiveIndex || 0
        let deptId = this.items[index].id
        obj.netHospitalId = this.params.netHospitalId
        obj.deptId = deptId
        obj.childDeptId = deptId == this.activeId ? '' : this.activeId
        let json = peace.util.encode(obj)

        //问诊入口
        this.$router.push(`/components/doctorListOrganization/${json}`)
        return
      }
      if (this.params.id == 'appointment') {
        let json = peace.util.encode(obj)
        // 预约入口
        this.$router.push(`/appoint/doctor/appointDoctorList/${json}`)
        return
      }
      if (this.params.id == 'returnVisit') {
        let json = peace.util.encode({
          hospitalCode: obj.hospitalCode,
          departmentCode: obj.deptChildId
        })
        // 复诊入口
        this.$router.push(`/appoint/doctor/returnVisitDoctorList/${json}`)
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.none-page {
  justify-content: flex-start;
  .icon {
    margin-top: 150px;
  }
}
.tree-select-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .van-tree-select {
    flex: 1;
  }
}
.content {
  height: 100%;
  overflow: hidden;
}
.van-tree-select__nav {
  background: #f6f6f6;
}
.van-tree-select__nav-item {
  padding-right: 12px;
}
.van-sidebar-item--select {
  border-color: $-color--primary;
  color: $-color--primary;
}
.card {
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
  padding: 10px;
  margin: 0;
}
.card .card-label {
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.van-tree-select__nav-item--active {
  border-color: #00c6ae;
}
// .van-icon-checked:before {
//   content: '\F02F';
//   color: #00c6ae;
// }
.van-tree-select__item {
  font-weight: 500;
}
.van-tree-select__item--active {
  color: #00c6ae;
  i {
    &::before {
      content: '';
    }
  }
}
</style>