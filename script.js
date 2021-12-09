
const tempElement = document.querySelector(".temperature p");
const infoElement = document.querySelector(".info p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".message");

const weather = {};

weather.temperature = {
	unit: "celsius"
}

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";


if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = "<p>unable to detect location :(</p>";
}
 
function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

	getWeather(latitude, longitude);
}


function showError(error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


function getWeather(latitude, longitude) {
	let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

	fetch(api)
		.then(function (response) {
			let data = response.json();
			return data;
		})
		.then(function (data) {
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.city = data.name;
			weather.country = data.sys.country;
		})
		.then(function () {
			showWeather();
		});
}


function showWeather() {
	
	tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
	infoElement.innerHTML = weather.description;
	locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}


function celToF(temperature) {
	return (temperature * 9 / 5) + 32;
}

tempElement.addEventListener("click", function () {
	if (weather.temperature.value === undefined) return;

	if (weather.temperature.unit == "celsius") {
		let f = celToF(weather.temperature.value);
		f = Math.floor(f);

		tempElement.innerHTML = `${f}°<span>F</span>`;
		weather.temperature.unit = "fahrenheit";
	} else {
		tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
		weather.temperature.unit = "celsius"
	}
});
