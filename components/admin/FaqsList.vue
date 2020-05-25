<template>
  <div>
    <h5>Daftar FAQ</h5>
    <hr />
    <div class="table-data">
      <b-button class="mt-3 mb-3" v-b-modal.modal-3>Create FAQ</b-button>
      <div v-if="filterQuestion.length !== 0">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th width="30%">Pertanyaan</th>
              <th width="60%">Jawaban</th>
              <th width="10%">Opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="listItem in filterQuestion" :key="listItem.id">
              <td>{{ listItem.id }}</td>
              <td>{{ listItem.pertanyaan }}</td>
              <td>{{ listItem.jawaban }}</td>
              <td>
                <b-button
                  variant="outline-info mt-2"
                  v-b-modal.modal-2
                  @click="editFaq(listItem.id)"
                >
                  <i class="far fa-edit"></i>
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
              <th width="40%">Pertanyaan</th>
              <th width="60%">Jawaban</th>
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
    </div>
    <!-- Modal for Update Faq -->
    <b-modal ref="modal-2" id="modal-2" hide-footer title="Update FAQ">
      <div v-show="allNotification.status">
        <div v-if="allNotification.error">
          <b-alert show variant="danger">
            {{ allNotification.message }}
          </b-alert>
        </div>
        <div v-else>
          <b-alert show variant="success">
            FAQ Berhasil Diupdate
          </b-alert>
        </div>
      </div>
      <b-form @submit.prevent="saveFaq('update')">
        <h6>Pertanyaan :</h6>
        <b-form-textarea
          id="textarea-pertanyaan"
          v-model="pertanyaanModal"
          debounce="500"
          rows="5"
          max-rows="5"
          required
        ></b-form-textarea>

        <h6 class="mt-3">Jawaban :</h6>
        <b-form-textarea
          id="textarea-jawaban"
          v-model="jawabanModal"
          debounce="500"
          rows="5"
          max-rows="5"
          required
        ></b-form-textarea>

        <b-button class="btn-form mt-3" type="submit" variant="primary"
          >Update</b-button
        >
      </b-form>
    </b-modal>

    <!-- Modal for Create FAQ -->
    <b-modal ref="modal-3" id="modal-3" hide-footer title="Create FAQ">
      <div v-show="allNotification.status">
        <div v-if="allNotification.error">
          <b-alert show variant="danger">
            {{ allNotification.message }}
          </b-alert>
        </div>
        <div v-else>
          <b-alert show variant="success">
            FAQ Berhasil Ditambahkan
          </b-alert>
        </div>
      </div>
      <b-form @submit.prevent="saveFaq('create')">
        <h6>Pertanyaan :</h6>
        <b-form-textarea
          id="textarea-pertanyaan"
          v-model="pertanyaanModal"
          debounce="500"
          rows="5"
          max-rows="5"
          required
        ></b-form-textarea>

        <h6 class="mt-3">Jawaban :</h6>
        <b-form-textarea
          id="textarea-jawaban"
          v-model="jawabanModal"
          debounce="500"
          rows="5"
          max-rows="5"
          required
        ></b-form-textarea>

        <b-button class="btn-form mt-3" type="submit" variant="primary"
          >Create</b-button
        >
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["token"],
  computed: {
    ...mapGetters(["filterQuestion", "allNotification"])
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
      "fetchFaqLists",
      "updateFaqAction",
      "createFaqAction",
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
    editFaq(id) {
      this.filterQuestion.filter(data => {
        if (data.id === id) {
          this.id = data.id;
          this.pertanyaanModal = data.pertanyaan;
          this.jawabanModal = data.jawaban;
        }
      });
    },
    hideModal() {
      this.$refs["modal-2"].hide();
      this.$refs["modal-3"].hide();
    },
    async saveFaq(mode) {
      const data = {
        id: this.id,
        pertanyaan: this.pertanyaanModal,
        jawaban: this.jawabanModal,
        token: this.token
      };
      let response = "";
      if (mode === "update") {
        response = await this.updateFaqAction(data);
      }
      if (mode === "create") {
        response = await this.createFaqAction(data);
      }
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
/* btn form */
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
