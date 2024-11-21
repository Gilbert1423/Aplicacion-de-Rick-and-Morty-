const contenido = document.getElementById('contenido');
const siguiente = document.getElementById('siguiente');
const atras = document.getElementById('atras')

let currentPage = 1;
let totalPages = 0;

function actualizarContador() {
contador.innerText = `Página ${currentPage} de ${totalPages}`;
}

function mostrarInformacion(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
        contenido.innerHTML = "";
        totalPages = data.info.pages;
        data.results.forEach(personaje => {
            contenido.innerHTML += `
                <div class="card">
                <img src="${personaje.image}">
                <h2>${personaje.name}</h2>
                <p>Status: ${personaje.status}</p>
                <p>Gender: ${personaje.gender}</p> 
                <p>Species: ${personaje.species}</p>
                </div>                    `;
});
actualizarContador();
 atras.disabled = !data.info.prev;
 siguiente.disabled = !data.info.next;

    if (data.info.next) {
        siguiente.onclick = () => {
        currentPage++;
        mostrarInformacion(data.info.next);
        };
    } else {
        siguiente.onclick = null;
}

if (data.info.prev) {
      atras.onclick = () => {
      currentPage--;
 mostrarInformacion(data.info.prev);};
} else { 
   atras.onclick = null;
}
})
 .catch(error => {
   console.error('Error fetching data:', error);
   });
}

mostrarInformacion('https://rickandmortyapi.com/api/character');


