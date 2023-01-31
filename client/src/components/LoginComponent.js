import NavbarComponent from "./NavbarComponent"
import React, { useState } from "react";
import axios from "axios"
import Swal from "sweetalert2";

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
        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!!',
                    text: 'Login success.'
                })
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.error,
                })
            })
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