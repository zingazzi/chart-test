import { Component, OnInit } from "@angular/core";
import { WeatherService } from "../weather.service";
import * as d3 from "d3";

@Component({
  selector: "app-d3test2",
  templateUrl: "./d3test2.component.html",
  styleUrls: ["./d3test2.component.css"]
})
export class D3test2Component implements OnInit {
  constructor(private _weather: WeatherService) {}

  ngOnInit() {
    var center = d3.scaleLinear().range([0, width]);

    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var centerLine = d3.axisTop(center).ticks(0);

    // define the line

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv("assets/data.csv").then(function(data) {
      data.forEach(function(d) {
        d.date = parseFloat(d.date);
        d.close = parseFloat(d.close);
      });

      // Scale the range of the data
      x.domain(
        d3.extent(data, function(d) {
          return d.date;
        })
      );
      // y values progressives
      /* y.domain([
        d3.min(data, function(d) {
          return d.close;
        }),
        d3.max(data, function(d) {
          return d.close;
        })
      ]); */

      // y values fixed
      y.domain([-100, 100]);

      var xAxis = d3
        .axisBottom(x)
        .ticks(10)
        .tickFormat("");
      var yAxis = d3.axisLeft(y).ticks(10);

      console.table(data);

      update();
      // Add the valueline path.

      function dragstarted(d) {
        d3.select(this)
          .raise()
          .classed("active", true);
      }

      function dragged(d) {
        d["date"] = x.invert(d3.event.x);
        d["close"] = y.invert(d3.event.y);
        d3.select(this)
          .attr("cx", x(d[0]))
          .attr("cy", y(d[1]));
        update();
      }

      function dragended(d) {
        d3.select(this).classed("active", false);
        update();
      }

      function update() {
        var line = d3
          .line()
          .curve(d3.curveCatmullRom.alpha(1))
          .x(function(d) {
            return x(d.date);
          })
          .y(function(d) {
            return y(d.close);
          });

        // Area
        var area = d3
          .area()
          .curve(d3.curveCatmullRom.alpha(1))
          .x(function(d) {
            return x(d.date);
          })
          .y0(height / 2)
          .y1(function(d) {
            return y(d.close);
          });

        var drag = d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);

        svg
          .enter()
          .append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", line)
          .attr("class", "area")
          .style("fill", "green")
          .style("opacity", ".2")
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("d", area);

        // Add the X Axis
        /* svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)); */

        svg
          .append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height / 2 + ")")
          .call(xAxis);

        svg
          .append("g")
          .attr("class", "y axis")
          .call(yAxis);

        // Add the Y Axis
        svg.append("g").call(d3.axisLeft(y));

        svg
          .selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 3)
          .attr("cx", function(d) {
            return x(d.date);
          })
          .attr("cy", function(d) {
            return y(d.close);
          });

        svg
          .data(data)
          .enter()
          .selectAll("circle")
          .call(drag);

        svg
          .append("g")
          .attr("class", "centerline")
          .attr("transform", "translate(0," + y(0) + ")")
          .call(centerLine);
      }
    });
  }
}
