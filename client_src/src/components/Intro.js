import React, { Component } from 'react';
import Register from './intro/Register';
import Login from './intro/Login';
import './intro/Intro.css';

class Intro extends Component {
    render() {
        return (
            <div>
                <h1 className="title">GoalReacher</h1>
                <div className="leftDiv">
                    <h4 className="specialCard">There are a lot of people who need to achieve a goal. They are determined but the lack 
                    just one thing to make their life easier. This is where GoalReacher comes to aid those 
                    in need. GoalReacher is a web app which helps those people organise their time, goals 
                    and motivates them to keep going. GoalReacher provides you with the options to create
                    an account, set your goals, manage your daily routine, track your progress and much more.</h4>
                </div>
                <div className="rightDiv">
                <Register />
                <Login triggerParentUpdate={this.props.triggerParentUpdate} />
                </div> 
            </div>
        );
    }
}

export default Intro;