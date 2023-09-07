const url = 'https://epic-free-games.p.rapidapi.com/epic-free-games';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4099ab78f2msh0eb22cfce6cef26p1cbbd7jsn21da45057ae1',
		'X-RapidAPI-Host': 'epic-free-games.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}