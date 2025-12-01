const form = document.getElementById("formReclamo");
const mensaje = document.getElementById("mensajeConfirmacion");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    mensaje.style.display = "block";

    form.reset();
});
