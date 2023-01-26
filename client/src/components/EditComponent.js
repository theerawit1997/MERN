import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"

const EditComponent = (props) => {
    const [state, setState] = useState({
        title: "",
        content: "",
        author: "",
        slug: ""
    })
    const { title, content, author } = state

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                const { title, content, author, slug } = response.data
                setState({ ...state, title, content, author, slug })
            })
            .catch(err => alert(err))
        // eslint-disable-next-line
    }, [])

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }
    const submitForm = (e) => {
        // e.preventDefault();
        // console.log("API URL = ", process.env.REACT_APP_API)
        // axios
        //     .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
        //     .then(response => {
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Success!!',
        //             text: 'Data has been saved.'
        //         })
        //         setState({ ...state, title: "", content: "", author: "" })
        //     }).catch(err => {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops...',
        //             text: err.response.data.error,
        //             footer: '<a href="">Why do I have this issue?</a>'
        //         })
        //     })
    }

    return (
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>Edit an article</h1>
            {JSON.stringify(state)}
        </div>
    );
}

export default EditComponent;