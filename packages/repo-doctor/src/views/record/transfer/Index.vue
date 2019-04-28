<template>
  <div>
    <div class="header">
      <el-button-group>
        <el-button :type=" view.action === view.source.state['我转诊的'] ? 'primary' : '' " @click="changeActive('我转诊的')">我转诊的</el-button>
        <el-button :type=" view.action === view.source.state['转给我的'] ? 'primary' : '' " @click="changeActive('转给我的')">转给我的</el-button>
      </el-button-group>
    </div>

    <hr>

    <template v-if="view.action === view.source.state['我转诊的']">
      <el-form :model="view.model" inline>
        <el-form-item label="转出医生">
          <el-input placeholder v-model="view.model._转出医生"></el-input>
        </el-form-item>
        <el-form-item label="转入机构">
          <el-input placeholder v-model="view.model._转入机构"></el-input>
        </el-form-item>
        <el-form-item label="转诊状态">
          <el-select placeholder v-model="view.model._转诊状态">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in view.source._转诊状态"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get" type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr>

      <peace-table :data="[{},{}]" pagination ref="table">
        <peace-table-column label="姓名" prop="_姓名"></peace-table-column>
        <peace-table-column label="年龄" prop="_年龄"></peace-table-column>
        <peace-table-column label="性别" prop="_性别"></peace-table-column>
        <peace-table-column label="初步诊断" prop="_初步诊断"></peace-table-column>
        <peace-table-column label="转入机构" prop="_转入机构"></peace-table-column>
        <peace-table-column label="转入医生" prop="_转入医生"></peace-table-column>
        <peace-table-column label="期望转诊时间" prop="_期望转诊时间"></peace-table-column>
        <peace-table-column label="申请时间" prop="_申请时间"></peace-table-column>
        <peace-table-column label="转诊状态" prop="_转诊状态"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </template>

    <template v-else-if="view.action === view.source.state['转给我的']">
      <el-form :model="view.model" inline>
        <el-form-item label="转出机构">
          <el-input placeholder v-model="view.model._转出机构"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="get" type="primary">查询</el-button>
        </el-form-item>
      </el-form>

      <hr>

      <peace-table :data="[{},{}]" pagination ref="table">
        <peace-table-column label="姓名" prop="_姓名"></peace-table-column>
        <peace-table-column label="年龄" prop="_年龄"></peace-table-column>
        <peace-table-column label="性别" prop="_性别"></peace-table-column>
        <peace-table-column label="初步诊断" prop="_初步诊断"></peace-table-column>
        <peace-table-column label="转出机构" prop="_转出机构"></peace-table-column>
        <peace-table-column label="转入医生" prop="_转入医生"></peace-table-column>
        <peace-table-column label="期望转诊时间" prop="_期望转诊时间"></peace-table-column>
        <peace-table-column label="申请时间" prop="_申请时间"></peace-table-column>
        <peace-table-column label="转诊状态" prop="_转诊状态"></peace-table-column>
        <peace-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text">查看详情</el-button>
          </template>
        </peace-table-column>
      </peace-table>
    </template>

    <el-dialog :visible.sync="dialog.visible" custom-class="dialog" title="转诊详情">
      <transfer-detail></transfer-detail>
    </el-dialog>
  </div>
</template>

<script>
import TransferDetail from './TransferDetail'

export default {
  components: {
    TransferDetail
  },

  data() {
    return {
      api: {
        get: 'get',
        getDetail: 'getDetail'
      },

      view: {
        action: '我转诊的',

        model: {
          _转出医生: undefined,
          _转入机构: undefined,
          _转诊状态: undefined
        },

        source: {
          _转诊状态: [{ label: '问诊', value: '问诊' }, { label: '扫码', value: '扫码' }],

          state: {
            我转诊的: '我转诊的',
            转给我的: '转给我的'
          }
        }
      },

      dialog: {
        visible: false
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    changeActive(action) {
      this.view.action = action

      this.get()
    },

    get() {
      this.$refs.table.loadData({
        api: this.api.get,
        params: {}
      })
    },

    showDetail() {
      this.dialog.visible = true
      this.$http.get(this.api.getDetail)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}

.el-form-item {
  margin-right: 60px;

  .el-input {
    width: 140px;
    height: 27px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.13);
    border-radius: 3px;
  }
}

.no-data {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    display: block;
    width: 150px;
    height: 150px;
  }

  span {
    margin-top: 20px;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
  }
}

/deep/ .dialog {
  width: 580px;
  margin: 5vh auto !important;
  max-height: 90vh !important;
  min-height: 600px !important;

  .el-dialog__body {
    height: calc(90vh - 30px);
    overflow: auto;
  }
}
</style>
