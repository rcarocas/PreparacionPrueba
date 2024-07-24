<template>
    <div class="profile">
        <header class="py-3">
            <h1 class="text-center">Perfil del usuario</h1>
        </header>

        <main class="container">
            <div v-if="user">
                <p>Nombre: {{ user.name }}</p>
                <p>Email: {{ user.email }}</p>
            </div>
            <div v-else>
                <p class="text-center">Usted no cuenta con una sesión activa.</p>
            </div>
        </main>
    </div>
    
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "ProfileView",
    data(){
        return {

        }
    },
    methods: {

    },
    computed: {
        ...mapState(["user"])
        
    }
}
</script>


<style scoped lang="scss">

</style>