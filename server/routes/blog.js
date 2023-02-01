const express = require("express")
const router = express.Router()
const { create, getAllblogs, singleBlog, remove, update } = require("../controllers/blogController")
// const { requireLogin } = require("../controllers/authController")

// router.post('/create', requireLogin, create)
// router.get('/blogs', getAllblogs)
// router.get('/blog/:slug', singleBlog)
// router.delete('/blog/:slug', requireLogin, remove)
// router.put('/blog/:slug', requireLogin, update)

router.post('/create', create)
router.get('/blogs', getAllblogs)
router.get('/blog/:slug', singleBlog)
router.delete('/blog/:slug', remove)
router.put('/blog/:slug', update)

module.exports = router