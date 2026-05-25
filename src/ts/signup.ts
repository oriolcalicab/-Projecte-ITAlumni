console.log("📍 La ruta on estic ara és:", window.location.pathname);

interface Alumne{
    id: string;
    nom: string;
    cognom: string;
    email: string;
    contrasenya: string;
    carrec: string;
    localitzacio: string;
}

const llistaAlumnes: Alumne[] = JSON.parse(localStorage.getItem('alumnes') || '[]') as Alumne[];
const formulariRegistre = document.querySelector('.register-form') as HTMLFormElement;

if(formulariRegistre){
    formulariRegistre.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        const inputNom = formulariRegistre.querySelector('#nom') as HTMLInputElement;
        const inputCognom = formulariRegistre.querySelector('#cognom') as HTMLInputElement;
        const inputEmail = formulariRegistre.querySelector('#email') as HTMLInputElement;
        const inputPassword = formulariRegistre.querySelector('#contrasenya') as HTMLInputElement;

        if(inputNom && inputCognom && inputEmail && inputPassword){
            const nouAlumne: Alumne = {
                id: Date.now().toString(),
                nom: inputNom.value,
                cognom: inputCognom.value,
                email: inputEmail.value,
                contrasenya: inputPassword.value,
                carrec: "Estudiant ItAlumni",
                localitzacio: "Barcelona, CAT"
            }

            console.log(nouAlumne);

            llistaAlumnes.push(nouAlumne);

            localStorage.setItem('alumnes', JSON.stringify(llistaAlumnes));
            alert('Registre complet amb exit!');
            formulariRegistre.reset();
            window.location.href = '/page/networking.html'
        }
    })
}