const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require('./src/authRouter')
const profRouter = require('./src/profRouters')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/profile', profRouter)
app.use('/auth', authRouter)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/sign-in', (req, res)=>{
    res.render('sign-in')
})

app.get('/sign-up', (req, res)=>{
    res.render('sign-up') 
})

app.get('/admin', (req, res)=>{
    res.render('admin')
})

app.get('/basic', (req, res)=>{
    let data = {username: req.query.username}
    res.render('profile', data)
})

app.get('/logout', (req,res)=>{
    res.cookie('jwt', "", {maxAge: '1'})
    res.redirect('/')
})


app.post('/profile', (req, res)=>{
    let username = req.body.username
     res.redirect('profile', username)
})

module.exports = app