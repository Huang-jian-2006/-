import http from "@/utils/http";
const getGoodData = (data) => {
    return http.post("/category/goods/temporary", data)
}
export { getGoodData }