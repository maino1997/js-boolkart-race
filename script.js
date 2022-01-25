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
        car.speed = getRandomNumber(10, 20);
        car.currentPosition = 0;
        getCar(car);
    });
}

const getCar = (car) => {
    const gameSection = document.querySelector('.game-col');

    const road = document.createElement('div');
    road.classList.add('road');
    road.style.background = car.background;

    gameSection.appendChild(road);


    const carImg = document.createElement('img');
    carImg.setAttribute("src", `./img/car-${car.id}.png`);
    carImg.id = car.id;
    road.append(carImg);

    const nameText = document.createElement('p');
    nameText.append(car.name);
    nameText.classList.add("nome");
    road.appendChild(nameText);

    return road;
}

setUp();



const gameOver = () => {

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

    list.forEach((car) => {
        const newRes = document.createElement('div');
        const secondsTime = car.time / 1000;
        newRes.append(`${car.name}: ${secondsTime.toFixed(3)} secondi`);
        resultDisplay.appendChild(newRes);
    });
};



const goBtn = document.getElementById('start-button');

goBtn.addEventListener('click', () => {
    let interval = 50;
    const movingCar = setInterval(() => {
        if (gameOver()) {
            showResult(carsList);
            clearInterval(movingCar);
        } else {
            carsList.forEach((car) => {
                carItem = document.getElementById(car.id);

                if (car.currentPosition >= 600) {
                    carItem.style.left = "605px";
                    // clearInterval(movingCar);
                } else {
                    car.currentPosition += car.speed;
                    carItem.style.left = `${car.currentPosition}px`;
                    car.time += interval;
                }

            });
        }

    }, interval);
});

