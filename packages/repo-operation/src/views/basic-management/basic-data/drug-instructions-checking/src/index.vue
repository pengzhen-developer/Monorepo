<template>
  <div>
    <iframeContainer ref="iframe"
                     v-bind:src="src"
                     full-height></iframeContainer>
  </div>
</template>

<script>
import iframeContainer from '@src/views/iframe'

export default {
  name: 'DrugInstructionsChecking',
  components: {
    iframeContainer
  },

  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = `${process.env.VUE_APP_SITE_OPERATION}knowledgebase/web?uri=knowledgeBaseExamine/drugsInstructions/instructionExamineList.html`
  }
}
</script>

<style>
</style>