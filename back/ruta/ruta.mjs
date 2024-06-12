import { Router } from "express";
import { traerProductos,agregarProducto } from "../metodo/funciones.mjs";
export const ruta = new Router()

ruta.get("/productos",traerProductos)
ruta.post("/productos",agregarProducto)

