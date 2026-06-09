import http from "@/utils/http";
const getDetailAPI = (id) => {
    return http.get("/goods", {
        params: {
            id,
        },
    });
};
const getHotListApi = ({ id, type, limit = 3 }) => {
    return http.get("/goods/hot", {
        params: { id, type, limit },
    });
}
export { getDetailAPI, getHotListApi }
