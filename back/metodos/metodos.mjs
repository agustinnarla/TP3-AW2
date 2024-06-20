import { pool } from "../basededatos/coneccion.mjs";

const traerProducto = async (req, res) => {
    try {
        const respuesta = await pool.query("SELECT * FROM datos");
        res.json(respuesta.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const traerProductoEspecifico = async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await pool.query("SELECT * FROM datos WHERE id=$1", [id]);
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const agregarProducto = async (req, res) => {
    const { nombre, categoria, marca, stock } = req.body;
    try {
        const respuesta = await pool.query(
            "INSERT INTO datos (nombre, categoria, marca, stock) VALUES ($1, $2, $3, $4) RETURNING *",
            [nombre, categoria, marca, stock]
        );
        res.status(201).json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const modificarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, categoria, marca, stock } = req.body;
    try {
        const respuesta = await pool.query(
            "UPDATE datos SET nombre=$1, categoria=$2, marca=$3, stock=$4 WHERE id=$5 RETURNING *",
            [nombre, categoria, marca, stock, id]
        );
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await pool.query("DELETE FROM datos WHERE id=$1 RETURNING *", [id]);
        if (respuesta.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

export {traerProductoEspecifico,traerProducto,agregarProducto,modificarProducto,eliminarProducto}