const express = require("express");
const passport = require("passport");
require("../configs/passport.configs");
const data = require("../data");

const router = express.Router();

// get

router.get(["/", "/login"], (req, res, next) => {
    res.render("login", { heading: "Login Page" });
});

router.get("/register", (req, res, next) => {
    res.render("register", { heading: "Registration Page" });
});

router.get("/user/:email", (req, res, next) => {
    if (!req.headers.referer) {
        return res.send(
            "<h1>Dude you need to login to get access for this page."
        );
    }
    res.render("users", {
        user: `You are logged in with EMAIL : ${req.params.email}`,
        heading: "All users",
        data: JSON.stringify(data),
    });
});

router.get("/users", (req, res, next) => {
    res.send(data);
});

// post

router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: "/login",
        session: false,
    }),
    (req, res, next) => {
        res.redirect(`/user/${req.user.email}`);
    }
);

router.post("/register", (req, res, next) => {
    if (!req.body)
        return res.send(
            "<h1>Sorry dude, Can't create an account with empty data and stop modifying the request.</h1>"
        );

    const newUser = req.body;
    console.log(newUser, data);
    const doesExist = data.find((user) => {
        return user.email === newUser.email;
    });
    console.log(doesExist);

    if (doesExist)
        return res.send(
            "<h1>Sorry dude, an account already exist with this email. Change your email and try again</h1>"
        );

    data.push(newUser);
    res.redirect("/login");
});

module.exports = router;
