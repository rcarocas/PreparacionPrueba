<template>
    <div class="login">
       <header class="login__header">
            <h1 class="login__title">Vista Login</h1>
       </header>

       <main class="login__main container">

            <div class="login__container-form row">
                
                <form class="login__form col-12 col-md-6" @submit.prevent="login"> 
                    <div class="login__form-group"> 
                        <label class="login__label form-label" for="email">Email</label> 
                        <input class="login__input form-control" type="email" id="email" placeholder="Enter your email" v-model="email"> 
                    </div> 

                    <div class="login__form-group"> 
                        <label class="login__label form-label" for="password">Password</label> 
                        <input class="login__input form-control" type="password" id="password" placeholder="Enter your password" v-model="password">
                    </div>
                    <div class="login__form-group">
                        <button class="login__button" type="submit">Login</button>
                    </div>
                 </form>
                
            </div>
       </main>

    </div>
</template>

<script>

import { mapActions, mapState } from "vuex";

export default {
    name: "LoginView",
    data(){
        return{
            email: "",
            password: ""
        }
    },
    computed: {
        ...mapState(["users"]),
    },
    methods: {
        ...mapActions(["setUser", "setUsers"]),
        async login(){
           try {
                if(!this.email || !this.password){
                    return alert("Debe completar todos los campos.")
                }
                
                let userFound = this.users.find(user => user.email == this.email && user.password == this.password);
                
                if(userFound){
                    this.setUser(userFound);
                    this.email = "";
                    this.password = "";
                    alert(`Bienvenido ${userFound.name}.`);

                    this.$router.push("/");
                }else {
                    alert("Credenciales no válidas.");
                }
  
           } catch (error) {
                alert("Ha ocurrido un error en el login.")
           }
            
        }
    },
    async created(){
        try {
            await this.setUsers();
            console.log("usuarios cargados con éxito.");

        } catch (error) {
            alert(error.message);
        } 
    }
    
}
</script>

<style scoped lang="scss">

.login {
    label, input {
        margin: 5px 0px;
    }
    &__title{
        text-align: center;
    }
    &__form{
        margin: auto;
    }

    &__button{
        color: #090909;
        padding: 0.7em 1.7em;
        font-size: 16px;
        border-radius: 0.5em;
        background: #e8e8e8;
        cursor: pointer;
        border: 1px solid #e8e8e8;
        transition: all 0.3s;
        box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

        &:hover{
            border: 1px solid white;
        }
        &:active{
            box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
        }
    }
}
</style>

