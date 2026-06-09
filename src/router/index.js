import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import LoginView from '../views/login/index.vue'
import layout from "@/views/layout/index.vue"
import NotFoundView from '../views/404/index.vue'
import Category from '../views/category/index.vue'
import Home from "@/views/home/index.vue"
import Allsort from "@/views/allsort/index.vue"
import Detail from "@/views/detail/index.vue"
import Account from "@/views/account/index.vue"
import Cart from "@/views/cart/index.vue"
import Checkout from "@/views/checkout/index.vue"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: layout,
            children: [
                {
                    path: "",
                    name: "home",
                    component: Home,
                },
                {
                    path: "/category/:id",
                    name: "category",
                    component: Category,
                },
                {
                    path: "/category/allsort/:id",
                    name: "allsort",
                    component: Allsort,
                },
                {
                    path: "/detail/:id",
                    name: "datail",
                    component: Detail
                },
                {
                    path: "cart",
                    name: "cart",
                    component: Cart
                },
                {
                    path: "checkout",
                    name: "checkout",
                    component: Checkout
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView,
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
        },
    ],
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.name === "checkout") {
        if (token) {
            next()
        }
        else {
            ElMessage.error("请先登录")
            next('/login')
        }
    } else {
        next()
    }
})
export default router
