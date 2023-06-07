import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const App = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState(null);

  const fetchRegions = async () => {
    try {
      const response = await axios.get("https://covid-19-statistics.p.rapidapi.com/regions", {
        headers: {
          "X-RapidAPI-Key": "869bb4704bmsha8e422fb11e2412p1f2c3ejsn9387ed6e6f62",
          "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
        },
      });
      setRegions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalReports = async () => {
    try {
      const response = await axios.get("https://covid-19-statistics.p.rapidapi.com/reports/total", {
        headers: {
          "X-RapidAPI-Key": "869bb4704bmsha8e422fb11e2412p1f2c3ejsn9387ed6e6f62",
          "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
        },
        params: {
          date: selectedDate,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTotalReportsSubmit = (event) => {
    event.preventDefault();
    fetchTotalReports();
  };

  return (
    <div>
      <h1>COVID-19 Statistics</h1>
      <h2>Total Reports</h2>
      <form onSubmit={handleTotalReportsSubmit}>
        <label>
          Date:
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </label>
        <br />
        <button type="submit">Load Total Reports</button>
      </form>

      <h2>Regions</h2>
      <select value={selectedRegion} onChange={handleRegionChange}>
        <option value="">Select a region</option>
        {regions.map((region, index) => (
          <option key={index} value={region.iso}>
            {region.name}
          </option>
        ))}
      </select>

    <div>
      <h1>COVID-19 Statistics</h1>
      <h2>Data</h2>
      {data && <table>
        <tbody>
          <tr>
            <td>Date</td>
            <td>{data.date}</td>
          </tr>
          <tr>
            <td>Last Update</td>
            <td>{data.last_update}</td>
          </tr>
          <tr>
            <td>Confirmed Cases</td>
            <td>{data.confirmed}</td>
          </tr>
          <tr>
            <td>Confirmed Cases Difference</td>
            <td>{data.confirmed_diff}</td>
          </tr>
          <tr>
            <td>Deaths</td>
            <td>{data.deaths}</td>
          </tr>
          <tr>
            <td>Deaths Difference</td>
            <td>{data.deaths_diff}</td>
          </tr>
          <tr>
            <td>Recovered</td>
            <td>{data.recovered}</td>
          </tr>
          <tr>
            <td>Recovered Difference</td>
            <td>{data.recovered_diff}</td>
          </tr>
          <tr>
            <td>Active Cases</td>
            <td>{data.active}</td>
          </tr>
          <tr>
            <td>Active Cases Difference</td>
            <td>{data.active_diff}</td>
          </tr>
          <tr>
            <td>Fatality Rate</td>
            <td>{data.fatality_rate}</td>
          </tr>
        </tbody>
      </table>}
    </div>
    </div>
  );
};

export default App;
