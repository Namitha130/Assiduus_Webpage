import { useEffect, useState } from "react";
import * as d3 from "d3";

const LineChart = () => {
  const [data, setData] = useState([30, 35, 45, 35, 28, 38, 38, 25, 30, 35]);
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);

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
  }, [data,  selectedDate]);

  // ! Randomize the data when Data is selected

  function generateRandomData() {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 50));
  }

  const handleManageChange = () => {
    const newData = generateRandomData();
    setData(newData);
  };

  //! lineChart according to CovidRates 

  useEffect (()=>{
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
    .then((res)=>{ 
      return res.json()})
    .then((date)=>{ 
      // console.log(JSON.stringify(date.AN.dates));
      const covidDate =  Object.keys(date.AN.dates)
      setDates(covidDate)
      setSelectedDate(covidDate[0]);
    })

    if (selectedDate) {
      // Fetch COVID-19 data for the selected date
      fetch(`https://data.covid19india.org/v4/min/timeseries.min.json`)
        .then((res) => res.json())
        .then((data) => {
          const covidData = data.AN.dates[selectedDate];
          const newData = Object.values(covidData.total); // Modify this based on your data structure
          console.log( "newData is : " + newData);
          setData(newData);
        });
    }
  },[])

const handleCovidRates = (e) =>{
  setSelectedDate(e.target.value)
}
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

                <select name="months" id="months" onChange={handleCovidRates} >
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
