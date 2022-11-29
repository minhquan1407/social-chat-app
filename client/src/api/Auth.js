import axios from "./axiosClient"

const resetPassword = (password, accessToken) => {
    return axios.post("/auth/reset", password, accessToken)
}

export {resetPassword};