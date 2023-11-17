import React, { useEffect } from "react";
import * as d3 from "d3";

const Graph = ({ dataArray }) => {
  useEffect(() => {
    // Selecting and remove the previous SVG element
    d3.select("#bar-chart svg").remove();

    // Setting up SVG container
    const svg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", 380)
      .attr("height", 200);

    // Creating scale for X-axis with custom labels
    const xScale = d3
      .scaleBand()
      .domain([
        "Older",
        "Jan 01-08",
        "Jan 09-16",
        "Jan 17-24",
        "Jan 25-31",
        "Future",
      ])
      .range([0, 400])
      .padding(0.2);

    // Creating scale for Y-axis
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray)])
      .range([0, 150]);

    svg
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", (d, i) =>
        xScale(
          [
            "Older",
            "Jan 01-08",
            "Jan 09-16",
            "Jan 17-24",
            "Jan 25-31",
            "Future",
          ][i]
        )
      )
      .attr("y", (d) => 140 - yScale(d))
      .attr("width", 20)
      .attr("height", (d) => yScale(d))
      .attr("fill", "#1bca1b")
      .attr("rx", 5)
      .attr("ry", 5);

    // Adding text labels below bars
    svg
      .selectAll("text")
      .data(dataArray)
      .enter()
      .append("text")
      .attr(
        "x",
        (d, i) =>
          xScale(
            [
              "Older",
              "Jan 01-08",
              "Jan 09-16",
              "Jan 17-24",
              "Jan 25-31",
              "Future",
            ][i]
          ) +
          xScale.bandwidth() / 4
      )
      .attr("y", 160)
      .text(
        (d, i) =>
          [
            "Older",
            "Jan 01-08",
            "Jan 09-16",
            "Jan 17-24",
            "Jan 25-31",
            "Future",
          ][i]
      )
      .style("font-weight", "light")
      .style("text-anchor", "middle")
      .style("font-size", "12px");
  }, [dataArray]);

  return <div id="bar-chart"></div>;
};

export default Graph;
