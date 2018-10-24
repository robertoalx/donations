import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DEV_ID from './constant';


class App extends Component {
  state = {
    loading: false,
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
    this.setState({loading: true});
    axios.all(
      [
        axios.get(CHARITY_URL), 
        axios.get(CHARITY_DONATION_URL)
      ]
    ).then(axios.spread(({data: charity}, {data: {donations: donationList}}) => {
      this.setState({charity, donationList, loading: false})
    }))
  }

  renderCharityList = () => {
    return this.state.charityList.map(iAmAwesomeee => {
        return  <div key={iAmAwesomeee.id}
                    onClick={() => this.getData(iAmAwesomeee.id)}>
                    {iAmAwesomeee.charityName}
                </div>
      }
    )
  }

  renderCharity = () => {
    const { charity } = this.state;
    console.log(charity)
    return charity && (
      <div className="charity__wrapper">
        <div className="charity__logo">
          <img src={charity.logoAbsoluteUrl} alt={charity.name}/>
        </div>
        <h2 className="charity__name">{charity.name}</h2>
        <div className="charity__description">{charity.description}</div>
      </div>
    )
  }

  renderDonation = () => {
    // amount: 10.5
    // currencyCode: "GBP"
    // donationDate: "/Date(1538352000000+0000)/"
    // donorDisplayName: "Mark Walker"
    // donorLocalAmount: 10.5
    // donorLocalCurrencyCode: "GBP"
    // estimatedTaxReclaim: 0
    // imageUrl: "https://www.justgiving.com/content/images/graphics/icons/avatars/facebook-avatar.gif"
    // message:
    const niceAmount = (amount, currency) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency || 'GBP'}).format(amount);
    return this.state.donationList.length && this.state.donationList.map(donation => 
      (<div className="donation__wrapper">
        <div className="donation__image">
          <img src={donation.imageUrl} alt={donation.donorDisplayName}/>
        </div>
        <div className="donation__name">{donation.donorDisplayName}</div>
        <div className="donation__amount">{niceAmount(donation.amount, donation.currencyCode)}</div>
        <div className="donation__message">{donation.message}</div>
      </div>)
    );
  }

  render() {
    const {loading} = this.state
    return (
      <div className="App">
        {this.renderCharityList()}
        <div>{this.renderCharity()}</div>
        <div>{this.renderDonation()}</div>
        {loading && <div className="loading">loading...</div>}
      </div>
    );
  }
}

export default App;
