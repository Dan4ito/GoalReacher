import React, { Component } from 'react';
import Weather from './home/weather/Weather';
import Menu from './menu/Menu';
import './home/Home.css';

class Home extends Component {
    render() {       
        return (
            <div>
                <Menu/>
                <div className="Home">
                <Weather/>
                </div>
            </div>
        );
    }
}

export default Home;