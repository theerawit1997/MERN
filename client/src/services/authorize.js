//save token/username =>session storage
export const authenticate = (response, next) => {
    if (window !== "undefined") {
        //save in session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("user", JSON.stringify(response.data.username))
    }
    next()
}

//get token
export const getToken = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}
//get user
export const getUser = () => {
    if (window !== "undefined") {
        if (sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"))
        } else {
            return false
        }
    }
}
export const logout = (next) => {
    if (window !== "undefined") {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        console.log("token,user now remove")
    }
    next()
    console.log("logout")
}