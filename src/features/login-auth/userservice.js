import axios from 'axios'
import authHeader from './authheader'

const API_URL = "http://localhost:5000/api/users/";

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all')
    }

    getUserContent(){
        return axios.get(API_URL + 'user', {headers: authHeader()})
    }

    getAdminContent(){
        return axios.get(API_URL + 'admin', {headers: authHeader()})
    }

}

export default new UserService()