import http from "@/utils/http";
const getsort = (id) => {
    return http.get("/category", {
        params: {
            id
        }
    })
}
export { getsort }