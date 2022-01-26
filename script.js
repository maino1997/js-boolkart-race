const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const carsList = [
    {
        name: "Sasha",
        id: "1",
        time: 0,
        currentPosition: 0,
        background: "red",
        speed: 0
    },
    {
        name: "Marco",
        id: "2",
        time: 0,
        currentPosition: 0,
        background: "pink",
        speed: 0
    },
    {
        name: "Adriano",
        id: "3",
        time: 0,
        currentPosition: 0,
        background: "blue",
        speed: 0
    },
    {
        name: "Luigi",
        id: "4",
        time: 0,
        currentPosition: 0,
        background: "green",
        speed: 0
    },
];

const setUp = () => {
    // const wholeSection = document.getElementById("section");
    // wholeSection.innerHTML = "";


    carsList.forEach((car) => {
        // Per ogni macchina setto una velocità di incremento casuale ma fissa nel codice 
        car.speed = getRandomNumber(10, 20);
        // Setto la posizione iniziale a 0 per tutte le macchine
        car.currentPosition = 0;
        // Produco una macchina per ogni oggetto che ho nella lista iniziale, quindi 4 
        getCar(car);
    });
}

const getCar = (car) => {
    const gameSection = document.querySelector('.game-col');

    const road = document.createElement('div');
    road.classList.add('road');
    road.style.background = car.background;



    const carImg = document.createElement('img');
    carImg.setAttribute("src", `./img/car-${car.id}.png`);
    carImg.id = car.id;
    road.append(carImg);

    const nameText = document.createElement('p');
    nameText.append(car.name);
    nameText.classList.add("nome");
    road.appendChild(nameText);


    gameSection.appendChild(road);
}

// Avvio la funzione iniziale dove creo una macchina per ogni oggetto presente nella lista iniziale 
setUp();

// ----------- A QUESTO PUNTO SONO PRONTO PER FAR ESEGUIRE IL GIOCO VISTO CHE HO COSTRUITO GLI ELEMENTI INZIALI ---------



const gameOver = () => {

    // Creo un flag e lo setto a true se la posizione della macchina è = oppure > a 600px,
    // se no diventa false e il gioco continua.
    // Infine ritorno il valore della flag stessa per poterlo usare nella condizione dove viene chiamata.
    let isGameOver = true;
    for (let i = 0; i < carsList.length; i++) {
        if (carsList[i].currentPosition < 600) {
            isGameOver = false;
        }
    }

    return isGameOver;
};


const showResult = (list) => {
    const resultDisplay = document.getElementById('result');
    resultDisplay.innerHTML = "";

    // Per ogni macchina creo un elemento e stampo il testo del risultato 
    list.forEach((car) => {
        const newRes = document.createElement('div');
        const secondsTime = car.time / 1000;
        newRes.append(`${car.name}: ${secondsTime.toFixed(3)} secondi`);
        resultDisplay.appendChild(newRes);
    });
};



// ESECUZIONE DEL GIOCO 


// Creo una variabile booleana per controllare se l'evento è già stato scatenato, se si tolgo il codice che viene eseguito
// al click così da non aumentare la velocità delle macchine, se no eseguo il codice al click.
let isClicked = false;

const goBtn = document.getElementById('start-button');

goBtn.addEventListener('click', () => {
    if (isClicked) {
        return;
    }
    isClicked = true;

    let interval = 41;
    const movingCar = setInterval(() => {
        // Prima di tutto controllo se il gioco è finito, se è finito lancio gameover, altrimenti faccio andare il gioco effettivo 
        if (gameOver()) {
            clearInterval(movingCar);
            showResult(carsList);
            // Rimetto la variabile booleana a false per permettere di far ripartire il gioco da zero una volta che 
            // il gameover è stato eseguito
            isClicked = false;
        }

        // Logica per spostare le macchine 
        else {
            carsList.forEach((car) => {
                // Prendo ogni macchina esistente targhettizzando il suo id per ogni volta 
                // perchè poi devo aggiungere lo style e quindi mi serve un elemento HTML 
                carItem = document.getElementById(car.id);

                // Se la macchina è alla fine della pista la sposto un po più in la, effetto estetico
                if (car.currentPosition >= 600) {
                    carItem.style.left = "605px";
                    // clearInterval(movingCar);
                }

                // Altrimenti, se la macchina sta ancora muovendosi aumento la posizione iniziale dell'attributo speed,
                // poi lo assegno allo stile della singola macchina (SENZA DIMENTICARE I PX COME STRINGA).
                // Dopo di che aumento il tempo che era settato a 0 dell'intervallo passato per contare i MS che sono passati.
                else {
                    car.currentPosition += car.speed;
                    carItem.style.left = `${car.currentPosition}px`;
                    car.time += interval;
                }

            });
        }

    }, interval);
});

