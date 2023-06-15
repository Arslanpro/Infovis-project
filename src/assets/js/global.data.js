import * as d3 from 'd3';

var rawData = []
var wordCloudData = []
var lineChartData = []
var raceChartData = []
var choroplethData = []
var donutChartData = []

function loadData(lineChartDataCallback, wordCloudDataCallback, raceChartDataCallback, choroplethDataCallback, donutChartCallback) {

	d3.csv('./lineChart2.csv', d => ({
		type: +d.type,
		year: +d.year,
		population: +d.population,
		density: +d.density,
	})).then(function(d) {
		lineChartData = JSON.parse(JSON.stringify(d));
		lineChartDataCallback();
	})

	d3.csv('./ranking.csv', d => ({
		year: d.year,
		name: d.gnamecode,
		population: +d.population,
		density: +d.density,
	})).then(function(d) {
		raceChartData = JSON.parse(JSON.stringify(d));
		raceChartDataCallback();
	})

	d3.csv('./world_population.csv', d => ({
		name: d.name,
		code: d.code,
		population: +d.population,
		density: +d.density,
	})).then(function(d) {
		choroplethData = JSON.parse(JSON.stringify(d));
		choroplethDataCallback();
	})

	Promise.all([
		d3.csv('./donut_population_world.csv'),
		d3.csv('./donut_population_continent.csv'),
	]).then(function(files){
		donutChartData = JSON.parse(JSON.stringify(files));
		donutChartCallback();
	})

}

function getWordCloudData() {
	return wordCloudData;
}

function getLineChartData() {
	return lineChartData;
}

function getRaceChartData() {
	return raceChartData;
}

function getChoroplethData() {
	return choroplethData;
}

function getDonutChartData() {
	return donutChartData;
}

var gnameMap = [
  "Unknown1",
  "Unknown2",
  "Unknown3",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burma",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czechia",
  "Cote d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "Gabon",
  "Gambia, The",
  "Gaza Strip",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Barthelemy",
  "Saint Helena, Ascension, and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "West Bank",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]

export default {
	rawData,
	gnameMap,
	install: function(Vue) {
		Vue.prototype.loadData = (lineChartDataCallback,
			wordCloudDataCallback,
			raceChartDataCallback,
			choroplethDataCallback,
			donutChartCallback
			) => loadData(
			lineChartDataCallback,
			wordCloudDataCallback,
			raceChartDataCallback,
			choroplethDataCallback,
			donutChartCallback)
		Vue.prototype.getLineChartData = () => getLineChartData()
		Vue.prototype.getWordCloudData = () => getWordCloudData()
		Vue.prototype.getRaceChartData = () => getRaceChartData()
		Vue.prototype.getChoroplethData = () => getChoroplethData()
		Vue.prototype.getDonutChartData = () => getDonutChartData()
	}

}
