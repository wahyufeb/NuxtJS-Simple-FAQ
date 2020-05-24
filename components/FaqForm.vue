<template>
  <div>
    <h4>Kirim Pertanyaan</h4>
    <div v-show="allNotification.status">
      <div v-if="allNotification.status">
        <b-alert show variant="success">
          {{ allNotification.message }}
        </b-alert>
      </div>
      <div v-else>
        <b-alert show variant="danger">
          {{ allNotification.message }}
        </b-alert>
      </div>
    </div>
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-textarea
        id="textarea-pertanyaan"
        v-model="pertanyaan"
        debounce="500"
        rows="5"
        max-rows="5"
        required="on"
      ></b-form-textarea>
      <b-row class="mt-3" v-bind="{ 'no-gutters': gutters }">
        <b-col class="button-form" lg="8">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
        <b-col class="button-form" lg="4">
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      gutters: true,
      pertanyaan: ""
    };
  },
  computed: mapGetters(["allNotification"]),
  methods: {
    async onSubmit() {
      const response = await this.addQuestion(this.pertanyaan);
      const data = response.data;
      const notif = {
        status: !data.errors,
        message: "Terimakasih telah mengirim pertanyaan",
        error: data.errors
      };
      this.setNotification(notif);
      this.pertanyaan = "";
    },
    onReset() {
      this.pertanyaan = "";
    },
    ...mapActions(["addQuestion"]),
    ...mapMutations(["setNotification"])
  }
};
</script>

<style>
button {
  width: 100%;
}

.button-form {
  border: 3px solid transparent;
}
</style>
