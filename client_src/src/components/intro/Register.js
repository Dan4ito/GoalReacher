import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            email: '',
            password: '',
            accessToken: '',
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.firstName === '' || this.state.password === '' || this.state.email === '') {
            this.setState({ message: "Empty fields are forbidden!" });
        }
        else {
            const postRegistration = {
                firstName: this.state.firstName,
                email: this.state.email,
                password: this.state.password
            }
            axios.post('http://localhost:3000/api/Users', postRegistration)
                .then(response => {
                    const post = {
                        email: this.state.email,
                        password: this.state.password
                    }
                    axios.post('http://localhost:3000/api/Users/login', post)
                        .then((response) => {
                            this.setState({ accessToken: response.data.id });
                            const postCreateData = {
                                firstName: this.state.firstName,
                                email: this.state.email,
                                currentGoals: [],
                                completedGoals: [],
                                currentTasks: []
                            }
                            axios.post(`http://localhost:3000/api/userInfos?access_token=${this.state.accessToken}`, postCreateData)
                                .then((response) => {
                                    this.setState(
                                        {
                                            firstName: '',
                                            email: '',
                                            password: '',
                                            accessToken: '',
                                            message: 'Your account was successfully created!'
                                        }
                                    )
                                })
                        })

                })
                .catch(error => {
                    this.setState({ message: "Email is already taken or invalid!" });
                });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="specialCard">
                <h1>Register</h1>
                <form>
                    <div>
                        <label>Firstname: </label>
                        <br />
                        <input type="text" name="firstName" onChange={this.onChange} value={this.state.firstName} />
                    </div>

                    <div>
                        <label>Email: </label>
                        <br />
                        <input type="text" name="email" onChange={this.onChange} value={this.state.email} />
                    </div>

                    <div>
                        <label>Password: </label>
                        <br />
                        <input type="password" name="password" onChange={this.onChange} value={this.state.password} />
                    </div>

                    <button type="submit" className="btn btn-success" onClick={this.onSubmit} > Register </button>
                </form>
                <div>{this.state.message}</div>
            </div>
        );
    }
}

export default Register;