<template>
  <div class="file-health-detail">
    <div class="header flex">
      <van-image round
                 width="50px"
                 height="50px"
                 :src="require('@src/assets/images/ic_head portrait.png')" />
      <span style="font-size: 20px; margin: 0 10px;">{{ model.name }}</span>
      <van-icon v-if="model.sex === '男'"
                :name="require('@src/assets/images/file/ic_boys.png')"></van-icon>
      <van-icon v-if="model.sex === '女'"
                :name="require('@src/assets/images/file/ic_girls.png')"></van-icon>
      <span style="font-size: 14px; margin: 0 10px;">{{ model.age + '岁' }}</span>
      <van-tag color="#F2F2F2"
               text-color="#999999">{{ model.relation }}</van-tag>
    </div>

    <van-cell-group class="content">
      <van-cell title="婚姻状况"
                is-link
                @click="popup.maritalStatus = true"
                :value="model.maritalStatus" />
      <van-popup position="bottom"
                 v-model="popup.maritalStatus">
        <van-picker :columns="dict.maritalStatus"
                    :default-index="dict.maritalStatus.indexOf(model.maritalStatus)"
                    show-toolbar
                    @confirm="v => { model.maritalStatus = v; popup.maritalStatus = false }"
                    @cancel="v => popup.maritalStatus = false" />
      </van-popup>

      <van-cell title="生育状况"
                is-link
                @click="popup.fertilityStatus = true"
                :value="model.fertilityStatus" />
      <van-popup position="bottom"
                 v-model="popup.fertilityStatus">
        <van-picker :columns="dict.fertilityStatus"
                    :default-index="dict.fertilityStatus.indexOf(model.fertilityStatus)"
                    show-toolbar
                    @confirm="v => { model.fertilityStatus = v; popup.fertilityStatus = false }"
                    @cancel="v => popup.fertilityStatus = false" />
      </van-popup>

      <van-cell title="手术或外伤"
                is-link
                placeholder="请输入"
                @click="popup.surgeryTrauma = true"
                v-model="model.surgeryTrauma" />
      <van-popup position="bottom"
                 v-model="popup.surgeryTrauma">
        <van-picker :columns="dict.surgeryTrauma"
                    :default-index="dict.surgeryTrauma.indexOf(model.surgeryTrauma)"
                    show-toolbar
                    @confirm="v => { model.surgeryTrauma = v; popup.surgeryTrauma = false }"
                    @cancel="v => popup.surgeryTrauma = false" />
      </van-popup>

      <van-cell title="家族病史"
                is-link
                placeholder="请输入"
                @click="popup.familyHistory = true"
                v-model="model.familyHistory" />
      <van-popup position="bottom"
                 v-model="popup.familyHistory">
        <van-picker :columns="dict.familyHistory"
                    :default-index="dict.familyHistory.indexOf(model.familyHistory)"
                    show-toolbar
                    @confirm="v => { model.familyHistory = v; popup.familyHistory = false }"
                    @cancel="v => popup.familyHistory = false" />
      </van-popup>

      <van-cell title="药物过敏"
                is-link
                @click="popup.drugAllergy = true"
                :value="model.drugAllergy || '无'" />
      <van-popup position="bottom"
                 v-model="popup.drugAllergy">
        <AddFoodAllergy style="max-height: 80vh"
                        @onSave="popup.drugAllergy = false"
                        v-model="model.drugAllergy"></AddFoodAllergy>
      </van-popup>

      <van-cell title="食物/接触物过敏"
                is-link
                @click="popup.foodAllergy = true"
                :value="model.foodAllergy || '无'" />
      <van-popup position="bottom"
                 v-model="popup.foodAllergy">
        <AddAllergicHistory style="max-height: 80vh"
                            @onSave="popup.foodAllergy = false"
                            v-model="model.foodAllergy"></AddAllergicHistory>
      </van-popup>

      <van-cell title="个人习惯"
                is-link
                @click="popup.personalHabit = true"
                v-model="model.personalHabit" />
      <van-popup position="bottom"
                 v-model="popup.personalHabit">
        <van-picker :columns="dict.personalHabit"
                    :default-index="dict.personalHabit.indexOf(model.personalHabit)"
                    show-toolbar
                    @confirm="v => { model.personalHabit = v; popup.personalHabit = false }"
                    @cancel="v => popup.personalHabit = false" />
      </van-popup>
    </van-cell-group>

    <div class="footer">
      <van-button @click="save"
                  style="width: 100%;"
                  type="primary">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

import AddAllergicHistory from '@src/views/components/AddAllergicHistory'
import AddFoodAllergy from '@src/views/components/AddFoodAllergy'

export default {
  components: {
    AddAllergicHistory,
    AddFoodAllergy
  },

  data() {
    return {
      model: {
        maritalStatus: '',
        fertilityStatus: '',
        surgeryTrauma: '',
        familyHistory: '',
        drugAllergy: '',
        foodAllergy: '',
        personalHabit: ''
      },

      popup: {
        maritalStatus: false,
        fertilityStatus: false,
        surgeryTrauma: false,
        familyHistory: false,
        drugAllergy: false,
        foodAllergy: false,
        personalHabit: false
      },

      dict: {
        maritalStatus: [],
        fertilityStatus: [],
        surgeryTrauma: [],
        familyHistory: [],
        drugAllergy: [],
        foodAllergy: [],
        personalHabit: []
      }
    }
  },

  created() {
    this.getDictionary()

    this.familyInfo()
    this.getBaseInfo()
  },

  methods: {
    getDictionary() {
      peace.service.health.lists({ type: 1 }).then(res => {
        this.dict.maritalStatus = res.data.map(item => item.name)
      })
      peace.service.health.lists({ type: 2 }).then(res => {
        this.dict.fertilityStatus = res.data.map(item => item.name)
      })
      peace.service.health.lists({ type: 3 }).then(res => {
        this.dict.surgeryTrauma = res.data.map(item => item.name)
      })
      peace.service.health.lists({ type: 4 }).then(res => {
        this.dict.familyHistory = res.data.map(item => item.name)
      })
      peace.service.health.lists({ type: 5 }).then(res => {
        this.dict.drugAllergy = res.data.map(item => item.name)
      })
      peace.service.health.lists({ type: 6 }).then(res => {
        this.dict.foodAllergy = res.data.map(item => item.name)
      })
      peace.service.health.lists({ type: 7 }).then(res => {
        this.dict.personalHabit = res.data.map(item => item.name)
      })
    },

    familyInfo() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.health.familyInfo(params).then(res => {
        this.model = Object.assign({}, this.model, res.data)
      })
    },

    getBaseInfo() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.health.getBaseInfo(params).then(res => {
        this.model = Object.assign({}, this.model, res.data)
      })
    },

    save() {
      peace.service.health.addBaseInfo(this.model).then(res => {
        peace.util.alert(res.msg)

        // replace 当前页，并返回上一页
        const prveRoute = $peace.routerStack[$peace.routerStack.length - 2]

        this.$router.replace(prveRoute.path)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;

  &.column {
    flex-direction: column;
  }
  &.between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
}

.file-health-detail {
  height: 100%;
  background: #fafafa;

  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  padding: 10px 20px;
  margin: 0 0 10px 0;
  height: 70px;
}

.content {
  flex: 1;
  overflow: auto;
}

.footer {
  background: #fff;
  height: 70px;
  padding: 15px;
}
</style>