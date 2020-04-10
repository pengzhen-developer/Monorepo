<template>
  <div>
    <div class="welcome">
      <p>欢迎你，开发者</p>
    </div>

    <div>
      <span>应用名称</span>
      <span>{{ appName }}</span>
    </div>

    <div>
      <span>版本号</span>
      <span>{{ appVersion }}</span>
    </div>

    <div>
      <van-cell title="设备名称"
                v-bind:value="deviceName" />
    </div>

    <div>
      <button block
              v-on:click="showConfig"
              type="primary">
        查看 config.js
      </button>
    </div>

    <div>
      <button block
              v-on:click="showPackage"
              type="primary">
        查看 package.json
      </button>
    </div>

    <div>
      <button block
              v-on:click="showLocalStorage"
              type="primary">
        查看 localStorage 缓存
      </button>
    </div>

    <div>
      <button block
              v-on:click="showSessionStorage"
              type="primary">
        查看 sessionStorage 缓存
      </button>
    </div>

    <div>
      <button block
              v-on:click="clearStorage"
              type="primary">
        清理所有缓存
      </button>
    </div>

    <div>
      <button block
              v-on:click="enableVConsole"
              type="primary">
        开启 vConsole
      </button>
    </div>

    <pre><code>{{ content }}</code></pre>
  </div>
</template>

<script>
import Vconsole from 'vconsole'

import Package from '@/package.json'
import Config from '@src/config'

import { device } from './util/system'

export default {
  data() {
    return {
      appName: Package.name,
      appVersion: Package.version,

      deviceName: device,

      content: ''
    }
  },

  methods: {
    showConfig() {
      this.content = JSON.stringify(Config, null, 2)
    },

    showPackage() {
      this.content = JSON.stringify(Package, null, 2)
    },

    showLocalStorage() {
      this.content = JSON.stringify(window.localStorage, null, 2)
    },

    showSessionStorage() {
      this.content = JSON.stringify(window.sessionStorage, null, 2)
    },

    clearStorage() {
      window.localStorage.clear()
      window.sessionStorage.clear()
    },

    enableVConsole() {
      const v = new Vconsole()

      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome {
  padding: 15px;
  font-size: 16px;
}

pre {
  overflow-x: auto;

  max-width: 100vw;
}
</style>