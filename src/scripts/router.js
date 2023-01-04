import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Join from "@/pages/Join.vue";
import Cart from "@/pages/Cart.vue";
import Order from "@/pages/Order.vue";
import Orders from "@/pages/Orders.vue";
import Board from "@/pages/Board.vue";

const routers = [
    {path: '/', component: Home},
    {path: '/join', component: Join},
    {path: '/login', component: Login},
    {path: '/cart', component: Cart},
    {path: '/order', component: Order},
    {path: '/orders', component: Orders},
    {path: '/Board', component: Board},
]

const router = createRouter({
    history: createWebHistory(),
    routes : routers
})

export default router;