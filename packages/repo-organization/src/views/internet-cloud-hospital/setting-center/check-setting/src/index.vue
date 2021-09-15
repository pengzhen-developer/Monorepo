<template>
  <div class="layout-route white-bg examine">
    <div class="tab">
      <div :class="[tabShow ? 'item active' : 'item']"
           @click="shiftTab(true)">检查项目列表</div>
      <div :class="[!tabShow ? 'item active' : 'item']"
           @click="shiftTab(false)">项目级别设置</div>
    </div>
    <div class="content"
         v-show="tabShow">
      <div class="card card-search q-mb-md">
        <el-form inline>
          <el-form-item label="项目名称：">
            <el-input placeholder="请输入"
                      v-model="query.name"
                      @keyup.enter.native="getList()"></el-input>
          </el-form-item>
          <el-form-item label="一级项目：">
            <el-select v-model="query.parentId"
                       @change="onChange"
                       clearable>
              <el-option :key="status.id"
                         :label="status.name"
                         :value="status.id"
                         v-for="status in parentList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级项目：">
            <el-select v-model="query.childId"
                       clearable>
              <el-option :key="status.id"
                         :label="status.name"
                         :value="status.id"
                         v-for="status in childList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="getList()"
                       type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">

        <div class="top-menu">
          <el-button @click="showExamineProjectDialog('add', '')"
                     type="primary">新增项目</el-button>
        </div>

        <PeaceTable ref="table"
                    style="width: 100%"
                    pagination>
          <PeaceTableColumn label="序号"
                            type="index"
                            width="100"></PeaceTableColumn>
          <PeaceTableColumn label="检查项目名称"
                            min-width="180">
            <template slot-scope="scope">
              <div class="project-name"
                   @click="showExamineProjectDialog('detail', scope.row.itemId)">
                {{scope.row.itemName}}</div>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="一级项目名称"
                            min-width="120"
                            prop="parentName"></PeaceTableColumn>
          <PeaceTableColumn label="二级项目名称"
                            prop="childName"
                            min-width="120"></PeaceTableColumn>
          <PeaceTableColumn label="金额(元)"
                            prop="itemAmount"
                            align="right"
                            header-align="right"
                            width="125"></PeaceTableColumn>
          <PeaceTableColumn label="创建时间"
                            prop="createdTime"
                            width="180">
          </PeaceTableColumn>
          <PeaceTableColumn label="更新时间"
                            width="180"
                            prop="updateTime">
            <template slot-scope="scope">{{scope.row.updateTime ? scope.row.updateTime : '一'}}</template>
          </PeaceTableColumn>
          <PeaceTableColumn fixed="right"
                            header-align="left"
                            align="left"
                            label="操作"
                            width="150">
            <template slot-scope="scope">
              <el-button @click="showExamineProjectDialog('edit', scope.row.itemId)"
                         type="text">修改</el-button>
              <el-button @click="delExamineProject(scope.row.itemId)"
                         type="text">删除</el-button>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>
    </div>

    <div class="content card"
         v-show="!tabShow">
      <el-button class="level-add-btn"
                 @click="addLevelProject(1)"
                 type="primary">新增一级项目</el-button>
      <el-row :gutter="27">
        <el-col v-for="(pItem,index) in itemList"
                :key="'key_' + index"
                :span="12">
          <div class="item-list">
            <div class="item">
              <div :class="{'top': true, 'open': pItem.open}">
                <div class="level-one">
                  <div class="edit-icon"
                       @click="editLevelProject(1, pItem.id, pItem.name)"></div>
                  <div class="name">{{pItem.name}}</div>
                  <i :class="['open-icon', pItem.open ? 'el-icon-arrow-down': 'el-icon-arrow-right']"
                     @click="toggleSub(index)"></i>
                </div>
                <div class="link"
                     @click="addLevelProject(2, pItem.id)">新增二级项目</div>
              </div>
              <div>
                <el-collapse-transition>
                  <ul v-show="pItem.open"
                      class="row-wrap">
                    <li v-for="(sItem,index) in pItem.children"
                        :key="'sitem_' + index">
                      <span>{{sItem.name}}</span>
                      <div class="menu">
                        <span @click="editLevelProject(2, sItem.id, sItem.name)">编辑</span>
                        <span @click="delLevelProject(sItem.id)">删除</span>
                      </div>
                    </li>
                  </ul>
                </el-collapse-transition>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 检查项目弹窗 -->
    <PeaceDialog :visible.sync="examineProjectDialog.show"
                 append-to-body
                 :title="examineProjectDialog.title"
                 v-if="examineProjectDialog.show"
                 width="610px">
      <examine-project-info :type="examineProjectDialog.type"
                            :project-id="examineProjectDialog.projectId"
                            @success="getList(),examineProjectDialog.show=false"
                            @close="examineProjectDialog.show=false"></examine-project-info>
    </PeaceDialog>

    <!-- 项目级别弹窗 -->
    <PeaceDialog :visible.sync="projectVisible"
                 append-to-body
                 :title="tagName"
                 v-if="projectVisible"
                 width="400px">
      <el-row type="flex"
              justify="center"
              align="middle">
        <el-col :span="5">
          <span>项目名称：</span>
        </el-col>
        <el-col :span="13">
          <el-input type="input"
                    maxlength="30"
                    :placeholder="placeholderTitle"
                    v-model="pName"></el-input>
        </el-col>
      </el-row>
      <el-button style="display: block;margin: 20px auto 20px;"
                 @click="saveLevelProject"
                 type="primary">保存</el-button>
    </PeaceDialog>
  </div>
</template>
<script>
import ExamineProjectInfo from './components/ExamineProjectInfo'
import Service from './service'

export default {
  name: 'CheckSetting',
  components: { ExamineProjectInfo },
  data() {
    return {
      tabShow: true,

      query: {
        name: '',
        parentId: '',
        childId: ''
      },

      examineProjectDialog: {
        show: false,
        type: '',
        title: '',
        projectId: ''
      },

      action: false,
      editId: '',
      itemList: [],
      openArr: [],

      pId: 0,
      tagName: '',
      pName: '',
      placeholderTitle: '',

      projectVisible: false,
      parentList: [],
      childList: []
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getList()
      this.getItemList()
      this.initPlist()
    })
  },
  methods: {
    // 切换顶部tab
    shiftTab(tag) {
      if (tag) {
        this.getList()
        this.initPlist()
      } else {
        this.getItemList()
      }
      this.tabShow = tag
    },
    // 检查项目-列表
    getList() {
      const fetch = Service.getItemOrderList
      const params = Peace.util.deepClone(this.query)
      this.$refs.table.reloadData({ fetch, params })
    },
    // 检查项目-搜索级联切换
    onChange(value) {
      this.initSlist(value)
    },
    // 检查项目-显示编辑项目弹窗
    showExamineProjectDialog(type, projectId) {
      if (type === 'edit') {
        this.examineProjectDialog.title = '修改项目'
      } else if (type === 'detail') {
        this.examineProjectDialog.title = '项目详情'
      } else {
        this.examineProjectDialog.title = '新建项目'
      }
      this.examineProjectDialog.type = type
      this.examineProjectDialog.projectId = projectId
      this.examineProjectDialog.show = true
    },
    // 检查项目-删除
    delExamineProject(id) {
      let itemId = id
      this.$confirm('此操作将删除此项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          Service.delItemOrder({ itemId }).then(() => {
            this.getList()
            Peace.util.success('项目删除成功！')
          })
        })
        .catch(() => {})
    },
    // 获取一级项目
    initPlist() {
      Service.getParentList().then((res) => {
        this.parentList = res.data.list
      })
    },
    // 获取二级项目
    initSlist(parentId) {
      if (parentId) {
        Service.getChilds({ parentId }).then((res) => {
          this.query.childId = ''
          this.childList = res.data.list
        })
      } else {
        this.query.childId = ''
        this.childList = []
      }
    },
    // 项目级别-获取列表
    getItemList() {
      Service.getItemList().then((res) => {
        let list = res.data.list
        this.itemList = list.map((item) => {
          // 处理项目展开状态
          let openIndex = this.openArr.indexOf(item.id)
          let isOpen = false
          if (openIndex !== -1) {
            if (item.children && item.children.length > 0) {
              isOpen = true
            } else {
              isOpen = false
              this.openArr.splice(openIndex, 1)
            }
          } else {
            isOpen = false
          }
          return {
            id: item.id,
            name: item.name,
            parentId: item.parentId,
            open: isOpen,
            children: item.children ? item.children : []
          }
        })
      })
    },
    // 项目级别-切换二级项目显隐
    toggleSub(index) {
      if (this.itemList[index].children.length === 0) {
        Peace.util.warning('暂无二级项目')
        return false
      }
      if (this.itemList[index].open) {
        let openIndex = this.openArr.indexOf(this.itemList[index].id)
        if (openIndex !== -1) {
          this.openArr.splice(openIndex, 1)
        }
      } else {
        this.openArr.push(this.itemList[index].id)
      }
      this.$set(this.itemList[index], 'open', !this.itemList[index].open)
    },
    // 项目级别-添加
    addLevelProject(tag, id) {
      this.tagName = tag == 1 ? '新建一级项目' : '新建二级项目'
      this.placeholderTitle = tag == 1 ? '请输入一级项目名称' : '请输入二级项目名称'
      this.pId = id ? id : 0
      this.pName = ''
      this.action = false
      this.projectVisible = true
    },
    // 项目级别-保存
    saveLevelProject() {
      let name = this.pName
      let parentId = this.pId
      if (name != '') {
        if (name.length > 30) {
          Peace.util.error('项目名称不得超过30个字')
          return false
        }
        if (this.action) {
          let categoryId = this.editId
          let name = this.pName
          Service.editItem({ categoryId, name }).then(() => {
            this.getItemList()
            this.projectVisible = false
            Peace.util.success('项目编辑成功！')
          })
        } else {
          Service.addItem({ name, parentId }).then(() => {
            this.getItemList()
            this.projectVisible = false
            Peace.util.success('项目添加成功！')
          })
        }
      } else {
        Peace.util.error('项目名称不能为空！')
      }
    },
    // 项目级别-删除
    delLevelProject(id) {
      let categoryId = id
      this.$confirm('此操作将删除此二级项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          Service.deleteItem({ categoryId }).then(() => {
            this.getItemList()
            this.projectVisible = false
            Peace.util.success('项目删除成功！')
          })
        })
        .catch(() => {})
    },
    // 项目级别-编辑二级项目
    editLevelProject(type, id, name) {
      this.tagName = type === 1 ? '编辑一级项目' : '编辑二级项目'
      this.action = true
      this.editId = id
      this.pName = name
      this.projectVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.top-menu {
  margin-bottom: 20px;
}

.examine {
  .tab {
    // box-sizing: content-box;
    display: flex;
    width: 230px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid var(--q-color-primary);
    margin: 20px auto;
    .item {
      flex: 1;
      height: 31px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
      &.active {
        background: var(--q-color-primary);
        color: #fff;
      }
    }
  }
  .content {
    .project {
      &-name {
        width: 150px;
        height: 20px;
        margin: 0 auto;
        color: var(--q-color-primary);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
      }
    }
    .level {
      &-add-btn {
        margin-bottom: 20px;
      }
    }
    .item-list {
      margin-bottom: 20px;
      .item {
        border: 1px solid rgba(238, 238, 238, 1);
        padding: 0 15px;
        .top {
          display: flex;
          justify-content: space-between;
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          &.open {
            border-bottom: 1px solid #eee;
          }
          .level-one {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .edit-icon {
              width: 14px;
              height: 14px;
              content: '';
              background: url('./assets/images/p-title.png');
              background-size: 100% 100%;
              cursor: pointer;
            }
            .name {
              position: relative;
              padding: 0 10px;
            }
            .open-icon {
              cursor: pointer;
            }
          }
          .link {
            color: var(--q-color-primary);
            cursor: pointer;
          }
        }
        .row-wrap {
          margin: 20px auto 20px;
          li {
            height: 40px;
            background: rgba(245, 247, 250, 1);
            list-style: none;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            .menu {
              color: var(--q-color-primary);
              span {
                width: 40px;
                display: inline-block;
                cursor: pointer;
              }
            }
          }
          li:nth-child(even) {
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
