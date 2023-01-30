import NavbarComponent from "./NavbarComponent"
import React, { useState } from "react";

const LoginComponent = () => {
    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const { username, password } = state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }
    const submitForm = (e) => {
        e.preventDefault();
        console.table({ username, password })
    }
    return (
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>Login | Admin</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"
                        value={username}
                        onChange={inputValue("username")}>
                    </input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        value={password}
                        onChange={inputValue("password")}>
                    </input>
                </div>
                <br></br>
                <input type="submit" value="Login" className="btn-primary"></input>
            </form>
        </div>
    )
}

export default LoginComponent