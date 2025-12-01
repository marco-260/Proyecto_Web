// =======================================================
// JS - PAGO ONLINE
// Archivo: pago.js
// =======================================================

document.addEventListener("DOMContentLoaded", function () {

    const formPago = document.getElementById("form-pago");
    const confirmacionPago = document.getElementById("confirmacion-pago");
    const listaPedido = document.getElementById("lista-pedido");
    const metodoPago = document.getElementById("metodo");
    const detallesTarjeta = document.getElementById("detalles-tarjeta");

    // Recuperar pedido desde localStorage
    const pedidoItems = JSON.parse(localStorage.getItem("pedido")) || [];

    // Mostrar resumen del pedido
    if (pedidoItems.length > 0) {
        pedidoItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            listaPedido.appendChild(li);
        });
    } else {
        listaPedido.innerHTML = "<li>No hay pedidos registrados.</li>";
    }

    // Mostrar campos de tarjeta si selecciona tarjeta
    metodoPago.addEventListener("change", function () {
        if (this.value === "tarjeta") {
            detallesTarjeta.style.display = "block";
        } else {
            detallesTarjeta.style.display = "none";
        }
    });

    // Validar y procesar pago
    formPago.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const metodo = metodoPago.value;

        if (nombre === "" || email === "" || metodo === "") {
            alert("❌ Por favor completa todos los campos.");
            return;
        }

        // Validación tarjeta si corresponde
        if (metodo === "tarjeta") {
            const numero = document.getElementById("numero").value.trim();
            const cvc = document.getElementById("cvc").value.trim();
            const fecha = document.getElementById("fecha").value.trim();

            if (numero === "" || cvc === "" || fecha === "") {
                alert("❌ Completa los datos de tu tarjeta.");
                return;
            }
        }

        // Mostrar confirmación
        confirmacionPago.style.display = "block";

        // Limpiar formulario
        formPago.reset();

        // Scroll hacia confirmación
        confirmacionPago.scrollIntoView({ behavior: "smooth" });

        // Limpiar pedido en localStorage
        localStorage.removeItem("pedido");

        console.log("✅ Pago procesado correctamente");
    });
});
