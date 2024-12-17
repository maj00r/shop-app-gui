<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="elevation-4">
          <v-card-title class="headline text-center">
            <v-img
              src="https://via.placeholder.com/150"
              alt="About Us"
              width="50"
              class="mx-auto mb-3"
            />
            <div>About Us</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="text-body-1">
            <p>
              We are a passionate team dedicated to providing the best solutions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.
            </p>
            <p>
              Our mission is to ensure the highest quality in everything we do. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue.
            </p>
            <p>
              We believe in continuous improvement and innovation. Nulla facilisi. Cras fermentum odio eu feugiat pretium. Nunc id egestas libero. Vivamus vehicula consequat ligula at molestie.
            </p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn color="primary" rounded>Contact Us</v-btn>
            <v-btn color="secondary" rounded>Learn More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.v-card {
  border-radius: 10px;
}

.v-card-title {
  background-color: #f5f5f5;
  padding: 20px;
}

.v-divider {
  margin: 20px 0;
}

.v-card-text {
  line-height: 1.6;
  font-size: 1.1rem;
}

.v-card-actions {
  margin-top: 20px;
}

.v-btn {
  font-weight: 500;
  padding: 10px 20px;
}
</style>
