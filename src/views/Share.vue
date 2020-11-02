<template>
  <div id="share">
    <shr-head></shr-head>
    <two-column></two-column>
  </div>
</template>

<script>
import ShrHead from "@/components/share/childComps/ShrHead";
import TwoColumn from "@/components/share/childComps/TwoColumn";

export default {
  components: {
    ShrHead,
    TwoColumn,
  },
};
</script>

<style scoped>
@import url("../assets/css/share/base.css");
</style>
