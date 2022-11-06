const express = require("express");
const profileSchema = require("../schmas");
const dotenv = require("dotenv");
require("../dbConfig");
dotenv.config({path:'./config.env'})

const app = express();
app.use(express.json());

const port  = process.env.PORT || 5000


app.get("/list", async (req, resp) => {
    let data = await profileSchema.find();
    console.log(data);
    if (data != 0) {
        resp.status(200).send(data)
    } else {
        resp.status(404).send("data not found") 
    }
});

app.delete("/delete", async (req, resp) => {   
    let data = await profileSchema.deleteOne({
        'title': req.query.title.toString(),
    });
    console.log(req.query.name);
    console.log(data);
    if (data.acknowledged == true && data.deletedCount != 0) {
        resp.status(200).send(data)
    } else {
        resp.status(404).send('data is not deleted')
    }
});



app.post('/create', async function (req, resp) {
    let data = await new profileSchema(req.body);
    let result = await data.save();
    if (data.__v == 0) {
        resp.status(200).send()
        console.log(result);
    } else {
        resp.status(404).send('data is not created')
    }

});


app.put("/update", async (req, resp) => {
    let data = await profileSchema.updateOne(
        { 'title': req.query.name.toString(), },
        { $set: req.body }
    );
    if (data.acknowledged == true && data.modifiedCount != 0
        && data.matchedCount != 0) {
        resp.status(200).send(data)
        console.log(data);
    } else {
        resp.status(404).send('data is not update')
    }
});

app.get('*', async (req,res)=>{
    res.send(`<h1 align='center'> 404 <h2>`)
})

module.exports = app;

app.listen(port);
