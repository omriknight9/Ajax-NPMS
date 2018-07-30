
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');

const viewBasicPath = path.join(__dirname + "/view");


app.use(function (req, res, next) {
    //delete all headers related to cache
    req.headers['if-none-match'] = '';
    req.headers['if-modified-since'] = '';
    next();
})
app.set('etag', false);
app.use(bodyParser.urlencoded({ extended: true }));


fs.readdir(viewBasicPath, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
    }

    files.forEach(function (file, index) {
        console.log(file, index);
        app.use(express.static(viewBasicPath + "/" + file));

        app.get("/app" + index, (req, res) => {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", 0);
            res.sendFile(viewBasicPath + "/" + file + "/index.html");
        });
    })
}
);

const port = process.env.PORT || 3500;

app.listen(port, function () { console.log(`server listening on port ${port}`); });
