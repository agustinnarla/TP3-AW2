const formulario = document.getElementById("formulario")

function extraerParametro(url, parametro){
    const objetoUrl = new URL(url)
    const parametros = objetoUrl.searchParams.get(parametro)
    return parametros
}


async function obtenerProducto() {
    try {
        const id = extraerParametro(location.href, 'id');
        const datosCrudos = await fetch(`http://localhost:3001/productos/${id}`);
        const datosJSON = await datosCrudos.json();

        if (datosJSON) {
            formulario.innerHTML = `
                <form id="formulario" action="http://localhost:3001/productos" method="POST" class="flex items-center space-x-4">
                    <input type="text" name="nombre" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Nombre" value="${datosJSON.nombre}" disabled>
                    <input type="text" name="marca" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Marca" value="${datosJSON.marca}" disabled>
                    <input type="text" name="categoria" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Categoría" value="${datosJSON.categoria}" disabled>
                    <input type="number" name="stock" class="px-4 py-2 border border-gray-300 rounded-md" placeholder="Stock" value="${datosJSON.stock}" disabled>
                    <button type="submit" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Eliminar</button>
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