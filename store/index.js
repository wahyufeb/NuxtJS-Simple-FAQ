import Vuex from "vuex";
import faqlist from "./modules/faqlist";
import notification from "./modules/notification";
import auth from "./modules/auth";
import admin from "./modules/admin";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      faqlist,
      notification,
      auth,
      admin
    }
  });
};

export default createStore;
