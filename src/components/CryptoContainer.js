import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';


import FetchCoinData from './../Actions/FetchCoinData.js';
import CoinCard from './CoinCard';



class CryptoContainer extends Component {
  constructor(props) {
   super(props);
   this.state = {
     refreshing: false,
   };
 }


 _onRefresh() {
    this.setState({refreshing: true});
    this.props.FetchCoinData().then(() => {
      this.setState({refreshing: false});
    });
  }


  componentDidMount() {
    this.props.FetchCoinData();
  }

  renderCoinCard() {
    const { crypto } = this.props;
    return crypto.data.map((coin, index) =>
        <CoinCard
            key={index}
            coin_name={coin.name}
            symbol={coin.symbol}
            price_usd={coin.price_usd}
            percent_change_24h={coin.percent_change_24h}
            percent_change_7d={coin.percent_change_7d}
            percent_change_1h={coin.percent_change_1h}
        />
    )
  }

  render() {
    const { crypto } = this.props;

    if (crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible = {crypto.isFetching}
            textContent = 'Loading...'
            textStyle = {{color: '#253145'}}
            animation = 'fade'
          />
        </View>
      )
    }

    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        >
        {this.renderCoinCard()}
      </ScrollView>
    )
  }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 55
    }
}

function mapStateToProps(state) {
  return{
      crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
