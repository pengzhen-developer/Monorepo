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
    Peace.http.defaults.headers.common['ut'] = Peace.validate.isEmpty(token) ? 'c01b7ff5bd1b4805aeaa3c0324307ca3' : token
  },
  methods: {
    //获取cookie
    getCookie: function (cname) {
      const name = cname + "=";
      const ca = document.cookie.split(';');
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
