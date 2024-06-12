import express from 'express'
import 'dotenv/config'
import { ruta } from './ruta/ruta.mjs'


const app = express()

app.use(ruta)

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 3000 

app.listen(PORT,()=>{
    console.log(`El servidor se instancio en el puerto ${PORT}`)
})
