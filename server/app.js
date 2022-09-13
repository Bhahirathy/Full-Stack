const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const userSchema = require("./Modals/userSchema");
const crypto = require("crypto");
const contentSchema = require("./Modals/contentSchema");
const alg = crypto.randomBytes(64).toString("hex");
const {generatePasswordHash}=require("./reg")
const salt = 10;
const app = express();
const cors=require("cors")
app.listen(3004, (err) => {
    if (!err) {
        console.log("server connected in port 8080")
    } else {
        console.log(err);
    }
})
mongoose.connect("mongodb+srv://Rathy:rathy@cluster1.hr2g5lq.mongodb.net/assignment?retryWrites=true&w=majority", (err) => {
    if (!err) {
        console.log("Database connected");
    } else {
        console.log(err)
    }
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.post("/register",async (req, res) => {
    console.log(req.body)
    generatePasswordHash(req.body.password).then((passwordHash)=>{
        userSchema.create({
            name:req.body.name,
            email:req.body.email,
            password:passwordHash
        }).then((data)=>{
            res.status(200).send("User created successfully")
        }).catch((err)=>{
            res.status(400).send(err.message)
        })
    })
})
app.post("/login", (req, res) => {
    userSchema.find({ email: req.body.email }).then((data) => {
        if (data.length) {
            bcrypt.compare(req.body.password, data[0].password).then((value) => {
                if (value) {
                    const authToken = jsonwebtoken.sign(data[0].email, alg)
                    res.status(200).send({ authToken })
                } else {
                    res.status(400).send("Invalid password")
                }
            })
        } else {
            res.status(400).send("Invalid User")
        }
    })
})
app.post("/content", (req, res) => {
    const user = jsonwebtoken.verify(req.headers.authorization, alg)
    console.log(req.body)
    console.log(req.headers.authorization)
    userSchema.find({ email: user }).then((value) => {
        console.log(value)
        if (value.length) {
            contentSchema.create({
                content: req.body.content
            }).then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(400).send(err)
            }).then((data) => {
                res.status(200).send(`${data} posted successfully`)
            })
        } else {
            res.status(400).send("Login")
        }
    })
})
app.get("/all",(req,res)=>{
    const user=jsonwebtoken.verify(req.headers.authorization,alg)
    userSchema.find({email:user}).then((data)=>{
        res.status(200).send(data[0])
    })
})
app.get("/publishContent",(req,res)=>{
    contentSchema.find({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})