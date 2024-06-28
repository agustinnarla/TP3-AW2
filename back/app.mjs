import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ruta } from './rutas/ruta.mjs'
dotenv.config()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use(express.static('../front'))
app.use('/',ruta)

app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
    next()
});

const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})
