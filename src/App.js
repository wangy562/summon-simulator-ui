import React, { Component } from "react";
import WishOne from "./WishOne"


class App extends Component {
  constructor() {
    super(); 
    this.state = { "pity": 0, "fs": 0, wishType: 0, isLoaded: false, wishResults: [], error: null };
  }

  summon = async () => {
    const curPity = this.state.pity;
    const curFs = this.state.fs; 
    await this.getWishResultOne(curPity, curFs);
    const updatedPity = this.computePity(curPity, curFs);
    this.setState({ "pity": updatedPity.pity, "fs": updatedPity.fs, wishType: 1 });
  }

  summonMulti = async () => {
    const curPity = this.state.pity;
    const curFs = this.state.fs;
    await this.getWishResultMulti(curPity, curFs);
    const updatedPity = this.computePity(curPity, curFs);
    this.setState({ "pity": updatedPity.pity, "fs": updatedPity.fs, wishType: 2 })
    console.log(this.state)
  }

  getWishResultOne = async (pity, fs) => {
    const baseUri = "https://summon-simulator-api.herokuapp.com/api/permBanner/";
    const res = await fetch(`${baseUri}summon/?pity=${pity}&fs=${fs}`); 
    const resBody = await res.json(); 
    this.setState({ isLoaded: true, wishResults: [resBody] });
  }

  getWishResultMulti = async (pity, fs) => {
    console.log("multi button pressed")
    const baseUri = "https://summon-simulator-api.herokuapp.com/api/permBanner/";
    const res = await fetch(`${baseUri}multi/?pity=${pity}&fs=${fs}`); 
    const resBody = await res.json(); 
    this.setState({ isLoaded: true, wishResults: resBody });
  }

  computePity = (pity, fs) => {
    const wishResults = this.state.wishResults; 
    console.log("compute pity logging")
    console.log(wishResults)
    let curPity = pity;
    let curFs = fs;
    for (const wishItemIndex in wishResults) {
      const wishItem = wishResults[wishItemIndex]; 
      const rarity = wishItem.rarity;
      if (rarity === 5) {
        curPity = 0;
        curFs++; 
      } else if (rarity === 4) {
          curPity++;
          curFs = 0;
      } else {
          curPity++;
          curFs++;
      }
    }
    console.log("current pity " + { pity: curPity, fs: curFs })
    return { pity: curPity, fs: curFs }
  }

  chooseTableData = () => {
    const wishType = this.state.wishType;
    if (wishType === 0) {
      return <tr></tr>; 
    } else if (wishType === 1) {
        return (<WishOne pity={this.state.pity} 
                   fs={this.state.fs} 
                   isLoaded={this.state.isLoaded}
                   error={this.state.error} 
                   wishItem={this.state.wishResults[0]}/>);
    } else {
        return (this.state.wishResults.map((wishItem) => {
          <WishOne pity={this.state.pity} 
                   fs={this.state.fs} 
                   isLoaded={this.state.isLoaded}
                   error={this.state.error} 
                   wishItem={wishItem}/>
        }));
    }
  }

  render() { 
    const tableData = this.chooseTableData();
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
                    {tableData}
                </tbody>
              </table>
            </div>); 
  }
}

export default App;
