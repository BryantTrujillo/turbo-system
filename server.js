const express = require('express')
const app = express()

// Additional Express middleware 
const morgan = require('morgan')
const errorHandler = require('errorhandler')

// Imported express.Router() from './routes/
const eatRouter = require('./routes/eatRouter')
const servicesRouter = require('./routes/servicesRouter')
const shopRouter = require('./routes/shopRouter')
const stayRouter = require('./routes/stayRouter')

const hostname = 'localhost'
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))

// Assign routers to routes
app.use('/eat', eatRouter)
app.use('/services', servicesRouter)
app.use('/shop', shopRouter)
app.use('/stay', stayRouter)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.status(200).send('Testing... Testing...')
})

app.listen(PORT, hostname, () => {
    console.log(`Server is running at http://${hostname}:${PORT}/`)
})