<template>
    <div class="signNotice">
          <div class="title">{{data && data.title}}</div>
          <div class="content"> {{data && data.content}} </div>
    </div>
</template>

<script>
    export default {
        name: "OrgNotice",
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
    }
</script>

<style scoped lang="scss">
.signNotice {
   .title {
       height:28px;
       font-size:20px;
       font-weight:400;
       color:rgba(51,51,51,1);
       line-height:28px;
   }
    .content {
        font-size:14px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:20px;
        margin-top: 10px;
    }
}
</style>
