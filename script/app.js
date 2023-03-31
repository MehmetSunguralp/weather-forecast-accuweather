const form = document.querySelector('form'),
	detail = document.querySelector('.detail');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const city = form.city.value.trim();
	console.log(city);

	updateCity(city).then((data) => {
		updateUI(data);
		console.log(data);
	});

	form.reset();
});

const updateUI = (data) => {
	const cityDetail = data.cityDetail;
	const weatherForecast = data.weatherForecast;

	detail.innerHTML = `
	<div class="text-muted text-center detail">
		<h5 class="my-3 city">${cityDetail.LocalizedName}</h5>
		<div class="my-3 weather">${weatherForecast.WeatherText}</div>
		<div class="display-5 my-3">
			<span>${Math.round(weatherForecast.Temperature.Metric.Value)}&deg;</span>
		</div>
	</div>
	`;
};

const updateCity = async (city) => {
	const cityDetail = await getCity(city);
	const weatherForecast = await getWeather(cityDetail.Key);

	return {
		cityDetail: cityDetail,
		weatherForecast: weatherForecast,
	};
};

/* //data coming from API
const temperature = Math.round(
	data.weatherForecast.Temperature.Metric.Value
);
const cityName = data.cityDetail.AdministrativeArea.LocalizedName;
const dayTime = data.weatherForecast.IsDayTime;
const weatherText = data.weatherForecast.WeatherText;
//put info
deg.innerHTML = `${temperature}&deg;`;
theCity.textContent = cityName;
console.log(dayTime);
console.log(weatherText); */
