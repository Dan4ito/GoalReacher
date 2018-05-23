import React, { Component } from 'react';
import './Weather.css';
import Timer from './Timer';
import Currdate from './Currdate';
import axios from 'axios';
import $ from 'jquery';

class Weather extends Component {
    componentDidMount() {
        var lat, lng, address, cTemp, sky, hourlyTemp, hourlyWeatherSummary, weeklyWeatherSummary;         //icon = clear night, summary = clear, 

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng).then(response => {
                    address = response.data.results[0].formatted_address;
                    document.getElementById("address").innerHTML = address;
                });
                //loadweather
                $.ajax({
                    url: "https://api.forecast.io/forecast/462174812063339598f1677ef8979001/" + lat + "," + lng,
                    dataType: 'jsonp',
                    success: function (result, status, xhr) {
                        cTemp = Math.floor(result.currently.temperature);    // in fahrenheit
                        sky = result.currently.icon;

                        hourlyTemp = Math.floor(result.hourly.data[0].temperature);
                        hourlyWeatherSummary = result.hourly.summary;
                        weeklyWeatherSummary = result.daily.summary;
                        document.getElementById("now").innerHTML =
                            `<div class='now'>Right Now</div>
                       <div class="info">
                       <div class="summaryNow">${sky}</div>
                        <div class="temperatureNow">${cTemp} &#x2109</div>
                       </div>`;
                        document.getElementById("hourly").innerHTML =
                            `<div class='now'>Next 24 Hours</div>
                       <div class="info">
                       <div class="summaryNow">${hourlyWeatherSummary}</div>
                        <div class="temperatureNow">${hourlyTemp} &#x2109</div>
                       </div>`;
                        document.getElementById("weekly").innerHTML =
                            `<div class='now'>Next 7 Days</div>
                       <div class="info">
                       <div class="summaryNow">${weeklyWeatherSummary}</div>
                       </div>`;

                        // $('.last-updated .value').text(new Date(currentWeather.time).toLocaleTimeString())
                    },
                    error: function (xhr, status, error) {

                    }
                });

            });
        } else {
            console.warn("Browser Does Not Support Geolocation Api");
        }
    }

    render() {
        return (
            <div>
                <h1 className="localWeather"> Local Weather</h1>
                <Timer />
                <Currdate />
                <div id="forecast">
                    <div id="address"></div>
                    <div id="now"></div>
                    <div id="hourly"></div>
                    <div id="weekly"></div>
                </div>
            </div>

        );
    }
}

export default Weather;