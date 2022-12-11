const express = require("express");
const cors = require("cors");
const profileSchema = require("../schmas");
const dotenv = require("dotenv");
const { json } = require("express");
require("../dbConfig");
dotenv.config({ path: './config.env' })

const app = express();
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000


app.get("/list", async (req, resp) => {
    let data = await profileSchema.find();
    console.log(data);
    if (data != 0) {
        resp.status(200).json(data)
    } else {
        resp.status(404).json({ "data": "data not found" });
    }
});

app.delete("/delete", async (req, resp) => {
    let data = await profileSchema.findByIdAndDelete(req.query.id);
    console.log(data);
    try{
        resp.status(200).json({"msg":"data deleted successfully"});
    } catch (e) {
        resp.status(404).json(e);
    }
});



app.post('/create', async (req, resp) => {
    let data = await new profileSchema(req.body);
    let result = await data.save();
    if (data.__v == 0) {
        resp.status(200).json(result);
        console.log(result);
    } else {
        resp.status(404).json({"msg":'data is not created'});
    }

});


app.put("/update", async (req, resp) => {
    let data = await profileSchema.findByIdAndUpdate(
        req.query.id,
        { $set: req.body },
        { new: true }
    );
    try {
        resp.status(200).send(data)
        console.log(data);
    } catch (e) {
        resp.status(404).json({"msg":"error"})
    }
});

app.get('*', async (req, res) => {
    res.send(`<h1 align='center'> 404 <h2>`)
})

module.exports = app;

app.listen(port);
