interface Job {
    id: string;
    titol: string;
    tipusContracte: string;
    publicat: string;
    imatgeUrl: string;
    esPopular: boolean;
    esJunior: boolean;
    diesEnrere: number;
}

function carregarFeinesPortal(): Job[] {
    const dadesLocal = localStorage.getItem('feines');
    let feinaDeLaBaseDades: Job[] = dadesLocal ? JSON.parse(dadesLocal) : [];

    if (feinaDeLaBaseDades.length === 0) {
        feinaDeLaBaseDades = [
            { id: "1", titol: "Software Engineer", tipusContracte: "Full-time position", publicat: "Publicat fa 4 dies", imatgeUrl: "../src/assets/img/workplace1.png", esPopular: true, esJunior: false, diesEnrere: 3 },
            { id: "2", titol: "Product Manager", tipusContracte: "Remote opportunity", publicat: "Publicat fa 1 setmana", imatgeUrl: "../src/assets/img/building.png", esPopular: true, esJunior: false, diesEnrere: 7 },
            { id: "3", titol: "Data Analyst", tipusContracte: "Contract-based role", publicat: "Publicat fa 2 dies", imatgeUrl: "../src/assets/img/meeting.png", esPopular: false, esJunior: true, diesEnrere: 2 },
            { id: "4", titol: "UX Designer", tipusContracte: "Flexible hours", publicat: "Publicat fa 5 dies", imatgeUrl: "../src/assets/img/designer.png", esPopular: false, esJunior: true, diesEnrere: 5 },
            { id: "5", titol: "Marketing Lead", tipusContracte: "Full-time role", publicat: "Publicat fa 1 dia", imatgeUrl: "../src/assets/img/team.png", esPopular: true, esJunior: false, diesEnrere: 1 },
            { id: "6", titol: "HR Specialist", tipusContracte: "Part-time role", publicat: "Publicat fa 4 dies", imatgeUrl: "../src/assets/img/office.png", esPopular: false, esJunior: true, diesEnrere: 4 }
        ];
        localStorage.setItem('feines', JSON.stringify(feinaDeLaBaseDades));
    }
    return feinaDeLaBaseDades;
}

function renderitzarFeines(llistaFeines: Job[]): void {
    const grid = document.getElementById('job-grid');
    if (!grid) return;
    
    grid.innerHTML = ""; 

    if (llistaFeines.length === 0) {
        grid.innerHTML = `<p class="no-results">No s'ha trobat cap oferta de feina.</p>`;
        return;
    }

    llistaFeines.forEach(feina => {
        grid.innerHTML += `
            <article class="job-card">
                <div class="job-card-content">
                    <div class="job-info">
                        <h2 class="job-title">${feina.titol}</h2>
                        <p class="job-contract">${feina.tipusContracte}</p>
                        <p class="job-date">${feina.publicat}</p>
                        <button type="button" class="job-action-btn">Veure detalls</button>
                    </div>
                    <div class="job-image-container">
                        <img src="${feina.imatgeUrl}" alt="Il·lustració de ${feina.titol}" class="job-card-img" />
                    </div>
                </div>
            </article>
        `;
    });
}

// INTERACCIÓ
const feinesDisponibles = carregarFeinesPortal();

document.addEventListener('DOMContentLoaded', () => {
    renderitzarFeines(feinesDisponibles);

    // --- CERCADOR ---
    const cercador = document.getElementById('search-job') as HTMLInputElement;
    if (cercador) {
        cercador.addEventListener('input', () => {
            const textCercat = cercador.value.toLowerCase().trim();
            
            const feinesFiltrades = feinesDisponibles.filter(feina => {
                return feina.titol.toLowerCase().includes(textCercat) || 
                       feina.tipusContracte.toLowerCase().includes(textCercat);
            });
            
            renderitzarFeines(feinesFiltrades);
        });
    }

    //  FILTRES 
    const enllacosFiltres = document.querySelectorAll('.filter-link') as NodeListOf<HTMLAnchorElement>;
    
    enllacosFiltres.forEach(enllaco => {
        enllaco.addEventListener('click', (event) => {
            event.preventDefault();

            enllacosFiltres.forEach(link => link.classList.remove('active'));
            enllaco.classList.add('active');

            const textFiltre = enllaco.textContent?.trim();
            let resultatFiltre = [...feinesDisponibles];

            if (textFiltre === "Activitat recent") {
                resultatFiltre.sort((a, b) => a.diesEnrere - b.diesEnrere);
            } else if (textFiltre === "Popular") {
                resultatFiltre = resultatFiltre.filter(feina => feina.esPopular);
            } else if (textFiltre === "Junior") {
                resultatFiltre = resultatFiltre.filter(feina => feina.esJunior);
            }

            renderitzarFeines(resultatFiltre);
        });
    });
});