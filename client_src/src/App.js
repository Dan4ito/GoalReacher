import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';
import './App.css';
import Intro from './components/Intro';
import Home from './components/Home';
import Goals from './components/Goals';
import DailyRoutine from './components/DailyRoutine';
import Motivation from './components/Motivation';
import ManageProfile from './components/ManageProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      currentGoals: [],
      completedGoals: [],
      currentTasks:[],
      accessToken: '',
      id: null
    }
    this.updateParent = this.updateParent.bind(this);
  }
  updateParent(name, email, currGoals, compGoals, currTasks, token, identificator) {
    this.setState({
      firstName: name,
      email: email,
      currentGoals: currGoals,
      completedGoals: compGoals,
      currentTasks: currTasks,
      accessToken: token,
      id: identificator
    })
  }



  render() {
    if (localStorage.getItem("state") != null){
      return (
        <div className="App">
          <Route exact path='/' render={() => (
            <Redirect to='/home' />
          )} />
          <Route exact path='/goals' render={() => (
            <Goals all={this.state}/>
          )} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/daily" component={DailyRoutine} />
          <Route exact path='/manageProfile' render={() => (
            <ManageProfile />
          )} />
          <Route exact path="/motivation" component={Motivation} />
          {/* <Route exact path="/about" component={About} /> */}
        </div>
      )
    }
    else{
      return (
        <div className="App">
          <Route exact path="/home" render={() => (
            <Redirect to='/' />
          )} />
          <Route exact path="/goals" render={() => (
            <Redirect to='/' />
          )} />
          <Route exact path="/daily" render={() => (
            <Redirect to='/' />
          )} />
          <Route exact path="/motivation " render={() => (
            <Redirect to='/' />
          )} />
          {/* <Route exact path="/about" render={() => (
            <Redirect to='/' /> 
          )} /> */}
          <Route exact path="/manageProfile" render={() => (
            <Redirect to='/' /> 
          )} />
          <Route exact path='/' render={() => (

            <Intro triggerParentUpdate={this.updateParent}/>
          )} />
        </div>
      )
    }
  }
}

export default App;
