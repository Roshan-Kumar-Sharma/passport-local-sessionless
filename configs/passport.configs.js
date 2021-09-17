const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const data = require("../data");

const customFields = {
    usernameField: "email",
};

function loginVerifyCallback(username, password, done) {
    const user = data.find((user) => {
        if (user.email === username) return user;
    });

    if (!user) {
        return done(null, false);
    }

    if (!(user.password === password)) {
        return done(null, false);
    }

    // if (!(user && user.password === password)) done(null, false);

    return done(null, user);
}

passport.use("login", new LocalStrategy(customFields, loginVerifyCallback));
