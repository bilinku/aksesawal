import instance from "./instance";

const listProduct = (search) => instance.auth.get(`/products?q=${search}`)
const addProduct = (data) => instance.authwithFile.post(`/products`, data)
const showProduct = (id) => instance.auth.get(`/products/${id}`)
const editProduct = (id, data) => instance.authwithFile.post(`/products/${id}`, data)
const deleteProduct = (id) => instance.auth.delete(`/products/${id}`)
const landing = () => instance.auth.get(`/landing`)
const storeLanding = (data) => instance.authwithFile.post(`/landing`, data)

const apiProduct = {
    listProduct,
    addProduct,
    showProduct,
    editProduct,
    deleteProduct,
    landing,
    storeLanding
}

export default apiProduct