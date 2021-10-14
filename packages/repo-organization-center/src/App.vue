<template>
  <div id="app"
       class="window-width window-height overflow-hidden">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    const token = this.getCookie('ut')
    Peace.http.defaults.headers.common['ut'] = Peace.validate.isEmpty(token) ? '96b7558d01804655a3401e26cfed7e01' : token
  },
  methods: {
    //获取cookie
    getCookie: function (cname) {
      const name = cname + "=";
      const ca = document.cookie.split(';');
      console.log("获取cookie,现在循环")
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        console.log(c)
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
  },

}
</script>

<style lang="scss">
</style>
