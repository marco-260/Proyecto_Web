document.addEventListener("DOMContentLoaded", function () {

    const menu = {
        "Ceviches": ["Ceviche Mixto Rock", "Ceviche Clásico", "Ceviche de Pescado", "Ceviche de Camarón"],
        "Jaleas": ["Jalea Individual", "Jalea Familiar", "Jalea Mixta"],
        "Postres": ["Suspiro Limeño", "Picarones", "Helado Artesanal"],
        "Bebidas": ["Inca Kola", "Cerveza Artesanal", "Agua Mineral", "Limonada"]
    };

    const categoriaSelect = document.getElementById("categoria");
    const platoSelect = document.getElementById("plato");
    const btnAgregar = document.getElementById("btn-agregar");
    const listaPedidoDiv = document.getElementById("lista-pedido");
    const pedidoFinalInput = document.getElementById("pedido-final");
    const confirmacion = document.getElementById("confirmacion");
    const pagoSection = document.getElementById("pago");
    const resumenPedidoUl = document.getElementById("resumen-pedido-ul");
    const formPago = document.getElementById("form-pago");
    const metodoSelect = document.getElementById("metodo");
    const detallesTarjeta = document.getElementById("detalles-tarjeta");
    const confirmacionPago = document.getElementById("confirmacion-pago");

    let pedidoItems = [];

    // Cargar categorías
    for (const cat in menu) {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoriaSelect.appendChild(option);
    }

    // Al cambiar categoría, cargar platos
    categoriaSelect.addEventListener("change", function () {
        const categoria = categoriaSelect.value;
        platoSelect.innerHTML = "";
        btnAgregar.disabled = true;

        if (!categoria) {
            platoSelect.disabled = true;
            const option = document.createElement("option");
            option.textContent = "-- Primero selecciona categoría --";
            platoSelect.appendChild(option);
            return;
        }

        platoSelect.disabled = false;

        const optionDefault = document.createElement("option");
        optionDefault.value = "";
        optionDefault.textContent = "-- Elige un plato --";
        platoSelect.appendChild(optionDefault);

        menu[categoria].forEach(plato => {
            const option = document.createElement("option");
            option.value = plato;
            option.textContent = plato;
            platoSelect.appendChild(option);
        });
    });

    // Activar botón agregar solo si hay plato seleccionado
    platoSelect.addEventListener("change", function () {
        btnAgregar.disabled = platoSelect.value === "";
    });

    // Función para actualizar lista
    function actualizarLista() {
        if (pedidoItems.length === 0) {
            listaPedidoDiv.innerHTML = "<p>Tu pedido está vacío.</p>";
            return;
        }

        const ul = document.createElement("ul");
        pedidoItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });

        listaPedidoDiv.innerHTML = "";
        listaPedidoDiv.appendChild(ul);
    }

    // Agregar plato al pedido
    btnAgregar.addEventListener("click", function () {
        const platoSeleccionado = platoSelect.value;
        if (!platoSeleccionado) return;

        pedidoItems.push(platoSeleccionado);
        pedidoFinalInput.value = pedidoItems.join(" + ");
        actualizarLista();

        // Reset del select de plato
        platoSelect.value = "";
        btnAgregar.disabled = true;
    });

    // Inicializar
    actualizarLista();
    platoSelect.disabled = true;

    // Envío del formulario de pedido
    const formPedido = document.getElementById("form-pedido");
    formPedido.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const pedidoFinal = pedidoFinalInput.value.trim();

        if (!nombre || !telefono || !email || !direccion || !pedidoFinal) {
            alert("❌ Completa todos los campos y agrega al menos un plato.");
            return;
        }

        // Mostrar confirmación y sección de pago
        confirmacion.style.display = "block";
        pagoSection.style.display = "block";

        // Llenar resumen de pedido
        resumenPedidoUl.innerHTML = "";
        pedidoItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            resumenPedidoUl.appendChild(li);
        });

        // Scroll suave hacia la sección de pago
        pagoSection.scrollIntoView({ behavior: "smooth" });

        console.log("✅ Pedido enviado", { nombre, telefono, email, direccion, pedidoFinal });

        // Limpiar formulario pedido
        formPedido.reset();
        pedidoItems = [];
        actualizarLista();
        pedidoFinalInput.value = "";
        platoSelect.disabled = true;
    });

    // Mostrar detalles de tarjeta si método es tarjeta
    metodoSelect.addEventListener("change", function () {
        detallesTarjeta.style.display = metodoSelect.value === "tarjeta" ? "block" : "none";
    });

    // Envío del formulario de pago
    formPago.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombrePago = document.getElementById("nombrePago").value.trim();
        const emailPago = document.getElementById("emailPago").value.trim();
        const metodo = metodoSelect.value;

        if (!nombrePago || !emailPago || !metodo) {
            alert("❌ Completa todos los campos de pago.");
            return;
        }

        if (metodo === "tarjeta") {
            const numero = document.getElementById("numero").value.trim();
            const cvc = document.getElementById("cvc").value.trim();
            const fecha = document.getElementById("fecha").value.trim();
            if (!numero || !cvc || !fecha) {
                alert("❌ Completa todos los datos de la tarjeta.");
                return;
            }
        }

        confirmacionPago.style.display = "block";
        confirmacionPago.scrollIntoView({ behavior: "smooth" });

        console.log("✅ Pago realizado", { nombrePago, emailPago, metodo });
        formPago.reset();
        detallesTarjeta.style.display = "none";
    });

});
