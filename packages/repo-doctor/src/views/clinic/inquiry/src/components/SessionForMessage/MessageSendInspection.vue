<template>
  <div>
    <el-alert :closable="false" title="开检验" type="success">
      <div slot="title">
        <span>开检验</span>
        <i class="el-alert__closebtn el-icon-close" v-on:click="close"></i>
      </div>
    </el-alert>

    <div class="q-pa-lg">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable></el-input>
      <el-tree ref="tree" v-loading="loading" show-checkbox v-bind:data="data" v-bind:filter-node-method="filterNode" v-bind:props="props" v-on:check="onCheck">
      </el-tree>
      <div class="q-py-sm q-px-md" style="border: 1px solid #eee; border-top: none;">
        已选择 <span class="text-primary">{{ checked.filter((item) => item.itemList === undefined).length }}</span> 项医嘱
      </div>
    </div>

    <div class="flex justify-center q-mb-md">
      <el-button v-on:click="close">取消</el-button>
      <el-button type="primary" v-bind:disabled="checked.length === 0" v-bind:loading="isLoading" v-on:click="submit">
        发送
      </el-button>
    </div>
  </div>
</template>

<script>
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
    this.data = await this.loadData()
  },

  methods: {
    async loadData() {
      this.loading = true
      return Peace.service.report.getComboList({}).then((res) => {
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

    filterNode(value, data) {
      if (!value) {
        return true
      } else {
        return data.patientName && data.patientName.indexOf(value) !== -1
      }
    },

    onCheck() {
      this.checked = this.$refs.tree.getCheckedNodes()
    },

    close() {
      this.$emit('close')
    },

    submit() {
      const tmp = [...this.checked].filter((item) => item.itemList === undefined)

      let items = []
      for (let item of tmp) {
        let index = items.findIndex((tmp) => {
          return tmp.comboNo === item.comboNo
        })
        if (index !== -1) {
          items[index].itemList.push({
            itemNo: item.itemNo,
            itemName: item.itemName
          })
        } else {
          items.push({
            comboNo: item.comboNo,
            comboName: item.patientName,
            itemList: [
              {
                itemNo: item.itemNo,
                itemName: item.itemName
              }
            ]
          })
        }
      }

      this.isLoading = true
      const params = {
        inquiryNo: this.$store.state.inquiry?.session?.content?.inquiryInfo?.inquiryNo,
        familyId: this.$store.state.inquiry?.session?.content?.patientInfo?.familyId,
        patientId: this.$store.state.inquiry?.session?.content?.patientInfo?.patientId,
        comboList: items
      }
      Peace.service.report
        .submitComboList(params)
        .then(() => this.$emit('close'))
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
