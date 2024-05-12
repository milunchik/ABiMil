const express = require('express')
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect('mongodb+srv://emili:JC60DQOTat4LvkG2@clustertest.swdtmyv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest')
.then(()=>{
    console.log('Connected to db')
})
.catch((error)=>{
    console.log('Connection falied', error)
})


const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server started: http://localhost:${PORT}`)
})