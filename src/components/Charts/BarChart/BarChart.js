import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, axisBottom, axisLeft, max } from "d3";
import useResizeObserver from "use-resize-observer";
import "./BarChart.css";

const results = [
  { name: "won", color: "green" },
  { name: "draw", color: "orange" },
  { name: "lost", color: "red" },
];

const margin = { top: 10, right: 10, bottom: 20, left: 40 };

const BarChart = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { width, height } = useResizeObserver({ ref: wrapperRef });

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!width && !height) return;

    if (data) {
      const dataTable = data.table;
      // sorting the data
      dataTable.sort((a, b) => b.points - a.points);
      //xScale
      const xScale = scaleLinear()
        .domain([0, max(dataTable, (d) => d.playedGames)])
        .range([0, width - margin.left - margin.right]);

      //yScale
      const yScale0 = scaleBand()
        .domain(dataTable.map((d) => d.team.name))
        .range([0, height - margin.top - margin.bottom])
        .padding(0.2);

      const yScale1 = scaleBand()
        .range([0, yScale0.bandwidth()])
        .domain(["won", "draw", "lost"])
        .padding(0.1);

      //axies

      const xAxis = axisBottom(xScale)
        .ticks(max(dataTable, (d) => d.playedGames))
        .tickFormat((d, i) => {
          if (d === 1) {
            return d + " match";
          } else {
            return d + " matches";
          }
        });
      svg
        .select(".x-axis")
        .attr(
          "transform",
          `translate(0,${height - margin.top - margin.bottom})`
        )
        .call(xAxis);

      const yAxis = axisLeft(yScale0);
      svg.select(".y-axis").call(yAxis);

      // draw a bar

      const team_name = svg
        .selectAll(".team_name")
        .data(dataTable)
        .join("g")
        .attr("class", "team_name")
        .attr("transform", (d) => `translate(0,${yScale0(d.team.name)})`);

      team_name
        .selectAll(".bar.won")
        .data((d) => [d])
        .join("rect")
        .attr("class", "bar won")
        .attr("fill", "green")
        .attr("x", 0)
        .attr("y", (d) => yScale1("won"))
        .attr("height", yScale1.bandwidth())
        .transition()
        .duration(500)
        .attr("width", (d) => xScale(d.won));

      team_name
        .selectAll(".bar.draw")
        .data((d) => [d])
        .join("rect")
        .attr("class", "bar draw")
        .attr("fill", "orange")
        .attr("x", 0)
        .attr("y", (d) => yScale1("draw"))
        .attr("height", yScale1.bandwidth())
        .transition()
        .duration(500)
        .attr("width", (d) => xScale(d.draw));

      team_name
        .selectAll(".bar.lost")
        .data((d) => [d])
        .join("rect")
        .attr("class", "bar lost")
        .attr("fill", "red")
        .attr("x", 0)
        .attr("y", (d) => yScale1("lost"))
        .attr("height", yScale1.bandwidth())
        .transition()
        .duration(500)
        .attr("width", (d) => xScale(d.lost));

      // legend
      svg
        .selectAll(".mydots")
        .data(results)
        .join("rect")
        .attr("class", "mydots")
        .attr("x", 290)
        .attr("y", (d, i) => 10 + i * 30 - 7)
        .attr("height", 15)
        .attr("width", 15)
        .style("fill", (d) => d.color);

      svg
        .selectAll(".mylabels")
        .data(results)
        .join("text")
        .attr("class", "mylabels")
        .attr("x", 310)
        .attr("y", (d, i) => 10 + i * 30)
        .style("fill", (d) => d.color)
        .text((d) => d.name)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");
    }
  }, [data, width, height]);

  return (
    <div
      className="chartContainer"
      ref={wrapperRef}
      style={{ marginBottom: "2rem" }}
    >
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
};

export default BarChart;
