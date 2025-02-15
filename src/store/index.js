import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        catalogs: [],
        search: '',
        filteredProducts: [],
        filters: {
            categories: [],
            brands: [],
            price: null
        },
        cart: []
    },
    mutations: {
        setCatalogs(state, catalogs) {
            state.catalogs = catalogs;
        },
        setSearch(state, search) {
            state.search = search;
        },
        setFilters(state, filters) {
            state.filters = { ...state.filters, ...filters };
        },
        setFilteredProducts(state, products) {
            state.filteredProducts = products;
        },
        addToCart(state, product) {
            const existingItem = state.cart.find(item => item.title === product.title);
            if (existingItem) {
                existingItem.quantity += 1;  // If the product is already in the cart, increment quantity
            } else {
                state.cart.push({ ...product, quantity: 1 });  // Otherwise, add the product with quantity 1
            }
            console.log(state.cart)
        },
        removeFromCart(state, productId) {
            state.cart = state.cart.filter(item => item.title !== productId);  // Remove item from the cart by ID
        },
        increaseQuantity(state, productId) {
            const item = state.cart.find(item => item.title === productId);
            if (item) {
                item.quantity += 1;  // Increase quantity by 1
            }
        },
        decreaseQuantity(state, productId) {
            const item = state.cart.find(item => item.title === productId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;  // Decrease quantity by 1, ensuring it doesn't go below 1
            }
        }
    },
    actions: {
        fetchCatalogs({ commit }) {
            axios.get('https://dummyjson.com/products')
                .then(response => {
                    commit('setCatalogs', response.data.products);
                    commit('setFilteredProducts', response.data.products);  // Initially show all products
                });
        },
        updateSearch({ commit, dispatch }, search) {
            commit('setSearch', search);  // Update search term
            dispatch('filterProducts');  // Apply the filtering logic based on the updated search
        },
        updateFilters({ commit, dispatch }, filters) {
            commit('setFilters', filters);
            dispatch('filterProducts');  // Re-filter products when filters are updated
        },
        filterProducts({ state, commit }) {
            let filtered = [...state.catalogs];

            // Apply search filter
            if (state.search) {
                filtered = filtered.filter(product =>
                    product.title.toLowerCase().includes(state.search.toLowerCase()) ||
                    product.description.toLowerCase().includes(state.search.toLowerCase())
                );
            }

            // Apply category filter
            if (state.filters.categories.length > 0) {
                filtered = filtered.filter(product =>
                    state.filters.categories.includes(product.category)
                );
            }

            // Apply brand filter
            if (state.filters.brands.length > 0) {
                filtered = filtered.filter(product =>
                    state.filters.brands.includes(product.brand)
                );
            }

            // Apply price filter (e.g., [minPrice, maxPrice])
            if (state.filters.price) {
                const priceVal = state.filters.price.split('-');
                filtered = filtered.filter(product =>
                    product.price >= priceVal[0] && product.price <= priceVal[1]
                );
            }

            // Commit the filtered products to the state
            commit('setFilteredProducts', filtered);
        },
        addToCart({ commit }, product) {
            commit('addToCart', product);  // Action to add product to cart
        },
        removeFromCart({ commit }, productId) {
            commit('removeFromCart', productId);  // Action to remove product from cart
        },
        increaseQuantity({ commit }, productId) {
            commit('increaseQuantity', productId);  // Action to increase product quantity
        },
        decreaseQuantity({ commit }, productId) {
            commit('decreaseQuantity', productId);  // Action to decrease product quantity
        }
    },
    getters: {
        filteredProducts: (state) => state.filteredProducts,
        cartItems: (state) => state.cart,  // Getter to return cart items
        cartTotal: (state) => {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);  // Calculate total price
        }
    }
});
