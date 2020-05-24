<template>
  <div>
    <FaqHeader />
    <FaqContent />
  </div>
</template>

<script>
import FaqHeader from "~/components/FaqHeader.vue";
import FaqContent from "~/components/FaqContent.vue";

export default {
  components: {
    FaqHeader,
    FaqContent
  },
  head() {
    return {
      title: "Simple FAQ",
      script: [{ src: "https://kit.fontawesome.com/94046200c7.js" }]
    };
  }
};
</script>

<style>
.body {
  background-color: #f4f4f4;
}
</style>
