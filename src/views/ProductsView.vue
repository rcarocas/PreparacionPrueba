<template>
    <div class="products">
    <header class="py-3">
      <h1 class="text-center">Vista Productos</h1>
    </header>
    <main class="container py-3">
      <section class="products__filters py-3" v-if="products">
        <h2 class="text-center">Filtros</h2>
        <div class="row">
          <div class="col">
            <!-- filtro nombre / description -->
            <label for="nombre" class="me-2">Nombre:</label>
            <input type="text" id="nombre" name="nombre" v-model="nameFilter">
          </div>
          <div class="col">
            <!-- filtro precio mínimo -->
            <label for="precioMinimo" class="me-2">Precio mínimo:</label>
            <input type="number" id="precioMinimo" name="precioMinimo" v-model="minPriceFilter">
          </div>
          <div class="col">
            <!-- filtro precio máximo -->
            <label for="precioMaximo" class="me-2">Precio máximo:</label>
            <input type="number" id="precioMaximo" name="precioMaximo" v-model="maxPriceFilter">
          </div>
          <div class="col">
            <!-- filtro por categoría -->
            <label for="categoria" class="me-2">Categoría:</label>
            <select name="categoria" id="categoria" v-model="categoryFilter">
              <option value="">Todas</option>

              <option :value="category" v-for="(category, index) in categories" :key="index">{{ category }}</option>
            </select>
          </div>
          <div class="col">
            <!-- filtro order mayor precio / menor precio -->
            <label for="precioOrden" class="me-2">Ordenar por :</label>
            <select name="precioOrden" id="precioOrden" v-model="order">
              <option value="">Sin orden</option>
              <option value="minPrice">Menor precio</option>
              <option value="maxPrice">Mayor precio</option>
              <option value="nameAZ">A - Z</option>
              <option value="nameZA">Z - A</option>
            </select>
          </div>
        </div>
      </section>
      <section class="products__list" v-if="products">
        <div class="row g-3">
          <div class="col-12 col-md-6 col-lg-4" v-for="product in productsFilter" :key="product.id">
              <CardProduct 
                :product="product"
              />
          </div>
        </div>
      </section>
    </main>
    </div>
</template>
  
  <script>

  import CardProduct from '@/components/CardProduct.vue'
  import  { mapActions, mapState } from 'vuex';

  export default {
    name: 'ProductsView',
    components: {
      CardProduct
    },
    data(){
      return{
        nameFilter: "",
        minPriceFilter: 0,
        maxPriceFilter: 999999,
        categoryFilter: "",
        order: ""
      }
    },
    methods: {
      ...mapActions(["setProducts"])
    },
    computed: {
      ...mapState(["products"]),
      productsFilter(){
        let products = this.products;
        
        if(this.nameFilter){
          products = products.filter(product => 
          product.name.toLowerCase().includes(this.nameFilter.toLowerCase()) || 
          product.description.toLowerCase().includes(this.nameFilter.toLowerCase())
          );
        }

        if(this.minPriceFilter > 0){
          products = products.filter(product => product.price >= this.minPriceFilter);
        }

        if(this.maxPriceFilter){
          products = products.filter(product => product.price <= this.maxPriceFilter);
        }

        if(this.categoryFilter){
          products = products.filter(product => product.category == this.categoryFilter);
        }

        //FILTRO PARA ORDENAR POR PRECIO MENOR A MAYOR / MAYOR A MENOR

        if(this.order){
          if(this.order== "minPrice"){
            products = products.toSorted((firstItem, secondItem) => firstItem.price - secondItem.price);

          }else if(this.order == "maxPrice"){
            products = products.toSorted((firstItem, secondItem) =>  secondItem.price - firstItem.price);

          }else if(this.order == "nameAZ"){
            products = products.toSorted((a, b) => {
              return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
            });

          }else if(this.order == "nameZA"){
            products = products.toSorted((a, b) => {
              return b.name.localeCompare(a.name, 'es', { sensitivity: 'base' });
            });
          }
        }

        return products
      },
      categories(){
        let categorias = [];

        this.products.forEach(product => {
          if(!categorias.includes(product.category)){
            categorias.push(product.category);
          }
        });

        return categorias;
      }
    },
    async mounted(){
      this.setProducts();
    }
  }
</script>
  