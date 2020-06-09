<template>
  <div>
    <div class="flex justify-between q-py-sm q-px-md bg-grey-2 q-mb-md">
      <div>
        <span>共 {{ total }} 张，</span>
        <span>当前第 {{ current }} 张。</span>
        <span>（{{ current }}/{{ total }}）</span>
      </div>

      <div class="flex">
        <div v-on:click="prev">
          <i class="cursor-pointer el-icon-caret-left text-subtitle1"></i>
        </div>
        <div v-on:click="next">
          <i class="cursor-pointer el-icon-caret-right text-subtitle1"></i>
        </div>
      </div>
    </div>

    <RecipeDetail v-bind:data="recipeData"></RecipeDetail>
  </div>
</template>

<script>
import Service from './service'
import RecipeDetail from './RecipeDetail'

export default {
  components: {
    RecipeDetail
  },

  props: {
    data: Object
  },

  data() {
    return {
      currentIndex: 0,

      recipeData: {}
    }
  },

  computed: {
    current() {
      return this.currentIndex + 1
    },

    total() {
      return this.data?.total
    }
  },

  watch: {
    current: {
      immediate: true,
      handler() {
        this.getRecipeDetail()
      }
    }
  },

  methods: {
    next() {
      this.currentIndex = this.current >= this.total ? 0 : this.currentIndex + 1
    },

    prev() {
      this.currentIndex = this.current === 1 ? this.total - 1 : this.currentIndex - 1
    },

    getRecipeDetail() {
      const params = {
        prescriptionId: this.data.list[this.currentIndex].id
      }

      Service.getPrescripInfo(params).then((res) => {
        this.recipeData = res.data
      })
    }
  }
}
</script>

<style>
</style>