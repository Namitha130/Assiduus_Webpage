import { useEffect, useState } from "react";
import * as d3 from "d3";

const LineChart = () => {
  const [data, setData] = useState([30, 35, 45, 35, 28, 38, 38, 25, 30, 35]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [delta, setDelta] = useState([0]);

  useEffect(() => {
    // to remove previous chart and to create new chart
    d3.select("#line-chart-container svg").remove();

    const svg = d3
      .select("#line-chart-container")
      .append("svg")
      .attr("width", 430)
      .attr("height", 180);

    const xScale = d3.scaleLinear().domain([9, 18]).range([0, 400]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max([...data, ...delta])])
      .range([150, 0]);

    const line = d3
      .line()
      .x((d, i) => xScale(i + 9))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal.tension(0));

    const deltaLine = d3
      .line()
      .x((d, i) => xScale(i + 9))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal.tension(0));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("path")
      .datum(delta)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", deltaLine);

    if (delta !== null) {
      const lastDataIndex = data.length - 1;
      const deltaX = xScale(lastDataIndex + 9) - 180;
      const deltaY = yScale(data[lastDataIndex]) - 20;

      svg
        .append("text")
        .attr("x", deltaX)
        .attr("y", deltaY)
        // .text(`DELTA: ${delta}`)
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "bottom")
        .attr("fill", "red");
    }

    svg
      .append("g")
      .attr("transform", "translate(0, 140)")
      .call(d3.axisBottom(xScale).ticks(10));

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
  }, [data, delta]);

  // ! Randomize the data when Data is selected

  function generateRandomData() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 50));
  }

  const handleManageChange = () => {
    const newData = generateRandomData();
    setData(newData);
  };

  //! lineChart according to CovidRates

  useEffect(() => {
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((res) => res.json())
      .then((date) => {
        const covidDate = Object.keys(date.AN.dates);
        setDates(covidDate);
        setSelectedDate(covidDate[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(selectedDate);

  const handleCovidRates = (e) => {
    setSelectedDate(e.target.value);
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((res) => res.json())
      .then((data) => {
        const covidData = data.AN.dates[e.target.value];
        if (
          covidData &&
          covidData.delta &&
          typeof covidData.delta.confirmed === "number"
        ) {
          setDelta([...delta, covidData.delta.confirmed]); 
        } else if (covidData && covidData.total) {
          setDelta([...delta, covidData.total.confirmed]);
        } else {
          setDelta([0, ...delta]);
        }
      })
      .catch((error) => {
        alert("Error fetching data:", error);
        setDelta([0, ...delta]);
      });
  };

  return (
    <div>
      <span className="div1-nav">
        <span>
          <p> Checking account</p>
        </span>

        <span>
          <select name="manage" onChange={handleManageChange}>
            <option value="Manage">Manage</option>
            <option value="Manage">Data</option>
          </select>

          <select name="months" id="months" onChange={handleCovidRates}>
            {dates.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </span>
      </span>
      <hr />

      <section className="lineChart">
        <div id="line-chart-container"></div>
      </section>
    </div>
  );
};

export default LineChart;
