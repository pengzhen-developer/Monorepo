<template>
  <div class="validate-message full-height flex items-center"
       v-if="errorTooltip.length > 0">
    <el-popover width="160"
                placement="top-start"
                trigger="hover">

      <p v-for="error in errorTooltip"
         v-bind:key="error">{{ error }}</p>

      <el-button slot="reference"
                 type="text"
                 class="text-red"
                 icon="el-icon-warning"></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorList: []
    }
  },

  computed: {
    errorTooltip() {
      const errorTooltip = []

      this.errorList.forEach((error) => {
        for (const key in error) {
          if (Object.hasOwnProperty.call(error, key)) {
            const errorList = error[key]

            errorList.forEach((error) => {
              errorTooltip.push(error.message)
            })
          }
        }
      })

      return errorTooltip
    }
  },

  methods: {
    clearErrorMessage() {
      this.errorList = []
    },

    addErrorMessage(error) {
      this.errorList.push(error)
    }
  }
}
</script>

<style>
</style>