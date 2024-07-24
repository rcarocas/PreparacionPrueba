<template>
    <div class="register">
       <header class="register__header">
            <h1 class="register__title">Vista Register</h1>
       </header>

       <main class="register__main container">

            <div class="register__container-form row">
                
                <form class="register__form col-12 col-md-6" @submit.prevent="register">
                    <div class="register__form-group"> 
                        <label class="register__label form-label" for="name">Name</label> 
                        <input class="register__input form-control" type="text" id="name" placeholder="Enter your name" v-model="name"> 
                    </div> 

                    <div class="register__form-group"> 
                        <label class="register__label form-label" for="email">Email</label> 
                        <input class="register__input form-control" type="email" id="email" placeholder="Enter your email" v-model="email"> 
                    </div> 

                    <div class="register__form-group"> 
                        <label class="register__label form-label" for="password">Password</label> 
                        <input class="register__input form-control" type="password" id="password" placeholder="Enter your password" v-model="password">
                    </div>
                    <div class="register__form-group"> 
                        <label class="register__label form-label" for="replyPassword">Reply Password</label> 
                        <input class="register__input form-control" type="password" id="replyPassword" placeholder="Repear your password" v-model="replyPassword">
                    </div>
                    <div class="register__form-group">
                        <button class="register__button" type="submit">register</button>
                    </div>
                 </form>
                
            </div>
       </main>

    </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
    name: "RegisterView",
    data(){
        return{
            email: "",
            password: "",
            name: "",
            replyPassword: "",
            errorPassword: ""
        }
    },
    computed: {
    },
    methods: {
        ...mapActions(["setUsers", "addUsers"]),
        async register(){
           try {
                if(!this.email || !this.password || !this.name || !this.replyPassword){
                    return alert("Debe completar todos los campos.")
                }
                
                if(this.password != this.replyPassword){
                    return alert("Los password no coindicen.");
                }
                
            
                let newUser = {
                    id: null,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    admin: false
                };

                await this.addUsers(newUser);

                alert(`${this.name}, Te registraste con éxito.`);
                
                this.$router.push("/");

           } catch (error) {
                alert(error.message);
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

.register {
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