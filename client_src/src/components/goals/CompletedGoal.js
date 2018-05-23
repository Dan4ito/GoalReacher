import React, { Component } from 'react';

class CompletedGoal extends Component {
    render() {
        return (
            <div className="Goal specialCard">
                <div>{this.props.children}</div>
            </div>

        );
    }
}

export default CompletedGoal;