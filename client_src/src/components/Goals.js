import React, { Component } from 'react';
import Menu from './menu/Menu';
import Goal from './goals/Goal';
import CompletedGoal from './goals/CompletedGoal';
import axios from 'axios';
import './goals/Goals.css';
class Goals extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem("state"));
    }

    componentWillMount() {
        this.setState(JSON.parse(localStorage.getItem("state")));
        this.setState({hasCompletedGoals : false});
        console.log(this.state);
    }

    RemoveGoal = i => {
        let arr = this.state.currentGoals;
        let arrOfCompletedGoals = this.state.completedGoals;
        arrOfCompletedGoals.unshift(arr[i]);
        arr.splice(i, 1);
        this.setState({
            currentGoals: arr,
            completedGoals: arrOfCompletedGoals
        });
        const post = {
            firstName: this.state.firstName,
            email: this.state.email,
            currentGoals: this.state.currentGoals,
            completedGoals: this.state.completedGoals,
            currentTasks: this.state.currentTasks
        }
        axios.post(`http://localhost:3000/api/userInfos/${this.state.id}/replace?access_token=${this.state.accessToken}`, post)
            .then((response) => {
                localStorage.setItem("state", JSON.stringify({ firstName: response.data.firstName, email: response.data.email, currentGoals: response.data.currentGoals, completedGoals: response.data.completedGoals, currentTasks: response.data.currentTasks, accessToken: this.state.accessToken, id: response.data.id }));

            })
    }

    UpdateGoal = (NewText, i) => {
        let arr = this.state.currentGoals;
        arr[i] = NewText;
        this.setState({ currentGoals: arr });
        const post = {
            firstName: this.state.firstName,
            email: this.state.email,
            currentGoals: this.state.currentGoals,
            completedGoals: this.state.completedGoals,
            currentTasks: this.state.currentTasks
        }
        axios.post(`http://localhost:3000/api/userInfos/${this.state.id}/replace?access_token=${this.state.accessToken}`, post)
            .then((response) => {
                localStorage.setItem("state", JSON.stringify({ firstName: response.data.firstName, email: response.data.email, currentGoals: response.data.currentGoals, completedGoals: response.data.completedGoals, currentTasks: response.data.currentTasks, accessToken: this.state.accessToken, id: response.data.id }));
            })
    }

    AddGoal = (NewText) => {
        let arr = this.state.currentGoals;
        arr.push(NewText);
        this.setState({ currentGoals: arr });
        const post = {
            firstName: this.state.firstName,
            email: this.state.email,
            currentGoals: this.state.currentGoals,
            completedGoals: this.state.completedGoals,
            currentTasks: this.state.currentTasks
        }
        axios.post(`http://localhost:3000/api/userInfos/${this.state.id}/replace?access_token=${this.state.accessToken}`, post)
            .then((response) => {
                localStorage.setItem("state", JSON.stringify({ firstName: response.data.firstName, email: response.data.email, currentGoals: response.data.currentGoals, completedGoals: response.data.completedGoals, currentTasks: response.data.currentTasks, accessToken: this.state.accessToken, id: response.data.id }));
            })
    }

    render() {

        return (
            <div>
                <Menu />
                <div className="Goals">
                    <h1 className="title">Goals</h1>
                    <div className="currentGoals">

                        {
                            this.state.currentGoals.map(function (GoalText, i) {
                                return <Goal key={i} index={i} UpdateGoalFunction={this.UpdateGoal} RemoveGoalFunction={this.RemoveGoal}>{GoalText}</Goal>;
                            }.bind(this))

                        }
                    </div>
                    <div id="add">
                        <button onClick={this.AddGoal.bind(null, "New Goal")} className="btn btn-info">Add</button>
                    </div>
                    <div className="completedGoals">                
                        <h3 className="title">Completed Goals</h3>
                        {
                            this.state.completedGoals.slice(0, 5).map(function (GoalText, i) {
                                return <CompletedGoal key={i} index={i} >{GoalText}</CompletedGoal>;
                            })

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Goals;