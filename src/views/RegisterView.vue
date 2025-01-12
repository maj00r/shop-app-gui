<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-row justify="center" align="center" class="w-100">
      <v-col cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <v-form v-model="isRegisterFormValid">
              <v-text-field
                v-model="registerData.name"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerData.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerData.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="registerData.confirmPassword"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                :disabled="!isRegisterFormValid"
                color="primary"
                block
                @click="register"
              >
                Register
              </v-btn>
              <v-btn
                color="secondary"
                block
                @click="navigateToLogin"
                class="mt-3"
              >
                Already have an account? Login
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
      isRegisterFormValid: false,
      registerData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.registerData.name,
            email: this.registerData.email,
            password: this.registerData.password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Registration failed.");
        }

        await response.json();
        this.$router.push({ name: "login" }); // Redirect to login page after successful registration
      } catch (error) {
        console.error("Error during registration:", error.message);
        alert(error.message);
      }
    },
    navigateToLogin() {
      this.$router.push({ name: "Login" });
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
