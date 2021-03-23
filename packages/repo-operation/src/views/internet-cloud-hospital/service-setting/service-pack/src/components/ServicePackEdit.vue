<template>
  <div class="layout-route">
    <div class="card">
      <div class="q-mb-lg">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>

      <div style="max-width: 800px;">
        <div class="flex items-center q-mb-md">
          <span class="absolute inline-block bg-primary"
                style="width: 4px; height: 16px; border-radius: 4px;"></span>
          <span class="q-ml-md text-grey-333"
                style="font-size: 16px; font-weight: 500;">基本信息</span>
        </div>

        <div class="q-mb-xl">
          <el-form ref="form-base"
                   label-suffix="："
                   label-width="auto"
                   v-bind:model="model"
                   v-bind:rules="rules">
            <div class="row q-col-gutter-x-xl">
              <div class="col">
                <el-form-item label="服务包名称"
                              prop="servicePackageName">
                  <el-input v-model="model.servicePackageName"
                            maxlength="20"
                            placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="有效期">
                  <div class="flex">
                    <span class="q-mr-sm text-grey-333">购买日起</span>

                    <div class="col">
                      <el-form-item space-none
                                    prop="effectiveDays">
                        <el-input class="full-width"
                                  v-model.number="model.effectiveDays"
                                  placeholder="请输入">
                          <div slot="append">
                            天
                          </div>
                        </el-input>
                      </el-form-item>
                    </div>

                    <span class="q-ml-sm text-grey-333">有效</span>
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="row q-col-gutter-x-xl">
              <div class="col">
                <el-form-item label="零售价"
                              prop="price">
                  <el-input-number class="full-width"
                                   v-model="model.price"
                                   v-bind:precision="2"
                                   controls-position="right"
                                   placeholder="请输入"></el-input-number>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="参考价"
                              prop="referencePrice">
                  <el-input-number class="full-width"
                                   controls-position="right"
                                   placeholder="请输入"
                                   v-model="model.referencePrice"
                                   v-bind:precision="2"></el-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="row q-col-gutter-x-xl">
              <div class="col">
                <el-form-item label="签约医院">
                  <span>{{ model.hosName }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="签约主体"
                              v-bind:rules="rules.mainParts">
                  <span>{{ `${ model.mainPartType} - ${ model.mainPartName }` }} </span>
                </el-form-item>
              </div>
            </div>
            <div class="row q-col-gutter-x-xl">
              <div class="col">
                <el-form-item label="服务包介绍"
                              prop="brief">
                  <quillEditor ref="myQuillEditor"
                               v-model="model.brief"
                               v-bind:options="quillEditorOption"></quillEditor>

                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>

        <div class="flex items-center q-mb-md">
          <span class="absolute inline-block bg-primary"
                style="width: 4px; height: 16px; border-radius: 4px;"></span>
          <span class="q-ml-md text-grey-333"
                style="font-size: 16px; font-weight: 500;">包含权益</span>
        </div>

        <div class="q-mb-xl">
          <el-form ref="form-equity"
                   label-width="auto"
                   v-bind:model="model"
                   v-bind:rules="rules">
            <!-- 为保持和基本信息相同 label 宽度，给出最大文字的 label, 并设置 visibility: hidden；此元素仅作为占位用，无实际含义 -->
            <div class="row"
                 style="visibility: hidden; height: 0;">
              <el-form-item label="服务包介绍：">
                <el-input v-model="model.servicePackageName"
                          placeholder="请输入"></el-input>
              </el-form-item>
            </div>

            <div class="row q-col-gutter-x-md">
              <div class="col">
                <el-form-item label="权益："
                              prop="equitiesList">

                  <div class="q-mb-lg flex"
                       v-for="(item, index) in model.equitiesList"
                       v-bind:key="item.equitiesDictionaryId">

                    <div class="flex q-mr-lg">
                      <el-checkbox class="text-grey-333"
                                   v-model="item.checked">{{ item.equitiesName }}</el-checkbox>
                    </div>

                    <div v-if="item.checked"
                         class="flex">
                      <span class="text-grey-333 q-mr-sm">有效期内使用</span>

                      <el-form-item space-none
                                    v-bind:prop="`equitiesList.${index}.num`"
                                    v-bind:rules="rules.equitiesListNum">
                        <el-input style="width: 180px;"
                                  placeholder="请输入"
                                  v-model.number="getCheckedModel(item).num">
                          <template slot="append">次</template>
                        </el-input>
                      </el-form-item>
                    </div>

                    <div v-else
                         class="flex">
                      <span class="text-grey-333 q-mr-sm">有效期内使用</span>

                      <el-input style="width: 180px;"
                                placeholder="请输入"
                                disabled>
                        <template slot="append">次</template>
                      </el-input>
                    </div>
                  </div>
                </el-form-item>
              </div>
            </div>

            <div class="row">
              <el-form-item label=" ">
                <span>字典找不到权益，</span>
                <el-button type="text"
                           v-on:click="showDialog">去添加</el-button>
              </el-form-item>
            </div>

            <div class="row">
              <el-form-item label="">
                <el-button type="primary"
                           v-on:click="submit('2')">提交</el-button>
                <el-button v-on:click="submit('1')">暂存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <PeaceDialog width="400px"
                 title="新增权益"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <ServicePackEquityModel v-on:close="closeDialog"
                              v-on:refresh="updateEquitiesDictionaryList"></ServicePackEquityModel>
    </PeaceDialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import ServicePackEquityModel from '@src/views/internet-cloud-hospital/service-setting/service-pack-equity/src/components/ServicePackEquityModel'

import Observable from './../observable'
import Service from './../service'

export default {
  components: {
    quillEditor,
    ServicePackEquityModel
  },

  data() {
    return {
      quillEditorOption: {
        placeholder: '请输入',
        modules: {
          toolbar: [
            ['image', 'link'],
            ['bold', 'italic', 'underline', 'strike']
          ]
        }
      },

      model: {
        servicePackageName: '',
        effectiveDays: undefined,
        price: undefined,
        referencePrice: undefined,
        mainPartName: '',
        mainPartType: '',
        brief: '',
        equitiesList: []
      },

      source: {
        equitiesList: []
      },

      rules: {
        servicePackageName: [{ required: true, message: '请输入服务包名称' }],
        effectiveDays: [
          { type: 'number', required: true, message: '请输入有效期' },
          { type: 'number', pattern: Peace.validate.pattern.pInterger, message: '请输入大于 0 的整数' }
        ],
        price: [
          { type: 'number', required: true, message: '请输入零售价' },
          { type: 'number', pattern: Peace.validate.pattern.pNumerical, message: '请输入大于 0 的数字' },
          { type: 'number', min: 0, max: 1000000, message: '请输入 0 - 100000 的数字' }
        ],
        referencePrice: [
          { type: 'number', pattern: Peace.validate.pattern.pNumerical, message: '请输入大于 0 的数字' },
          { type: 'number', min: 0, max: 1000000, message: '请输入 0 - 100000 的数字' }
        ],
        brief: [{ required: true, message: '请输入服务包介绍' }],
        equitiesList: [
          { required: true, message: '请选择权益' },
          {
            validator: (rule, value, callback) => {
              if (value.every((item) => item.checked === false)) {
                callback(new Error('请选择权益'))
              }

              callback()
            }
          }
        ],
        equitiesListNum: [
          { required: true, message: '请输入有效次数' },
          { type: 'number', pattern: Peace.validate.pattern.pInterger, message: '请输入大于 0 的整数' },
          { type: 'number', min: 0, max: 1000000, message: '请输入 1 - 100000 的数字' }
        ]
      },

      dialog: {
        visible: false
      }
    }
  },

  computed: {
    props() {
      return Observable.state.props
    }
  },

  async created() {
    // 编辑视图
    // 获取数据并填充
    if (this.props.id) {
      await this.getEquitiesDictionaryList()
      await this.getServicePackageInfo(this.props.id)
    }
  },

  methods: {
    showDialog() {
      this.dialog.visible = true
    },

    closeDialog() {
      this.dialog.visible = false
    },

    updateEquitiesDictionaryList() {
      return Service.getEquitiesDictionaryList({ status: '1' }).then((res) => {
        res.data.list.map((item) => {
          const index = this.model.equitiesList.findIndex((temp) => temp.equitiesDictionaryId === item.equitiesDictionaryId)

          if (index === -1) {
            item.checked = false
            item.num = undefined

            this.model.equitiesList.unshift(item)
          }
        })
      })
    },

    getServicePackageInfo(id) {
      return Service.getServicePackageInfo({ id }).then((res) => {
        this.model.equitiesList.forEach((item) => {
          const equity = res.data.equitiesList.find((temp) => temp.equitiesDictionaryId === item.equitiesDictionaryId)
          item.checked = equity ? true : false
          item.num = equity ? equity.num : undefined
          item.id = equity ? equity.id : undefined
        })

        delete res.data.equitiesList

        this.model = Object.assign({}, this.model, res.data)
      })
    },

    getEquitiesDictionaryList() {
      return Service.getEquitiesDictionaryList({ status: '1' }).then((res) => {
        this.model.equitiesList = Peace.util.deepClone(res.data.list).map((item) => {
          item.checked = false
          item.num = undefined

          return item
        })
      })
    },

    getCheckedModel(row) {
      return this.model.equitiesList.find((item) => item.equitiesDictionaryId === row.equitiesDictionaryId)
    },

    getChecked(row) {
      const model = this.getCheckedModel(row)

      if (model) {
        return true
      } else {
        return false
      }
    },

    submit(submitType) {
      Promise.all([this.$refs['form-base'].validate(), this.$refs['form-equity'].validate()]).then(() => {
        const params = Peace.util.deepClone(this.model)

        // 移除未选中的权益
        params.equitiesList = params.equitiesList.filter((item) => item.checked)
        params.submitType = submitType

        Service.editServicePackage(params).then((res) => {
          Peace.util.success(res.msg)
          Observable.mutations.changeView(Observable.constants.view.LIST)
        })
      })
    },

    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>