import {createStore} from "vuex";
import createPersistedState from "vuex-persistedstate";
// import Order from "@/pages/Order.vue";

const store = createStore({
    // modules: {
    //   order : Order
    // },
    state() {
        return {
            account: {
                id : 0
            },
            cart: []
        }
    },
    mutations: {
        setAccount(state, payload) {
            state.account.id = payload;
        },
        setCart(state, payload) {
            state.cart = payload
        }
    },
    plugins: [
        createPersistedState()
    ]
})

export default store;