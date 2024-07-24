<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/products" class="nav-link">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link" v-if="user">Profile</router-link>
                    </li>
                    <li class="nav-item" v-if="!user">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!user">
                        <router-link to="/register" class="nav-link">Register</router-link>
                    </li>
                    <li class="nav-item" v-if="user">
                        <a href="" class="nav-link" @click.prevent="logout">Logout</a>
                    </li>
                    <li class="nav-item" v-if="user">
                        <router-link to="/cart" class="nav-link">Carrito</router-link>
                    </li>
                    <li class="nav-item" v-if="user?.admin">
                        <router-link to="/crud_products" class="nav-link">Crud Products</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "NavbarComponent",
    data(){
        return {

        }
    },
    methods: {
        ...mapActions(["clearUser"]),
        logout(){
            this.clearUser();
            alert("Se ha cerrado la sesión.");
            this.$router.push("/");
        }
    },
    computed: {
        ...mapState(["user"])
    }
};
</script>

<style scoped lang="scss">

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
