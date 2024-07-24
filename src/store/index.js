import { createStore } from "vuex";
import usersService from "@/services/usersService";
import { v4 as uuidv4 } from "uuid";
import productsService from "@/services/productsService";

export default createStore({
  state: {
    users: [],
    user: null,
    cart: [],
    products: null,
  },
  getters: {
    //INICIO GETTERS PRODUCTS
    getProductsById: (state) => (id) => {
      return state.products.find((product) => product.id == id);
    },
    //FIN GETTERS PRODUCTS
  },
  mutations: {
    //INICIO STATE USER
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    //FIN STATE USER

    //INICIO STATE USERS
    SET_USERS(state, users) {
      state.users = users;
    },
    ADD_USERS(state, user) {
      state.users.push(user);
    },
    //FIN STATE USERS

    //INICIO STATE CART
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
    //FIN STATE CART

    //INICIO STATE PRODUCTS
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    UPDATE_PRODUCT(state, data) {
      state.products[data.index] = data.product;
    },
    //FIN STATE PRODUCTS
  },
  actions: {
    //INICIO ACTIONS USER
    setUser({ commit }, user) {
      commit("SET_USER", user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser({ commit }) {
      commit("SET_USER");
      localStorage.removeItem("user");
    },
    initUser({ commit }) {
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        commit("SET_USER", user);
      }
    },
    //FIN ACTIONS USER

    //INICIO ACTIONS USERS
    async setUsers({ commit, state }) {
      try {
        let users = localStorage.getItem("users");

        if (users) {
          console.log("Existe users en localStorage");
          users = JSON.parse(users);
        } else {
          console.log("No Existe users en localStorage");
          if (state.users.length == 0) {
            users = await usersService.getUsers();
            localStorage.setItem("users", JSON.stringify(users));
          }
        }

        commit("SET_USERS", users);
      } catch (error) {
        console.log(error);
        localStorage.clear();
        throw new Error("Error al obtener la información de usuarios.");
      }
    },

    async addUsers(context, newUser) {
      let userFound = context.state.users.find(
        (user) => user.email == newUser.email
      );

      //BUSCAMOS SI EXISTE EL USUARIO YA REGISTRADO, SI EXISTE RETORNAMOS UN MENSAJE DE ERROR
      if (userFound) {
        throw new Error(
          `Ya existe un usuario registrado con el email: ${userFound.email}`
        );
      }

      newUser.admin = false;
      newUser.id = uuidv4().slice(0, 6);

      context.commit("ADD_USERS", newUser);
      //ACTUALIZAR LOCAL STORAGE
      localStorage.setItem("users", JSON.stringify(context.state.users));

      context.commit("SET_USER", newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    },
    //FIN ACTIONS USERS

    //INICIO ACTIONS CART
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
    //FIN ACTIONS CART

    //INICIO ACTIONS PRODUCTS
    async setProducts({ commit, state }) {
      try {
        let products = localStorage.getItem("products");
        if (products) {
          console.log("Existe products en localStorage");
          products = JSON.parse(products);
        } else {
          console.log("No Existe products en localStorage");
          if (!state.products) {
            products = await productsService.getProducts();
            localStorage.setItem("products", JSON.stringify(products));
          }
        }
        commit("SET_PRODUCTS", products);
        return true;
      } catch (error) {
        console.log(error);
        localStorage.clear();
        throw new Error("Error al obtener la información de los productos.");
      }
    },
    async addProduct({ commit, state }, product) {
      try {
        product.id = uuidv4().slice(0, 6);
        commit("ADD_PRODUCT", product);
        localStorage.setItem("products", JSON.stringify(state.products));
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("Error al crear el nuevo producto.");
      }
    },
    async removeProduct({ commit, state }, id) {
      try {
        let indexProduct = state.products.findIndex(
          (product) => product.id == id
        );
        let products = [];
        if (indexProduct >= 0) {
          products = state.products;
          //eliminamos el producto
          products.splice(indexProduct, 1);

          commit("SET_PRODUCTS", products);
          localStorage.setItem("products", JSON.stringify(state.products));

          return true;
        } else {
          throw new Error("El producto que intenta eliminar no existe.");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateProduct({ commit, state }, productUpdate) {
      try {
        let index = state.products.findIndex(
          (product) => product.id == productUpdate.id
        );
        if (index == -1) {
          return alert("Producto no encontrado");
        }
        commit("UPDATE_PRODUCT", { index, product: productUpdate });
        localStorage.setItem("products", JSON.stringify(state.products));
        return true;
      } catch (error) {
        alert(
          `No fue posible actualizar el producto con ID: ${productUpdate.id}`
        );
      }
    },
    //FIN ACTIONS PRODUCTS
  },
  modules: {},
});
