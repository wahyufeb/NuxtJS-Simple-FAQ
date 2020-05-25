<template>
  <div>
    <h5>Daftar FAQ USER</h5>
    <hr />
    <div class="table-data">
      <div v-if="filterQuestionUser.length !== 0">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th width="80%">Pertanyaan</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="listItem in filterQuestionUser" :key="listItem.id">
              <td>{{ listItem.id }}</td>
              <td>{{ listItem.pertanyaan }}</td>
              <td>
                <b-button
                  @click="detailFaq(listItem.id)"
                  variant="outline-warning mt-2"
                  v-b-modal.modal-1
                >
                  <i class="fas fa-reply"></i>
                </b-button>
                <b-button
                  variant="outline-danger mt-2"
                  @click="hapusFaq(listItem.id)"
                >
                  <i class="fas fa-trash"></i>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th width="80%">Pertanyaan</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colspan="4" align="center">
                <center>
                  <h6 class="center">Data Tidak ada</h6>
                </center>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <b-modal
        ref="modal-1"
        id="modal-1"
        hide-footer
        title="Balas Pertanyaan User"
      >
        <div v-show="allNotification.status">
          <div v-if="allNotification.error">
            <b-alert show variant="danger">
              {{ allNotification.message }}
            </b-alert>
          </div>
          <div v-else>
            <b-alert show variant="success">
              FAQ Berhasil Terjawab
            </b-alert>
          </div>
        </div>
        <h6>Pertanyaan :</h6>
        <p>{{ pertanyaanModal }}</p>
        <b-form @submit.prevent="balasFaq">
          <b-form-textarea
            id="textarea-pertanyaan"
            v-model="jawabanModal"
            debounce="500"
            rows="5"
            max-rows="5"
            required
          ></b-form-textarea>
          <b-button class="btn-form mt-3" type="submit" variant="primary"
            >Submit</b-button
          >
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["token"],
  computed: {
    ...mapGetters(["filterQuestionUser", "allNotification"])
  },
  created() {
    this.fetchFaqLists();
  },
  data() {
    return {
      id: null,
      pertanyaanModal: "",
      jawabanModal: ""
    };
  },
  methods: {
    ...mapActions([
      "hapusFaqAction",
      "balasFaqAction",
      "fetchFaqLists",
      "setNotification"
    ]),
    hapusFaq(id) {
      const token = this.token;
      const data = {
        id,
        token
      };
      this.hapusFaqAction(data);
    },
    detailFaq(id) {
      this.filterQuestionUser.filter(data => {
        if (data.id === id) {
          this.pertanyaanModal = data.pertanyaan;
          this.id = data.id;
        }
      });
    },
    hideModal() {
      this.$refs["modal-1"].hide();
    },
    async balasFaq() {
      const data = {
        id: this.id,
        jawaban: this.jawabanModal,
        token: this.token
      };
      const response = await this.balasFaqAction(data);
      const resData = response.data;
      const notif = {
        status: true,
        message: resData.message,
        error: resData.errors
      };
      this.setNotification(notif);

      setTimeout(() => {
        this.hideModal();
        this.id = "";
        this.pertanyaanModal = "";
        this.jawabanModal = "";
      }, 2000);
    }
  }
};
</script>

<style>
/* button form */
.btn-form {
  width: 100%;
}

/* Table */

table {
  border-collapse: collapse;
  width: 100%;
}

thead {
  background-color: #333;
  color: #fff;
}

table tr {
  text-align: left;
}

th,
td {
  padding: 10px;
}

th {
  text-align: left;
  text-align: left;
}
</style>
