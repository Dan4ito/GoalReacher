import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            id: '',
            accessToken: '',
            message: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.password === '' || this.state.email === '') {
            this.setState({ message: "Empty fields are forbidden!" })
        }
        else {
            const post = {
                email: this.state.email,
                password: this.state.password
            }
            axios.post('http://localhost:3000/api/Users/login', post)
                .then((response) => {
                    this.setState({ accessToken: response.data.id });
                    this.setState({ id: response.data.userId })
                    let firstPartEmail = '';
                    let secondPartEmail = '';
                    let i = 0;
                    while (true) {
                        if (this.state.email[i] !== '@') {
                            firstPartEmail += this.state.email[i];
                            i++;
                        }
                        else break;
                    }
                    i++;
                    while (i < this.state.email.length) {
                        secondPartEmail += this.state.email[i];
                        i++;
                    }

                    axios.get(`http://localhost:3000/api/userInfos/findOne?filter=%7B%22where%22%3A%7B%22email%22%3A%22${firstPartEmail}%40${secondPartEmail}%22%7D%7D&access_token=${this.state.accessToken}`).then(
                        _response => {
                            localStorage.setItem("state", JSON.stringify({ firstName: _response.data.firstName, email: _response.data.email, currentGoals: _response.data.currentGoals, completedGoals: _response.data.completedGoals, currentTasks: _response.data.currentTasks, accessToken: this.state.accessToken, id: _response.data.id }));
                            this.props.triggerParentUpdate(_response.data.firstName, _response.data.email, _response.data.currentGoals, _response.data.completedGoals, _response.data.currentTasks, this.state.accessToken, _response.data.id);
                        }
                    )
                }).catch(error => {
                    this.setState({ message: "Either email or password are incorrect!" });
                });

        }

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        return (
            <div className="specialCard">
                <h1>Login</h1>
                <form >
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

                    <button type="submit" className="btn btn-info" onClick={this.onSubmit} > Login </button>
                </form>
                <div id="invalidEmailAndPassword" className="hideValid">{this.state.message}</div>
            </div>
        );
    }
}

export default Login;