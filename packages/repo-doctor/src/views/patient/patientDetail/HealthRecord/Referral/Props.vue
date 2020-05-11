<template>
  <div>
    {{ propObjectAssgin }}
    {{ source }}

    <Component v-model="propObjectAssgin"></Component>
  </div>
</template>

<script>
export default {
  props: {
    // propObject 是不可变的
    propObject: {
      type: Object,
      required: true,
      default() {
        return {
          name: '',
          id: ''
        }
      },
      validate() {}
    }
  },

  computed: {
    propObjectAssgin() {
      return this.propObjectAssgin
    }
  },

  watch: {
    propObjectAssgin() {}
  },

  data() {
    return {
      source: ''
    }
  },

  created() {
    this.source = this.fetch()
  },

  methods: {
    fetch() {
      return this.propObject.id
    }
  }
}
</script>
