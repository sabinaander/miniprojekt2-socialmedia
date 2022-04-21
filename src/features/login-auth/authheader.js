// GET DATA FROM DB

export default function authHeader(token) {

    if (!token) {
        return
    }
    return { 'Authorization': `Bearer ${token}` }

}