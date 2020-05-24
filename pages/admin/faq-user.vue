<template>
  <div>
    <Header :username="dataAuth.user.username" />
    <main>
      <FaqUser :token="dataAuth.user.token" />
    </main>
  </div>
</template>

<script>
import Header from "~/components/admin/Header";
import FaqUser from "~/components/admin/FaqUser";

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  middleware: ["auth-admin"],
  head() {
    return {
      title: "Daftar FAQ dari User",
      script: [{ src: "https://kit.fontawesome.com/94046200c7.js" }]
    };
  },
  // created() {
  //   this.fetchFaqLists();
  // },
  components: {
    Header,
    FaqUser
  },
  computed: {
    ...mapGetters(["dataAuth", "filterQuestion"])
  }
};
</script>

<style>
.body {
  background-color: #f4f4f4;
}
main {
  padding: 50px;
  padding-top: 10px;
}
</style>
