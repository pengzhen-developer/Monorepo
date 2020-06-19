<template>
  <div>
    <p>chrome: {{ chrome }}</p>
    <p>version: {{ version }}</p>
    <p>versionNumber: {{ versionNumber }}</p>
    <p>win: {{ win }}</p>
    <p>desktop: {{ desktop }}</p>
    <p>webkit: {{ webkit }}</p>
    <p>name: {{ name }}</p>
    <p>platform: {{ platform }}</p>
  </div>
</template>

<script>
import Peace from '@src/library'

const platform = Peace.util.platform.is

export default {
  data() {
    return {
      chrome: platform.chrome,
      version: platform.version,
      versionNumber: platform.versionNumber,
      win: platform.win,
      desktop: platform.desktop,
      webkit: platform.webkit,
      name: platform.name,
      platform: platform.platform
    }
  }
}
</script>

<style>
</style>