import React, { Component } from 'react';
import Days from './components/Days';
import Goal from './components/Goal';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
      daysPerMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
      lastDate: 1,
      lastMonth: 0,
      isMobile: false,
      dateOn: {},
      goal: ""
    };
  }

  componentWillMount() {
    this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentDidMount() {
    this.updateWindow();
    window.addEventListener("resize", this.updateWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindow);
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    this.saveStateToLocalStorage();
  }

  updateWindow = () => {
    this.setState({ isMobile: window.innerWidth < 600 });
  }
  setDateOn = (daysOn) => {
    this.setState({
      ...this.state.dateOn,
      dateOn: daysOn
    });
  }

  updateDateOn = (dayId, on) => {
    this.setState({
      dateOn: {
        ...this.state.dateOn,
        [dayId]: !on,
      }
    });
  }

  renderDates = (day,daysOn) => {
    let dateRow = [];
    for (let i=0; i<=11; i++) {
      if (this.state.daysPerMonth[i] < day) {
        dateRow.push(<Days date={""} key={this.state.months[i]+day.toString()}/>)
      } else {
        // Days are keyed by the month+day, e.g. Apr24
        let dayId = this.state.months[i]+day.toString();
        daysOn[dayId]=false
        dateRow.push(<Days date={day} 
          key={this.state.months[i]+day.toString()} 
          dayId={dayId}
          dayOn={this.state.dateOn[dayId]}
          updateDateOn={this.updateDateOn}
          />)
      }
    }
    return dateRow;
  }

  renderMonths = () => {
    let month = [];
    for (let i=0; i<=11; i++) {
      month.push(<div className="col span-1-12 months" key={this.state.months[i]}>
        <h2>{this.state.months[i]}</h2>
      </div>)
    }
    return month;
  }

  renderRows = (daysOn) => {
    let rows = [];
    for (let j=1; j<=31; j++){
      rows.push(<div className="section group" key={j}>
        {this.renderDates(j,daysOn)}
      </div>)
    }
    return rows;
  }
  
  /* Using local storage because it is the simplest way
  to keep persistent state, and there is no sensitive data
  in the component's state */
  hydrateStateWithLocalStorage = () => {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage = () => {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  onChange = (e) => {
    this.setState({ goal: e.target.value })
  }
  
  render() {
    const isMobile = this.state.isMobile
    let daysOn = {}
    return (
      <div className="App">
        <div className="header section group">
          <header className="col span-6-12">
            <h2 className="title">The Every Day Calendar</h2>
            <h3 className="sub-title"> > Inspired by <a href="https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar">Simone Giertz's </a> 
            project and <a href="https://www.youtube.com/watch?v=-lpvy-xkSNA">video</a></h3>
            <h3 className="sub-title"> > Created by <a href="https://jrmrsr.github.io/">Jose Rondon</a></h3>
          </header>
          <div className="col span-6-12">
            <p className="title"> > Click on the date hexagons below to save your progress</p>
            <Goal
            goal={this.state.goal}
            onChange={this.onChange}
            />
          </div>
        </div>

          {isMobile ? (<div>Working on the mobile site!</div>) : 
          (
          <div>
            <div className="section group">
              {this.renderMonths()}
            </div>
              {this.renderRows(daysOn)}
          </div>
          )}
          <footer>

          </footer>
      </div>
    );
  }
}

export default App;
