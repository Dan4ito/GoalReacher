import React, { Component } from 'react';

class CurrDate extends Component {
    constructor() {
        super();
        this.state = {
            threeLettersOfDay: '',
            threeLettersOfMonth: '',
            day: '',
            year: ''
        }
        this.timeout = null;
    }
    componentDidMount() {
        this.timeout = setInterval(() => {
            let date = new Date();
            let string = date.toString();
            let _threeLettersOfDay = string[0] + string[1] + string[2];
            let _threeLettersOfMonth = string[4] + string[5] + string[6];
            let _day = string[8] + string[9];
            let _year = string[11] + string[12] + string[13] + string[14];

            this.setState({ threeLettersOfDay: _threeLettersOfDay, threeLettersOfMonth: _threeLettersOfMonth, day: _day, year: _year });
        })
    }
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    render() {
        return (
            <div>
                <p className="date">{this.state.threeLettersOfDay} {this.state.threeLettersOfMonth} {this.state.day} {this.state.year}</p>
            </div>
        );
    }
}


export default CurrDate;