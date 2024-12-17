<template>
  <v-app>
    <v-app-bar app color="primary" class="menu" dark>
      <v-app-bar-title>Shop App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/about" text>About</v-btn>
      <v-btn to="/products" text>Products</v-btn>
      <v-btn to="/cart" text>Cart</v-btn>
      <v-btn to="/login" text>Login</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}


</style>
