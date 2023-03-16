let backroundCheker = (weather) => {
    let background = document.getElementsByClassName('wrapper')[0];
    if (weather === 'Clouds') {
        background.style.opacity = '0';
        setTimeout(() => {
            background.style.background = 'url("clouds.jpg") ';
            background.style.backgroundSize = 'cover';
            setTimeout(() => {
                background.style.opacity = '1';
            }, 1000)
        }, 3000)
        console.log(background)

    } else if (weather === 'Rain') {
        background.style.opacity = '0';
        setTimeout(() => {
            background.style.background = 'url("rain.jpg") ';
            background.style.backgroundSize = 'cover';
            setTimeout(() => {
                background.style.opacity = '1';
            },3000)
        }, 1000)

    } else if (weather === 'Clear') {
        background.style.opacity = '0';
        setTimeout(() => {
            background.style.background = 'url("clear.jpg") ';
            background.style.backgroundSize = 'cover';
            setTimeout(() => {
                background.style.opacity = '1';
            }, 1000)
        }, 1000)
    }
}

let whereYouAre = (city) => {
    let b = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8e9054f06937a15b5e5d4e375e249913`)
    b.then((serverResponse) => {
        let c = serverResponse.json();
        return c
    }).then((data) => {
        console.log(data)
        let parent1 = document.getElementsByClassName('temp')[0];
        let parent2 = document.getElementsByClassName('add')[0];
        let newChild1 = document.createElement('p');
        let newChild2 = document.createElement('p');
        let newChild3 = document.createElement('img');
        newChild3.setAttribute('src',`https://openweathermap.org/img/wn/${ data.weather[0].icon}@2x.png`)
        newChild1.style.fontSize = '2em';
        newChild1.setAttribute('class', 'weatherResponse');
        newChild1.style.color = 'white';
        newChild1.style.fontSize = '1.5em';
        newChild1.style.width = '100%'
        newChild1.innerText = city +'  ' + Math.floor(data.main.temp - 273) + ' °C';
        newChild2.style.fontSize = '2em';
        newChild2.setAttribute('class', 'weatherResponse2');

        newChild3.setAttribute('class', 'weatherResponse3');
        newChild2.style.color = 'white';
        newChild2.style.fontSize = '1.5em';
        newChild2.style.width = '100%'
        newChild2.innerText = data.weather[0].description;
        setTimeout(()=>{
            parent1.appendChild(newChild1)
            parent2.appendChild(newChild2)
            parent1.appendChild(newChild3)
        },3000)

        backroundCheker(data.weather[0].main);
    })
}

let inputCity = () => {
    let cityFromInput = document.getElementsByTagName('input')[0];
    let cityFromButton = document.getElementsByTagName('button')[0];
    cityFromInput.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            whereYouAre(cityFromInput.value);
            cityFromInput.style.display = 'none';
            cityFromButton.style.display = 'none';
            addResetButton();
            document.getElementsByTagName('h2')[0].style.top = '0';
            document.getElementsByTagName('h2')[0].style.left = '0';
            document.getElementsByTagName('h2')[0].style.display = 'none';
        }
    })
    cityFromButton.addEventListener('click', (event) => {
        event.preventDefault();
        whereYouAre(cityFromInput.value);
        cityFromInput.style.display = 'none';
        cityFromButton.style.display = 'none';
        addResetButton()
        document.getElementsByTagName('h2')[0].style.display = 'none'
    })
}
inputCity();
let getCurrentDate = () => {
    let b = new Date();
    if (b.getHours() >= 5 && b.getHours() < 12) {
        document.getElementsByClassName('wrapper')[0].style.background = 'url("eveningMorning.avif")'
        document.getElementsByClassName('wrapper')[0].style.backgroundSize = 'cover'
    } else if (b.getHours() >= 12 && b.getHours() < 19) {
        document.getElementsByClassName('wrapper')[0].style.background = 'url("day.jpeg")';
        document.getElementsByClassName('wrapper')[0].style.backgroundSize = 'cover'
    } else if (b.getHours() >= 19 && b.getHours() < 24) {
        document.getElementsByClassName('wrapper')[0].style.background = 'url("eveningMorning.avif")'
        document.getElementsByClassName('wrapper')[0].style.backgroundSize = 'cover'
    } else if (b.getHours() > 0 && b.getHours() < 5) {
        document.getElementsByClassName('wrapper')[0].style.background = 'url("night.jpg")'
        document.getElementsByClassName('wrapper')[0].style.backgroundSize = 'cover'
    }
}
getCurrentDate()
let addResetButton = () => {
    let newResetButton = document.createElement('button')
    newResetButton.innerText = 'Back';
    newResetButton.style.width = '200px';
    newResetButton.style.height = '50px';
    let parent = document.getElementsByClassName('button')[0];
    setTimeout(()=>{
        parent.appendChild(newResetButton);
    },3000)
    newResetButton.addEventListener('click', (event) => {
        event.preventDefault();
        newResetButton.style.display = 'none';
        document.getElementsByClassName('weatherResponse')[0].style.display = 'none';
        document.getElementsByClassName('weatherResponse2')[0].style.display = 'none';
        document.getElementsByClassName('weatherResponse3')[0].style.display = 'none';
        document.getElementsByClassName('weatherResponse')[0].removeAttribute('class');
        document.getElementsByClassName('weatherResponse2')[0].removeAttribute('class');
        document.getElementsByClassName('weatherResponse3')[0].removeAttribute('class');
        document.getElementsByTagName('input')[0].style.display = ' block';
        document.getElementsByTagName('button')[0].style.display = 'block';
        getCurrentDate();
    })

}



