<template>
  <div class="q-py-lg q-px-sm">
    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_marry.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>婚姻状态：</p>
        <p class="text-grey-7"> {{ healthData.maritalStatus }} </p>
      </div>
    </div>

    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_baby.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>生育状态：</p>
        <p class="text-grey-7"> {{ healthData.fertilityStatus }} </p>
      </div>
    </div>

    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_marry copy.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>手术和外伤：</p>
        <p class="text-grey-7"> {{ healthData.surgeryTrauma }} </p>
      </div>
    </div>

    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_medical.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>家族病史：</p>
        <p class="text-grey-7"> {{ healthData.familyHistory }} </p>
      </div>
    </div>

    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_habit.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>药物过敏：</p>
        <p class="text-grey-7"> {{ healthData.drugAllergy }} </p>
      </div>
    </div>

    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_allergy.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>食物/接触物过敏：</p>
        <p class="text-grey-7"> {{ healthData.foodAllergy }} </p>
      </div>
    </div>

    <div class="flex items-start q-mb-lg">
      <div class="flex items-start"
           style="width: 30px; font-size: 20px;">
        <q-icon v-bind:name="`img:${require('@src/assets/images/inquiry/archives_icon_habit3.png')}`"></q-icon>
      </div>
      <div class="col">
        <p>个人习惯：</p>
        <p class="text-grey-7"> {{ healthData.personalHabit }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './../../service'

export default {
  data() {
    return {
      familyId: '',

      healthData: {}
    }
  },

  computed: {
    session() {
      return this.$store.state.inquiry.session
    }
  },

  watch: {
    session: {
      handler() {
        const familyId = this.$store.state.inquiry?.session?.content?.patientInfo?.familyId

        if (this.familyId !== familyId) {
          this.getOneHealth(familyId)
          this.familyId = familyId
        }
      },
      immediate: true
    }
  },

  methods: {
    getOneHealth(familyId) {
      if (this.familyId !== familyId) {
        const params = {
          familyId
        }

        Service.getOneHealth(params).then((res) => {
          for (const key in res.data.personalInfo) {
            if (res.data.personalInfo.hasOwnProperty(key)) {
              const value = res.data.personalInfo[key]

              if (value === '') {
                res.data.personalInfo[key] = '暂无'
              }
            }
          }

          this.healthData = res.data.personalInfo
        })
      }
    }
  }
}
</script>

<style>
</style>