import React, { Component } from "react";


class WishOne extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { error, isLoaded, wishItem } = this.props
        if (error) {
            return <tr><td>Error: {error.message}</td></tr>;
            } else if (!isLoaded) {
                return (<tr><td>Waiting...</td></tr>);
            } else {
                return (<tr>
                          <td>{wishItem.name}</td>
                          <td>{wishItem.rarity}</td>
                        </tr>);
            }
        }
    }

export default WishOne;