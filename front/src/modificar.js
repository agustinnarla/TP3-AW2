const formulario = document.getElementById("formulario");

function extraerParametro(url, parametro) {
    const objetoUrl = new URL(url);
    return objetoUrl.searchParams.get(parametro);
}

async function obtenerProducto() {
    try {
        const id = extraerParametro(location.href, 'id');
        const datosCrudos = await fetch(`http://localhost:3001/productos/${id}`);
        const datosJSON = await datosCrudos.json();

        if (datosJSON) {
            formulario.innerHTML = `
                <form id="formulario" action="http://localhost:3001/productos" method="POST" class="flex items-center space-x-4">
                    <input type="text" name="nombre" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Nombre" value="${datosJSON.nombre}">
                    <input type="text" name="marca" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Marca" value="${datosJSON.marca}">
                    <input type="text" name="categoria" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Categoría" value="${datosJSON.categoria}">
                    <input type="number" name="stock" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Stock" value="${datosJSON.stock}">
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Modificar</button>
                </form>
            `;
        } else {
            console.log("Producto no encontrado");
        }
    } catch (error) {
        console.log(error);
    }
}

obtenerProducto()

formulario.addEventListener('submit', async(evento)=>{
    evento.preventDefault()
    const id = extraerParametro(location.href, 'id')
    const datosCrudos = new FormData(formulario)
    const datosFormulario = Object.fromEntries(datosCrudos)
    try {
        const respuesta = await fetch(formulario.action + '/' + id, {
            headers:{
                'Content-Type':'application/json'
            },
            method: 'PUT',
            body:JSON.stringify(datosFormulario)
            
        })
        if (respuesta.ok) {
            alert('Producto modificado exitosamente');
            window.location.href = '../index.html';
        } else {
            alert('Error al modificar el producto');
        }
    } catch (error) {
        alert(error)
    }
    
})