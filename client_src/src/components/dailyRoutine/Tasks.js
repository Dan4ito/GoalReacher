import React, { Component } from 'react';


class Task extends Component {
    constructor() {
        super();
        this.state = {
            editing: false
        }
    }
    Remove() {
        this.props.RemoveTaskFunction(this.props.index);
    }
    Edit() {
        this.setState({ editing: true });
    }
    Save() {
        let text = this.refs.NewText.value;
        this.props.UpdateTaskFunction(text, this.props.index);
        this.setState({ editing: false });
    }
    DisplayNormal() {
        return (
            <div className="Task specialCard">

                <div className="TaskInfo">{this.props.children}</div>
                <div className="TaskButtons">
                    <button className="btn btn-primary" onClick={this.Edit.bind(this)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.Remove.bind(this)}>Remove</button>
                </div>
            </div>
        );
    }
    DisplayForm() {
        return (
            <div className="Task specialCard">
                <div className="TaskInfo">
                    <textarea ref="NewText" defaultValue={this.props.children}></textarea>
                </div >
                <div className="TaskButtons">
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

export default Task;