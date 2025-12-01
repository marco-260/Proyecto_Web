// ===========================================================
// CONSTANTES DEL RESTAURANTE (NO CAMBIAN)
// ===========================================================
const nombreRestaurant = "Mar & Luna ROCK & FISH";
const direccion = "Jr. Villavicencio 104, frente a la hermosa bahía";
const horarioApertura = "10:00 am";
const horarioCierre = "11:00 pm";
const capacidadTotalMesas = 15;
const igv = 0.18;

// Precios del menú
const costoCeviche = 28.50;
const costoChicharron = 39.90;
const costoParihuela = 42.00;
const costoRefrescos = 5.00;


// ===========================================================
// VARIABLES CAMBIANTES (ESTADO DEL RESTAURANTE)
// ===========================================================
let mesasDisponibles = capacidadTotalMesas;
let reservasHoy = 0;
let mesasOcupadas = 0;

let clientesEnLocal = 0;
let clientesAtendidos = 0;

let pedidosDelDia = 0;
let pedidosPendientes = 0;
let pedidosCompletados = 0;

let costoTotalPedido = 0;
let ingresosDelDia = 0;

// Inventario básico
let stockPescado = 25;  // kg
let stockLimon = 120;   // unidades
let stockGaseosas = 80; // botellas


// ===========================================================
// FUNCIONES CON EVENTOS HTML
// ===========================================================

// -------- EVENTO onsubmit --------
function enviarReseña(event) {
    event.preventDefault();

    reservasHoy++;
    console.log("✅ Reseña enviada correctamente.");
    console.log("Total reservas hoy:", reservasHoy);

    alert("¡Gracias por tu reseña!");
}


// -------- EVENTO onchange --------
function cambioEstrellas() {
    console.log("⭐ Usuario cambió calificación.");
}


// -------- EVENTO onclick (botón) --------
function botonClickeado() {
    if (mesasDisponibles > 0) {
        mesasDisponibles--;
        console.log("✅ Botón clickeado.");
        console.log("Mesas disponibles:", mesasDisponibles);
        mostrarMesasDisponibles();
    } else {
        console.log("❌ No quedan mesas disponibles.");
        alert("Ya no hay mesas disponibles.");
    }
}


// ===========================================================
// FUNCIONES DE PEDIDOS
// ===========================================================
function pedirCeviche() {
    pedidosDelDia++;
    costoTotalPedido += costoCeviche;
}

function pedirChicharron() {
    pedidosDelDia++;
    costoTotalPedido += costoChicharron;
}

function pedirParihuela() {
    pedidosDelDia++;
    costoTotalPedido += costoParihuela;
}

function pedirRefresco() {
    pedidosDelDia++;
    costoTotalPedido += costoRefrescos;
}


// ===========================================================
// PRUEBAS INICIALES (CONSOLA)
// ===========================================================
console.log("✅ Restaurante cargado:", nombreRestaurant);
console.log("✅ Capacidad total:", capacidadTotalMesas);
console.log("✅ Dirección:", direccion);


// ===========================================================
// VALIDACIÓN DE RESERVAS
// ===========================================================
function reservarMesa(nombreCliente, cantidadPersonas) {

    console.log("Intentando reservar mesa para:", nombreCliente);

    if (cantidadPersonas <= 0) {
        console.log("❌ Error: Cantidad inválida.");
        return;
    }

    if (mesasDisponibles > 0) {
        mesasDisponibles--;
        reservasHoy++;
        clientesEnLocal += cantidadPersonas;

        console.log("✅ Reserva confirmada para " + nombreCliente);
        console.log("Mesas disponibles:", mesasDisponibles);

        mostrarMesasDisponibles();
    } else {
        console.log("❌ No hay mesas disponibles.");
    }
}


// ===========================================================
// ARREGLO DEL MENÚ
// ===========================================================
const menuPrincipal = [
    { nombre: "Ceviche Clásico", precio: 28.50 },
    { nombre: "Chicharrón de Pescado", precio: 39.90 },
    { nombre: "Parihuela", precio: 42.00 },
    { nombre: "Refresco de Maracuyá", precio: 5.00 }
];

console.log("✅ Menú cargado:", menuPrincipal);


// ===========================================================
// FUNCIONES DE CÁLCULO
// ===========================================================
function calcularCuenta(subtotal) {
    let total = subtotal + (subtotal * igv);
    console.log("Subtotal:", subtotal);
    console.log("Total con IGV:", total);
    return total;
}


// ===========================================================
// VALIDACIÓN DE PEDIDO
// ===========================================================
function validarPedido(platillo, cantidad) {
    if (platillo.trim() !== "" && cantidad > 0) {
        console.log("✅ Pedido válido:", platillo, cantidad);
    } else {
        console.log("❌ Pedido inválido.");
    }
}


// ===========================================================
// GENERAR PEDIDO
// ===========================================================
function generarPedido(nombrePlato, cantidad) {

    if (cantidad <= 0) {
        console.log("❌ Cantidad inválida.");
        return;
    }

    let encontrado = menuPrincipal.find(item => item.nombre === nombrePlato);

    if (!encontrado) {
        console.log("❌ Plato no encontrado.");
        return;
    }

    let subtotal = encontrado.precio * cantidad;
    let total = calcularCuenta(subtotal);

    pedidosDelDia++;

    console.log("✅ Pedido generado:");
    console.log("Plato:", nombrePlato);
    console.log("Cantidad:", cantidad);
    console.log("Total:", total);

    agregarPedidoAlDOM(nombrePlato, cantidad, total);
}


// ===========================================================
// MANEJO DEL DOM
// ===========================================================
const tituloPrincipal = document.getElementById("titulo-restaurant");
const contenedorReservas = document.getElementById("contenedor-reservas");
const listaPedidos = document.getElementById("lista-pedidos");

function actualizarTitulo() {
    if (tituloPrincipal) {
        tituloPrincipal.textContent = "Bienvenido a Mar & Luna ROCK & FISH 🌊🐟";
    }
}

function mostrarMesasDisponibles() {
    if (contenedorReservas) {
        contenedorReservas.innerHTML = `
            <p><strong>Mesas disponibles:</strong> ${mesasDisponibles}</p>
        `;
    }
}

function resaltarTitulo() {
    if (tituloPrincipal) {
        tituloPrincipal.style.color = "black";
        tituloPrincipal.style.fontSize = "28px";
        tituloPrincipal.classList.add("titulo-resaltado");
    }
}

function agregarPedidoAlDOM(plato, cantidad, total) {
    if (listaPedidos) {
        const item = document.createElement("li");
        item.textContent = `${plato} x${cantidad} — S/ ${total.toFixed(2)}`;
        listaPedidos.appendChild(item);
    }
}

function limpiarPedidos() {
    if (listaPedidos) {
        listaPedidos.innerHTML = "";
    }
}


// ===========================================================
// EJECUCIÓN SEGURA (cuando el HTML ya cargó)
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {

    actualizarTitulo();
    mostrarMesasDisponibles();
    resaltarTitulo();

    // Pruebas seguras
    reservarMesa("Heidy", 3);
    generarPedido("Ceviche Clásico", 2);

});
