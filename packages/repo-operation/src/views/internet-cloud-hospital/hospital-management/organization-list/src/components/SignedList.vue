<template>
  <div class="full-width bg-white">
    <div class="card card-search q-mb-md">
      <div class="q-mb-lg">
        <el-button plain
                   v-on:click="back">
          <div>
            <i class="el-icon-arrow-left"></i>
            <span>返回上一页</span>
          </div>
        </el-button>
      </div>
      <el-form inline
               label-suffix="："
               label-width="auto"
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="姓名">
          <el-input v-model="model.name"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="model.tel"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="borderTop:16px solid #f5f5f5;"></div>
    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn min-width="160px"
                          label="用户姓名"
                          prop="name"></PeaceTableColumn>
        <PeaceTableColumn min-width="160px"
                          label="手机号"
                          prop="tel"></PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="同意时间"
                          prop="createdTime"></PeaceTableColumn>
        <PeaceTableColumn min-width="120px"
                          label="设备"
                          prop="device"></PeaceTableColumn>
      </PeaceTable>
    </div>
  </div>
</template>
<script>
import Observable from '../observable'
import Service from '../service'
export default {
  computed: {
    props() {
      return Observable.state.props
    }
  },
  data() {
    return {
      model: {
        name: '',
        tel: ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.model.serviceId = this.props.serviceId
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.getSignList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },
    back() {
      Observable.mutations.changeView(Observable.constants.view.ADD)
    }
  }
}
</script>