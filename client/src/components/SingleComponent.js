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
            <NavbarComponent />
            {blog &&
                <div>
                    <h1>{blog.title}</h1>
                    {/* <div className="pt-3">{renderHTML(blog.content)}</div> */}
                    <div className="pt-3">{blog.content}</div>
                    <p className="text-muted"> Author: {blog.author} , created at : {new Date(blog.createdAt).toLocaleString()}</p>
                </div>}
        </div>
    )
}

export default SingleComponent;