import { pool } from "../database/database.mjs";

const traerProductos = async(req,res) =>{
    const datos = await pool.query("SELECT * FROM datos")
    res.send(datos.rows)
}

const agregarProducto = async(req,res) =>{
    const {nombre,categoria,marca,stock} = req.body
    console.log(nombre,categoria,marca,stock)
    const datos = await pool.query("INSERT INTO datos (nombre,categoria,marca,stock) " +
"VALUES ($1,$2,$3,$4)",[nombre,categoria,marca,stock])
    res.send(datos)
   
}


export {traerProductos,agregarProducto}