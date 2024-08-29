const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")


const person = require("./studentModel")

dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 6000

//connect database

mongoose.connect(`${process.env.DATABASE_URL}`)
.then( ()=>console.log("Database connected....!"))

app.listen(PORT, ()=>{
    console.log("server is running on port",PORT)
})


app.post("/adduser", async (req, res)=>{
const {Name, email, Age  } = req.body

if(!Name || Name.length < 3){
    return res.status(400).json({message: "please add your name and make sure it is up to three characters" })
}

const Newuser = new person({Name, email, Age })

await Newuser.save()

return res.status(200).json({message:"Registration Successful"})


})


app.put("/update-email", async(req, res)=>{

    const {Name, email, Age} = req.body
    if(!Name){
        res.status(402).json({message:"please enter name"})
    }
    if(!email){
        res.status(402).json({message:"please email is needed"})
    }

    const Userupdate = await person.find(
        {Name},
        {email},
        {new: true},
    );
    if(!Userupdate){
    return    res.status(405).json({message:"person not found"})
    }

    res.status(200).json({message:"updated successfully"})
})

app.post("/add-users", async (req, res)=>{

    const {Name, email, Age, phone} = req.body
    if(!age || age < 18 || age > 99){
        res.status(400).json({message:"please age must be between 18 and 99"})
    }
    const Newperson = new person({Name, email, Age, phone})

    await Newperson.save()
    return res.status(200).json({message:"registration sucessful"})

})

app.use((req, res)=>{
    return res.status(404).json({message: "Bad Request"})
})




