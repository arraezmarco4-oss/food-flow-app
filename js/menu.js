// js/menu.js

// Funcion para cargar los productos desde Supabase y mostrarlos en el HTML
async function cargarProductos() {
    // 1. Pedir los datos a la tabla 'productos'
    // _supabase viene de archivo supabaseClient.js
    const { data, error } = await _supabase
        .from('productos')
        .select('*');

    if (error) {
        console.error("Error al conectar con Supabase:", error.message);
        return;
    }

    console.log("Productos recibidos con éxito:", data);

    // 2. Buscar el div en el HTML para meter los productos
    const contenedor = document.getElementById('contenedor-menu');
    
    // 3. Crear el HTML para cada producto
    data.forEach(producto => {
    contenedor.innerHTML += `
        <div class="producto-card"> 
            <!-- Corregimos el nombre de la clase para que coincida con el CSS -->
            
            <img src="${producto.imagen_url}" alt="${producto.nombre}">
            
            <h3>${producto.nombre}</h3>
            
            <!-- Usamos || "" para que si la descripción es null, se vea vacío y no la palabra null -->
            <p>${producto.descripcion || ""}</p>
            
            <div class="precio">$${producto.precio}</div>
            
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">
                Agregar al Carrito
            </button>
        </div>
    `;
});


}

// Ejecutar la función automáticamente al cargar la página
cargarProductos();
