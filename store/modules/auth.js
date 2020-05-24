import axios from "axios";
const API = "http://localhost:4000";

const state = {
  auth: {
    loggedIn: sessionStorage.getItem("auth.loggedIn") || false,
    user: sessionStorage.getItem("auth.user") || null
  }
};

const getters = {
  dataAuth: state => state.auth
};

const actions = {
  async login({ commit }, data) {
    const { username, password } = data;

    const response = await axios.post(`${API}/auth/login`, {
      username,
      password
    });
    return response.data;
  },
  setAuth({ commit }, userData) {
    localStorage.setItem("auth.user", `bearer ${userData.token}`);
    sessionStorage.setItem("auth.user", JSON.stringify(userData));
    sessionStorage.setItem("auth.loggedIn", true);
    commit("setAuthState", userData);
  },
  async getAdminData({ commit }, token) {
    try {
      const response = await axios.get(`${API}/auth/admin/data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const adminData = await response.data;
      commit("setAdminState", adminData);
      return adminData;
    } catch (err) {
      console.log(err);
    }
  },
  setAdminData({ commit }) {
    const admin = sessionStorage.getItem("auth.user") || null;
    if (admin !== null) {
      const adminData = JSON.parse(admin);
      commit("setAdminState", adminData);
      return adminData;
    } else {
      return null;
    }
  }
};

const mutations = {
  setAuthState: (state, userData) => {
    state.auth.user = userData;
  },
  setAdminState: (state, adminData) => {
    state.auth.user = adminData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
