<template>
  <div class="flex column">
    <el-alert :closable="false"
              title="开检验"
              type="success">
      <div slot="title">
        <span>开检验</span>
        <i class="el-alert__closebtn el-icon-close"
           v-on:click="close"></i>
      </div>
    </el-alert>

    <div class="col q-pa-lg q-mb-md overflow-auto">
      <el-input v-show="false"
                v-model="filterText"
                clearable
                placeholder="输入关键字进行过滤"></el-input>

      <el-tree lazy
               v-bind:load="loadNode"
               ref="tree"
               v-loading="loading"
               show-checkbox
               v-bind:data="data"
               v-bind:filter-node-method="filterNode"
               v-bind:props="props"
               v-on:check="onCheck">
      </el-tree>

      <div class="q-py-sm q-px-md"
           style="border: 1px solid #eee; border-top: none;">
        已选择 <span class="text-primary">{{ checked.length }}</span> 项医嘱
      </div>
    </div>

    <div class="footer flex justify-center q-mb-md">
      <el-button v-on:click="close">取消</el-button>
      <el-button type="primary"
                 v-bind:disabled="checked.length === 0"
                 v-bind:loading="isLoading"
                 v-on:click="submit">
        发送
      </el-button>
    </div>
  </div>
</template>

<script>
import Service from './service/index.js'

export default {
  data() {
    return {
      isLoading: false,
      visible: false,
      loading: false,
      filterText: '',
      data: [],
      checked: [],
      props: {
        label: 'comboName',
        children: 'itemList',
        isLeaf: 'isLeaf'
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  async created() {
    this.$nextTick(() => {
      this.$el.style.height = document.body.clientHeight - this.$el.getBoundingClientRect().top - 20 + 'px'
    })

    this.data = await this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      return Service.getInspectionList({}).then((res) => {
        this.loading = false
        return res.data.list.map((item) => {
          const comboNo = item.comboNo
          const patientName = item.comboName
          item.itemList.map((item) => {
            item.comboName = `${item.itemName}（参考价格：¥${item.price.toFixed(2)}）`
            item.comboNo = comboNo
            item.patientName = patientName
            return item
          })
          return item
        })
      })
    },

    loadNode(node, resolve) {
      if (node.level === 1) {
        const data = node.data.itemList
        resolve(data)
      }
    },

    filterNode(value, data) {
      if (!value) {
        return true
      } else {
        return (data.comboName && data.comboName.indexOf(value) !== -1) || (data.abbreviation && data.abbreviation.indexOf(value.toLocaleUpperCase()) !== -1)
      }
    },

    onCheck() {
      this.checked = this.$refs.tree.getCheckedNodes().filter((item) => item.itemList && item.itemList.length > 0)
    },

    close() {
      this.$emit('close')
    },

    submit() {
      let items = []
      for (let item of [...this.checked]) {
        items.push({
          comboNo: item.comboNo,
          comboName: item.comboName
        })
      }
      this.isLoading = true
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo,
        familyId: this.$store.state.inquiry?.session?.content?.patientInfo?.familyId,
        patientId: this.$store.state.inquiry?.session?.content?.patientInfo?.patientId,
        comboList: items
      }
      Service.submitInspectionList(params)
        .then(() => this.$emit('close'))
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__children {
  pointer-events: none;
  cursor: default;
  padding-left: 20px;
  .el-checkbox {
    display: none;
  }
  .el-tree-node__expand-icon {
    display: none;
  }
}

::v-deep .el-checkbox .el-checkbox__inner {
  display: inline-block;
}
</style>
