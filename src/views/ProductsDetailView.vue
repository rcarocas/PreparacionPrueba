<template>
    <div class="productsDetail">
        <header class="py-3">
            <h1 class="productsDetail__title text-center">Vista detalle producto</h1>
        </header>
        <main class="container">
            <div>
                <a href="/products" class="btn btn-outline-success my-3">Volver
                    atrás
                </a>
            </div>
            <div v-if="product">
                <h2 class="text-center">Detalles del producto.</h2>
                <p>Nombre: {{ product.name }}</p>
                <p class="text-success">Precio: $ {{ product.price }}.-</p>
                <p>Stock: {{ product.stock }}</p>
                <img :src="product.image" :alt="product.name">

            </div>
            <div v-else>
                <h2 class="text-center">no existe un producto con el id indicado.</h2>
            </div>

        </main>
        

    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "ProductsDetail",
    props: {
        id: String
    },
    data(){
        return {
            product: null
        }
    },
    methods: {
        ...mapActions(["setProducts"])
    },
    computed: {

    },
    async mounted(){
        try {
            await this.setProducts();

            this.product = this.$store.getters.getProductsById(this.id);

        } catch (error) {
            alert("Error: ", error.message);
        }
    }
}
</script>

<style scoped lang="scss">

</style>