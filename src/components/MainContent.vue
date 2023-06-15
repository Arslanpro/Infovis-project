<template>
	<div id='maincontent' >
		<div id="LineChart" class="chartBlock">
			<h2 style="margin: 1.25rem;">1950~2022 Population Line Chart</h2>
			<p style="margin: 0.625rem;">Statistics of the number of population in the world, each region, and each country from 1970 to 2022</p>
			<LineChart ref='LineChart'></LineChart>
			<ul>
				<li><p>Africa has the fastest population and population density growth, Europe is the slowest, and the other four continents are growing evenly.</p></li>
				<li><p>Generally speaking, traditionally developed countries' populations and population density grow slowly, while other countries develop <br> relatively fast, especially Angola, Uganda, and other countries.</p></li>
			</ul>
		</div>
		
		<div id='RaceChart' class="chartBlock">
			<h2 style="margin: 1.25rem;">1950~2022 Dynamic Ranking Chart of World Population&Density</h2>
			<p style="margin: 0.625rem;">Select the metric for ranking  (population, density) to generate a dynamic ranking chart</p>
			<RaceChart ref='RaceChart'></RaceChart>
			<ul>
				<li><p>Since 1950, the top three populations in the world have not changed, but India's population has grown rapidly, and it is <br> foreseeable that it will surpass China to become number one.</p></li>
				<li><p>Half of the top 12 most populous countries are consistently from Asia.</p></li>
				<li><p>The countries or regions with the highest population densities are all small countries or regions, many of which are single cities.</p></li>
			</ul>
		</div>
		
		<div id="DonutChart" class="chartBlock">
			<h2 style="margin: 1.25rem;">1970~2022 The proportion of each country in the world's total population</h2>
			<p style="margin: 0.625rem;">Or choose a continent to see the proportion of the population of each country in the continent</p>
			<DonutChart ref='DonutChart'></DonutChart>
      <ul>
        <li><p>In 1970, a staggering 22.27% of the world's population lived in China. This decreased quite a lot during the <br> coming years until 2020 where it was 18.18%. In Asia, China went from respectively 38.35% to 30.56% in these 50 years.</p></li>
        <li><p>India had a world share of 15.09% in 1970 and 17.81% in 2020. India's population has grown rapidly, and it is foreseeable <br> that it will surpass China to become number one.</p></li>
        <li><p>In Oceania, Australia houses the majority of the population. However, this trend is changing with 64.44% in 1970 and <br> 58.43% in 2020.</p></li>
      </ul>
		</div>
		
		<div id="Choropleth" class="chartBlock">
			<h2 style="margin: 1.25rem;">Population of the Country/Territories in the year 2022.</h2>
			<p style="margin: 0.625rem;">Choose a measure of distribution (number of population, density) to generate a map distribution plot</p>
			<Choropleth ref='Choropleth'></Choropleth>
			<ul>
				<li><p>Asia has the largest population in 2022</p></li>
				<li><p>Using the population density map to compare the total population map, Russia, Canada, and Australia have a large total population, <br> but the population density is very low. European countries' population density is outstanding relative to their total population. </p></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import LineChart from './LineChart.vue'
	import RaceChart from './RaceChart.vue'
	import Choropleth from './Choropleth.vue'
	import DonutChart from './DonutChart.vue'

	export default {
		name: 'MainContent',
		components: {
			LineChart,
			RaceChart,
			Choropleth,
			DonutChart
		},
		methods: {
			renderLineChart: function() {
				this.$refs.LineChart.init()
			},
			renderRaceChart: function() {
				this.$refs.RaceChart.init()
			},
			renderChoropleth: function() {
				this.$refs.Choropleth.init()
			},
			renderDonutChart: function() {
				this.$refs.DonutChart.init()
			}
		}
	}
</script>

<style scoped>
	.chartBlock{
		margin-top: 9.375rem;
		padding-top: 3.125rem;
	}
	#DonutChart{
		margin: 11.25rem;
		padding-top: 1.25rem;
	}
	#maincontent {
		display: block;
		align-items: center;
		text-align: center;
	}
	ul {
		width: 100%;
		text-align: center;
		padding-top: 3.125rem;
		padding-left: 25%;
	}
	ul li {
		text-align: left;
		margin-bottom: 0.625rem;
	}
	p {
		font-size: 1.125rem;
		font-family: "microsoft yahei";
	}
</style>
