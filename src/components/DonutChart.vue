<template>
  <div id="donut-chart">
    <div id="selectSection">
      <select name="gname" id="gname" @change="onGenerate($event)">
        <option v-for="(item,index) in gnames" :key="index" :value="item" :label="item"></option>
      </select>
      <select name="world_or_continent" id="world_or_continent" @change="changeType($event)">
        <option v-for="(item,index) in world_or_continent" :key="index" :value="item" :label="item"></option>
      </select>
    </div>
    <div id="donut-chart-graph"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

var rawData = []
var data = []
var allData = []
var name = 'Afganistan'

var width = 1000
var height = 550
var margin = 85
var radius = (Math.min(width, height) / 2 - margin) / 2 - 40
var svg
var color

function procData(gname) {
  name = gname
  data = rawData.filter(d => d.name == gname)
  return data
}

export default {
  name: 'DonutChart',
  data() {
    return {
      gnames: [],
      world_or_continent: ['World', 'Continent'],
    }
  },
  methods: {
    init: function () {
      allData = this.getDonutChartData()
      rawData = allData[0]
      console.log(rawData)
      this.gnames = [...new Set(rawData.map(d => d.name))]
      svg = d3.select("#donut-chart-graph")
          .append("svg")
          .attr("width", width)
          .attr("height", height)

      procData('Afghanistan')
      this.draw()
    },
    draw: function () {
      svg.selectAll('*').remove()
      this.drawSingle(1, [width / 4, height / 9], 'Red2Blue')
      this.drawSingle(2, [width * 3 / 4, height / 9], 'Blue2Red')
      this.drawSingle(3, [width / 4, height * 3 / 9], 'Blue2Red')
      this.drawSingle(4, [width * 3 / 4, height * 3 / 9], 'Red2Blue')
      this.drawSingle(5, [width / 4, height * 5 / 9], 'Red2Blue')
      this.drawSingle(6, [width * 3 / 4, height * 5 / 9], 'Blue2Red')
      this.drawSingle(7, [width / 4, height * 7 / 9], 'Blue2Red')
    },
    drawSingle: function (type, offset, colorType) {

      let singleData = data.filter(d => d.type == type)
      let sumForAverage = 1
      //Calculate sum of population
      if (singleData.length != 0) {
        sumForAverage = singleData[0].population*1 + singleData[1].population*1
      }

      let g = svg.append("g")
          .attr("transform", "translate(" + offset[0] + "," + offset[1] + ")");

      var pie = d3.pie()
          .padAngle(0.005)
          .sort(null)
          .value(d => d.population)

      var data_ready = pie(singleData)

      color = d3.scaleOrdinal()
          .domain(singleData.map(d => d.category))

      if (colorType == 'Red2Blue') {
        color = color.range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), singleData.length))
      } else if (colorType == 'Blue2Red') {
        color = color.range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), singleData.length).reverse())
      }

      var arc = d3.arc()
          .innerRadius(radius * 0.5) // This is the size of the donut hole
          .outerRadius(radius * 0.8)

      // Another arc that won't be drawn. Just for labels positioning
      var outerArc = d3.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9)

      g
          .selectAll('allSlices')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', arc)
          .attr('fill', function (d) {
            return (color(d.data.category))
          })
          .attr("stroke", "white")
          .style("stroke-width", "1px")
          .style("opacity", 0.7)
          .transition().duration(1000)
          .attrTween('d', function (d) {
            var i = d3.interpolate({
              startAngle: 1.1 * Math.PI,
              endAngle: 1.1 * Math.PI
            }, d);
            return function (t) {
              return arc(i(t));
            };
          })

      // Add a title below the donut chart with year (type is year: 1970, 1980, 1990, 2000, 2010, 2015, 2020)
      const years = ['1970', '1980', '1990', '2000', '2010', '2015', '2020']
      g.append("text")
          .attr("text-anchor", "middle")
          .attr("font-size", "1.5em")
          .attr("font-weight", "bold")
          .attr("y", 10)
          .text(years[type - 1])

      // Add the polylines between chart and labels:
      g
          .selectAll('allPolylines')
          .data(data_ready.filter((d, i) => type == 4 ? i < 2 : i < 3))
          .enter()
          .append('polyline')
          .attr("stroke", "black")
          .style("fill", "none")
          .attr("stroke-width", 1)
          .attr('points', function (d) {
            var posA = arc.centroid(d) // line insertion in the slice
            var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC]
          })
          .style("opacity", 0)
          .transition().delay(1000).duration(800)
          .style("opacity", 1)

      let text = g
          .selectAll('allLabels')
          .data(data_ready.filter((d, i) => type == 4 ? i < 2 : i < 3))
          .enter()
          .append('text')
          .attr('transform', function (d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
          })
      text
          .append('tspan')
          .text(d => d.data.category)
          .style('text-anchor', function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
          })
      text
          .append('tspan')
          .text(d => 'Counts: ' + d.data.population)
          .attr('x', 0)
          .attr('dy', 20)
          .style('text-anchor', function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
          })
      text
          .append('tspan')
          .text(d => 'Pencentage: ' + (100 * d.data.population / sumForAverage).toFixed(2) + '%')
          .attr('x', 0)
          .attr('dy', 20)
          .style('text-anchor', function (d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
          })
          .style('white-space', 'pre')
      text
          .style("opacity", 0)
          .transition().delay(1000).duration(800)
          .style("opacity", 1)
    },
    onGenerate: function (e) {
      let gname = e.target.value
      procData(gname)
      this.draw()
    },
    changeType: function (e) {
      if (e.target.value == 'World'){
        rawData = allData[0]
      }else {
        rawData = allData[1]
      }
      procData(name)
      this.draw()
    },
  }
}
</script>

<style>
#gname {
  color: #273747;
  margin-left: 0.625rem;
  font-family: helvetica;
  font-size: 0.875rem;
  width: 21.875rem;
  height: 2rem;
  border: 0.125rem solid rgb(247, 105, 25);
  appearance: none;
  background-color: rgb(235, 239, 242);
  background: url(../assets/img/down.png) 20.3125rem center no-repeat;
  padding-left: 0.3125rem;
}

#gname:hover {
  background-color: rgba(189, 196, 202, 70%);
}

#world_or_continent {
  color: #273747;
  margin-left: 0.625rem;
  font-family: helvetica;
  font-size: 0.875rem;
  width: 21.875rem;
  height: 2rem;
  border: 0.125rem solid rgb(247, 105, 25);
  appearance: none;
  background-color: rgb(235, 239, 242);
  background: url(../assets/img/down.png) 20.3125rem center no-repeat;
  padding-left: 0.3125rem;
}

#world_or_continent:hover {
  background-color: rgba(189, 196, 202, 70%);
}
</style>
