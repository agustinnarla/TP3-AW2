import { Router } from "express";
import { traerProductoEspecifico,traerProducto,agregarProducto,modificarProducto,eliminarProducto } from "../metodos/metodos.mjs";

export const ruta = new Router()

ruta.get('/productos',traerProducto)
ruta.get('/productos/:id',traerProductoEspecifico)
ruta.post('/productos',agregarProducto)
ruta.put('/productos/:id',modificarProducto)
ruta.delete('/productos/:id',eliminarProducto)