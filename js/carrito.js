// js/carrito.js

// Este array guardará los productos que el usuario elija
let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
    // 1. Buscamos si el producto ya está en el carrito
    const existe = carrito.find(producto => producto.id === id);

    if (existe) {
        // Si ya existe, le sumamos 1 a la cantidad
        existe.cantidad++;
    } else {
        // Si es nuevo, lo agregamos al array con cantidad 1
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
         
    }
    renderizarCarrito();
    console.log("Carrito actualizado:", carrito);
    actualizarContador();
}

function actualizarContador() {
    // Aquí podrías actualizar un número en la esquina de la pantalla
    const totalItems = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    console.log("Total de productos en carrito:", totalItems);
}
function toggleModal() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalDiv = document.getElementById('total-carrito');
    lista.innerHTML = "";
    let totalAcumulado = 0;

    carrito.forEach(item => {
        totalAcumulado += item.precio * item.cantidad;
        lista.innerHTML += `
            <div class="item-carrito">
                <p>${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
        `;
    });

    totalDiv.innerHTML = `<strong>Total: $${totalAcumulado.toFixed(2)}</strong>`;
    document.getElementById('contador-carrito').innerText = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}
async function finalizarCompra() {
    if (carrito.length === 0) return alert("El carrito está vacío");

    const nombreCliente = prompt("¿A nombre de quién va el pedido?");
    if (!nombreCliente) return;

    // Calcular el total
    const totalPedido = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    // 1. Insertar el pedido en la tabla 'pedidos'
    const { data: pedidoRealizado, error: errorPedido } = await _supabase
        .from('pedidos')
        .insert([{ cliente_nombre: nombreCliente, total: totalPedido }])
        .select(); // El .select() es para que nos devuelva el ID creado

    if (errorPedido) {
        console.error("Error al crear pedido:", errorPedido);
        return;
    }

    const pedidoId = pedidoRealizado[0].id;

    // 2. Preparar los datos para la tabla 'detalles_pedido'
    const detalles = carrito.map(item => ({
        pedido_id: pedidoId,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio // Aquí "congelamos" el precio como hablamos
    }));

    // 3. Insertar todos los detalles a la vez
    const { error: errorDetalles } = await _supabase
        .from('detalles_pedido')
        .insert(detalles);

    if (errorDetalles) {
        console.error("Error al insertar detalles:", errorDetalles);
    } else {
        alert(`¡Pedido #${pedidoId} realizado con éxito!`);
        carrito = []; // Vaciar carrito
        renderizarCarrito();
        toggleModal(); // Cerrar ventana
    }
}
