import { useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ dataArray }) => {
  useEffect(() => {
    console.log("array of values in BarChart : " + dataArray);

    d3.select("#bar-chart-container svg").remove();

    // Setting up SVG container
    const svg = d3
      .select("#bar-chart-container")
      .append("svg")
      .attr("width", 400)
      .attr("height", 200);

    // Creating scale for X-axis
    const xScale = d3
      .scaleBand()
      .domain([
        "August",
        "September",
        "October",
        "November",
        "December",
        "January",
      ])
      .range([0, 400])
      .padding(0.1);

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
          ["August", "September", "October", "November", "December", "January"][
            i
          ]
        )
      )
      .attr("y", (d) => 140 - yScale(d))
      .attr("width", 18)
      .attr("height", (d) => yScale(d))
      .attr("fill", createGradientFill)
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
              "August",
              "September",
              "October",
              "November",
              "December",
              "January",
            ][i]
          ) +
          xScale.bandwidth() / 4
      )
      .attr("y", 170)
      .text(
        (d, i) =>
          ["August", "September", "October", "November", "December", "January"][
            i
          ]
      )
      .style("font-weight", "light")
      .style("text-anchor", "middle")
      .style("font-size", "12px");

    function createGradientFill() {
      // Creating a linear gradient
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "bar-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      // Adding two stops with different colors
      gradient
        .append("stop")
        .attr("offset", "50%")
        .style("stop-color", "#22ba75");

      gradient
        .append("stop")
        .attr("offset", "50%")
        .style("stop-color", "#1bca1b");

      return "url(#bar-gradient)";
    }
  }, [dataArray]);

  return <div id="bar-chart-container"></div>;
};

export default BarChart;
