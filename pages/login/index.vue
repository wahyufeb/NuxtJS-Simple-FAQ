<template>
  <b-container>
    <b-row>
      <b-col class="form-wrapper" lg="6" offset-lg="3">
        <div class="form-login">
          <div class="form-header">
            <h3>Login</h3>
          </div>
          <div v-show="allNotification.status">
            <div v-if="allNotification.error">
              <b-alert show variant="danger">
                {{ allNotification.message }}
              </b-alert>
            </div>
            <div v-else>
              <b-alert show variant="success">
                {{ allNotification.message }}
              </b-alert>
            </div>
          </div>
          <b-form @submit="loginAdmin" method="POST">
            <b-form-group label="Username" label-for="username">
              <b-form-input
                v-model="username"
                required
                placeholder="Masukan username"
                autocomplete="off"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input
                type="password"
                v-model="password"
                required
                placeholder="Masukan password"
              ></b-form-input>
            </b-form-group>
            <b-button id="login-btn" type="submit" variant="primary"
              >Login</b-button
            >
          </b-form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
export default {
  head() {
    return {
      title: "Login"
    };
  },
  created() {
    const token = localStorage.getItem("auth.user") || false;
    if (token !== false) {
      const getToken = token.split(" ")[1];
      this.getAdminData(getToken).then(data => {
        if (data.code === 200) {
          this.$router.push("/admin");
        }
      });
    }
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: mapGetters(["allNotification", "dataAuth"]),
  methods: {
    ...mapActions(["login", "setNotification", "setAuth", "getAdminData"]),
    async loginAdmin(e) {
      e.preventDefault();
      try {
        const data = {
          username: this.username,
          password: this.password
        };
        const response = await this.login(data);
        if (response.code !== 200) {
          const notif = {
            status: true,
            message: response.message,
            error: response.errors
          };
          this.setNotification(notif);
        } else {
          const notif = {
            status: true,
            message: "Berhasil Login",
            error: response.errors
          };
          this.setNotification(notif);
          this.setAuth(response.data);
          setTimeout(() => {
            this.$router.push("/admin");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.form-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.form-login {
  width: 80%;
}

.form-header {
  text-align: center;
}

#login-btn {
  width: 100%;
  background-color: brown;
}
</style>
