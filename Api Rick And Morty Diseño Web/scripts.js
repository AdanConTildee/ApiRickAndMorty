// Obtención de referencias a elementos del DOM
const charactersEl = document.getElementById('characters'); // Elemento donde se mostrarán los personajes
const nameFilterEl = document.getElementById('name-filter'); // Input para filtrar por nombre
const statusFilterEl = document.getElementById('status-filter'); // Select para filtrar por estado

// Función para obtener información de un personaje específico por su ID
async function getCharacter(characterId) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    const data = await response.json();
    return data;
}

// Función para buscar personajes por nombre
async function searchCharacters(name) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const data = await response.json();
    return data.results;
}

// Función para obtener los personajes de la API
async function getCharacters(name, status) {
    let url = 'https://rickandmortyapi.com/api/character/';

    // Construir la URL con los parámetros de filtrado (si existen)
    if (name || status) {
        url += '?';
        if (name) {
            url += `name=${name}&`;
        }
        if (status) {
            url += `status=${status}`;
        }
    }

    // Realizar la solicitud HTTP GET y convertir la respuesta a JSON
    const response = await fetch(url);
    const data = await response.json();

    return data.results; // Devolver los resultados de los personajes
}

// Función para mostrar los personajes en el DOM
async function displayCharacters(name, status) {
    const characters = await getCharacters(name, status); // Obtener los personajes con los filtros aplicados

    charactersEl.innerHTML = ''; // Limpiar cualquier contenido previo

    // Iterar sobre los personajes obtenidos
    for (let character of characters) {
        const card = document.createElement('div'); // Crear un elemento div para cada personaje
        card.classList.add('character-card'); // Agregar una clase CSS para estilizar el elemento

        // Obtener los episodios en los que aparece el personaje y formatearlos
        const episodes = character.episode.map(ep => ep.split('/').pop()).join(', ');

        // Crear el HTML para mostrar la información del personaje
        card.innerHTML = `
            <img src="${character.image}" /> <!-- Mostrar la imagen del personaje -->
            <h2> ${character.name} </h2> <!-- Mostrar el nombre del personaje -->
            <p> Status: ${character.status} </p> <!-- Mostrar el estado del personaje -->
            <p> Especie: ${character.species} </p> <!-- Mostrar la especie del personaje -->
            <p> Episodios: ${episodes} </p> <!-- Mostrar los episodios en los que aparece el personaje -->
        `;

        charactersEl.appendChild(card); // Agregar el elemento del personaje al contenedor en el DOM
    }
}

// Mostrar todos los personajes al cargar la página
displayCharacters();

// Event Listener para el input de filtro de nombre
nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value); // Mostrar los personajes con el filtro de nombre aplicado
});

// Event Listener para el cambio en el filtro de estado
statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value); // Mostrar los personajes con el filtro de estado aplicado
});
