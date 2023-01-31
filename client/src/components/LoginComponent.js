import NavbarComponent from "./NavbarComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import { withRouter } from "react-router-dom"

const LoginComponent = (props) => {
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
                    text: 'Log in success.'
                })
                // console.log(response)
                authenticate(response, () => props.history.push("/create"))
                console.log("login")
            }).catch(err => {
                // console.log(err.response.data.error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.error,
                })
            })
    }
    // fix if have user login just stop user go login page
    useEffect(() => {
        getUser() && props.history.push("/")
        // eslint-disable-next-line
    }, [])
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

export default withRouter(LoginComponent)