<template>
  <div>
    <div class="card"
         ref="hsp">
      <div class="card-avatar">
        <img :src="hospitalInfo.icon"
             class />
      </div>
      <div class="card-body">
        <div class="card-name">{{hospitalInfo.name}}</div>
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
                     :height="height"
                     :items="items"
                     :main-active-index="mainActiveIndex"
                     @itemclick="onItemClick"
                     @navclick="onNavClick" />
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
        appointment: 'getRealDeptByRegister'
      },
      data: {},
      params: {},
      hospitalInfo: {},
      items: [],
      checkDept: {},
      height: 500,
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: '',
      deptParent: [],
      deptChild: []
    }
  },
  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.params = params || {}
    this.getDeptList()
  },
  methods: {
    getDeptList() {
      let data,
        items = []

      data = {
        netHospitalId: this.params.netHospitalId
      }
      peace.service.hospital[this.idMappingServe[this.params.id]](data).then(res => {
        this.hospitalInfo = res.data.hospitalInfo
        res.data.list.map(item => {
          if (item.childDept.length === 0) {
            items.push({
              text: item.netdeptName,
              id: item.id,
              children: [
                {
                  text: item.netdeptName,
                  id: item.id
                }
              ]
            })
          } else {
            items.push({
              text: item.netdeptName,
              id: item.id,
              children: item.childDept.map(it => {
                return {
                  text: it.netdeptName,
                  id: it.id
                }
              })
            })
          }
          return items
        })
        this.items = items
        this.activeId = items[0].children[0] ? items[0].children[0].id : ''
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
      this.activeId = data.id
      this.goDoctorListPage({
        // 咨询入参
        netHospitalId: this.hospitalInfo.netHospitalId,
        level: 2,
        deptChildId: data.id,
        deptChild: data.text,
        // 预约入参
        hospitalCode: this.hospitalInfo.netHospitalId,
        twoLevelDeptId: data.id
      })
    },
    goDoctorListPage(obj) {
      if (this.params.id == 'consult') {
        obj.netHospitalId = this.params.netHospitalId
        obj.type = 'departDoctorList'

        let json = peace.util.encode(obj)

        // 咨询入口
        this.$router.push(`/components/doctorList/${json}`)
        return
      }
      if (this.params.id == 'appointment') {
        let json = peace.util.encode(obj)

        // 预约入口
        this.$router.push(`/appoint/doctor/appointDoctorList/${json}`)
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  overflow: hidden;
}
.van-sidebar-item--select {
  border-color: $-color--primary;
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
.van-icon-checked:before {
  content: '\F02F';
  color: #00c6ae;
}
.van-tree-select__item--active {
  color: #00c6ae;
}
</style>