<template>
  <div class="content">
    <div class="list-question">
      <b-row>
        <b-col lg="9" md="8" sm="12">
          <b-row>
            <b-col
              v-for="faqItems in filterQuestion"
              :key="faqItems.id"
              lg="6"
              md="6"
              sm="12"
            >
              <div class="faq-items">
                <div class="question-items">
                  <span>{{ faqItems.pertanyaan }}</span>
                  <i
                    @click="onDetail(faqItems.id)"
                    :class="{
                      'fas fa-caret-down': !faqItems.displayed,
                      'fas fa-caret-up': faqItems.displayed
                    }"
                  ></i>
                </div>
                <h6 v-if="faqItems.displayed">
                  <hr />
                  {{ faqItems.jawaban }}
                </h6>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="3" md="4" sm="12">
          <div class="user-question">
            <FaqForm />
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import FaqForm from "~/components/FaqForm.vue";

export default {
  components: {
    FaqForm
  },
  computed: mapGetters(["allList", "filterQuestion"]),
  methods: {
    ...mapActions(["fetchFaqLists", "setDetail"]),
    onDetail(id) {
      const index = this.allList.findIndex(a => a.id === id);
      console.log(id);
      this.setDetail(index);
    }
  },
  created() {
    this.fetchFaqLists();
  }
};
</script>

<style>
.content {
  padding: 20px;
  margin: 10px;
}

.faq-items {
  background-color: #f4f4f4;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
}

.faq-items span {
  font-size: 18px;
  font-weight: 400;
}

.faq-items:hover {
  cursor: pointer;
  opacity: 0.8;
}

.faq-items h6 {
  padding: 0 5px;
  font-size: 16px;
}

.question-items {
  display: flex;
  justify-content: space-between;
}

.question-items i {
  width: 20px;
  font-size: 20px;
  text-align: center;
}

.user-question {
  padding: 10px;
}
</style>
