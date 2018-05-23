import React, { Component } from 'react';
import Menu from './menu/Menu';
import axios from 'axios';
import './motivation/Motivation.css';
class Motivation extends Component {
    constructor() {
        super();
        this.state = {
            quotes: [],
            quoteToDisplay: ''
        }
    }

    componentWillMount() {
        axios.get(`http://localhost:3000/api/motivations`)
            .then(response => {
                let quoteArray = [];
                response.data.map( quoteObj => quoteArray.push(quoteObj.quote));
                this.setState({quotes: quoteArray});
                let quoteIndex = Math.floor(Math.random() * (this.state.quotes.length));
                this.setState({quoteToDisplay: this.state.quotes[quoteIndex]});
            })
            
    }
    render() {

        return (
            <div>
                <Menu />
                <div className="Motivation">
                <h1>Motivation</h1>
                <p className="font-italic">{this.state.quoteToDisplay}</p>
                </div>
            </div>
        );
    }
}

export default Motivation;