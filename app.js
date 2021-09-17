const express = require("express");

const app = express();

require("./configs/app.configs")(app);
const appRouter = require("./routes/app.routes");

app.use("/", appRouter);

app.use(["/*", "random"], (req, res, next) => {
    res.send("<h1>Dude the page you are looking for is not found</h1>");
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        ERROR: {
            statusCode: err.status || 500,
            message: err.message || "Something went wrong.",
        },
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running at port:::::::::${PORT}`);
});
