<template>
  <div class="layout-route">
    <div>
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="给药频次">
          <el-input v-model.trim="model.drugtimes_name"
                    placeholder="请输入给药频次名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="openDialog">新增</el-button>
      </div>

      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="code"
                          prop="code">
        </PeaceTableColumn>
        <PeaceTableColumn label="给药频次"
                          prop="drugtimes_name">
        </PeaceTableColumn>
        <PeaceTableColumn label="中文缩写"
                          prop="simple_cname"></PeaceTableColumn>
      </PeaceTable>
    </div>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialogVisible"
                  title="给药频次"
                  v-if="dialogVisible"
                  append-to-body
                  width="400px">
      <div>
        <el-form label-width="90px"
                 label-suffix="：">
          <el-form-item label="给药频次">
            <el-select @change="setAbbreviation"
                       filterable
                       allow-create
                       placeholder="请选择给药频次"
                       v-model="drugtimes"
                       value-key="name">
              <el-option :key="item.id"
                         :label="item.name"
                         :value="item"
                         v-for="item in options"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="中文缩写">
            <el-input v-model="simpleCname"></el-input>
          </el-form-item>

        </el-form>

        <div class="el-dialog__footer">
          <el-button @click="added(true)"
                     type="primary">保存</el-button>
          <el-button @click="added(false)"
                     type="primary">保存并新增</el-button>
        </div>
      </div>

    </peace-dialog>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'DrugFrequency',
  data() {
    return {
      id: '',
      list: [],
      options: [],
      model: {
        drugtimes_name: '',
        netHospital_id: ''
      },
      count: 0,
      drugtimes: '',
      simpleCname: '',
      dialogVisible: false
    }
  },
  methods: {
    // 获取列表
    getList() {
      const fetch = Service.getDrugFrequencyList
      const params = Peace.util.deepClone(this.model)
      params.netHospital_id = this.id
      this.$refs.table.reloadData({ fetch, params })
    },
    // 获取给药频次库
    getAllFrequency() {
      Service.getAllDrugFrequency().then((res) => {
        const data = res.data
        this.options = data.list
      })
    },
    // 设置默认中文缩写
    setAbbreviation(item) {
      this.simpleCname = item.abbreviation
    },
    // 打开新增 Dialog
    openDialog() {
      this.dialogVisible = true
    },
    // 关闭新增 Dialog
    closeDialog() {
      this.dialogVisible = false
    },
    // 新增给药频次
    added(close) {
      const id = this.id
      let name = ''
      if (typeof this.drugtimes == 'string') {
        name = this.drugtimes
      } else {
        name = this.drugtimes.name
      }
      const cname = this.simpleCname

      Service.addDrugFrequency({ netHospital_id: id, drugtimes_name: name, simple_cname: cname }).then((res) => {
        const msg = res.msg
        this.getList()
        Peace.util.success(msg)
        if (close) {
          this.closeDialog()
        } else {
          this.drugtimes = ''
          this.simpleCname = ''
        }
      })
    }
  },
  created() {
    this.id = Peace.cache.sessionStorage.get('196-hospitalId')
    this.getAllFrequency()
    this.$nextTick().then(() => {
      this.getList()
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
  padding-top: 0;

  .content-hd {
    margin-bottom: 16px;
  }
}
.info-row {
  margin-bottom: 20px;
  &-label {
    &:after {
      display: none;
    }
    &:before {
      content: '*';
      color: #fff;
    }
    &.important:before {
      color: #f56c6c;
    }
  }
  &-content {
    padding-left: 10px;
  }
}
.el-select {
  width: 100%;
}
.search {
  padding: 18px 20px 0 20px;
  width: 100%;
  color: #23313f;
  background-color: #fff;
  // .el-input {
  //   width: 120px;
  // }
  &-btn {
    margin-right: 0;
  }
}
</style>
