<template>
  <div class="wrapper">
    <introduction v-for="(item,index) in cInfo" :cIndividual="item" :key="index"></introduction>
  </div>
</template>

<script>
import introduction from "@/components/memberMenu/introduction";
export default {
  components: {
    introduction,
  },
  data() {
    return {
      memberlen: "",
    };
  },
  props: {
    cInfo: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped>
.wrapper {
  padding-left: 20px;
  padding-top: 20px;
}
</style>