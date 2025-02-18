
let jugadorActual = 'X'; 
let juegoActivo = true; 
let modoJuego = 'multijugador'; 
const celdas = document.querySelectorAll('.celda'); 
const indicadorTurno = document.getElementById('indicador-turno'); 


const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];


document.getElementById('multijugador-btn').addEventListener('click', () => {
    modoJuego = 'multijugador';
    reiniciarJuego();
});

document.getElementById('computadora-btn').addEventListener('click', () => {
    modoJuego = 'computadora';
    reiniciarJuego();
});


function jugar(celda) {
    if (!juegoActivo || celda.textContent !== "") return; 

    celda.textContent = jugadorActual; 
    if (verificarGanador()) {
        alert(`¡Jugador ${jugadorActual} ha ganado!`);
        juegoActivo = false;
        return;
    }
    if (verificarEmpate()) {
        alert("¡Empate!");
        juegoActivo = false;
        return;
    }

    
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    indicadorTurno.textContent = `Turno: Jugador ${jugadorActual}`;

    
    if (modoJuego === 'computadora' && jugadorActual === 'O') {
        movimientoComputadora();
    }
}


function movimientoComputadora() {
    const celdasVacias = [...celdas].filter(celda => celda.textContent === ""); 
    const celdaAleatoria = celdasVacias[Math.floor(Math.random() * celdasVacias.length)]; 
    setTimeout(() => jugar(celdaAleatoria), 500); 
}


function verificarGanador() {
    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(indice => {
            return celdas[indice].textContent === jugadorActual;
        });
    });
}


function verificarEmpate() {
    return [...celdas].every(celda => celda.textContent !== "");
}


function reiniciarJuego() {
    celdas.forEach(celda => celda.textContent = ""); 
    jugadorActual = 'X'; 
    juegoActivo = true; 
    indicadorTurno.textContent = `Turno: Jugador ${jugadorActual}`; 
}


celdas.forEach((celda, indice) => {
    celda.addEventListener('click', () => jugar(celda));
});