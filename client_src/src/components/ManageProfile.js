import React, { Component } from 'react';
import Menu from './menu/Menu';
import axios from 'axios';

class ManageProfile extends Component {
    constructor() {
        super();
        this.state = {
            OldPassword: '',
            NewPassword: '',
            Message: '',
            Message2: '',
            firstName: JSON.parse(localStorage.getItem("state")).firstName
        }
    }
    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value });


    }
    changePassword = (event) => {
        event.preventDefault();
        this.setState({Message: ''});
        setTimeout(() => {
            if (this.state.OldPassword === '' || this.state.NewPassword === '') {
                this.setState({ Message: "Empty fields are forbidden!" })
            }
            else {
                axios.post(`http://localhost:3000/api/Users/change-password?access_token=${JSON.parse(localStorage.getItem("state")).accessToken}`, { id: JSON.parse(localStorage.getItem("state")).id, oldPassword: this.state.OldPassword, newPassword: this.state.NewPassword })
                    .then(response => {
                        this.setState({ Message: "Your password has been changed!" })
                    }).catch(error => {
                        this.setState({ Message: "Invalid Old Password!" })
                    });
            }
        }, 200);
    }
    changeName = (event) => {
        event.preventDefault();
        this.setState({ Message2: '' });
        setTimeout(() => {
            if (this.state.firstName === '') {
                this.setState({ Message2: "Empty name is not allowed!" })
            }
            else {
                let allState = JSON.parse(localStorage.getItem("state"));
                allState.firstName = this.state.firstName;
                localStorage.setItem("state", JSON.stringify(allState));
                axios.post(`http://localhost:3000/api/userInfos/${allState.id}/replace?access_token=${allState.accessToken}`, allState)
                .then((response) => {
                    localStorage.setItem("state", JSON.stringify({ firstName: response.data.firstName, email: response.data.email, currentGoals: response.data.currentGoals, completedGoals: response.data.completedGoals, currentTasks: response.data.currentTasks, accessToken: this.state.accessToken, id: response.data.id }));
                })
                this.setState({ Message2: "Your account name has been changed!" })
            }
        }, 200);
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="ManageProfile">
                    <h1>Manage Profile</h1>
                    <div className="specialCard">
                        <h1>Change Password</h1>
                        <form >
                            <div>
                                <label>Old Password: </label>
                                <br />
                                <input type="password" name="OldPassword" onChange={this.updateState} />
                            </div>

                            <div>
                                <label>New Password: </label>
                                <br />
                                <input type="password" name="NewPassword" onChange={this.updateState} />
                            </div>

                            <button type="submit" className="btn btn-info" onClick={this.changePassword}> Proceed </button>
                        </form>
                        <div>{this.state.Message}</div>
                    </div>
                    <div className="specialCard">
                        <h1>Change Name</h1>
                        <form >
                            <div>
                                <label>Name:</label>
                                <br />
                                <input type="text" value={this.state.firstName} name="firstName" onChange={this.updateState} />
                            </div>

                            <button type="submit" className="btn btn-info" onClick={this.changeName}> Proceed </button>
                        </form>
                        <div>{this.state.Message2}</div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ManageProfile;
