<template>
  <div class="container">
    <div class="form">
      <van-field
        label="姓名"
        placeholder="请输入姓名"
        required
        v-model="info.name"
      />
      <van-field
        label="身份证号"
        placeholder="请输入身份证号"
        required
        v-model="info.idCard"
      />
      <van-field
        @click="showPopup('Relation')"
        label="关系"
        placeholder="请选择"
        readonly
        required
        right-icon="arrow"
        v-model="info.relation"
      />
      <van-field
        @click="showPopup('Sex')"
        label="性别"
        placeholder="请选择"
        readonly
        required
        right-icon="arrow"
        v-model="info.sex"
      />
      <van-field
        @click="showPopup('Birthday')"
        label="生日"
        placeholder="请选择"
        readonly
        required
        right-icon="arrow"
        v-model="info.birthday"
      />
      <van-field
        label="过敏史"
        placeholder="请填写过敏史"
        v-model="info.allergies"
      />
    </div>
    <div class="bottom">
      <van-button
        @click="deleted"
        plain
        type="primary"
        v-if="isEdit"
      >删除</van-button>
      <van-button @click="submit" type="primary">保存</van-button>
    </div>
    <!-- 关系 -->
    <van-popup position="bottom" v-model="showRelation">
      <van-picker
        :columns="relations"
        @cancel="closeAllPopup"
        @confirm="setRelation"
        show-toolbar
      />
    </van-popup>
    <!-- 性别 -->
    <van-popup position="bottom" v-model="showSex">
      <van-picker
        :columns="sexs"
        @cancel="closeAllPopup"
        @confirm="setSex"
        show-toolbar
      />
    </van-popup>
    <!-- 生日 -->
    <!-- <van-popup position="bottom" v-model="showRelation">
      <van-picker :columns="options" @change="onChange" />
    </van-popup>-->
  </div>
</template>
<script>
export default {
  name: 'FamilyMembersModel',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          name: '',
          idCard: '',
          relation: '',
          sex: '',
          birthday: '',
          allergies: ''
        }
      }
    }
  },
  data() {
    return {
      info: Object.assign({}, this.data),
      relations: ['亲友', '孩子', '爱人', '本人'],
      sexs: ['男', '女'],
      showRelation: false,
      showSex: false,
      showBirthday: false
    }
  },
  computed: {
    isEdit() {
      return !!this.data.name
    }
  },
  methods: {
    setRelation(val) {
      this.info.relation = val
      this.closeAllPopup()
    },
    setSex(val) {
      this.info.sex = val
      this.closeAllPopup()
    },
    // 显示指定弹出层
    showPopup(_key) {
      this.closeAllPopup()
      const key = `show${_key}`
      this[key] = true
    },
    // 关闭所有弹出层
    closeAllPopup() {
      this.showRelation = false
      this.showSex = false
      this.showBirthday = false
    },
    // 保存
    submit() {
      const params = this.info

      if (this.isEdit) {
        this.$emit('edit', params)
      } else {
        this.$emit('submit', params)
      }
    },
    // 删除
    deleted() {
      const params = this.info

      this.$emit('deleted', params)
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
}
.form {
  /deep/ .van-field {
    &__control {
      color: #666;
      text-align: right;
      &::placeholder {
        color: #ccc;
      }
    }
  }
}
</style>
