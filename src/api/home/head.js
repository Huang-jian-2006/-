import http from "@/utils/http";
const headAPI = () => {
    return http.get("home/category/head")
}
export { headAPI } 