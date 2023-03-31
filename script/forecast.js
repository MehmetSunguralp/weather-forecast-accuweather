const key = 'ECatPhK3DYIu0TtHOfg7icpySydqJW02';

//Get city name
const getCity = async (location) => {
	const baseUrl =
		'http://dataservice.accuweather.com/locations/v1/cities/search';

	const query = `?apikey=${key}&q=${location}`;

	const res = await fetch(baseUrl + query);

	const data = await res.json();

	return data[0];
};

//Get weather forecast
const getWeather = async (id) => {
	const baseUrl = `http://dataservice.accuweather.com/currentconditions/v1/`;
	const query = `${id}?apikey=${key}`;

	const res = await fetch(baseUrl + query);

	const data = await res.json();

	return data[0];
};

/* getCity('bilecik')
	.then((d) => {
		return getWeather(d.Key);
	})
	.then((d) => console.log(d))
	.catch((err) => console.log(err));
 */
