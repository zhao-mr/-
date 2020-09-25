<!--全部实验-->
<template>
  <div>
    <div>全部实验</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'allExperiment',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
