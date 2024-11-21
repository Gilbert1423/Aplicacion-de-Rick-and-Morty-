const capitulos = document.getElementById('capitulos');
const siguiente = document.getElementById('siguiente');
const atras = document.getElementById('atras')

let currentPage = 1;
let totalPages = 0;

function actualizarContador() {
contador.innerText = `Página ${currentPage} de ${totalPages}`;
}

document.addEventListener('DOMContentLoaded', function() {
    let nextPage = null;
    let prevPage = null;

    function mostrarInformacion1(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                capitulos.innerHTML = "";
                data.results.forEach(episodio => {
                    capitulos.innerHTML += `
                        <div class="card">
                            <h2>${episodio.name}</h2>
                            <p>${episodio.episode}</p>
                            <p>${episodio.air_date}</p>
                        </div>
                    `;
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
    mostrarInformacion1('https://rickandmortyapi.com/api/episode');
});