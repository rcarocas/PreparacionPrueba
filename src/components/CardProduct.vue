<template>
    <div class="cardProduct card" style="width: 100%">
        <img :src="product.image" class="card-img-top" :alt="product.name" />
        <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">
                {{ product.description }}
            </p>
            <p class="card-text">Precio: {{ product.price }}</p>
            <p class="card-text">Stock: {{ product.stock }}</p>
            <p class="card-text">Categoria: {{ product.category }}</p>
            <div class="d-flex justify-content-evenly">
                <router-link :to="{name: 'productsDetail', params: {id: product.id}}" class="btn btn-primary">Ver Detalle</router-link>
                <button v-if="user" class="btn btn-warning" @click="addProductCart()">Agregar al Carro</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "CardProduct",
    props: {
        product: Object
    },
    methods: {
        ...mapActions(["addToCart"]),
        addProductCart(){
            this.addToCart(this.product);
            alert("Producto agregado correctamente.");
        }
    },
    computed: {
        ...mapState(["user"])
    }
};
</script>

<style scoped lang="scss">

.cardProduct{
    img{
        aspect-ratio: 3/2;
    }
}


</style>
