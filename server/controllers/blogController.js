//connect database ,use database
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');

//record,note
exports.create = (req, res) => {
    const { title, content, author } = req.body
    let slug = slugify(title)
    if (!slug) slug = uuidv4();
    //validate
    switch (true) {
        case !title:
            return res.status(400).json({ error: "Please input title" })
            break;
        case !content:
            return res.status(400).json({ error: "Please input content" })
            break;
    }
    //database record
    Blogs.create({ title, content, author, slug }, (err, blog) => {
        if (err) {
            res.status(400).json({ error: "Duplicate article" })
        }
        res.json(blog)
    })
}
//get all data blogs
exports.getAllblogs = (req, res) => {
    Blogs.find({}).exec((err, blogs) => {
        res.json(blogs)
    })
}
//get singleBlog article  on slug
exports.singleBlog = (req, res) => {
    const { slug } = req.params
    Blogs.findOne({ slug }).exec((err, blog) => {
        res.json(blog)
    })
}
//remove singleBlog article  on slug
exports.remove = (req, res) => {
    const { slug } = req.params
    Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
        if (err) console.log(err)
        res.json({
            message: "delete done"
        })
    })
}
//update singleBlog article  on slug(send=>title,content,author)
exports.update = (req, res) => {
    const { slug } = req.params
    const { title, content, author } = req.body
    Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec((err, blog) => {
        if (err) console.log(err)
        res.json(blog)
    })
}