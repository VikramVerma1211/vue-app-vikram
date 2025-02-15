<template>
    <div class="overlay" @click.self="closeCart">
        <div class="cart-container">
                <div class="flex">
                    <h2 class="cart-heading">Your Cart</h2>
                    <X @click="closeCart" />
                </div>
            <div class="cart-items">
                <div class="cart-list">
                    <div class="cart-header">
                        <div class="header-item">Product</div>
                        <div class="header-item">Price</div>
                        <div class="header-item">Quantity</div>
                        <div class="header-item">Total</div>
                    </div>

                    <div class="cart-item" v-for="item in cartItems" :key="item.id">
                        <div class="product-info">
                            <img :src="item.image" alt="Product image" class="product-img">
                            <div>
                                <p>{{ item.title }}</p>
                                <p class="product-desc">{{ item.description }}</p>
                            </div>
                        </div>
                        <div class="price">${{ item.price }}</div>
                        <div class="quantity-control">
                            <button @click="decreaseQuantity(item)">-</button>
                            <span>{{ item.quantity }}</span>
                            <button @click="increaseQuantity(item)">+</button>
                        </div>
                        <div class="total">${{ item.price * item.quantity }}</div>
                        <button @click="removeItem(item)" class="remove-btn">✕</button>
                    </div>
                </div>
                <div class="cart-summary">
                    <div class="order-summary">
                    <div class="summary-header">
                        <div class="summary-total">
                        Order Summary
                        </div>
                    </div>
                    <div class="summary-body">
                        <div class="summary-item">
                        <span>Subtotal:</span>
                        <span>${{ totalAmount.toFixed(2) }}</span>
                        </div>
                        <div class="summary-item">
                        <span>Shipping:</span>
                        <span>Free</span>
                        </div>
                        <div class="coupon-section">
                        <p>Add Coupon Code</p>
                        </div>
                    </div>
                    <div class="summary-footer">
                        <div class="summary-total">
                        <span>Total:</span>
                        <span>${{ totalAmount.toFixed(2) }}</span>
                        </div>
                    </div>
                    </div>
                    <button class="checkout-button">
                        CHECKOUT
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { X } from 'lucide-vue-next';

const props = defineProps({
    closeCart: Function
});

const store = useStore();

// Retrieve cart items from Vuex store
const cartItems = computed(() => store.getters.cartItems);

// Total amount for all items in the cart
const totalAmount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Methods for cart actions
const increaseQuantity = (item) => {
    store.dispatch('increaseQuantity', item.title);
};

const decreaseQuantity = (item) => {
    store.dispatch('decreaseQuantity', item.title);
};

const removeItem = (item) => {
    store.dispatch('removeFromCart', item.title);
};
</script>

<style scoped>
/* Fullscreen Overlay */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.cart-heading{
    text-align: center;
    flex: 1;
}

.cart-items{
    display: flex;
    justify-content: space-between;
}

.cart-list{
    width: 65%;
}

/* Cart Container */
.cart-container {
    width: 80%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

/* Header */
.cart-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 50px;
    text-align: left;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.header-item {
    padding: 10px;
}

/* Cart Item */
.cart-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 50px;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
}

.product-info {
    display: flex;
    align-items: center;
}

.product-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 15px;
    border-radius: 5px;
}

.product-desc {
    font-size: 0.9rem;
    color: #666;
}

.price,
.quantity-control,
.total {
    text-align: center;
}

.quantity-control {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.quantity-control button {
    background-color: #4444de;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

.remove-btn {
    background-color: transparent;
    border: none;
    color: red;
    font-size: 1.2rem;
    cursor: pointer;
}

.cart-summary {
    text-align: right;
    margin-top: 20px;
    width: 30%;
}

.order-summary {
  background: #dfdada5c;
  padding: 15px;
  border-radius: 2px;
}

/* Header */
.summary-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #aaa;
}

/* Body */
.summary-body {
  padding: 10px 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

/* Coupon Section */
.coupon-section {
 text-align: left;
    margin: 0;
    font-size: smaller;
    color: green;
}

.coupon-section input {
  flex: 1;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 4px;
}

.coupon-section button {
  margin-left: 5px;
  padding: 5px 10px;
  background: #333;
  color: white;
  border: none;
  cursor: pointer;
}

/* Footer */
.summary-footer {
  padding-top: 10px;
  border-top: 1px solid #aaa;
}

.summary-total {
  display: flex;
  justify-content: space-between;
}

.checkout-button {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: green;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.checkout-button:hover {
    background-color: darkred;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .cart-items{
    flex-direction: column;
   }
.cart-summary,
.cart-list{
    width: 100%;
}

    .header-item,
    .product-info,
    .price,
    .quantity-control,
    .total {
        text-align: left;
    }

    .quantity-control {
        justify-content: flex-start;
    }

    .remove-btn {
        grid-column: 1 / -1;
        text-align: right;
    }
}
</style>
