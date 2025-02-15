<template>
    <div class="search-container">
        <div class="search-wrapper">
        <div class="relative flex search-box">
            <Search size="20" class="absolute search-icon" />
            <input class="search-input" type="text" v-model="searchVal" @input="updateSearchVal" placeholder="search product">
            <span v-if="searchVal" class="absolute clear-icon" @click="clearSearch">✖</span>
        </div>
        <button class="search-button" @click="updateSearch">
            <Search size="20" class="button-icon" />
            Search Product
        </button>
        </div>
        <div class="filter-button">
            <button class="flex filter" @click="toggleFilter">
                    <SlidersHorizontal size="15" />
                    Filters
            </button>
        </div>
        <div class="filter-wrapper" v-if="isFilterVisible">
            <div class="flex">
                <h3>All filters</h3>
                <X @click="toggleFilter" />
            </div>
            <div class="filter-section">
                <h5 @click="toggleSection('category')" class="flex">
                    Categories <span v-if="isSectionOpen.category">
                        <ChevronUp />
                    </span><span v-else>
                        <ChevronDown />
                    </span>
                </h5>
                <div v-if="isSectionOpen.category" class="filter-options">
                    <label v-for="category in categories" :key="category.id">
                        <input type="checkbox" v-model="selectedCategories" :value="category.name" />
                        {{ category.name }}
                    </label>
                </div>
            </div>
            <div class="filter-section">
                <h5 @click="toggleSection('brand')" class="flex">
                    Brand <span v-if="isSectionOpen.brand">
                        <ChevronUp />
                    </span><span v-else>
                        <ChevronDown />
                    </span>
                </h5>
                <div v-if="isSectionOpen.brand" class="filter-options">
                    <label v-for="brand in brands" :key="brand.id">
                        <input type="checkbox" v-model="selectedBrands" :value="brand.name" />
                        {{ brand.name }}
                    </label>
                </div>
            </div>
            <div class="filter-section">
                <h5 @click="toggleSection('price')" class="flex">
                    Price <span v-if="isSectionOpen.price">
                        <ChevronUp />
                    </span><span v-else>
                        <ChevronDown />
                    </span>
                </h5>
                <div v-if="isSectionOpen.price" class="filter-options">
                    <label v-for="price in priceRanges" :key="price.id">
                        <input type="radio" v-model="selectedPrice" :value="price.range" />
                        {{ price.label }}
                    </label>
                </div>
            </div>
            <button @click="applyFilters" class="btn-apply">Apply</button>
            <button @click="clearFilters" class="btn-apply ml-3">Clear</button>
        </div>
    </div>


    <div class="flex total-product">
            <p v-if="search">Showing <strong>{{ filteredProducts.length }}</strong> results for <strong>"{{search}}"</strong></p>
            <p v-else>Showing <strong>{{ filteredProducts.length }}</strong> results</p>
    </div>
</template>


<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { Search } from 'lucide-vue-next';
import { SlidersHorizontal, X, ChevronUp, ChevronDown } from 'lucide-vue-next';


const store = useStore();

const filteredProducts = computed(() => store.getters.filteredProducts);
const isFilterVisible = ref(false);

const isSectionOpen = ref({
    category: true,
    brand: false,
    price: false,
});

const search = computed(() => store.state.search);
const searchVal = ref(search.value);
watch(search, (newVal) => {
  searchVal.value = newVal;
});
const updateSearch = (event) => {
    const searchValue = searchVal.value;
        store.dispatch('updateSearch', searchValue);
};
const clearSearch = () => {
    searchVal.value = "";
    store.dispatch('updateSearch', "");
}
const updateSearchVal = (e) => {
    searchVal.value = e.target.value;
}

const toggleFilter = () => {
    isFilterVisible.value = !isFilterVisible.value;
};

const toggleSection = (section) => {
    isSectionOpen.value[section] = !isSectionOpen.value[section];
};

const categories = ref([
    { id: 1, name: 'beauty' },
    { id: 2, name: 'fragrances' },
    { id: 3, name: 'furniture' },
]);

const brands = ref([
    { id: 1, name: 'Annibale Colombo' },
    { id: 2, name: 'Gucci' },
    { id: 3, name: 'Chanel' },
    { id: 4, name: 'Calvin Klein' },
    { id: 5, name: 'Nail Couture' },
]);

const priceRanges = ref([
    { id: 1, range: '0-500', label: 'Under $500' },
    { id: 2, range: '500-1000', label: '$500 - $1000' },
]);

const selectedCategories = ref([]);
const selectedBrands = ref([]);
const selectedPrice = ref(null);

const applyFilters = () => {
    store.dispatch('updateFilters', {
        categories: selectedCategories.value,
        brands: selectedBrands.value,
        price: selectedPrice.value,
    });
    toggleFilter();
};

const clearFilters = () => {
    selectedCategories.value = [];
    selectedBrands.value = [];
    selectedPrice.value = null;
    store.dispatch('updateFilters', {
        categories: selectedCategories.value,
        brands: selectedBrands.value,
        price: selectedPrice.value,
    });
    toggleFilter();
};


onMounted(() => {
    store.dispatch('fetchCatalogs');
});
</script>

<style scoped>
.search-container {
    display: flex;
    gap: 70px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
    padding: 0 100px;
}

.search-wrapper{
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 10px;
    flex: 1;
}

.search-box {
    position: relative;
    flex: 1;
}

.search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
}

.clear-icon{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    cursor: pointer;
}

.search-input {
    padding: 10px 10px 10px 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}

.filter-button{
    padding:10px;
}

.filter-button button{
    width: 100%;
}

.search-button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s ease;
}

.search-button:hover {
    background-color: darkred;
}

.button-icon {
    margin-right: 5px;
}

.filter {
    gap: 10px;
}

.filter-options {
    display: flex;
    flex-direction: column;
}

.filter-section {
    border-bottom: 1px solid black;
}

.filter-wrapper {
    position: absolute;
    height: fit-content;
    width: 30%;
    background: white;
    right: 0;
    border: 1px solid;
    top: 0;
    bottom: 0;
    padding: 10px;
}

.total-product{
    box-sizing: border-box;
    padding: 0 100px;
}


@media (max-width: 768px) {
    .catelog-list-item {
        flex-basis: 100%;
    }
    .total-product {
        flex-direction: column;
        align-items: flex-start;
        padding: 0;
    }
    .search-container {
        padding: 0;
    }
}
@media (max-width: 600px) {
    .search-container {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    .search-button {
        width: 100%;
        justify-content: center;
    }
}

</style>
