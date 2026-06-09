import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getbannner } from '@/api/home'
export const useCounterStore = defineStore('counter', () => {
  const banner = ref([])
  const getbannerData = async () => {
    banner.value = (await getbannner()).data.result;
  }
  const cartlis = ref([])
  const setCartList = (list) => {
    cartlis.value = list
  }
  const localaddcart = (item) => {
    cartlis.value.push(item)
  }
  const localdelcart = (item) => {
    const currentIndex = cartlis.value.findIndex((i) => i === item)
    if (currentIndex !== -1) {
      cartlis.value.splice(currentIndex, 1)
      return
    }
    cartlis.value = cartlis.value.filter((i) => i.id !== item.id)
  }
  const clearLocalCart = () => {
    cartlis.value = []
  }
  const token = ref()
  token.value = localStorage.getItem("token")
  const login = ref(true)
  if (token) {
    login.value = false
  }
  const changeLogin = (item) => {
    login.value = item
  }
  const useinfo = ref({})
  const changeUseinfo = (item) => {
    useinfo.value = item
  }
  const addressList = ref([
    {
      id: 1,
      receiver: '张三',
      phone: '13800000000',
      tag: '家',
      province: '广东省',
      city: '深圳市',
      area: '南山区',
      detail: '科技园科苑路 188 号 6 栋 1201',
    },
  ])
  const addAddress = (address) => {
    addressList.value.unshift({
      ...address,
      id: Date.now(),
    })
  }
  const updateAddress = (address) => {
    const currentIndex = addressList.value.findIndex((item) => item.id === address.id)
    if (currentIndex === -1) return
    addressList.value[currentIndex] = { ...address }
  }
  return {
    banner,
    getbannerData,
    cartlis,
    setCartList,
    localaddcart,
    localdelcart,
    clearLocalCart,
    token,
    useinfo,
    changeUseinfo,
    addressList,
    addAddress,
    updateAddress,
    login,
    changeLogin
  }
})
