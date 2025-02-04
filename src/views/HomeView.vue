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

import { API_BASE_URL } from "@/main";
export default {
  name: "HomeView",
  data() {
    return {
      recommendedProducts: [ ],
      salesProducts: [ ],
      popularProducts: [ ],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const products = (await response.json()).products;
        this.recommendedProducts = products.filter((product) => product.flag === "Recommended");
        this.salesProducts = products.filter((product) => product.flag === "Sale");
        this.popularProducts = products.filter((product) => product.flag === "Popular");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 960px) {
    height: 550px;
  }

  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .v-card-actions {
    flex-wrap: wrap;
  }

  .v-img {
    max-height: 350px;
  }
}

.col{
}
</style>
