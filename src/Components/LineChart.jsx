import React, { useEffect } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  useEffect(() => {
    // Selecting and removing the previous svg element
    d3.select("#line-chart-container svg").remove();

    // Set up SVG container
    const svg = d3
      .select("#line-chart-container")
      .append("svg")
      .attr("width", 430)
      .attr("height", 180);

    // Creating scales for X and Y axes
    const xScale = d3.scaleLinear().domain([9, 18]).range([0, 400]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([150, 0]);

    // Creating a line function
    const line = d3
      .line()
      .x((d, i) => xScale(i + 9))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal.tension(0));

    // Draw the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Adding X-axis without ticks and with axis values
    svg
      .append("g")
      .attr("transform", "translate(0, 140)")
      .call(d3.axisBottom(xScale).ticks(10));

    // Adding bottom labels
    svg
      .selectAll(".bottom-labels")
      .data(data)
      .enter()
      .append("text")
      .text((d, i) => i + 9)
      .attr("text-anchor", "middle")
      .attr("class", "bottom-labels")
      .style("font-weight", "light")
      .style("text-anchor", "middle");
  }, [data]);

  return <div id="line-chart-container"> </div>;
};

export default LineChart;
