import instance from "./instance";

const register = (data) => instance.noAuth.post(`/auth/register`, data)
const login = (data) => instance.noAuth.post(`/auth/login`, data)
const forgotPassword = (data) => instance.auth.post(`/password/forgot`, data)
const resetPassword = (data) => instance.auth.post(`/password/reset`, data)

const apiAuth = {
    register,
    login,
    forgotPassword,
    resetPassword
}

export default apiAuth