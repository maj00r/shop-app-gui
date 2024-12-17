<template>
  <v-container>
    <!-- Recommended Section -->
    <v-row>
      <v-col cols="12">
        <h2>Recommended Products</h2>
      </v-col>
      <v-col class="col" cols="12" md="4" v-for="product in recommendedProducts" :key="product.id">
        <v-card class="product-card">
          <v-img :src="product.image" aspect-ratio="16/9"></v-img>
          <v-card-title>
            {{ product.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ product.description }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip color="primary" v-if="product.flag">{{ product.flag }}</v-chip>
            <p>Price: ${{ product.price }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>Add to Cart</v-btn>
            <router-link :to="`/products/${product.id}`">
              <v-btn color="secondary" text>Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sales Section -->
    <v-row>
      <v-col cols="12">
        <h2>Sales</h2>
      </v-col>
      <v-col class="col" cols="12" md="4" v-for="product in salesProducts" :key="product.id">
        <v-card class="product-card">
          <v-img :src="product.image" aspect-ratio="16/9"></v-img>
          <v-card-title>
            {{ product.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ product.description }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip color="red" v-if="product.flag">{{ product.flag }}</v-chip>
            <p>Price: ${{ product.price }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>Add to Cart</v-btn>
            <router-link :to="`/products/${product.id}`">
              <v-btn color="secondary" text>Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Most Popular Section -->
    <v-row>
      <v-col cols="12">
        <h2>Most Popular</h2>
      </v-col>
      <v-col class="col" cols="12" md="4" v-for="product in popularProducts" :key="product.id">
        <v-card class="product-card">
          <v-img :src="product.image" aspect-ratio="16/9"></v-img>
          <v-card-title>
            {{ product.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ product.description }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip color="blue" v-if="product.flag">{{ product.flag }}</v-chip>
            <p>Price: ${{ product.price }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>Add to Cart</v-btn>
            <router-link :to="`/products/${product.id}`">
              <v-btn color="secondary" text>Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      recommendedProducts: [
        {
          id: 1,
          name: "Recommended Product A",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: 29.99,
          image: "https://via.placeholder.com/300",
          flag: "Recommended",
        },
        {
          id: 2,
          name: "Recommended Product B",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          price: 19.99,
          image: "https://via.placeholder.com/300",
          flag: null,
        },
        {
          id: 3,
          name: "Recommended Product C",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          price: 39.99,
          image: "https://via.placeholder.com/300",
          flag: "Recommended",
        },
      ],
      salesProducts: [
        {
          id: 4,
          name: "Sales Product A",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: 15.99,
          image: "https://via.placeholder.com/300",
          flag: "Sale",
        },
        {
          id: 5,
          name: "Sales Product B",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          price: 10.99,
          image: "https://via.placeholder.com/300",
          flag: "Sale",
        },
        {
          id: 6,
          name: "Sales Product C",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          price: 20.99,
          image: "https://via.placeholder.com/300",
          flag: "Sale",
        },
      ],
      popularProducts: [
        {
          id: 7,
          name: "Popular Product A",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: 49.99,
          image: "https://via.placeholder.com/300",
          flag: "Popular",
        },
        {
          id: 8,
          name: "Popular Product B",
          description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          price: 35.99,
          image: "https://via.placeholder.com/300",
          flag: "Popular",
        },
        {
          id: 9,
          name: "Popular Product C",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          price: 60.99,
          image: "https://via.placeholder.com/300",
          flag: "Popular",
        },
      ],
    };
  },
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 600px;
}

.col{
}
</style>
