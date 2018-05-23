import React, { Component } from 'react';



class Goal extends Component {
    constructor() {
        super();
        this.state = {
            editing: false
        }
    }
    Remove() {
        this.props.RemoveGoalFunction(this.props.index);
    }
    Edit() {
        this.setState({ editing: true });
    }
    Save() {
        let text = this.refs.NewText.value;
        this.props.UpdateGoalFunction(text, this.props.index);
        this.setState({ editing: false });
    }
    DisplayNormal() {
        return (
            <div className="Goal specialCard">

                <div className="GoalInfo">{this.props.children}</div>
                <div className="GoalButtons">
                    <button className="btn btn-primary" onClick={this.Edit.bind(this)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.Remove.bind(this)}>Remove</button>
                </div>
            </div>
        );
    }
    DisplayForm() {
        return (
            <div className="Goal specialCard">
                <div className="GoalInfo">
                    <textarea ref="NewText" defaultValue={this.props.children}></textarea>
                </div >
                <div className="GoalButtons">
                    <button className="btn btn-success" onClick={this.Save.bind(this)}>Save</button>
                </div>
            </div >
        );
    }
    render() {
        if (this.state.editing) {
            return this.DisplayForm();
        }
        else {
            return this.DisplayNormal();
        }
    }
}

export default Goal;