// GET DATA FROM DB

export default function authHeader() {
    const user = JSON.parse(('./') )

    if (user && user.accessToken) {
        return{'x-access-token': user.accessToken}
    } else{
        return{}
    }
}