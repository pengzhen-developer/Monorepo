<template>
  <div class="flex column">
    <q-scroll-area class="content"
                   v-bind:thumb-style="thumbStyle">
      <ReceiveInfo></ReceiveInfo>
    </q-scroll-area>

    <div class="footer">
      <ReceiveControl></ReceiveControl>
    </div>
  </div>
</template>

<script>
import ReceiveInfo from './ReceiveInfo'
import ReceiveControl from './ReceiveControl'

export default {
  components: {
    ReceiveInfo,
    ReceiveControl
  },

  data() {
    return {}
  },

  computed: {
    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        background: '#bdbdbd',
        width: '5px',
        opacity: 0.75
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.content {
  flex: 1;
}

.footer {
  border-top: 1px solid #efefef;
  height: 180px;
}
</style>