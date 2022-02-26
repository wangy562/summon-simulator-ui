import React, { Component } from "react";
import WishOne from "./WishOne"
import WishMulti from "./WishMulti"

class App extends Component {
  constructor() {
    super(); 
    this.state = { "pity": 0, "fs": 0, wishCount: 0 };
  }

  summon = () => {
    const updatedPity = this.state.pity + 1;
    const updatedFs = this.state.fs + 1;
    const wishCount = 1;
    this.setState({ "pity": updatedPity, "fs": updatedFs, wishCount: wishCount })
  }

  summonMulti = () => {
    const updatedPity = this.state.pity + 10;
    const updatedFs = this.state.fs + 10;
    const wishCount = 2;
    this.setState({ "pity": updatedPity, "fs": updatedFs, wishCount: wishCount })
  }

  tableDataChooser = () => {
    const wishCount = this.state.wishCount;
    if (wishCount === 0) {
      return <tr></tr>; 
    } else {
      return (wishCount === 1 ? 
      <WishOne pity={this.state.pity} fs={this.state.fs} /> : <WishMulti pity={this.state.pity} fs={this.state.fs}/>);
    }
  }

  render() {
    const chosenTableData = this.tableDataChooser(); 
    return (<div>
              <button onClick={this.summon}>Wish X1</button> <button onClick={this.summonMulti}>Wish X10</button>
              <table border="1">
                <thead>
                  <tr>
                    <th>You Received</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Name</th><th>Rarity</th>
                  </tr>
                  {chosenTableData}
                </tbody>
              </table>
            </div>); 
  }
}

export default App;
