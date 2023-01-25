import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";

const EditComponent = () => {
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
    const submitForm = (e) => { }

    return (
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>Edit an article</h1>
        </div>
    );
}

export default EditComponent;