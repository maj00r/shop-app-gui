<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Checkout</h3>
          </v-card-title>

          <v-card-text>
            <v-form ref="checkoutForm" v-model="valid" @submit.prevent="handleCheckout">
              <v-row>
                <!-- Personal Information Section -->
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Full Name"
                    v-model="form.name"
                    :rules="[rules.required]"
                    placeholder="Enter your full name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Email"
                    v-model="form.email"
                    :rules="[rules.required, rules.email]"
                    placeholder="Enter your email address"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Address Section -->
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Address"
                    v-model="form.address"
                    :rules="[rules.required]"
                    placeholder="Enter your address"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="City"
                    v-model="form.city"
                    :rules="[rules.required]"
                    placeholder="Enter your city"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Postal Code"
                    v-model="form.postalCode"
                    :rules="[rules.required]"
                    placeholder="Enter your postal code"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Payment Section -->
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Credit Card Number"
                    v-model="form.creditCardNumber"
                    :rules="[rules.required, rules.creditCard]"
                    placeholder="Enter your credit card number"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="Expiration Date"
                    v-model="form.expirationDate"
                    :rules="[rules.required]"
                    placeholder="MM/YY"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    label="CVV"
                    v-model="form.cvv"
                    :rules="[rules.required]"
                    placeholder="Enter CVV"
                    required
                  ></v-text-field>
                </v-col>

                <!-- Order Summary Section -->
                <v-col cols="12">
                  <v-divider class="my-4"></v-divider>
                  <h4>Order Summary</h4>
                  <v-row>
                    <v-col cols="6" class="text-left">Total:</v-col>
                    <v-col cols="6" class="text-right">${{ totalPrice }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="text-center">
                      <v-btn color="primary" type="submit">Complete Order</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      valid: false,
      form: {
        name: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        creditCardNumber: '',
        expirationDate: '',
        cvv: '',
      },
      rules: {
        required: value => !!value || 'This field is required',
        email: value => /.+@.+/.test(value) || 'E-mail must be valid',
        creditCard: value => /^\d{16}$/.test(value) || 'Credit card number must be 16 digits',
      },
    };
  },
  computed: {
    totalPrice() {
      // Placeholder dla obliczenia całkowitej ceny (na razie przyjmujemy 200 jako przykładową cenę)
      return 200;
    },
  },
  methods: {
    handleCheckout() {
      if (this.valid) {
        // Logika do obsługi zamówienia (np. wysyłanie danych do backendu)
        alert('Order Completed!');
        // Można dodać logikę do czyszczenia formularza lub przekierowania
        this.$router.push({ name: 'OrderConfirmation' });
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
