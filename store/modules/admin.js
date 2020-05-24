// import axios from "axios";
// const API = "http://localhost:4000";

// const state = {
//   allFaq: []
// };

// const getters = {
//   faqList: state => state.allFaq,
//   filterFaq: state => {
//     return state.allFaq.filter(data => data.jawaban !== null);
//   }
// };

// const actions = {
//   async fetchFaq({ commit }) {
//     const response = await axios.get(`${API}/list-faq`);
//     commit("setFaq", response.data.data);
//   },

//   async addQuestion({ commit }, pertanyaan) {
//     const response = await axios.post(`${API}/list-faq/user/save`, {
//       pertanyaan
//     });
//     return response;
//   }
// };

// const mutations = {
//   setFaq: (state, faqlist) => {
//     state.allFaq = faqlist;
//   }
// };

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// };
