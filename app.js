const express = require('express')
const app = express()
const authRouter = require('./src/authRouter')
const router = require('./src/routers')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/profile', router)
app.use('/auth', authRouter)

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/about', (req, res)=>{
    res.render('about')    
})

app.post('/check-user', (req, res)=>{
    let userName = req.body.username
    console.log(userName)
    if(userName == ""){
        return res.redirect('/')
    }else{
        return res.redirect('/user/' + userName)
    }
})

app.get('/sign-in', (req, res)=>{
    res.render('sign-in')
    //res.redirect('/profile')
})

app.get('/sign-up', (req, res)=>{
    res.render('sign-up') 
})

app.get('/profile', (req, res)=>{
    res.render('profile')
})
