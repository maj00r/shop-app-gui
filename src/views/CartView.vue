<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Your Shopping Cart</h3>
          </v-card-title>
          <v-card-text>
            <div v-if="cartItems.length === 0">
              <p>Your cart is empty.</p>
            </div>
            <v-row v-else>
              <v-col
                v-for="item in cartItems"
                :key="item.id"
                cols="12"
                class="mb-4"
              >
                <v-card>
                  <v-card-title>
                    <v-row align="center">
                      <v-col cols="2">
                        <v-img :src="item.image" alt="product image" width="60" height="60"></v-img>
                      </v-col>
                      <v-col>
                        <v-card-subtitle>{{ item.name }}</v-card-subtitle>
                        <v-card-subtitle>{{ item.category }}</v-card-subtitle>
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
                        <h4>${{ item.price * item.quantity }}</h4>
                      </v-col>
                      <v-col cols="4" class="text-right">
                        <v-btn color="red" @click="removeItem(item.id)" icon>
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
                <h3>Total: ${{ totalPrice }}</h3>
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
export default {
  name: "Cart",
  data() {
    return {
      cartItems: [
        { id: 1, name: "Smartphone", category: "Electronics", price: 499, quantity: 2, image: "https://via.placeholder.com/100" },
        { id: 2, name: "Laptop", category: "Electronics", price: 899, quantity: 1, image: "https://via.placeholder.com/100" },
        { id: 3, name: "Sofa", category: "Furniture", price: 599, quantity: 1, image: "https://via.placeholder.com/100" },
      ],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    updateQuantity(item, delta) {
      // Adjust the quantity by +1 or -1 and ensure it stays within valid bounds
      item.quantity += delta;
      if (item.quantity < 1) item.quantity = 1;  // Min quantity is 1
      if (item.quantity > 99) item.quantity = 99;  // Max quantity is 99
    },
    removeItem(itemId) {
      // Remove the item from the cart
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
    checkout() {
      // Proceed to checkout (to be implemented)
      alert("Proceeding to checkout...");
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
