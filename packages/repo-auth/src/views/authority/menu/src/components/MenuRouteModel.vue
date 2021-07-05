<template>
  <div>
    <el-card class="q-mb-md">
      <el-table :data="menuRoutes">
        <PeaceTableColumn label="ID"
                          align="left"
                          width="90px"
                          prop="routeId">
        </PeaceTableColumn>
        <PeaceTableColumn label="路由类别"
                          align="left"
                          width="90px"
                          prop="routeType">
          <template slot-scope="scope">
            {{scope.row.routeType == 1 ?'主路由':'子路由'}}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="路由名称"
                          align="left"
                          width="90px"
                          prop="routeName">
        </PeaceTableColumn>
        <PeaceTableColumn label="标签名称"
                          align="left"
                          width="100px"
                          prop="name">
        </PeaceTableColumn>
        <PeaceTableColumn label="路由地址"
                          align="left"
                          min-width="140px"
                          prop="routePath">
        </PeaceTableColumn>
        <PeaceTableColumn label="实际地址"
                          align="left"
                          min-width="180px"
                          prop="realPath">
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          min-width="120px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="updateSubRoute(scope.row)">修改</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteSubRoute(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </el-table>
    </el-card>

    <el-card v-bind:header="query.routeId ? `修改路由 - 当前修改项 : 【${query.routeId}】` : '新增路由'">
      <el-form ref="form"
               label-position="right"
               label-width="auto"
               label-suffix="："
               v-bind:model="query"
               v-bind:rules="rules">
        <div class="info-content">
          <el-form-item label="路由名称"
                        class="tow-col"
                        prop="routeName">
            <el-input v-model.trim="query.routeName"
                      placeholder="请输入">
              <el-tooltip slot="suffix"
                          placement="top">
                <div slot="content">
                  <p class="text-subtitle2 q-mb-sm">唯一不重复值</p>
                  <p class="text-subtitle2 q-mb-sm">如需实现按标签页缓存，component name 必须和该值保持一致</p>
                  <p>## 也表示 component name，实现按标签页的条件缓存（参考 keep-alive 的 include）</p>
                </div>
                <i class="el-input__icon el-icon-warning"></i>
              </el-tooltip>
            </el-input>
          </el-form-item>
          <el-form-item label="标签名称"
                        class="tow-col"
                        prop="name">
            <el-input v-model.trim="query.name"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="路由地址"
                        class="tow-col"
                        prop="routePath">
            <el-input v-model.trim="query.routePath"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="实际地址"
                        class="tow-col"
                        prop="realPath">
            <el-input v-model.trim="query.realPath"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="three-col"
                        prop="routeType">
            <div class="flex inline"
                 slot="label">
              <span class="text-justify">是否主路由</span>
              <span class="text-center q-ml-sm">：</span>
            </div>
            <el-switch v-model.trim="query.routeType"
                       :active-value="1"
                       :inactive-value="2"></el-switch>
          </el-form-item>
          <el-form-item class="three-col">
            <div class="flex inline"
                 slot="label">
              <span class="text-justify">是否启用</span>
              <span class="text-center q-ml-sm">：</span>
            </div>

            <el-switch v-model.trim="query.enable"
                       active-value="1"
                       inactive-value="0"></el-switch>

          </el-form-item>
          <el-form-item class="three-col">
            <div class="flex inline"
                 slot="label">
              <span class="text-justify">是否可关闭</span>
              <span class="text-center q-ml-sm">：</span>
            </div>
            <el-switch v-model.trim="query.closable"
                       active-value="1"
                       inactive-value="0"></el-switch>
          </el-form-item>
        </div>
        <div class="text-center">
          <el-button type="primary"
                     class="large hasmargin "
                     v-bind:disabled="loading"
                     v-on:click="save">{{ query.routeId ? '修 改' : '新 增'}}</el-button>
          <el-button type="default"
                     class="large hasmargin "
                     v-if="query.routeId"
                     v-bind:disabled="loading"
                     v-on:click="cancel">重 置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'MenuRouteModel',
  props: {
    info: Object
  },
  data() {
    return {
      menuRoutes: [],
      query: {
        //标签页状态-是否可关闭 0 1
        closable: '1',
        //标签页状态-是否可启用 0 1
        enable: '1',
        //菜单id
        menuId: '',
        //组件名称
        name: '',
        //实际地址
        realPath: '',
        //路由名称
        routeName: '',
        //路由地址
        routePath: '',
        //路由类型（1：主路由，2：子路由）
        routeType: 1
      },
      loading: false,
      type: 'create',
      rules: {
        name: [
          {
            required: true,
            message: '请输入标签名称',
            trigger: 'blur'
          }
        ],
        routeName: [
          {
            required: true,
            message: '请输入路由名称',
            trigger: 'blur'
          }
        ],
        routePath: [
          {
            required: true,
            message: '请输入路由地址',
            trigger: 'blur'
          }
        ],
        realPath: [
          {
            required: true,
            message: '请输入实际地址',
            trigger: 'blur'
          }
        ],
        routeType: [
          {
            required: true,
            message: '请选择路由类型',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.query.menuId = this.info.id
    this.getMenuRoute()
  },
  methods: {
    cancel() {
      this.query = {
        //标签页状态-是否可关闭 0 1
        closable: '1',
        //标签页状态-是否可启用 0 1
        enable: '1',
        //菜单id
        menuId: '',
        //组件名称
        name: '',
        //实际地址
        realPath: '',
        //路由名称
        routeName: '',
        //路由地址
        routePath: '',
        //路由类型（1：主路由，2：子路由）
        routeType: 1
      }
      this.query.menuId = this.info.id
      this.routeId = ''
      this.$refs.form.resetFields()
    },
    save() {
      this.validateForm().then(() => {
        this.loading = true
        const params = Peace.util.deepClone(this.query)
        if (this.type == 'create') {
          Service.menuRoute()
            .post(params)
            .then(() => {
              Peace.util.success('新建成功')
              // this.cancelDialog()
              this.getMenuRoute()
              this.$nextTick(() => {
                this.$refs.form.resetFields()
              })
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.menuRoute()
            .put(params)
            .then(() => {
              Peace.util.success('修改成功')
              this.getMenuRoute()
              this.$nextTick(() => {
                this.$refs.form.resetFields()
              })
              // this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    updateSubRoute(data) {
      this.type = 'update'
      this.query = Object.assign({}, this.query, data)
    },
    deleteSubRoute(data) {
      const params = { routeId: data.routeId }
      Service.menuRoute()
        .delete(params)
        .then(() => {
          Peace.util.success('删除成功')
          this.getMenuRoute()
        })
    },
    getMenuRoute() {
      const params = { menuId: this.query.menuId }
      Service.menuRoute()
        .getList(params)
        .then((res) => {
          this.menuRoutes = res.data
        })
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },
    cancelDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  width: 100%;
  &.tow-col {
    width: 50%;
  }
  &.three-col {
    width: 33.33333333%;
  }
}
.el-select {
  width: 100%;
}
::v-deep .el-checkbox {
  margin-right: 15px;
}
.info-content {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>