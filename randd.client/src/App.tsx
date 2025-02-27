import React, { useEffect, useState } from 'react';
import './App.css';

// Interface for Forecast Data
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[] | undefined>(undefined);
    const accessToken = localStorage.getItem('access_token'); // Get the access token from localStorage

    // Fetch data when the component mounts
    useEffect(() => {
        if (accessToken) {
            populateWeatherData();
        } else {
            console.error("No access token found!");
        }
    }, [accessToken]);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    // Function to fetch weather data
    async function populateWeatherData() {
        const response = await fetch('https://localhost:5001/api/weatherforecast', {
            headers: {
                'Authorization': `Bearer ${accessToken}` // Add the access token to the request headers
            }
        });

        if (response.ok) {
            const data = await response.json();
            setForecasts(data); // Set the fetched data
        } else {
            console.error("Failed to fetch weather data:", response.statusText);
        }
    }
}

export default App;
