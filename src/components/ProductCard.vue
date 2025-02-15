<template>
    <div>
        <img class="product-img" v-bind:src="image" width="150" height="150">
        <p v-if="title">{{ title }}</p>
        <p v-if="description">{{ description }}</p>
        <p v-if="price">${{ price }}</p>
        <div class="product-btn">
            <button class="add-to-cart" @click="addToCart" :disabled="isInCart">
                <span v-if="isInCart">
                    <Check size="15" /> Added to Cart
                </span>
                <span v-else>
                    Add to Cart
                </span>
            </button>
            <Heart />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Heart, Check } from 'lucide-vue-next';

const props = defineProps({
    title: String,
    description: String,
    image: String,
    price: Number,
});

// Access Vuex store
const store = useStore();

// Check if the current product is already in the cart
const isInCart = computed(() => {
    return store.getters.cartItems.some(item => item.title === props.title);
});

// Emit the add-to-cart event
const addToCart = () => {
    if (!isInCart.value) {
        store.dispatch('addToCart', {
            title: props.title,
            description: props.description,
            price: props.price,
            image: props.image,
        });
    }
};
</script>

<style scoped>
.product-img {
    margin: 0 auto;
    display: flex;
}

.product-btn {
    display: flex;
    gap: 10px;
    align-items: center;
}

.add-to-cart {
    background-color: #4444de;
    color: white;
    border: none;
    padding: 10px 50px;
    border-radius: 20px;
    cursor: pointer;
}

.add-to-cart[disabled] {
    background-color: gray;
    cursor: not-allowed;
}
</style>
