document.addEventListener("DOMContentLoaded", function() {
    var gauge = new JustGage({
        id: "gauge",
        value: 0,
        min: -10,
        max: 50,
        title: "°C",
        label: "Temperatura"
    });

    var gHumidity = new JustGage({
        id: "gauge-humidity",
        value: 60,  // Valor inicial
        min: 0,
        max: 100,
        title: "Humedad",
        label: "%"
    });

    var socket = new WebSocket("ws://" + window.location.host + "/ws");
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        document.getElementById("distance").innerText = data.distance + " cm";
        gauge.refresh(data.temperature);
        actualizarEstado(data.distance);
    };
});

function actualizarEstado(distancia) {
    var statusDiv = document.getElementById("status");
    if (distancia > 30) {
        statusDiv.innerText = "NORMAL";
        statusDiv.className = "status normal";
    } else if (distancia <= 30 && distancia > 20) {
        statusDiv.innerText = "CAUTION";
        statusDiv.className = "status caution";
    } else if (distancia <= 20 && distancia > 10) {
        statusDiv.innerText = "WARNING";
        statusDiv.className = "status warning";
    } else {
        statusDiv.innerText = "CRITICAL";
        statusDiv.className = "status critical";
    }
}

function apagarDispositivos() {
    fetch('/apagar', { method: 'POST' })
        .then(response => response.text())
        .then(data => alert(data));
}
