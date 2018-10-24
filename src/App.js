import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    charityList: [
      {
        charityName: "British Heart Foundation",
        id: 183092
      },
      {
        charityName: "Macmillan Cancer Support",
        id: 2116
      },
      {
        charityName: "Cancer Research UK",
        id: 2357
      },
      {
        charityName: "Oxfam",
        id: 13441
      },
      {
        charityName: "National Trust",
        id: 183560
      },
      {
        charityName: "Save the Children",
        id: 18570
      }
    ]
  }

  renderCharity = charityId => {
    console.log(charityId)
  }

  renderCharityList = () => {
    return this.state.charityList.map(v => {
        return <div key={v.id}
                    onClick={() => this.renderCharity(v.id)}>{v.charityName}</div>
      }
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Drop comments on Facebook!!!</h1> 
        {this.renderCharityList()}
      </div>
    );
  }
}

export default App;
