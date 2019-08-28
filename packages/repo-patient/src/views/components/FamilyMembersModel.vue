<template>
  <div class="container">
    <template v-if="isEdit">
      <div class="form form-for-family">
        <van-field :disabled="isEdit" label="姓名" placeholder="请输入姓名" v-model="model.name" />
        <van-field :disabled="isEdit" label="身份证号" placeholder="请输入身份证号" v-model="model.idcard" />
        <van-field :disabled="isEdit" label="关系" placeholder="请选择" readonly v-model="model.relation" />
        <van-field :disabled="isEdit" label="性别" placeholder="请选择" readonly v-model="model.sex" />
        <van-field :disabled="isEdit" label="生日" placeholder="请输入" readonly v-model="model.birthday" />
        <van-field :value="model.allergic_history" @click="showAllergicHistory= true" clickable label="药物过敏" placeholder="请选择" readonly right-icon="arrow" />
        <van-field :value="model.foodAllergy" @click="showFoodAllergy= true" clickable label="食物/接触物过敏" class="wid"  placeholder="请选择" readonly right-icon="arrow" />
        <peace-dialog :visible.sync="showAllergicHistory">
          <AddAllergicHistory @onSave="showAllergicHistory = false" v-model="model.allergic_history"></AddAllergicHistory>
        </peace-dialog>
        <peace-dialog :visible.sync="showFoodAllergy">
          <AddFoodAllergy @onSave="showFoodAllergy = false" v-model="model.foodAllergy"></AddFoodAllergy>
        </peace-dialog>
      </div>
      <div class="bottom">
        <van-button @click="deleted" plain type="primary">删除</van-button>
        <van-button @click="submit" type="primary">保存</van-button>
      </div>
    </template>

    <template v-else>
      <div class="form form-for-family">
        <van-field error label="姓名" placeholder="请输入姓名" required v-model="model.name" />
        <van-field label="身份证号" placeholder="请输入身份证号" required v-model="model.idcard" />
        <van-field @click="showPopupRelation" label="关系" placeholder="请选择" readonly required right-icon="arrow" v-model="model.relation" />
        <van-field @click="showPopupSex" label="性别" placeholder="请选择" readonly required right-icon="arrow" v-model="model.sex" />
        <van-field @click="showPopupBirthday" label="生日" placeholder="请输入" readonly required right-icon="arrow" v-model="model.birthday" />
        <van-field :value="model.allergic_history" @click="showAllergicHistory= true" clickable label="药物过敏" placeholder="请选择" readonly right-icon="arrow" />
        <van-field :value="model.foodAllergy" @click="showFoodAllergy= true" clickable label="食物/接触物过敏" placeholder="请选择" readonly right-icon="arrow" />
        <peace-dialog :visible.sync="showAllergicHistory">
          <AddAllergicHistory @onSave="showAllergicHistory = false" v-model="model.allergic_history"></AddAllergicHistory>
        </peace-dialog>
        <peace-dialog :visible.sync="showFoodAllergy">
          <AddFoodAllergy @onSave="showFoodAllergy = false" v-model="model.foodAllergy"></AddFoodAllergy>
        </peace-dialog>
      </div>
      <div class="bottom">
        <van-button @click="submit" type="primary">保存</van-button>
      </div>
    </template>

    <!-- 关系 -->
    <van-popup position="bottom" v-model="showRelation">
      <van-picker :columns="relations" @cancel="closeAllPopup" @confirm="setRelation" show-toolbar />
    </van-popup>
    <!-- 性别 -->
    <van-popup position="bottom" v-model="showSex">
      <van-picker :columns="sexs" @cancel="closeAllPopup" @confirm="setSex" show-toolbar />
    </van-popup>
    <!-- 生日 -->
    <van-popup position="bottom" v-model="showBirthday">
      <van-datetime-picker :max-date="maxDate" :min-date="minDate" @cancel="showBirthday = false" @confirm="selectTime" type="date" v-model="currentDate" />
    </van-popup>
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

  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: '',
          idcard: '',
          relation: '',
          sex: '',
          birthday: '',
          allergic_history: '',
          foodAllergy: ''
        }
      }
    },

    canShowSelf: {
      type: Boolean,
      default() {
        return true
      }
    }
  },

  data() {
    return {
      model: Object.assign({}, this.data),
      relations: ['本人', '父母', '爱人', '孩子', '挚友'],
      sexs: ['男', '女'],

      minDate: new Date().proDate('{%y-150}'),
      currentDate: new Date(),
      maxDate: new Date(),

      showAllergicHistory: false,
      showFoodAllergy: false,
      showRelation: false,
      showSex: false,
      showBirthday: false
    }
  },

  computed: {
    isEdit() {
      return !!this.data.familyId
    }
  },

  watch: {
    // 根据身份证解析性别和生日
    'model.idcard'(val) {
      if (peace.validate.idCard(val)) {
        if (val.length == 15) {
          this.model.sexKey = val.toString().charAt(14) % 2
          this.model.sex = this.model.sexKey ? '男' : '女'
          this.model.birthday = '19' + val.substr(6, 2) + '-' + val.substr(8, 2) + '-' + val.substr(10, 2)
        }
        if (val.length == 18) {
          this.model.sexKey = val.toString().charAt(16) % 2
          this.model.sex = this.model.sexKey ? '男' : '女'
          this.model.birthday = val.substr(6, 4) + '-' + val.substr(10, 2) + '-' + val.substr(12, 2)
        }
      }
    },

    canShowSelf: {
      handler() {
        if (!this.canShowSelf) {
          this.relations.splice(0, 1)
        }
      },
      immediate: true
    }
  },

  methods: {
    selectTime(value) {
      this.showBirthday = false
      this.model.birthday = value.formatDate()
    },

    setRelation(val) {
      this.model.relation = val
      this.closeAllPopup()
    },

    setSex(val) {
      this.model.sex = val
      this.closeAllPopup()
    },

    showPopupRelation() {
      this.showRelation = true
    },

    showPopupSex() {
      this.showSex = true
    },

    showPopupBirthday() {
      this.showBirthday = true
    },

    // 关闭所有弹出层
    closeAllPopup() {
      this.showRelation = false
      this.showSex = false
      this.showBirthday = false
    },

    // 保存
    submit() {
      const params = this.model

      if (!this.model.name) {
        return peace.util.alert('请输入姓名')
      }
      if (!this.model.idcard) {
        return peace.util.alert('请输入身份证号')
      }
      if (!this.model.relation) {
        return peace.util.alert('请选择关系')
      }
      if (!this.model.sex) {
        return peace.util.alert('请选择性别')
      }
      if (!this.model.birthday) {
        return peace.util.alert('请选择出生日期')
      }

      if (this.isEdit) {
        const params = {
          familyId: this.model.familyId,
          allergic_history: this.model.allergic_history,
          foodAllergy: this.model.foodAllergy
        }

        peace.service.patient.upbindFamily(params).then(res => {
          peace.util.alert(res.msg)

          this.$emit('onComplete')
        })
      } else {
        peace.service.patient.bindFamily(params).then(res => {
          peace.util.alert(res.msg)

          this.$emit('onComplete')
        })
      }
    },

    // 删除
    deleted() {
      const params = {
        familyId: this.model.familyId
      }

      peace.service.patient.DelFamily(params).then(res => {
        peace.util.alert(res.msg)

        this.$emit('onComplete')
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  .form {
    flex: 1;
  }
  .bottom {
    padding: 10px 15px;
    display: flex;
    .van-button {
      flex: 1;
    }
    .van-button + .van-button {
      margin-left: 10px;
    }
  }
  /deep/ .van-cell__title{
    flex: 1;
    width: auto;
  }
}
/deep/ .form.form-for-family > .van-cell > .van-cell__value > .van-field__body > .van-field__control {
  color: #666;
  text-align: right;
  &::placeholder {
    color: #ccc;
  }
}
</style>
