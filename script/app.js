const form = document.querySelector('form'),
	detail = document.querySelector('.detail'),
	card = document.querySelector('.card'),
	time = document.querySelector('img.time'),
	icon = document.querySelector('.icon img');

//ON SUBMIT
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const city = form.city.value.trim();
	//console.log(city);

	updateCity(city).then((data) => {
		updateUI(data);
		//console.log(data);
	});

	form.reset();
	//KEEP THE CITY IN THE LOCAL STORAGE
	localStorage.setItem('city', city);
});

//UPDATE UI
const updateUI = (data) => {
	//GET DATA FROM updateCity()
	const { cityDetail, weatherForecast } = data;

	//UPDATE INFO
	detail.innerHTML = `
	<div class="text-muted text-center detail">
		<h5 class="my-3 city">${cityDetail.LocalizedName}</h5>
		<div class="my-3 weather">${weatherForecast.WeatherText}</div>
		<div class="display-5 my-3">
			<span>${Math.round(weatherForecast.Temperature.Metric.Value)}&deg;</span>
		</div>
	</div>
	`;
	//UPDATE DAY TIME & ICON
	const iconSrc = `./img/icons/${weatherForecast.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	let dayTimeSrc = weatherForecast.IsDayTime
		? './img/day.svg'
		: './img/night.svg';

	time.setAttribute('src', dayTimeSrc);

	//DISPLAY HIDDEN CARD
	if (card.classList.contains('d-none')) {
		card.classList.remove('d-none');
	}
};

//UPDATE CITY
const updateCity = async (city) => {
	const cityDetail = await getCity(city);
	const weatherForecast = await getWeather(cityDetail.Key);

	return {
		cityDetail: cityDetail,
		weatherForecast: weatherForecast,
	};
};

if (localStorage.getItem('city')) {
	updateCity(localStorage.getItem('city')).then((data) => {
		updateUI(data);
		//console.log(data);
	});
}
