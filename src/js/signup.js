"use strict";
console.log("📍 La ruta on estic ara és:", window.location.pathname);
const llistaAlumnes = JSON.parse(localStorage.getItem('alumnes') || '[]');
const formulariRegistre = document.querySelector('.register-form');
if (formulariRegistre) {
    formulariRegistre.addEventListener('submit', (event) => {
        event.preventDefault();
        const inputNom = formulariRegistre.querySelector('#nom');
        const inputCognom = formulariRegistre.querySelector('#cognom');
        const inputEmail = formulariRegistre.querySelector('#email');
        const inputPassword = formulariRegistre.querySelector('#contrasenya');
        if (inputNom && inputCognom && inputEmail && inputPassword) {
            const nouAlumne = {
                id: Date.now().toString(),
                nom: inputNom.value,
                cognom: inputCognom.value,
                email: inputEmail.value,
                contrasenya: inputPassword.value,
                carrec: "Estudiant ItAlumni",
                localitzacio: "Barcelona, CAT"
            };
            console.log(nouAlumne);
            llistaAlumnes.push(nouAlumne);
            localStorage.setItem('alumnes', JSON.stringify(llistaAlumnes));
            alert('Registre complet amb exit!');
            formulariRegistre.reset();
            window.location.href = '/page/networking.html';
        }
    });
}
//# sourceMappingURL=signup.js.map