const ubi = document.getElementById('ubi');
const siguiente = document.getElementById('siguiente');
const atras = document.getElementById('atras')

let currentPage = 1;
let totalPages = 0;

function actualizarContador() {
contador.innerText = `Página ${currentPage} de ${totalPages}`;
}

    function mostrarInformacion2(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                ubi.innerHTML = "";
                data.results.forEach(location => {
                    ubi.innerHTML += `
                        <div class="card">
                            <h2>${location.name}</h2>
                            <p>Tipo: ${location.type}</p>
                            <p>Dimensión: ${location.dimension}</p>
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
                console.error('Error fetching data:', error)
            });
}

mostrarInformacion2('https://rickandmortyapi.com/api/location?page=1');
