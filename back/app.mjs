import express from 'express'
import dotenv from 'dotenv'
import { ruta } from './rutas/ruta.mjs'
dotenv.config()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/',ruta)
app.use('/index',express.static('../front'))

const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})
