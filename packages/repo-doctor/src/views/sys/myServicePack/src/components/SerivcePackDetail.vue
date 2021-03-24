<template>
  <div>
    <div class="flex items-center q-mb-md">
      <span class="absolute inline-block bg-primary"
            style="width: 4px; height: 17px; border-radius: 4px;"></span>
      <span class="q-ml-md text-grey-333"
            style="font-size: 16px; font-weight: 500;">基本信息</span>
    </div>

    <div class="q-mb-lg q-ml-md">
      <el-form space-none
               label-position="left"
               label-suffix="：">
        <el-form-item label="服务包名称">
          <span>{{ data.servicePackageName }}</span>
        </el-form-item>
        <el-form-item label="有效期">
          <span>购买日起</span>
          <span>{{ data.effectiveDays }}</span>
          <span>天有效</span>
        </el-form-item>
        <el-form-item label="签约主体">
          <span>{{ data.mainPartName }}</span>
        </el-form-item>
        <el-form-item label="零售价">
          <span>￥</span>
          <span>{{ data.price }}</span>
        </el-form-item>
        <el-form-item label="参考价">
          <span v-if="data.referencePrice">￥</span>
          <span v-if="data.referencePrice">{{ data.referencePrice }}</span>
        </el-form-item>
        <el-form-item label="服务包介绍">
          <div v-html="data.brief"></div>
        </el-form-item>
      </el-form>
    </div>

    <div class="title flex items-center q-mb-md">
      <span class="absolute inline-block bg-primary"
            style="width: 4px; height: 17px; border-radius: 4px;"></span>
      <span class="q-ml-md text-grey-333"
            style="font-size: 16px; font-weight: 500;">包含权益</span>
    </div>

    <div class="q-mb-lg q-ml-md">
      <el-form space-none
               label-position="left"
               label-suffix="：">
        <el-form-item v-for="item in data.equitiesList"
                      v-bind:key="item.equitiesName"
                      v-bind:label="item.equitiesName">
          <span>{{ `有效期内使用${item.equitiesNum}次` }}</span>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      data: {}
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      Service.getDetail({ servicePackageId: this.id }).then((res) => {
        this.data = res.data.info
      })
    }
  }
}
</script>
