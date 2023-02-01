import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { getToken } from "../services/authorize";

const EditComponent = (props) => {
    const [state, setState] = useState({
        title: "",
        author: "",
        slug: ""
    })

    const { title, author, slug } = state
    const [content, setContent] = useState('')

    const submitContent = (event) => {
        setContent(event)
    }

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                const { title, content, author, slug } = response.data
                setState({ ...state, title, author, slug })
                setContent(content)
            })
            .catch(err => alert(err))
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        console.log("API URL = ", process.env.REACT_APP_API)
        axios
            .put(`${process.env.REACT_APP_API}/blog/${slug}`,
                { title, content, author },
                {
                    headers: {
                        authorization: `Bearer ${getToken()}`
                    }
                })
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Done!!',
                    text: 'Update success.'
                })
                setState({ ...state, title: "", author: "" })
                setContent(content)
            }).catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.error,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }

    const showUpdateForm = () => (
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
    )

    return (
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>Edit an article</h1>
            {showUpdateForm()}
        </div>
    );
}

export default EditComponent;