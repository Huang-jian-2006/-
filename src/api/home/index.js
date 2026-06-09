import http from "@/utils/http";
const getbannner = (item) => {
    return http.get("home/banner", {
        params: {
            distributionSite: item
        }
    })
}
const newgood = () => {
    return http.get("/home/new")
}
const hot = () => {
    return http.get("/home/hot")
}
const good = () => {
    return http.get("/home/goods")
}
export { getbannner, newgood, hot, good }
