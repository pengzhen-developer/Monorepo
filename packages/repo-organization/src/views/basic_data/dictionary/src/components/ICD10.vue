<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>疾病编码</span>
            <span>：</span>
          </span>
          <el-input v-model=" model.dieaseCode"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>疾病查询</span>
            <span>：</span>
          </span>
          <el-input v-model=" model.dieaseName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <!-- 
        <el-form-item>
          <span slot="label">
            <span>匹配状态</span>
            <span>：</span>
          </span>
          <el-select v-model="mathcCode"
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_MATCH_CODE"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label=" ">
          <el-button type="primary"
                     @click="get()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  max-height="600">
        <el-table-column prop="dieaseCode"
                         align="center"
                         label="系统编码">
        </el-table-column>
        <el-table-column prop="dieaseName"
                         align="center"
                         label="疾病名称">
        </el-table-column>
        <el-table-column prop="icdCode"
                         align="center"
                         label="ICD-10编码">
        </el-table-column>
        <el-table-column align="center"
                         label="附加编码">
          <template slot-scope="scope">
            <span>
              {{ showAddCode(scope.row.addCode) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="organName"
                         align="center"
                         label="机构名称">
        </el-table-column>
        <!-- <el-table-column align="center"
                         label="匹配状态">
          <p>---</p>
        </el-table-column> -->

      </PeaceTable>
    </div>

  </div>
</template>
<script>
import Service from '../service'
import CONSTANT from '../constant'

export default {
  data() {
    return {
      source: {
        ENUM_MATCH_CODE: CONSTANT.ENUM_MATCH_CODE
      },
      mathcCode: '',
      model: {
        dieaseCode: '',
        dieaseName: ''
      },
      tableData: []
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getICD10Info
      const params = this.model
      this.$refs.table.loadData({ fetch, params })
    },
    showAddCode(addCode) {
      return addCode == null ? '---' : addCode
    }
  }
}
</script>
<style lang="scss" scoped>
.status-item {
  display: flex;
  align-items: center;
}

.statusColor1 {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  margin-right: 8px;
  background: #faad14;
}
.statusColor2 {
  width: 6px;
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: #dddddd;
}
.statusColor3 {
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: var(--q-color-primary);
}

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.em-4 {
  width: 4em;
}

.top-menu {
  margin-bottom: 20px;
}
.date-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  .date-separator {
    width: 14px;
    margin: 0 9px;
    border-top: 1px solid #e7e7e1;
  }
}
</style>