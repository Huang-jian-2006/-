import http from '@/utils/http'
const mergeCart = (data) => {
    return http.post('/member/cart/merge', data)
}
const deleteCart = (data) => {
    return http.delete("/member/cart", {
        data,
    })
}
const addCartApi = (data) => {
    return http.post("/member/cart", data)
}
const getCart = () => {
    return http.get("/member/cart")
}
export { mergeCart, deleteCart, addCartApi, getCart }
