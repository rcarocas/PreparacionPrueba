<template>
    <div class="cart">
      <header class="py-3">
         <h1 class="text-center">Detalle carrito</h1>
      </header>
      <main class="container">
        <h2>Listado de productos en el carrito:</h2>
            <!-- <ul v-if="cart">
                <li v-for="product in cart" :key="product.id">
                    ID: {{ product.id }}, Nombre: {{ product.name }}
                </li>
            </ul> -->
        <div v-if="cart.length">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in cart" :key="product.id">
                        <th scope="row">{{ product.id }}</th>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                    </tr>
                </tbody>
            </table>
                <hr>
                <p>Total productos: {{ cart.length }}</p>
                <p>Total compra: {{ total }}</p>
        </div>
        <div v-else>
            <h2 class="text-center text-danger">No existen productos en el carrito.</h2>
        </div>
      </main>
     
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "CartView",
    data(){
        return {

        }
    },
    methods: {

    },
    computed: {
        ...mapState(["cart"]),
        total(){
            const sum = this.cart.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
            0,
            );

            return sum;
        }
    }
}
</script>

<style scoped lang="scss">

</style>
  