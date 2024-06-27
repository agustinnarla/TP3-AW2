const formulario = document.getElementById("formulario")


formulario.addEventListener('submit', async(evento) => {
    evento.preventDefault();
    const datosCrudos = new FormData(formulario);
    const datosFormulario = Object.fromEntries(datosCrudos);

    // Validar que el campo 'nombre' no esté vacío
    if (!datosFormulario.nombre) {
        alert('El campo Nombre es obligatorio');
        return;
    }

    try {
        const respuesta = await fetch(formulario.action, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: formulario.method,
            body: JSON.stringify(datosFormulario)
        });

        if (respuesta.ok) {
            alert('Se agregó un nuevo producto exitosamente');
            formulario.reset(); 
        } else {
            alert('Error al agregar un producto');
        }
    } catch (error) {
        alert(error);
    }
});