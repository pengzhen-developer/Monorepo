<template>
  <div class="layout-route">
    <div class="card">
      <div class="q-mb-lg">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>

      <div style="max-width: 1200px;">
        <div class="flex items-center q-mb-md">
          <span class="absolute inline-block bg-primary"
                style="width: 4px; height: 16px; border-radius: 4px;"></span>
          <span class="q-ml-md text-grey-333"
                style="font-size: 16px; font-weight: 500;line-height:16px;">基本信息</span>
        </div>

        <div class="q-mb-xl">
          <el-form inline
                   space-none
                   label-suffix="：">
            <div class="row q-col-gutter-x-md">
              <div class="col">
                <el-form-item label="服务包名称">
                  <span>{{ model.servicePackageName }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="有效期">
                  <span>{{ `购买日起${model.effectiveDays}天有效` }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="签约医院">
                  <span>{{ model.hosName }}</span>
                </el-form-item>
              </div>
            </div>
            <div class="row q-col-gutter-x-md">
              <div class="col">
                <el-form-item label="签约主体">
                  <span>{{ `${model.mainPartType}-${model.mainPartName}` }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="零售价">
                  <span>{{ `￥${model.price}` }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="参考价">
                  <span v-if="model.referencePrice">{{ `￥${model.referencePrice}` }}</span>
                </el-form-item>
              </div>
            </div>
            <div class="row q-col-gutter-x-md">
              <div class="col">
                <el-form-item label="服务包介绍">
                  <div v-html="model.brief"></div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>

        <div class="flex items-center q-mb-md">
          <span class="absolute inline-block bg-primary"
                style="width: 4px; height: 16px; border-radius: 4px;"></span>
          <span class="q-ml-md text-grey-333"
                style="font-size: 16px; font-weight: 500;line-height:16px;">包含权益</span>
        </div>

        <div class="q-mb-xl">
          <el-form space-none
                   label-suffix="：">
            <el-form-item label="权益">
              <div class="flex">
                <div class="q-mr-xl"
                     v-for="item in model.equitiesList"
                     v-bind:key="item.equitiesDictionaryId">
                  <div class="text-grey-333">{{ item.equitiesName }}</div>
                  <div class="text-grey-999">{{ `有效期内使用 ${item.num} 次` }}</div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div class="flex items-center q-mb-md">
          <span class="absolute inline-block bg-primary"
                style="width: 4px; height: 16px; border-radius: 4px;"></span>
          <span class="q-ml-md text-grey-333"
                style="font-size: 16px; font-weight: 500;line-height:16px;">其它信息</span>
        </div>

        <div>
          <el-form space-none
                   label-suffix="：">
            <div class="row q-col-gutter-x-md">
              <div class="col">
                <el-form-item label="创建时间">
                  <span>{{ model.createdTime }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="更新时间">
                  <span>{{ model.updatedTime }}</span>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="创建人">
                  <span>{{ model.createUser }}</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

export default {
  data() {
    return {
      model: {}
    }
  },

  computed: {
    props() {
      return Observable.state.props
    }
  },

  created() {
    // 详情视图
    // 获取数据并填充
    if (this.props.id) {
      this.getServicePackageInfo(this.props.id)
    }
  },

  methods: {
    getServicePackageInfo(id) {
      return Service.getServicePackageInfo({ id }).then((res) => {
        this.model = res.data
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