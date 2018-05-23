import React, { Component } from 'react';
import Menu from './menu/Menu';
import "./dailyRoutine/DailyRoutine.css";
import Task from './dailyRoutine/Tasks';
import axios from 'axios';


class DailyRoutine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            currentGoals: [],
            completedGoals: [],
            currentTasks: [],
            email: '',
            id: '',
            accessToken: ''

        }
    }

    componentWillMount() {
        if (localStorage.getItem("state") != null) {
            this.setState(JSON.parse(localStorage.getItem("state")));
        }
    }

    RemoveTask = i => {
        let arr = this.state.currentTasks;
        arr.splice(i, 1);
        this.setState({
            currentTasks: arr,
        });
        const post = {
            firstName: this.state.firstName,
            currentGoals: this.state.currentGoals,
            completedGoals: this.state.completedGoals,
            currentTasks: this.state.currentTasks,
            email: this.state.email
        }
        axios.post(`http://localhost:3000/api/userInfos/${this.state.id}/replace?access_token=${this.state.accessToken}`, post)
            .then((response) => {
                localStorage.setItem("state", JSON.stringify({ firstName: response.data.firstName, email: response.data.email, currentGoals: response.data.currentGoals, completedGoals: response.data.completedGoals, currentTasks: response.data.currentTasks, accessToken: this.state.accessToken, id: response.data.id }));

            })
    }

    UpdateTask = (NewText, i) => {
        let arr = this.state.currentTasks;
        arr[i] = NewText;
        this.setState({ currentTasks: arr });
        const post = {
            firstName: this.state.firstName,
            currentGoals: this.state.currentGoals,
            completedGoals: this.state.completedGoals,
            currentTasks: this.state.currentTasks,


            email: this.state.email
        }
        axios.post(`http://localhost:3000/api/userInfos/${this.state.id}/replace?access_token=${this.state.accessToken}`, post)
            .then((response) => {
                localStorage.setItem("state", JSON.stringify({ firstName: response.data.firstName, email: response.data.email, currentGoals: response.data.currentGoals, completedGoals: response.data.completedGoals, currentTasks: response.data.currentTasks, accessToken: this.state.accessToken, id: response.data.id }));
            })
    }

    AddTask = (NewText) => {
        let arr = this.state.currentTasks;
        arr.push(NewText);
        this.setState({ currentTasks: arr });
        const post = {
            firstName: this.state.firstName,
            currentGoals: this.state.currentGoals,
            completedGoals: this.state.completedGoals,
            currentTasks: this.state.currentTasks,
            email: this.state.email
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
                <div className="Tasks">
                    <h1 className="title">Daily Tasks</h1>
                    <div className="currentTasks">

                        {
                            this.state.currentTasks.map(function (TaskText, i) {
                                return <Task key={i} index={i} UpdateTaskFunction={this.UpdateTask} RemoveTaskFunction={this.RemoveTask}>{TaskText}</Task>;
                            }.bind(this))

                        }
                    </div>
                    <div id="add">
                        <button onClick={this.AddTask.bind(null, "New Task")} className="btn btn-info">Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DailyRoutine;