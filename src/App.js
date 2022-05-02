import React from 'react';
import './styles/App.css';

class Lottery extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      managerAddress: "0xMANAGER_ADDRESS",
      competitorAddresses: [],
      winnerAddress: null,
      bank: 0,
      currentAmount: ""
    }  

    this.handleCurrentAmountChange = this.handleCurrentAmountChange.bind(this)
    this.handleAmmountSubmit = this.handleAmmountSubmit.bind(this)
    this.handlePickWinner = this.handlePickWinner.bind(this)
  }

  handleCurrentAmountChange(event) {
    this.setState(
      {
        ...this.state,
        ...{
          currentAmount: event.target.value
        }
      }
    )
  }

  handleAmmountSubmit(event) {
    const currentAmountFloat = parseFloat(this.state.currentAmount)
    if (isNaN(currentAmountFloat)) {
      alert("Error:\n\t value is not a Number")
      return;
    }

    const newAddresses = this.state.competitorAddresses
    newAddresses.push(parseInt(Math.random()*1000000000).toString())
    this.setState(
      {
        ...this.state,
        ...{
          competitorAddresses: newAddresses,
          bank: this.state.bank + currentAmountFloat,
          currentAmount: "",
          winnerAddress: null
        }
      }
    )
  }

  handlePickWinner(event) {
    const winnerAddressNew = this.state.competitorAddresses[Math.floor(Math.random() * this.state.competitorAddresses.length)]
    this.setState(
      {
        ...this.state,
        ...{
          winnerAddress: winnerAddressNew,
          competitorAddresses: [],
          bank: 0,
          currentAmount: ""
        }
      }
    )
  }

  render() {
    return (
      <div>
        <h1 className="App-header">
          Lottery contract!
        </h1>
        <div>
          This contract is managed by <strong>{this.state.managerAddress}</strong><br />
          There are currently <strong>{this.state.competitorAddresses.length}</strong> people entered, competing to win <strong>{this.state.bank}</strong> ether!
        </div>
        <h2>
          Want to try your luck?
        </h2>
        <div>
          Amount of ether to enter:&nbsp;
          <input type='text' value = {this.state.currentAmount} onChange = {this.handleCurrentAmountChange} />&nbsp;
          <button type='button' onClick={this.handleAmmountSubmit}>Enter</button>
        </div>
        <h2>
          Time to pick winner?
        </h2>
        <button type='button' onClick={this.handlePickWinner}>Pick Winner</button><br />
        {
          this.state.winnerAddress && 
          <>
          <strong>{this.state.winnerAddress}</strong> has won!
          </>
        }
        
      </div>
    )
  }

}

function App() {
  return (
    <div className="App">
      <Lottery />
    </div>
  );
}

export default App;
