console.log("📍 La ruta on estic ara és:", window.location.pathname);

interface Alumne {
    id: string;
    nom: string;
    cognom: string;
    email: string;
    contrasenya: string;
    carrec: string;
    localitzacio: string;
}
function renderitzarAlumnes(alumnes: Alumne[]): void {
    const grid = document.getElementById('alumni-grid');
    if (!(grid instanceof HTMLElement)) return;
    grid.innerHTML = "";

    if (alumnes.length === 0) {
        grid.innerHTML = `<p class="no-alumni">Encara no hi ha cap alumne registrat.</p>`;
        return;
    }

    alumnes.forEach(alumne => {

        const inicials = `${alumne.nom.charAt(0)}${alumne.cognom.charAt(0)}`;
        grid.innerHTML += `
       <div class="alumni-card">
                <h3 class="alumni-name">${alumne.nom} ${alumne.cognom}</h3>
                <p class="alumni-role">${alumne.carrec}</p>
                <div class="alumni-location">
                     <span>${alumne.localitzacio}</span>
                </div>
                <button type="button" class="alumni-btn">Connectar</button>
            </div>
        `;
    });
}

function carregarAlumnesDeLaXarxa(): Alumne[] {
    const dadesLocal = localStorage.getItem('alumnes');
    let alumnesDeLaBaseDades: Alumne[] = dadesLocal ? JSON.parse(dadesLocal) : [];

    if (alumnesDeLaBaseDades.length === 0) {
        alumnesDeLaBaseDades = [
            { id: "1", nom: "Jane", cognom: "Smith", carrec: "Co-Founder at ABC Inc", localitzacio: "New York, NY", email: "jane@italumni.cat", contrasenya: "12345" },
            { id: "2", nom: "John", cognom: "Doe", carrec: "Product Manager at XYZ Corp", localitzacio: "San Francisco, CA", email: "john@italumni.cat", contrasenya: "00000" }
        ];
        localStorage.setItem('alumnes', JSON.stringify(alumnesDeLaBaseDades));
    }

    renderitzarAlumnes(alumnesDeLaBaseDades);
    return alumnesDeLaBaseDades;
}

const alumnesDisponibles = carregarAlumnesDeLaXarxa();

// CONTROLADOR DE CERCA I FILTRESA

const inputSearch = document.querySelector('#search-alumni') as HTMLInputElement;
const filterLink = document.querySelectorAll<HTMLAnchorElement>('.filter-link');

if (inputSearch) {
    inputSearch.addEventListener('input', () => {
    const text = inputSearch.value.toLocaleLowerCase().trim();

    const filtrats = alumnesDisponibles.filter(alumne => {
        const nomComplet = `${alumne.nom} ${alumne.cognom}`.toLocaleLowerCase();
        const carrec = alumne.carrec.toLocaleLowerCase();
        const locolitzacio = alumne.localitzacio.toLocaleLowerCase();

        return nomComplet.includes(text) || carrec.includes(text) || locolitzacio.includes(text);

    })

    renderitzarAlumnes(filtrats)
    })
}

filterLink.forEach(nexus => {
    nexus.addEventListener('click', (event) => {
        event.preventDefault();

        filterLink.forEach(link => link.classList.remove('active'));
        nexus.classList.add('active');
        const tipusFiltre = nexus.textContent?.trim();
        let llistaOrdenada = [...alumnesDisponibles];

        if(tipusFiltre === "Activitat recent"){
           llistaOrdenada.sort((a, b) => b.id.localeCompare(a.id)); 
        } else if(tipusFiltre === "Popular"){
            llistaOrdenada.sort((a, b) => b.id.localeCompare(b.nom));
        }else if (tipusFiltre === "Els mes connectats"){
            llistaOrdenada.sort((a, b) => a.cognom.localeCompare(b.cognom));
        }

        renderitzarAlumnes(llistaOrdenada);

    })
})