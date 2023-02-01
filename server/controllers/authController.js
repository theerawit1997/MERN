const jwt = require("jsonwebtoken");
// const expressJWT = require("express-jwt");

exports.login = (req, res) => {
    const { username, password } = req.body
    if (password === process.env.PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.json({ token, username })
    } else {
        return res.status(400).json({ error: "password is incorrect!" })
    }
}

// //check token
// exports.requireLogin = expressJWT({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"],
//     userProperty: "auth"
// }, function (req, res) {
//     if (!req.auth.admin) return res.sendStatus(401);
//     res.sendStatus(200);
// })
