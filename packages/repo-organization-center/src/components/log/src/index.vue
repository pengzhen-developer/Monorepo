<template>
  <div>
    <el-timeline>
      <el-timeline-item v-for="(row, index) in data"
                        v-bind:key="index"
                        hide-timestamp
                        placement="top">
        <div class="text-h6 q-mb-md">{{ row.updateTime }}</div>

        <div class="q-mb-md">
          <el-button round
                     type="primary">{{ row.operateApp }}</el-button>
        </div>

        <div class="table">
          <div class="row">
            <div class="col-6 row tr"
                 v-for="(log, key, index) in row.updateJsonFormat"
                 v-bind:key="index">
              <div class="th"
                   style="width: 130px;">{{ key }}</div>
              <div class="td col">{{ log }}</div>
            </div>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import ddl from './ddl'
import Service from './service'

export default {
  props: {
    id: [String, Number],
    dicType: String
  },

  data() {
    return {
      data: []
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      Service.queryDicLog({ dicId: this.id, dicType: this.dicType }).then((res) => {
        res?.data?.records?.forEach((item) => {
          item.updateJson = JSON.parse(item.updateJson)
        })

        this.data = this.formatData(res?.data?.records)
      })
    },

    formatData(data) {
      const tableDDLKey = this.dicType
      const tableDDL = ddl[tableDDLKey]

      data?.forEach((item) => {
        item.updateJsonFormat = {}
        for (const key in item.updateJson) {
          const column = tableDDL.find((item) => item.COLUMN_NAME === key)
          if (column) {
            item.updateJsonFormat[column.COLUMN_COMMENT] = item.updateJson[key]
          }
        }
      })

      return data
    }
  }
}
</script>


<style lang="scss" scoped>
$border-color: #cecece;
.table {
  border-top: 1px solid $border-color;
  border-left: 1px solid $border-color;

  .th,
  .td {
    padding: 12px 8px;
    font-size: 14px;
    line-height: 20px;
    color: black;
    border: 1px solid $border-color;
    box-sizing: border-box;

    margin-left: -1px;
    margin-top: -1px;
  }

  .th {
    background-color: #f0f0f0;
  }
}
</style>
