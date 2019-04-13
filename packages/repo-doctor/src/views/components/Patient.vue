<template>
  <div>
    <div class="patient" v-if="patient">
      <div class="patient-detail" v-html="patient.text"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    patient: Object
  },

  computed: {
    custom: function() {
      return this.patient && this.patient.custom && JSON.parse(this.patient.custom)
    }
  }
}
</script>

<style lang="scss" scoped>
.patient {
  width: 506px;
  background: rgba(243, 243, 243, 1);
  border-radius: 4px;

  .patient-detail {
    padding: 10px;

    span {
      margin: 0 20px 0 0;
    }
  }

  .patient-narrate {
    span:first-child {
      font-size: 12px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
  }

  .patient-file-list {
    img {
      width: 58px;
      height: 58px;
      margin: 0 12px 0 0;
    }
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #e1e1e1;
    padding: 0;
  }
}
</style>
