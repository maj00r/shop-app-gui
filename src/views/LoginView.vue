<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-row justify="center" align="center" class="w-100">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form v-model="isLoginFormValid">
              <v-text-field
                v-model="loginData.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginData.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                :disabled="!isLoginFormValid"
                color="primary"
                block
                @click="login"
              >
                Login
              </v-btn>
              <v-btn
                color="secondary"
                block
                @click="navigateToRegister"
                class="mt-3"
              >
                Don't have an account? Register
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_BASE_URL } from "@/main";
export default {
  data() {
    return {
      isLoginFormValid: false,
      loginData: {
        email: "", //"a@w.pl",
        password: "", //"12345QWERTq!",
      },
    };
  },
  methods: {
    async login() {
      if (!this.isLoginFormValid) {
        alert("Please fill out all fields correctly.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.loginData.email,
            password: this.loginData.password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Login failed.");
        }

        this.$router.push({ name: "home" }); 
      } catch (error) {
        console.error("Login error:", error.message);
        alert(error.message);
      }
    },
    navigateToRegister() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.v-text-field {
  margin-bottom: 20px;
}
</style>
