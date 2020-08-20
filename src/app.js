const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setup handlebars engine and views directory 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main page',
        name: 'Mitsos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Mitsos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mitsos',
        message: 'In case you need help DoNot Call 911'
    })
})
app.get('/products', (req,res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide correct address'
        })
    }

    geocode(req.query.address, (error, address={}) => {
        if(error) {
            return res.send({error})
        }
        const location = address.cityName
        forecast(location, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: forecastData,
    //     location: req.query.address,
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Not found page',
        name: 'Mitsos',
        message: 'Could not locate help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page Not found',
        name: 'Mitsos',
        message: '404 not Found'
    })
})
// app.get('', (req, res)=> {
//     res.send('Hello Express')
// })

// app.get('/help', (req,res) => {
//     res.send({
//         name:'Andrew',
//         age:27
//     })
// })

app.get('/about', (req,res) => {
    res.send('About page')
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=> {
    console.log('The server is up on port 3000')
})