export default function authHeader(){

    const user=JSON.parse(localStorage.getItem("loggedUser"))

    if(user && user.token){
        return {Authorization: user.token}
    }else{
        return{}
    }
}