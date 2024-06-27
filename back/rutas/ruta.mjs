import { Router } from "express";

import { traerProductoEspecifico,traerProductos,agregarProducto,modificarProducto,eliminarProducto } from "../metodos/metodos.mjs";

export const ruta = new Router()

ruta.get('/productos',traerProductos)
ruta.get('/productos/:id',traerProductoEspecifico)
ruta.post('/productos',agregarProducto)
ruta.put('/productos/:id',modificarProducto)
ruta.delete('/productos/:id',eliminarProducto)