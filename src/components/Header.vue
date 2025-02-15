<template>
    <header class="header">
        <router-link to="/">
            <div class="logo">
                <p>V E N I A</p>
            </div>
        </router-link>
        <div class="header-nav">
            <ul class="header-nav-list">
                <li class="header-nav-item header-links" v-for="headerLink in headerLinks" :key="headerLink.id">

                    <router-link :to="headerLink.path">{{ headerLink.name }}</router-link>

                    <span v-if="headerLink.hasSubMenu">
                        <ChevronDown size="20" />
                    </span>
                </li>
            </ul>
        </div>
        <div class="header-nav">
            <ul class="header-nav-list">
                <li>
                    <div class="search header-nav-item">
                        <Search />
                        <span>Search</span>
                    </div>
                </li>
                <li>
                    <router-link class="header-nav-item" to="/">
                        <span>
                            <User />
                        </span>
                        Sign In
                    </router-link>
                </li>
                <li>
                    <div @click="toggleFilter">
                        <ShoppingBag />
                    </div>
                </li>
            </ul>
        </div>
    </header>
    <SearchProduct />
    <div class="Cart-wrapper" v-if="isCartVisible">
      <Cart :closeCart="toggleFilter"/>
    </div>

</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            search: '',
            headerLinks: [{
                name: "Tops",
                id:1,
                hasSubMenu: true,
                path: '/'
            }, {
                name: "Bottoms",
                id:2,
                hasSubMenu: true,
                path: '/'
            }, {
                name: "Dresses",
                id:3,
                hasSubMenu: false,
                path: '/'
            }, {
                name: "Accessories",
                id:4,
                hasSubMenu: true,
                path: '/'
            },
            {
                name: "Shop The Look",
                id:5,
                hasSubMenu: true,
                path: '/'
            }, {
                name: "New Products",
                id:6,
                hasSubMenu: false,
                path: '/'
            }]
        }
    }
};
</script>
<script setup>
import { ref } from 'vue';
import { ShoppingBag, User, Search, ChevronDown } from 'lucide-vue-next';

import SearchProduct from './SearchProduct.vue';
import Cart from './Cart.vue';
const isCartVisible = ref(false);
const toggleFilter = () => {
    isCartVisible.value = !isCartVisible.value;
};
</script>

<style scoped>
.header {
    display: none;
}

.logo {
    font-family: sans-serif;
    font-weight: 700;
}

.logo::first-letter {
    color: #4444de;
}

.Cart-wrapper{
    position: absolute;
    height: 100%;
    width: 100%;
}

@media (min-width: 768px) {
    .header {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .header-nav-list {
        display: flex;
        list-style-type: none;
        gap: 20px;
    }

    .header-user {
        display: flex;
        gap: 20px;
        list-style-type: none;
    }

    .header-nav-item {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    .header-links {
        align-items: flex-start;
    }
}
</style>