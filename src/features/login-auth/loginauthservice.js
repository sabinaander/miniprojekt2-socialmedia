import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";

const register = async (username, email, password) => {
    const response = await axios.post(API_URL, {
        username, email, password
    }, { withCredentials: true })

    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

const login = async (email, password) => {
    const response = await axios
        .post(API_URL + "login", {
            email, password
        }, { withCredentials: true })

    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
}

// get users
const getUser = async (username) => {
    const response = await axios
    .get(API_URL + `/${username}`)
    return response.data
}

const logout = async () => {
    const response = await axios
        .delete(API_URL + "logout", { withCredentials: true })


    if (response.status === 200) {
        localStorage.removeItem('user')
    }
    return response
}

export default { register, login, logout, getUser }

