<template>
    <div class="crudProductTable">
        <h2 class="crudProductTable__title text-center">Listado productos.</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key=product.id>
                    <th scope="row">{{product.id}}</th>
                    <td>{{product.name}}</td>
                    <td>
                        <img :src="product.image" :alt="product.name" width="50px">
                    </td>
                    <td>{{product.description}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.stock}}</td>
                    <td>{{product.category}}</td>
                    <td>
                        <button class="btn btn-danger" @click="deleteProduct(product.id)"><i class="bi bi-trash"></i></button> &nbsp;
                        <router-link class="btn btn-warning" :to="{name: 'updateProduct', params: {id: product.id}}"><i class="bi bi-pencil"></i></router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    name: "CrudProductTable",
    props: {
        products: Array
    },
    methods: {
        deleteProduct(id){
            this.$emit("delete-product", id);
        }
    }
}
</script>

<style scoped lang="scss">

.crudProductTable{
    &__title{
        color: rgb(24, 23, 23);
    }
}

</style>