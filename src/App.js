import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DEV_ID from './constant';


class App extends Component {
  state = {
    charity: null,
    donationList: [],
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

  getData = charityId => {
    const CHARITY_URL = `https://api.justgiving.com/${DEV_ID}/v1/charity/${charityId}`
    const CHARITY_DONATION_URL = `https://api.justgiving.com/${DEV_ID}/v1/charity/${charityId}/donations`
    // console.log(CHARITY_URL, CHARITY_DONATION_URL)
    axios.all(
      [
        axios.get(CHARITY_URL), 
        axios.get(CHARITY_DONATION_URL)
      ]
    ).then(axios.spread(({data: charity}, {data: {donations: donationList}}) => {
      console.log(charity, donationList)
    }))
  }

  renderCharityList = () => {
    return this.state.charityList.map(iAmAwesomeee => {
        return  <div key={iAmAwesomeee.id}
                    onClick={() => this.getData(iAmAwesomeee.id)}>
                    == {iAmAwesomeee.charityName} ==
                </div>
      }
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Drop comments on Facebook!!!</h1> 
        <div>donation: {JSON.stringify(this.state.charity)}</div>
        <div>donation: {JSON.stringify(this.state.donationList)}</div>
        {this.renderCharityList()}
      </div>
    );
  }
}

export default App;
