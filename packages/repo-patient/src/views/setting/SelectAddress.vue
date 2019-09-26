<template>
  <div>
    {{ value }}
    <van-area :area-list="areaList" :value="internalValue" @confirm="confirm" />
  </div>
</template>

<script>
import areaList from "@src/area";

export default {
  props: {
    value: String,
    province: String,
    city: String,
    district: String
  },

  data() {
    return {
      areaList, //3级地址数据
      internalValue: this.value || "",  //默认选中的code .做兼容，本项目不会传
      internalProvince: { 
        code: "",
        name: ""
      },
      internalCity: {
        code: "",
        name: ""
      },
      internalDistrict: {
        code: "",
        name: ""
      }
    };
  },
  // 通过传入的三级地址，找到对应的Code
  watch: {
    district: {
      handler(val) {
        if (val) {
          const code = Object.keys(this.areaList.county_list).find(
            key => this.areaList.county_list[key] === val
          );

          this.internalValue = code;
        }
      },
      immediate: true
    }
  },

  // created(){
  //   const params = this.$route.params.district
  //   const backComponetName = this.$route.params.backComponetName
  //   const code = this.handlerParams(params)
  //   this.internalValue = code;
  // },

  methods: {
    confirm(areaList) {
      // if(isPrams || comp){
      //   this.$router.replace({
      //     name: backComponetName,
      //     params: {
      //       province: this.internalProvince,
      //       city: this.internalCity,
      //       district: this.internalDistrict
      //     }
      //   })
      // }
      this.internalProvince = areaList[0];
      this.internalCity = areaList[1];
      this.internalDistrict = areaList[2];

      this.$emit("onConfirm", {
        province: this.internalProvince,
        city: this.internalCity,
        district: this.internalDistrict
      });
    }
  }
};
</script>

<style>
</style>