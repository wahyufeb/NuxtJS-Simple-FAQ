<template>
  <div>
    <h5>Daftar FAQ</h5>
    <hr />
    <div class="table-data">
      <div v-if="filterQuestion.length !== 0">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th width="30%">Pertanyaan</th>
              <th width="70%">Jawaban</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="listItem in filterQuestion" :key="listItem.id">
              <td>{{ listItem.id }}</td>
              <td>{{ listItem.pertanyaan }}</td>
              <td>{{ listItem.jawaban }}</td>
              <td>
                <b-button
                  variant="outline-danger"
                  @click="hapusFaq(listItem.id)"
                >
                  <i class="fas fa-trash"></i>
                  Hapus
                </b-button>
                <b-button
                  variant="outline-info mt-2"
                  @click="editFaq(listItem.id)"
                >
                  <i class="far fa-edit"></i>
                  Edit
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["token"],
  computed: {
    ...mapGetters(["filterQuestion"])
  },
  created() {
    this.fetchFaqLists();
  },
  methods: {
    ...mapActions(["hapusFaqAction", "fetchFaqLists"]),
    hapusFaq(id) {
      const token = this.token;
      const data = {
        id,
        token
      };
      this.hapusFaqAction(data);
    },
    editFaq(id) {
      alert("edit" + id);
    }
  }
};
</script>

<style>
/* Table */

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
