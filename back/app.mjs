import express from 'express'
import dotenv from 'dotenv'
import { pool } from './basededatos/coneccion.mjs'

dotenv.config()

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/productos',async(req,res)=>{
    const respuesta = await pool.query("SELECT * FROM datos")
    res.json(respuesta.rows)
})

app.post('/productos',async(req,res) =>{
    const {nombre,categoria,marca,stock} = req.body
    console.log(req.body)
    const respuesta = await pool.query("INSERT INTO datos (nombre,categoria,marca,stock) VALUES ($1,$2,$3,$4)",[nombre,categoria,marca,stock])
    res.json(respuesta.rows)
})
const PORT = process.env.PORT ?? 3000

app.listen(PORT,()=>{
    console.log(`El servidor se inicio en http://localhost:${PORT}`)
})
