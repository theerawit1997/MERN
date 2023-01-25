import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function App() {
  const [blogs, setBlogs] = useState([])

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then(response => {
        setBlogs(response.data)
      })
      .catch(err => alert(err));
  }
  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = (slug) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then(response => {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }).catch(err => console.log(err));
  }

  return (
    <div className="container p-5">
      <NavbarComponent></NavbarComponent>
      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0, 300)}...</p>
            <p className="text-muted">Author: {blog.author}, created at: {new Date(blog.createdAt).toLocaleString()}</p>
            <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>update</Link> &nbsp;
            <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
