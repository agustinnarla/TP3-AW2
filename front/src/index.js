async function traerProductos() {
    try {
        const contenedor = document.getElementById("productos");
        const datosProducto = await fetch('http://localhost:3001/productos');
        const datosJSON = await datosProducto.json();

        // Verificar si 'productos' existe y es un arreglo
        if (Array.isArray(datosJSON.productos)) {
            let HTML = ''; 

            datosJSON.productos.forEach((producto) => {
                HTML += `
                    <article class="border-b border-gray-200 py-4">
                        <h3 class="text-lg font-semibold">${producto.nombre}</h3>
                        <p class="text-gray-600">Marca: ${producto.marca}</p>
                        <p class="text-gray-600">Categoría: ${producto.categoria}</p>
                        <p class="text-gray-600">Stock: ${producto.stock}</p>
                        <a href="modificar.html?id=${producto.id}" class="text-blue-500 hover:text-blue-700">Modificar</a>
                        <a href="eliminar.html?id=${producto.id}" class="text-blue-500 hover:text-blue-700">Eliminar</a>
                    </article>
                `;
            });

            contenedor.innerHTML = HTML;
        } else {
            console.error('La estructura de los datos no es la esperada.');
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

traerProductos();