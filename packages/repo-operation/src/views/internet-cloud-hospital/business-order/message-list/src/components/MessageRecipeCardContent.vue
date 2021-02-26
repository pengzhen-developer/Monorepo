<template>
  <div>
    <MessageRecipeCard :diagnosis="diagnosis"
                       :drugInfo="drugInfo"
                       :visitingTime="visitingTime"
                       @onClickDetail="onClickDetail"></MessageRecipeCard>
    <!-- 处方详情 -->
    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="dialog.visible"
                  append-to-body
                  title="处方详情"
                  v-if="dialog.visible"
                  width="580px">
      <PresInfo :info="dialog.data"></PresInfo>
    </peace-dialog>
  </div>
</template>

<script>
import MessageRecipeCard from './MessageRecipeCard'
import Service from '../service'
import PresInfo from './PrescriptionOrderDetail'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageRecipeCard,
    PresInfo
  },
  computed: {
    diagnosis() {
      return this.message.content.data.recipeInfo && this.message.content.data.recipeInfo.diagnosis
    },
    drugInfo() {
      return this.message.content.data.recipeInfo && this.message.content.data.recipeInfo.drugInfo
    },
    visitingTime() {
      return this.message.content.data.recipeInfo && this.message.content.data.recipeInfo.visitingTime
    }
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  methods: {
    onClickDetail() {
      const params = { prescribeId: this.message.content.data.recipeInfo.recipeId }
      Service.getPresInfo(params).then((res) => {
        this.dialog.data = res.data
        this.dialog.data.prescriptionId = this.message.content.data.recipeInfo.recipeId
        this.dialog.visible = true
      })
    }
  }
}
</script>

<style>
</style>