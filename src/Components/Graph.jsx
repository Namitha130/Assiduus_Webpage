import React, { useEffect } from "react";
import * as d3 from "d3";

const Graph = ({ dataArray }) => {
  useEffect(() => {
    d3.select("#bar-chart svg").remove();

    const svg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", 380)
      .attr("height", 200);

    const xDomain = [
      "Older",
      "Jan 01-08",
      "Jan 09-16",
      "Jan 17-24",
      "Jan 25-31",
      "Future",
    ];

    const xScale = d3.scaleBand().domain(xDomain).range([0, 400]).padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray)])
      .range([0, 150]);

    const tooltip = d3
      .select("#bar-chart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const mouseover = (event, d) => {
      tooltip.style("opacity", 1);
    };

    const mouseleave = (event, d) => {
      tooltip.style("opacity", 0);
    };

    const mousemove = (event, d) => {
      const [x, y] = d3.pointer(event);
      const tooltipWidth = parseInt(tooltip.style("width"));
      const tooltipHeight = parseInt(tooltip.style("height"));
      const tooltipMessage = `Sales were ${d} in ${xDomain[d3.index]}`;

      tooltip

        .html(tooltipMessage)
        .style("left", x - tooltipWidth / 2 + "px")
        .style("top", y - tooltipHeight - 12 + "px");
    };

    svg
      .selectAll("rect")
      .data(dataArray)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(xDomain[i]))
      .attr("y", (d) => 140 - yScale(d))
      .attr("width", 20)
      .attr("height", (d) => yScale(d))
      .attr("fill", "#1bca1b")
      .attr("rx", 5)
      .attr("ry", 5)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("mouseover", mouseover);

    svg
      .selectAll("text")
      .data(dataArray)
      .enter()
      .append("text")
      .attr("x", (d, i) => xScale(xDomain[i]) + xScale.bandwidth() / 4)
      .attr("y", 160)
      .text((d, i) => xDomain[i])
      .style("font-weight", "light")
      .style("text-anchor", "middle")
      .style("font-size", "12px");
  }, [dataArray]);

  return <div id="bar-chart"></div>;
};

export default Graph;
