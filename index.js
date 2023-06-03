const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const blog = require("./schema/blogModels")
const app = express()
const port = 8000
app.use(express.json())

app.use(cors())
mongoose.connect("mongodb+srv://test:test@cluster0.axud0ps.mongodb.net/").then((res) => {
    console.log("connected to db")
}).catch((e) => {
    console.log(e)
})

app.post("/post", async (req, res) => {
    try {
        // const upload = await cloudinary.v2.uploader.upload(req.file.path)
        const post = await blog.create({
            label: req.body.label,
            description:req.body.description,
            file: req.body.file
        })
        res.status(200).json({
            status: "success",
            post
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

})

app.get("/post", async (req, res) => {
    // console.log("ok")
    try {
        // const photo = await photo_schema.find()
        const photos = await blog.find()
        res.status(200).json({
            status: "ok",
            photos
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })

    }

})

app.delete("/delete/:_id", async (req, res) => {
    try {
        await blog.deleteOne({ _id: req.params._id })
        res.status(200).json({
            status: "Success",
            message: "SuccessFully Deleted"
        })
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }

})

app.listen(port, () => {
    console.log(`running on port ${port}`)
})
