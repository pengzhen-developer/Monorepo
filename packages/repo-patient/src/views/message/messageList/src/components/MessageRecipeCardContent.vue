<template>
  <div>
    <MessageRecipeCard :diagnosis="diagnosis"
                       :drugInfo="drugInfo"
                       :visitingTime="visitingTime"
                       @onClickDetail="onClickDetail"></MessageRecipeCard>
  </div>
</template>

<script>
import peace from '@src/library'
import MessageRecipeCard from './MessageRecipeCard'
import { Dialog } from 'vant'

export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      flag: false
    }
  },
  components: {
    MessageRecipeCard
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
  methods: {
    onClickDetail() {
      if (this.flag) {
        return
      }
      this.flag = true
      const params = peace.util.encode({
        prescribeId: this.message.content.data.recipeInfo.recipeId
      })
      //跳转前校验当前处方状态--已作废不能调转详情

      const param = { prescribeId: this.message.content.data.recipeInfo.recipeId }

      peace.service.patient
        .getPrescripInfo(param)
        .then((res) => {
          const prescriptionStatus = res.data.prescriptionStatus.key
          if (prescriptionStatus == 3 || prescriptionStatus == 4) {
            return Dialog.confirm({
              title: '温馨提示',
              message: '处方已作废，不可查看处方详情',
              onfirmButtonText: '确定',
              showCancelButton: false
            })
          } else {
            this.$router.push(`/components/theRecipe/${params}`)
          }
        })
        .finally(() => {
          this.flag = false
        })
    }
  }
}
</script>

<style>
</style>