import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";

const FormComponent = () => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: ""
    })
    const { title, content, author } = state
    // configure state
    const inputValue = name => event => {
        // console.log(name, "=", event.target.value)
        setState({ ...state, [name]: event.target.value });
    }
    const submitForm = (e) => {
        e.preventDefault();
        // console.table({ title, content, author })
        console.log("API URL = ", process.env.REACT_APP_API)
        axios
            .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!!',
                    text: 'Data has been saved.'
                })
                setState({ ...state, title: "", content: "", author: "" })
            }).catch(err => {
                // alert(err.response.data.error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.error,
                    footer: '<a href="">Why do I have this issue?</a>'
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
                    <textarea className="form-control"
                        value={content}
                        onChange={inputValue("content")}>
                    </textarea>
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