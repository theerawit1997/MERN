import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { getToken, getUser } from "../services/authorize";

const FormComponent = () => {
    const [state, setState] = useState({
        title: "",
        author: getUser()
    })
    const { title, author } = state
    const [content, setContent] = useState('')
    // configure state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const submitContent = (event) => {
        setContent(event)
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log("API URL = ", process.env.REACT_APP_API)
        axios
            .post(`${process.env.REACT_APP_API}/create`,
                { title, content, author },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                }
            )
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!!',
                    text: 'Data has been saved.'
                })
                setState({ ...state, title: "", author: "" })
                setContent("")
            }).catch(err => {
                // alert(err.response.data.error)
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
            <h1>write an article</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Article title</label>
                    <input type="text" className="form-control"
                        value={title}
                        onChange={inputValue("title")}>
                    </input>
                </div>
                <div className="form-group">
                    <label>details</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="Write your articles in detail."
                        style={{ border: '1px solid #666' }}
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" className="form-control"
                        value={author}
                        onChange={inputValue("author")}>
                    </input>
                </div>
                <br></br>
                <input type="submit" value="record" className="btn-primary"></input>
            </form>
        </div>
    );
}

export default FormComponent;