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
    if (!grid) return;
    grid.innerHTML = ""; 

    alumnes.forEach(alumne => {
        grid.innerHTML += `
            <article class="alumni-card">
                <h3>${alumne.nom} ${alumne.cognom}</h3>
                <p class="role">${alumne.carrec}</p>
                <p class="location">${alumne.localitzacio}</p>
                <button type="button" class="btn-connect">Message</button>
            </article>
        `;
    });
}

function carregarAlumnesDeLaXarxa(): void {
    const dadesLocal = localStorage.getItem('alumnes');
    let alumnesDeLaBaseDades: Alumne[] = dadesLocal ? JSON.parse(dadesLocal) : [];

    if (alumnesDeLaBaseDades.length === 0) {
        alumnesDeLaBaseDades = [
            { id: "1", nom: "Jane", cognom: "Smith", carrec: "Co-Founder at ABC Inc", localitzacio: "New York, NY", email: "jane@italumni.cat", contrasenya: "12345" },
            { id: "2", nom: "John", cognom: "Doe", carrec: "Product Manager at XYZ Corp", localitzacio: "San Francisco, CA", email: "john@italumni.cat", contrasenya: "00000" }
        ]
        localStorage.setItem('alumnes', JSON.stringify(alumnesDeLaBaseDades));
    }

    renderitzarAlumnes(alumnesDeLaBaseDades); 

}

carregarAlumnesDeLaXarxa();