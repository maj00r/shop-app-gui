<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Your Shopping Cart</h3>
          </v-card-title>
          <v-card-text>
            <div v-if="!cart.items?.length">
              <p>Your cart is empty.</p>
            </div>
            <v-row v-else>
              <v-col
                v-for="item in cart.items"
                :key="item.id"
                cols="12"
                class="mb-4"
              >
                <v-card>
                  <v-card-title>
                    <v-row align="center">
                      <v-col cols="2">
                        <v-img :src="item.product.image" alt="product image" width="60" height="60"></v-img>
                      </v-col>
                      <v-col>
                        <v-card-subtitle>{{ item.product.name }}</v-card-subtitle>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row align="center">
                      <v-col cols="4">
                        <v-btn @click="updateQuantity(item, -1)" :disabled="item.quantity <= 1" icon>
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="mx-2">{{ item.quantity }}</span>
                        <v-btn @click="updateQuantity(item, 1)" :disabled="item.quantity >= 99" icon>
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="4" class="text-center">
                        <h4>${{ +(Math.round(item.product.price * item.quantity + "e+2")  + "e-2") }}</h4>
                      </v-col>
                      <v-col cols="4" class="text-right">
                        <v-btn color="red" @click="removeItem(item)" icon>
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" class="text-right">
                <h3>Total: ${{ cart.totalPrice }}</h3>
                <v-btn color="primary" @click="checkout">Proceed to Checkout</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API_BASE_URL, verify } from "@/main";

export default {
  data() {
    return {
      cart: {}, // Fetched from the server
    };
  },
  async created() {
    try {
      await verify();
    } catch {
      this.$router.push("/login");  
    }
    
    this.fetchCart(); // Fetch the cart when the component is created
  },
  methods: {
    async fetchCart() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Error fetching cart: ${response.statusText}`);
        }
        this.cart = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    async addItemToCart(item) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        if (!response.ok) {
          throw new Error(`Error adding item to cart: ${response.statusText}`);
        }
        alert(await response.text());
        this.fetchCart(); // Refresh the cart
      } catch (error) {
        console.error(error.message);
      }
    },
    async updateQuantity(item, delta) {
      const newQuantity = item.quantity + delta;
      if (newQuantity < 1 || newQuantity > 99) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/update/${item.productId}?quantity=${newQuantity}`, {
          method: "PUT",
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Error updating item quantity: ${response.statusText}`);
        }
        this.fetchCart(); // Refresh the cart
      } catch (error) {
        console.error(error.message);
      }
    },
    async removeItem(item) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/remove/${item.productId}`, {
          method: "DELETE",
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error(`Error removing item: ${response.statusText}`);
        }
        this.fetchCart(); // Refresh the cart
      } catch (error) {
        console.error(error.message);
      }
    },
    checkout() {
      this.$router.push({ name: "checkout" });
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 50px;
  height: 50px;
}
</style>
