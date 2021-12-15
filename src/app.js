const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'index render',
        name: 'omar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'omar1'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'omar2'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'help article not found!'
    })
})
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'omar',
//         age: 24
//     },
//         {
//             name: 'tasneem',
//             age: 23
//     }])
// })
// app.get('/about', (req, res) => {
//     res.send('about me')
// })
app.get('/call', (req, res) => {
    res.send('<h1>call</h1>')
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastDate) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastDate,
                location
                // address: req.query.address
            })
        })
        
    })

    // res.send({
    //     forecast: 'snowing',
    //     location: req.query.address
    // })

})
app.get('/products', (req, res) => {
    // console.log(req.query.search)
    if (!req.query.search) {
        return res.send({
            error: 'provide search term'
        })
    }
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port' + port)
})

app.listen()
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public/index.html'))