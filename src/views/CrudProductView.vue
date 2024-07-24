<template>
    <div class="crudProductView">
        <header>
            <h1 class="text-center">Crud Products.</h1>
        </header>

        <main class="container">
            <section>
                <h2 class="tex-center"> Agregar nuevos productos:</h2>

                <div class="row justify-content-center">
                    <div class="col-12 col-md-7 col-lg-5">
                        <form @submit.prevent="addNewProduct">
                            <div class="d-flex align-items-center">
                                <label for="name" class="form-label w-25">Nombre: </label>
                                <input type="text" name="name" id="name" class="form-control w-75 mt-1"  maxlength="50" v-model="name" required>
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="description" class="form-label w-25">Descripción: </label>
                                <input type="text" name="description" id="description" maxlength="255" class="form-control w-75 mt-1" v-model="description" required>
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="price" class="form-label w-25">Precio: </label>
                                <input type="number" name="price" id="price" min="1" class="form-control w-75 mt-1" v-model="price" required>
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="stock" class="form-label w-25">Stock: </label>
                                <input type="number" name="stock" id="stock" min="0" class="form-control w-75 mt-1" v-model="stock" required>
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="category" class="form-label w-25">Categoría: </label>
                                <input type="text" name="category" id="category" class="form-control w-75 mt-1" v-model="category" required>
                            </div>
                            <div class="d-flex align-items-center">
                                <label for="image" class="form-label w-25">Imagen: </label>
                                <input type="text" name="image" id="image" class="form-control w-75 mt-1" v-model="image">
                            </div>
                            <div class="py-3">
                                <input type="submit" class="btn btn-success" value="Agregar producto">
                            </div>
                        </form>
                    </div>
                </div>
                
            </section>

             <!-- INICIO RENDERIZACIÓN DE COMPONETE CrudProductTable -->
            <section v-if="products">
                <CrudProductTable :products="products" @delete-product="deleteProduct"/>
            </section>
            <section v-else>
                <h2 class="text-center"> No existen productos.</h2>
            </section>
            <!-- FIN RENDERIZACIÓN DE COMPONETE CrudProductTable -->
        </main>
    </div>
</template>


<script>
import CrudProductTable from '@/components/CrudProductTable.vue';
import { mapState, mapActions } from 'vuex';

export default {
    name: "CrudProductView",
    components: {
        CrudProductTable
    },
    data(){
        return {
            name: "",
            description: "",
            price: 9999999,
            stock: 0,
            category: "Sin categoría",
            image: ""
        }
    },
    methods:{
        ...mapActions(["setProducts", "addProduct", "removeProduct"]),
        async addNewProduct(){
            try {
                let imagen = "https://demofree.sirv.com/nope-not-here.jpg";

                if(this.image) {
                    imagen = this.image
                }

                let nuevoProducto = {
                    id: "",
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    stock: this.stock,
                    category: this.category,
                    image: imagen
                };

                await this.addProduct(nuevoProducto);
                this.clearForm()

            } catch (error) {
                alert(error.message);
            }
        },
        async deleteProduct(id){
            try {
                await this.removeProduct(id);
                alert(`Se ha eliminado correctamente el producto con id: ${id}`);
            } catch (error) {
                alert(error.message);
            }            
        },
        clearForm() {
            //limpiar formulario
                this.name= "";
                this.description= "";
                this.price= 9999999;
                this.stock= 0;
                this.category= "Sin categoría";
                this.image= ""
        }
    },
    computed: {
        ...mapState(["products"])
    },
    created(){
        this.setProducts();
    }
}

</script>


<style scoped lang="scss">

</style>