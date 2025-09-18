const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = '//api.openweathermap.org/data/2.5/weather?lat=49.75070929620245&lon=6.6370843447854915&appid=23a3e194d417120d6ee664bdce5d651b&units=imperial';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // this is for testing the call
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Fetch error:', error)
    }
}
apiFetch();

function displayResults(data) {
    console.log('hello')
    captionDesc.innerHTML = data.weather[0].description;
    currentTemp.innerHTML = data.main.temp;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
}