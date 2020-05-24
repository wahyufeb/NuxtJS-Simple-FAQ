const state = {
  notification: {
    status: false,
    message: null,
    error: null
  }
};

const getters = {
  allNotification: state => state.notification
};

const actions = {
  setNotification({ commit }, data) {
    commit("setNotification", data);
  }
};

const mutations = {
  setNotification: (state, data) => {
    state.notification = {
      status: data.status,
      message: data.message,
      error: data.error
    };
    setTimeout(() => {
      state.notification = [];
    }, 3000);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
