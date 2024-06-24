const formulario = document.getElementById("formulario")


formulario.addEventListener('submit', async(evento)=>{
    evento.preventDefault()
    const datosCrudos = new FormData(formulario)
    const datosFormulario = Object.fromEntries(datosCrudos)
    try {
        const respuesta = await fetch(formulario.action,{
            header:{
                'Content-Type':'application/json'
            },
            method: formulario.method,
            body: JSON.stringify(datosFormulario)
        })
        if(respuesta.ok){
            alert('Se agrego un nuevo producto exitosamente')
            formulario.reset(); 
        }
        else{
            alert('Error al agregar un producto')
        }
    } catch (error) {
        alert(error)
    }
})