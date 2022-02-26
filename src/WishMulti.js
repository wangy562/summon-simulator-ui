import React, { Component } from "react";


class WishMulti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: {}
        };
    }

    componentDidMount() {
        fetch(`https://summon-simulator-api.herokuapp.com/api/permBanner/multi?pity=${this.props.pity}&fs=${this.props.fs}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                item: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
            });
        });
    }
    
    render() {
    const { error, isLoaded, item } = this.state;
    if (error) {
        return <tr><td>Error: {error.message}</td></tr>;
        } else if (!isLoaded) {
            return <tr><td>Loading...</td></tr>;
        } else {
            return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.rarity}</td>
                    </tr>
            );
        }
    }
}

export default WishMulti;