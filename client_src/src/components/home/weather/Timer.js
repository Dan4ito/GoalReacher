import React, { Component } from 'react';

class Timer extends Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        this.timeout = null;
    }
    componentDidMount() {
        this.timeout = setInterval(() => {
            let time = new Date();
            let _hours = time.getHours();
            let _minutes = time.getMinutes();
            let _seconds = time.getSeconds();
            if (_hours < 10) {
                _hours = '0' + _hours;
            }
            if (_minutes < 10) {
                _minutes = '0' + _minutes;
            }
            if (_seconds < 10) {
                _seconds = '0' + _seconds;
            }
            this.setState({ hours: _hours, minutes: _minutes, seconds: _seconds });
        })

    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    render() {
        return (
            <div>
                <p className="time">{this.state.hours} : {this.state.minutes} : {this.state.seconds}</p>
            </div>
        );
    }
}

export default Timer;