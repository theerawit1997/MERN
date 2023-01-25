import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";

const SingleComponent = (props) => {
    const [blog, setBlogs] = useState('')
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then(response => {
                setBlogs(response.data)
            })
            .catch(err => alert(err))
        // eslint-disable-next-line
    }, [])
    return (
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <p className="text-muted">Author: {blog.author}, created at: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
    )
}

export default SingleComponent;