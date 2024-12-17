<template>
  <v-container fill-height class="d-flex justify-center align-center">
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="headline">
            <v-img
              src="https://via.placeholder.com/150"
              alt="404 image"
              width="100"
              height="100"
              class="mx-auto mb-3"
            />
            <h2 class="font-weight-bold">Oops! Page Not Found</h2>
          </v-card-title>

          <v-card-subtitle class="mb-3">
            The page you're looking for might have been moved, deleted, or does not exist.
          </v-card-subtitle>

          <v-btn
            color="primary"
            class="ma-2"
            @click="goHome"
            rounded
            large
            >Go to Homepage</v-btn
          >

          <v-btn
            color="grey lighten-1"
            class="ma-2"
            @click="goBack"
            rounded
            large
            >Go Back</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },
    goBack() {
      this.$router.go(-1); // Go back to the previous page
    },
  },
};
</script>

<style scoped>
.v-card {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.v-card-title {
  color: #3f51b5;
}

.v-btn {
  font-weight: bold;
}

.v-img {
  border-radius: 50%;
  border: 2px solid #3f51b5;
}

h2 {
  color: #333;
}

.v-card-subtitle {
  color: #666;
}
</style>
