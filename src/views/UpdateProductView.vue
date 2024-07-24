<template>
<div>
    <header>
        <h1 class="text-center">Página de actualización del producto</h1>
    </header>
    <main class="container">
        <section v-if="product">
            <h2 class="text-center">Actualizar producto ID {{ id }}</h2>
            <BackButton/>
            <form class="w-50 mx-auto" @submit.prevent="reviseProduct">
                <div class="d-flex align-items-center">
                    <label for="name" class="form-label w-25">ID: </label>
                    <input type="text" name="name" id="name" class="form-control w-75 mt-1"  maxlength="50" v-model="product.id" required disabled>
                </div>
                <div class="d-flex align-items-center">
                    <label for="name" class="form-label w-25">Nombre: </label>
                    <input type="text" name="name" id="name" class="form-control w-75 mt-1"  maxlength="50" v-model="product.name" required>
                </div>
                <div class="d-flex align-items-center">
                    <label for="description" class="form-label w-25">Descripción: </label>
                    <input type="text" name="description" id="description" maxlength="255" class="form-control w-75 mt-1" v-model="product.description" required>
                </div>
                <div class="d-flex align-items-center">
                    <label for="price" class="form-label w-25">Precio: </label>
                    <input type="number" name="price" id="price" min="1" class="form-control w-75 mt-1" v-model="product.price" required>
                </div>
                <div class="d-flex align-items-center">
                    <label for="stock" class="form-label w-25">Stock: </label>
                    <input type="number" name="stock" id="stock" min="0" class="form-control w-75 mt-1" v-model="product.stock" required>
                </div>
                <div class="d-flex align-items-center">
                    <label for="category" class="form-label w-25">Categoría: </label>
                    <input type="text" name="category" id="category" class="form-control w-75 mt-1" v-model="product.category" required>
                </div>
                <div class="d-flex justify-content-center">
                                <img :src="product.image" :alt="product.name" width="100px">
                            </div>
                <div class="d-flex align-items-center">
                    <label for="image" class="form-label w-25">Imagen: </label>
                    <input type="text" name="image" id="image" class="form-control w-75 mt-1" v-model="product.image">
                </div>
                <div class="py-3 d-flex justify-content-around">
                    <input type="submit" class="btn btn-success" value="Actualizar producto"> &nbsp;
                    <router-link class="btn btn-warning" to="/crud_products">Cancelar</router-link>
                </div>
            </form>
        </section>
        <section v-else>
            <h2 class="text-center">El producto con ID {{ id }} no existe</h2>
        </section>
    </main>
</div>
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import {mapActions} from 'vuex'

export default {
    name: 'UpdateProductView',
    data(){
        return {
            product: {
                name: "",
                description: "",
                price: 9999999,
                stock: 0,
                category: "Sin categoría",
                image: ""
            }
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
    methods: {
        ...mapActions(["setProducts", "updateProduct"]),
        getProduct() {
            let product = this.$store.getters.getProductsById(this.id);
            if (product) {
                this.product = product
            } else {
                this.product = undefined
            }
        },
        reviseProduct() {
            this.updateProduct(this.product);
            this.getProduct();
            alert("Producto actualizado correctamtente")
            this.$router.push('/crud_products')
        }
    },
    // watch: {},
    components: {
        BackButton
    },
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    async mounted() {
        await this.setProducts()
        this.getProduct()
    },
    created(){
        document.title = "Actualizar productos"
    }
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>