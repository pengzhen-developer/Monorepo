<template>
  <!--  -->
  <div>
    <div class="panel panel-block panel-block-s">
      <div :deptid="item.id"
           :Key="index"
           :txt="item.text"
           @click="goMenuPage(item)"
           class="block-items"
           v-bind:class="{'last':index == items.length -1}"
           v-for="(item,index) in lists.splice(0, showNum)">
        <img :src="item.icon"
             class="block-ico" />
        <div class="block-tit">{{item.text}}</div>
      </div>
      <div @click="goDeptItemsPage()"
           class="block-items"
           v-if="items.length > max">
        <img :src="moreIcon"
             class="block-ico" />
        <div class="block-tit">更多</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    items: {
      type: Array,
      default: function() {
        return []
      }
    },
    // length: {},
    max: {
      type: Number,
      default: function() {
        return this.items.length
      }
    },
    moreIcon: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      lists: [],
      showNum: 100
    }
  },
  created() {
    this.lists = this.items || []
    this.showNum = this.max

    if (this.lists.length === 0) {
      peace.service.index.getMenu().then(res => {
        this.lists = res.data.department
        this.showNum = res.data.department.length
      })
    }
  },
  methods: {
    goMenuPage(item) {
      let json = peace.util.encode({
        deptId: item.id,
        txt: item.text,
        txtId: item.id
      })
      this.$router.push(`/components/doctorList/${json}`)
    },
    goDeptItemsPage() {
      this.$router.push(`/hospital/depart/HospitalDepartList/`)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel.panel-block {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  padding-bottom: 10px;
  border-bottom: 0;
  .block-items {
    font-size: inherit;
    padding: 5px 5px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 0 1 25%;

    .block-ico {
      width: 28px;
      height: 28px;
      margin: 5px auto;
      background-color: #fff;
      position: relative;
      background-repeat: no-repeat;
      background-size: cover;
      display: block;

      &::before {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        background-size: cover;
      }
    }
    .block-tit {
      color: #000;
      font-size: 15px;
      line-height: 1.5;
      text-align: center;
    }
    .block-small {
      font-size: 22px;
      color: #999;
    }
  }
}
.panel-block-s {
  /*display: block;*/
  /*width: 100%;*/
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -webkit-box-lines: multiple;
  -moz-flex-wrap: wrap;
  padding: 5px;
}
</style>