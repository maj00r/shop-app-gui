<template>
  <v-container class="pa-4">
    <v-row>
      <!-- Sidebar (Categories and Filters) -->
      <v-col cols="12" md="3">
        <v-card>
          <v-card-title>
            <h3>Filter Products</h3>
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="selectedCategory"
              :items="categories.map(x => x.name)"
              outlined
              dense
              label="Category"
            ></v-select>

            <!-- Price Range Filter -->
            <v-row class="mt-4">
              <v-col cols="6">
                <v-text-field
                  v-model="minPrice"
                  label="From"
                  type="number"
                  outlined
                  dense
                  min="0"
                  :max="maxPrice"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="maxPrice"
                  label="To"
                  type="number"
                  outlined
                  dense
                  :min="minPrice"
                  max="100000"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Products List -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            v-for="product in paginatedProducts"
            :key="product.id"
            cols="12" md="4"
          >
            <v-card class="product-card">
              <v-img :src="product.image" aspect-ratio="16/9"></v-img>
              <v-card-title>{{ product.name }}</v-card-title>
              <v-card-subtitle>{{ product.category.name }}</v-card-subtitle>
              <v-card-text>
                <p>{{ product.description }}</p>
                <h3>${{ product.price }}</h3>
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

        <!-- Pagination -->
        <v-pagination
          v-model="page"
          :length="totalPages"
          :total-visible="5"
          class="mt-4"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_BASE_URL } from "@/main";
export default {
  name: "ProductListing",
  data() {
    return {
      categories: [],
      totalPages: 1,
      paginatedProducts: [],
      selectedCategory: null,
      minPrice: 0,
      maxPrice: 1000,
      page: 1,
      itemsPerPage: 9,
    };
  },
  created() {
    this.fetchCategories();
    this.fetchProducts();
  },
  watch: {
    selectedCategory() {
      this.page = 1; // Reset to the first page on category change
      this.fetchProducts(); // Re-query products based on the new category
    },
    page() {
      this.fetchProducts(); 
    }
  },

  methods: {
    async fetchCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/categories`);
        const responseBody = await response.json();
        this.categories = responseBody;
        this.selectedCategory = this.categories[0].name;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      
    },  

    async fetchProducts() {
      try {

        const params = new URLSearchParams();
        if (this.selectedCategory) params.append("categoryId", this.categories.find(x => x.name == this.selectedCategory).id);
        if (this.minPrice) params.append("minPrice", this.minPrice);
        if (this.maxPrice) params.append("maxPrice", this.maxPrice);
        params.append("page", this.page);
        params.append("itemsPerPage", this.itemsPerPage);

        const response = await fetch(`${API_BASE_URL}/api/products?${params.toString()}`);
        const responseBody = await response.json();
        this.paginatedProducts = responseBody.products;
        this.totalPages = responseBody.totalPages;
        this.itemsPerPage = responseBody.itemsPerPage;


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
</style>
