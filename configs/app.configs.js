const express = require("express");
const path = require("path");
const morgan = require("morgan");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(morgan("dev"));
};
