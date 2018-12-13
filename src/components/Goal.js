import React, { Component } from 'react';
import '../index.css';

class Goal extends Component {
  render() {
    return (
      <div className="goal">
        <textarea defaultValue={this.props.goal} onChange={(e) => this.props.onChange(e)}></textarea>
      </div>
    );
  }
}

export default Goal;
