const formulario = document.getElementById("formulario")

function extraerParametro(url, parametro){
    const objetoUrl = new URL(url)
    const parametros = objetoUrl.searchParams.get(parametro)
    return parametros
}


async function obtenerProducto() {  
    try {
        const id = extraerParametro(location.href, 'id')
        const datosCrudos = await fetch(`http://localhost:3001/productos/${id}`)
        const datosJSON = await datosCrudos.json()

        if (datosJSON.productos.length > 0){
            const producto = datosJSON.productos[0]
            formulario.innerHTML = `
            <form id="formulario" action="http://localhost:3001/productos" method="POST" class="flex items-center space-x-4">
                <input type="text" name="nombre" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Nombre" value="${producto.nombre}">
                <input type="text" name="marca" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Marca" value="${producto.marca}">
                <input type="text" name="categoria" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Categoría" value="${producto.categoria}">
                <input type="number" name="stock" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Stock" value="${producto.stock}">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Eliminar</button>
            </form>
            `
        } else {
            console.log("Error")
        }  
    }catch (error) {
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
            method: 'DELETE',
            body:JSON.stringify(datosFormulario)
        })
        if(respuesta.ok){
            alert('Producto eliminado exitosamente')
            window.location.href = '../index.html'
        }else{
            alert('Error al eliminar el producto')
        }
    } catch (error) {
        alert(error)
    }
    
})