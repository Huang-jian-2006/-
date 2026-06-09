import http from "@/utils/http";
const loginAPI = (name, password) => {
    return http.post("/login", { account: name, password: password })
}
export { loginAPI }