const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const productsRoutes = require('./routes/productsRoutes')
const supplierRoutes = require('./routes/supplierRoutes')
const dotenv = require('dotenv')
const db = require('./config/db')
const cookieParser = require('cookie-parser')
dotenv.config()
const app = express()
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'https://vendormitra-1.onrender.com',
    credentials: true
}))

app.get('/',(req,res) => {
    res.send('hey its working')
})

app.use('/user', userRoutes)
app.use('/product', productsRoutes)
app.use('/supplier', supplierRoutes)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});
