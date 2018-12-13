import React, { Component } from 'react';
import '../index.css';

class Days extends Component {
  changeColorAndState = () => {
    this.props.updateDateOn(this.props.dayId,this.props.dayOn);   
  }

  getClassnameDays = () => {
    let style = "";
    if (this.props.date) {
      style = "hexagon" + ((this.props.dayOn===true) ? " filled" : " unfilled");
    }
    return style;
  }

  render() {
    return (
      <div id={this.props.id} className="col span-1-12" onClick={this.changeColorAndState}>
        <div className={this.getClassnameDays()} style={{margin:"auto"}}><p className="hexagon-text">{this.props.date}</p></div>
      </div>
    );
  }
}

export default Days;
