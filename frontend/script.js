document.addEventListener('DOMContentLoaded', function() {
    fetchPlayers();
    document.getElementById('playerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addPlayer();
    });
});

async function fetchPlayers() {
    const response = await fetch('http://localhost:3000/players'); // Ajusta esta ruta a tu API
    const players = await response.json();
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    console.log(players)
    players.forEach(player => {
        const playerCard = `<div class="playerCard">
                                <h3>${player.nombre}</h3>
                                <p>Edad: ${player.edad}</p>
                                <p>Nacionalidad: ${player.nacionalidad}</p>
                                <p>Posición: ${player.posicion}</p>
                                <p>Liga: ${player.liga.nombre}</p> <!-- Asegúrate de que 'liga' se devuelva como objeto -->
                                <p>Retirado: ${player.retirado ? 'Sí' : 'No'}</p>
                            </div>`;
        playersList.innerHTML += playerCard;
    });
}

async function addPlayer() {
    const playerData = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        nacionalidad: document.getElementById('nacionalidad').value,
        posicion: document.getElementById('posicion').value,
        liga: document.getElementById('liga').value,
        retirado: document.getElementById('retirado').checked,
    };

    await fetch('http://localhost:3000/players/create', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    });

    fetchPlayers();
}