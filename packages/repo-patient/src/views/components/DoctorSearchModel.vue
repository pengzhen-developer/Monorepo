<template>
  <div>
    <div class="search"
         :class="{'no-border':show}">
      <!-- <div class="search-row">
      <van-field v-model="model.name"
                 label="文本"
                 placeholder="请输入用户名"
                 clearable />
    </div> -->
      <div class="search-row">
        <div class="search-item"
             :class="{'active':canHeightLight(item)}"
             v-for="(item,index) in list"
             :key="index">
          <div @click="showPopup(item.type,index)">

            <span>{{item.isSelect&&item.textSelected? item.textSelected : item.text}}</span>
            <i class="icon-arrow"
               :class="getArrowStyle(item)"></i>

          </div>
        </div>
      </div>
    </div>
    <div class="searchBlock"
         :style="{height:searchHeight+'px'}"></div>
    <div class="popup-container">
      <van-popup v-model="show"
                 get-container=".popup-container"
                 @close="close"
                 position="top"
                 :overlay-style="{top:searchHeight   +'px'}"
                 :style="{top:searchHeight   +'px',minHeight:'10%',maxHeight:'80%'}">
        <!-- 科室选择 -->
        <div v-show="type==='department'">
          <van-tree-select height="386"
                           :active-id="activeId"
                           :items="departmentList"
                           :main-active-index="mainActiveIndex"
                           @click-item="onItemClick"
                           @click-nav="onNavClick" />
        </div>
        <!-- 综合排序 -->
        <div v-show="type==='comprehensive'">
          <van-cell-group>
            <van-cell v-for="item in comprehensiveList"
                      :key="item.value"
                      :title="item.label"
                      clickable
                      class="compre-item"
                      :class="{'active':item.value===model.orderByType}"
                      @click="selectComprehensive(item)">
            </van-cell>
          </van-cell-group>
        </div>
        <!-- 筛选 -->
        <div class="screen"
             v-show="type==='screen'">
          <div class="screen-item"
               v-for="(item,index) in screenList"
               :key="index">
            <div class="screen-title">{{item.title}}</div>
            <div class="screen-content">
              <van-button class="screen-btn"
                          round
                          v-for="(child,idx) in item.list"
                          :key="idx"
                          :class="{'active':child.seleced}"
                          @click="selectScreent(index,idx)">{{child.text}}</van-button>
            </div>
          </div>
          <div class="footer">
            <div @click="reset">重置</div>
            <div @click="submitSelectScreent">确认</div>
          </div>
        </div>

      </van-popup>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'DoctorSearchModel',
  props: {
    searchInfo: Object
  },
  data() {
    return {
      model: {
        // name: '',
        orderByType: 'comprehensive',
        doctorLevel: '',
        deptId: '',
        childDeptId: '',
        netHospitalId: '',
        inquiryType: '',
        serviceType: ''
      },
      show: false,
      active: '',
      type: '',
      list: [
        { text: '科室选择', textSelected: '', textSelecting: '', type: 'department', isSelect: false, isOpen: false },
        { text: '综合排序', textSelected: '', textSelecting: '', type: 'comprehensive', isSelect: false, isOpen: false },
        { text: '筛选', textSelected: '', textSelecting: '', type: 'screen', isSelect: false, isOpen: false }
      ],
      comprehensiveList: [{ value: 'comprehensive', label: '综合排序' }, { value: 'visitsNum', label: '问诊量' }, { value: 'feedback', label: '好评率' }],
      screenList: [
        {
          title: '问诊类型',
          type: 'inquiryType',
          list: [
            { text: '图文', serviceType: 'inquiry', inquiryType: 'image', seleced: false },
            { text: '视频', serviceType: 'inquiry', inquiryType: 'video', seleced: false },
            { text: '复诊', serviceType: 'returnVisit', inquiryType: '', seleced: false }
          ]
        },
        {
          title: '医生职称',
          type: 'doctorLevel',
          list: [
            { text: '主任医师', doctorLevel: 4, seleced: false },
            { text: '副主任医师', doctorLevel: 3, seleced: false },
            { text: '主治医师', doctorLevel: 2, seleced: false }
          ]
        },
        {
          title: '定制服务包',
          type: 'servicePackage',
          list: [{ text: '有服务包', serviceType: 'servicePackage', inquiryType: '', seleced: false }]
        }
      ],
      departmentList: [],
      // 左侧高亮元素的index
      mainActiveIndex: '',
      // 被选中元素的id
      activeId: '',
      searchHeight: 0
    }
  },
  watch: {
    searchInfo: {
      handler(searchInfo) {
        this.model = searchInfo
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDeptList()
      const element = document.querySelector('.search')
      this.searchHeight = element ? element.clientHeight : 0
    })
  },

  methods: {
    canHeightLight(item) {
      if (item.type === 'screen') {
        return item.isOpen || item.isSelect
      } else {
        return item.isOpen
      }
    },
    getArrowStyle(item) {
      let result = ''
      if (item.isOpen) {
        result = 'arrow-up-active'
      } else {
        if (item.type === 'screen' && item.isSelect) {
          result = 'arrow-down-active'
        } else {
          result = 'arrow-down'
        }
      }
      return result
    },
    showPopup(type, index) {
      if (this.active === index) {
        this.show = !this.show
      } else {
        this.show = true
      }
      this.active = index
      this.type = type
      const result = this.list.find((item) => item.isOpen)
      if (result) {
        this.list.forEach((item) => (item.isOpen = false))
      }
      this.list[this.active].isOpen = !this.list[this.active].isOpen
    },
    close() {
      this.list.forEach((item) => (item.isOpen = false))
      this.show = false
    },

    selectComprehensive(item) {
      this.model.orderByType = item.value
      this.list[this.active].isSelect = true
      this.list[this.active].textSelected = item.label
      //综合排序 单选 选中后立即查询一次
      this.$emit('updateSelect', this.model)
      this.show = false
    },
    selectScreent(index, idx) {
      const item = this.screenList[index]
      item.list[idx].seleced = !item.list[idx].seleced
      this.screenList.splice(index, 1, item)
    },
    reset() {
      this.screenList.forEach((item) => {
        item.list.forEach((child) => (child.seleced = false))
      })
      this.model.doctorLevel = ''
      this.model.deptId = ''
      this.model.childDeptId = ''
      this.model.inquiryType = ''
      this.model.serviceType = ''
      this.model.orderByType = 'comprehensive'
    },
    submitSelectScreent() {
      let inquiryTypeList = []
      let serviceTypeList = []
      this.screenList.forEach((item) => {
        //医生职称 ，拼接
        if (item.type === 'doctorLevel') {
          const doctorLevels = item.list.map((child) => {
            if (child.seleced) {
              return child.doctorLevel
            }
          })
          this.model.doctorLevel = doctorLevels.filter((temp) => !!temp).join(',')
        } else {
          const inquiryTypes = item.list.map((child) => {
            if (child.seleced) {
              return child.inquiryType
            }
          })

          inquiryTypeList = inquiryTypeList.concat(inquiryTypes.filter((temp) => !!temp))

          const serviceTypes = item.list.map((child) => {
            if (child.seleced) {
              return child.serviceType
            }
          })
          serviceTypeList = serviceTypeList.concat(serviceTypes.filter((temp) => !!temp))
        }
      })
      this.model.inquiryType = Array.from(new Set(inquiryTypeList))
        .filter((temp) => !!temp)
        .join(',')
      this.model.serviceType = Array.from(new Set(serviceTypeList))
        .filter((temp) => !!temp)
        .join(',')
      //筛选 确认的时候查询
      if (this.model.doctorLevel || this.model.inquiryType || this.model.serviceType) {
        this.list[this.active].isSelect = true
      } else {
        this.list[this.active].isSelect = false
      }

      this.$emit('updateSelect', this.model)
      this.close()
    },
    onNavClick(index) {
      let item = this.departmentList[index]
      this.mainActiveIndex = index
      this.model.deptId = item.id === 'all' ? '' : item.id
      //选一级科室后暂时选中文案
      this.list[this.active].textSelecting = item.id === 'all' ? '' : item.text
    },
    onItemClick(data) {
      this.activeId = data.id

      this.list[this.active].isSelect = true
      //选二级科室后 没有选中‘全部’ 替换一级科室名称
      if (data.id.indexOf('all-sub') != -1) {
        this.model.childDeptId = ''
        this.list[this.active].textSelected = this.list[this.active].textSelecting
      } else {
        this.model.childDeptId = data.id
        this.list[this.active].textSelected = data.text
      }
      //科室选择 单选 选中二级科室后立即查询一次
      this.$emit('updateSelect', this.model)
      this.show = false
    },
    getDeptList() {
      let items = []
      peace.service.hospital.getDeptList({ netHospitalId: this.model.netHospitalId }).then((res) => {
        res.data.list.unshift({
          netdeptName: '全部科室',
          id: 'all',
          childDept: []
        })
        res.data.list.forEach((item, index) => {
          item.childDept.unshift({
            id: 'all-sub-' + index,
            netdeptName: '全部'
          })
        })
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
        this.departmentList = items

        //从科室进入医生列表
        if (this.model.deptId) {
          this.mainActiveIndex = this.departmentList.findIndex((item) => item.id === this.model.deptId)
          this.activeId = this.model.childDeptId || this.departmentList[this.mainActiveIndex].children.find((item) => item.text === '全部').id
          this.list[0].isSelect = true

          this.list[0].textSelecting = this.departmentList[this.mainActiveIndex].text
          this.list[0].textSelected = this.model.childDeptId
            ? this.departmentList[this.mainActiveIndex].children?.find((item) => item.id == this.activeId)?.text
            : this.list[0].textSelecting
        } else {
          this.mainActiveIndex = 0
          this.activeId = this.departmentList[this.mainActiveIndex].children.find((item) => item.text === '全部').id
        }
        //在线咨询进入医生列表
        if (this.model.serviceType === 'inquiry') {
          this.list[2].isSelect = true

          const index = this.screenList.findIndex((item) => item.type === 'inquiryType')
          const info = this.screenList.find((item) => item.type === 'inquiryType')
          info.list.forEach((temp) => {
            if (temp.inquiryType === 'image') {
              temp.seleced = true
            }
          })
          this.screenList.splice(index, 1, info)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 6666;
  border-bottom: 1px solid #e3e3e3;
  &.no-border {
    border-bottom: 1px solid #fff;
  }
  .search-row {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    .search-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      &:first-child {
        justify-content: flex-start;
      }
      &:last-child {
        justify-content: flex-end;
      }
      &.active {
        color: $primary;
      }
      > div {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          max-width: 5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

.icon-arrow {
  width: 16px;
  height: 16px;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
}

.arrow-up {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAADxQTFRFAAAAKioqICAgLi4uKysrMjIyNTU1MjIyMjIyMzMzMzMzMjIyMzMzMzMzMzMzMzMzMjIyMzMzMzMzMzMzVVsntQAAABN0Uk5TAAYICxIuOkhgh5en0Nvl9Pj8/g60ELwAAABWSURBVBgZ7cE5DoAgAATA5RRRFNn//1VDDPEACysLZ/D7noEnA670xINJ46ZLLFKHCs/Co0YF7oJClV2YLRYNPbMeLWLkZhRoMpGMBg/cPDs8khK/V1YJDQavYuAc/gAAAABJRU5ErkJggg==);
  transform: rotateX(180deg);
}

.arrow-up-active {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAD9QTFRFAAAAAP//ANSqAMWvAMisAMawAMatAMeuAMmwAMewAMauAMauAMavAMavAMauAMeuAMeuAMauAMauAMauAMauUqfGHgAAABR0Uk5TAAIGIy46Wltnd36Hoq+wxNDz+PwG/1++AAAAV0lEQVQYGe3BRw6AIAAEwAUsFBWU/f9bNYYYC3Ay8eIMfh+RXS9RM5EjKjQ3GkVq5mZWKBCeOy+QZ5gYZDULk6VBhgw8BIknxxOHhzbyJLa4s8OFxe9lK9xUBxEOXJT3AAAAAElFTkSuQmCC);
}

.arrow-down {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAADxQTFRFAAAAKioqICAgLi4uKysrMjIyNTU1MjIyMjIyMzMzMzMzMjIyMzMzMzMzMzMzMzMzMjIyMzMzMzMzMzMzVVsntQAAABN0Uk5TAAYICxIuOkhgh5en0Nvl9Pj8/g60ELwAAABWSURBVBgZ7cE5DoAgAATA5RRRFNn//1VDDPEACysLZ/D7noEnA670xINJ46ZLLFKHCs/Co0YF7oJClV2YLRYNPbMeLWLkZhRoMpGMBg/cPDs8khK/V1YJDQavYuAc/gAAAABJRU5ErkJggg==);
}

.arrow-down-active {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IArs4c6QAAAD9QTFRFAAAAAP//ANSqAMWvAMisAMawAMatAMeuAMmwAMewAMauAMauAMavAMavAMauAMeuAMeuAMauAMauAMauAMauUqfGHgAAABR0Uk5TAAIGIy46Wltnd36Hoq+wxNDz+PwG/1++AAAAV0lEQVQYGe3BRw6AIAAEwAUsFBWU/f9bNYYYC3Ay8eIMfh+RXS9RM5EjKjQ3GkVq5mZWKBCeOy+QZ5gYZDULk6VBhgw8BIknxxOHhzbyJLa4s8OFxe9lK9xUBxEOXJT3AAAAAElFTkSuQmCC);
  transform: rotateX(180deg);
}
.van-tree-select__nav {
  background: #f6f6f6;
}
.van-tree-select__nav-item {
  padding-right: 12px;
}
.van-sidebar-item--select {
  color: #00c6ae;
}
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

.compre-item {
  padding-right: 0;
  &.active {
    color: $primary;
  }
  &::after {
    right: 0;
  }
}

.screen {
  padding-top: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  .screen-item {
    padding: 0 16px;
    margin-bottom: 17px;
    .screen-title {
      margin-bottom: 8px;
    }
    .screen-btn {
      color: rgba(51, 51, 51, 0.6);
      padding: 5px 15px;
      min-width: 86px;
      height: 30px;
      border: 1px solid rgba(51, 51, 51, 0.1);
      background: #fff;
      + .screen-btn {
        margin-left: 18px;
      }

      &.active {
        color: $primary;
        background: #eafaf8;
        border-color: rgba(0, 198, 174, 0.2);
      }
    }
  }
  .footer {
    border-top: 1px solid rgba(51, 51, 51, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    > div {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &:last-child {
        color: $primary;
        font-weight: normal;
        &::before {
          content: '';
          height: 20px;
          width: 1px;
          background: rgba(51, 51, 51, 0.05);
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>