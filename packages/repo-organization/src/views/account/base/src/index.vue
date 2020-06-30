<template>
  <div class="content-bgd">
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">账号信息</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <p class="child-key">用户名</p>
          <p>：</p>
          <p class="child-value">{{ userData.username }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">联系人</p>
          <p>：</p>
          <p class="child-value">{{ userData.contacts }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">手机号码</p>
          <p>：</p>
          <p class="child-value">{{ userData.phone }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">邮箱</p>
          <p>：</p>
          <p class="child-value">{{ userData.email }}</p>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title"> 机构信息</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <p class="child-key">机构类型</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.mechanismType }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">机构名称</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.mechanismName }}</p>
        </div>
        <div class="item-child">
          <p class="child-key-other">统一社会信用代码</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.mechanismCode }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">医院属性</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.mechanismStatus }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">详细地址</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.address }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">医院等级</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.hospitalGrade }}</p>
        </div>
        <div class="item-child">
          <p class="child-key">医院等级</p>
          <p>：</p>
          <p class="child-value">{{ mechanism.hospitalGrade }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        username: 'zhansan',
        contacts: '张三',
        phone: '131554545545',
        email: '324234243.@qq.com'
      },
      mechanism: {
        mechanismType: '医疗机构',
        mechanismName: '北辰医院',
        mechanismCode: '52141122MJ1825564A',
        mechanismStatus: '公立医院 综合医院',
        address: '湖北省武汉市汉阳区5.5医药产业园',
        hospitalGrade: '三级甲等'
      }
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.content-bgd {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
}
.content-item {
  display: flex;
  flex-direction: column;
  background: white;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  font-size: #333333;
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.item-content {
  margin: 10px 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.item-child {
  width: 33%;
  margin-top: 10px;
  display: flex;
}
.child-key {
  width: 4em;
  font-size: 14px;
  color: #333333;
  text-align: justify;
  text-align-last: justify;
}
.child-value {
  font-size: 14px;
  color: #666666;
}
.child-key-other {
  width: 8em;
  font-size: 14px;
  color: #333333;
  text-align: justify;
  text-align-last: justify;
}
.line {
  width: 100%;
  margin: 10px 0 20px 0;
  height: 1px;
  background: #e9e9e9;
}
</style>