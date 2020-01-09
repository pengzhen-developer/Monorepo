<template>
  <div class="add-allergies-info">
    <div class="title">
      过敏源
    </div>
    <van-cell-group>
      <van-cell :title="name"
                value="" />
    </van-cell-group>
    <div class="title">
      过敏类型
    </div>
    <van-cell-group>
      <van-cell value=""
                :title="type||'请选择过敏类型'"
                is-link
                @click="showAllergicTypePicker = true">
      </van-cell>
    </van-cell-group>
    <van-button @click="save"
                style="width: 100%;position: fixed;bottom: 0;left: 0;"
                type="primary">保存</van-button>

    <van-popup position="bottom"
               round
               v-model="showAllergicTypePicker">
      <van-picker :columns="allergicTypeColumns"
                  @cancel="showAllergicTypePicker = false"
                  @confirm="onConfirm"
                  show-toolbar />
    </van-popup>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'AddAllergiesInfo',
  data() {
    return {
      name: '',
      type: null,
      typeValue: null,
      showAllergicTypePicker: false,
      allergicTypeColumns: [{ text: '药物', value: 2 }, { text: '食物/接触物', value: 6 }]
    }
  },
  methods: {
    onConfirm(el) {
      this.showAllergicTypePicker = false
      this.type = el.text
      this.typeValue = el.value
    },
    save() {
      if (!this.typeValue) {
        return peace.util.alert('请选择过敏类型')
      }
      peace.service.inquiry.addAllergen({
        name: this.name,
        type: this.typeValue
      })
      const params = {
        value: this.name,
        type: this.typeValue
      }
      const json = peace.util.decode(this.$route.params.json)
      const emit = json.emit
      if (emit) {
        $peace.$emit(emit, params)
      }
      this.$router.go(-1)
    }
  },

  mounted() {
    const json = peace.util.decode(this.$route.params.json)
    const allergy = json.allergy
    if (allergy === undefined) return
    this.name = allergy.text
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.add-allergies-info {
  width: 100%;
  height: 100%;

  .title {
    background-color: #fafafa;
    height: 1.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
    color: rgba(69, 90, 100, 0.6);
  }

  .custom-title {
    color: #999;
  }
}
</style>
