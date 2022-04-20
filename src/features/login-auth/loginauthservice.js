import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";

const register = (email, password) => {
    return axios.post(API_URL + "signup", {
        email,password
    })
}

const login = (email, password) => {
    return axios
    .post(API_URL + "signin", {
        email,password
    })
    .then ((response) => {
        if (response.data.accessToken) {
            sessionStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    })
}

const logout = () => {
    sessionStorage.removeItem('user')
}

export default { register, login, logout }

