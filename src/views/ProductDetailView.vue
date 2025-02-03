<template>
  <v-container>
    <!-- Product Details -->
    <v-row>
      <v-col cols="12" md="6">
        <!-- Product Images Carousel -->
        <v-carousel v-model="currentSlide" hide-delimiter-background height="400px" show-arrows>
          <v-carousel-item v-for="(image, index) in product.images" :key="index">
            <v-img :src="image" aspect-ratio="16/9"></v-img>
          </v-carousel-item>
        </v-carousel>

        <!-- Dots Navigation -->
        <v-row justify="center" align="center" class="mt-4">
          <v-btn v-for="(image, index) in product.images" :key="index" icon small class="mx-1"
            :color="currentSlide === index ? 'primary' : 'grey lighten-1'" @click="currentSlide = index">
            <v-icon>mdi-circle</v-icon>
          </v-btn>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h1>{{ product.name }}</h1>
          </v-card-title>
          <v-card-subtitle>
            <v-chip color="primary" v-if="product.flag">{{ product.flag }}</v-chip>
          </v-card-subtitle>
          <v-card-text>
            <p>{{ product.description }}</p>
            <h3>Price: ${{ product.price }}</h3>
            <v-row>
              <v-col cols="6">
                <!-- Quantity Selector -->
                <v-text-field v-model="quantity" type="number" label="Quantity" hide-details class="quantity-input">
                  <template #append>
                    <v-btn icon small @click="adjustQuantity(1)" class="quantity-btn">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                  </template>
                  <template #prepend>
                    <v-btn icon small @click="adjustQuantity(-1)" class="quantity-btn">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" block @click="addToCart">
                  Add to Cart
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Related Products -->
    <v-row>
      <v-col cols="12">
        <h2>Related Products</h2>
      </v-col>
      <v-col cols="12" md="4" v-for="related in relatedProducts" :key="related.id">
        <v-card class="product-card">
          <v-img :src="related.image" aspect-ratio="16/9"></v-img>
          <v-card-title>
            {{ related.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ related.description }}
          </v-card-subtitle>
          <v-card-text>
            <v-chip color="blue" v-if="related.flag">{{ related.flag }}</v-chip>
            <p>Price: ${{ related.price }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text>Add to Cart</v-btn>
            <router-link :to="`/products/${related.id}`">
              <v-btn color="secondary" text>Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_BASE_URL , verify} from "@/main";
export default {
  name: "ProductDetailView",
  data() {
    return {
      product: {},
      relatedProducts: [],
      quantity: 1,
      currentSlide: 0,
    };
  },
  async mounted() {
    await verify();
  },
  created() {
    this.fetchProduct(this.$route.params.id);
  },
  methods: {

    async fetchProduct(id) {
      try {
        const productResponse = await fetch(`${API_BASE_URL}/api/products/${id}`);
        this.product = await productResponse.json();

        const relatedProductsResponse = await fetch(`${API_BASE_URL}/api/products/${id}/related`);
        this.relatedProducts = await relatedProductsResponse.json();
      } catch (error) {
        console.error(error);
      }
    },
    adjustQuantity(value) {
      const newQuantity = this.quantity + value;
      if (newQuantity >= 1 && newQuantity <= 10) {
        this.quantity = newQuantity;
      }
    },
    async addToCart() {
      try {
        await fetch(`${API_BASE_URL}/api/cart/add`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: this.quantity,
            productId: this.$route.params.id
          })
        });

      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.quantity-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.quantity-btn {
  background-color: #1976d2;
  color: white;
}

.quantity-btn:hover {
  background-color: #1565c0;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media screen and (min-width: 960px) {
    height: 500px;
  }
  /* Set a consistent height for all cards */
}
</style>
