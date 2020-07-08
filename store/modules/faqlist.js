import axios from "axios";
const API = "https://lumen.sobatcode.com";

const state = {
  faqlist: []
};

const getters = {
  allList: state => state.faqlist,
  filterQuestion: state => {
    return state.faqlist.filter(data => data.jawaban !== null);
  },
  filterQuestionUser: state => {
    return state.faqlist.filter(data => data.jawaban === null);
  }
};

const actions = {
  async fetchFaqLists({ commit }) {
    try {
      const response = await axios.get(`${API}/list-faq`);
      console.log(response);
      commit("setFaq", response.data.data);
    } catch (err) {
      console.log(err);
    }
  },

  setDetail({ commit }, index) {
    commit("setDetail", index);
  },

  async addQuestion({ commit }, pertanyaan) {
    try {
      const response = await axios.post(`${API}/list-faq/user/save`, {
        pertanyaan
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async hapusFaqAction({ commit }, data) {
    try {
      await axios.delete(`${API}/list-faq/${data.id}/delete`, {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });
      commit("setAfterAction", data.id);
    } catch (err) {
      console.log(err);
    }
  },

  async balasFaqAction({ commit }, data) {
    try {
      console.log(data);
      const response = await axios.post(
        `${API}/list-faq/${data.id}/answering`,
        {
          jawaban: data.jawaban
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        }
      );
      setTimeout(() => {
        commit("setAfterAction", data.id);
      }, 1000);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async updateFaqAction({ commit }, data) {
    try {
      const response = await axios.post(
        `${API}/list-faq/admin/save?id=${data.id}`,
        {
          pertanyaan: data.pertanyaan,
          jawaban: data.jawaban
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        }
      );
      setTimeout(() => {
        commit("setStateAfterUpdate", data);
      }, 1000);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  async createFaqAction({ commit }, data) {
    try {
      const response = await axios.post(
        `${API}/list-faq/admin/save`,
        {
          pertanyaan: data.pertanyaan,
          jawaban: data.jawaban
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        }
      );
      setTimeout(() => {
        commit("setStateAfterCreated", response.data.data);
      }, 1000);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
};

const mutations = {
  setFaq: (state, faqlist) => {
    state.faqlist = faqlist;
  },

  setDetail: (state, index) =>
    (state.faqlist[index].displayed = !state.faqlist[index].displayed),

  setAfterAction: (state, id) =>
    (state.faqlist = state.faqlist.filter(data => data.id !== id)),

  setStateAfterUpdate: (state, data) => {
    const index = state.faqlist.findIndex(
      dataState => dataState.id === data.id
    );
    state.faqlist[index].pertanyaan = data.pertanyaan;
    state.faqlist[index].jawaban = data.jawaban;
  },

  setStateAfterCreated: (state, data) => {
    state.faqlist.push(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
