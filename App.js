import React from 'react';
import { render } from 'react-dom';
import { ActivityIndicator, FlatList, StyleSheet, Text, View ,Image} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  componentDidMount() {
    const api_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    fetch(api_url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      })
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image style={styles.image} source={{uri:item.image}}/>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencyName}>
            {item.name}
          </Text>
          <Text>
            {item.current_price}$
          </Text>
          <Text>
            {item.price_change_percentage_24h}
          </Text>
          
        </View>

      </View>

    )
  }

  renderSeprator = () => {
    return(
      <View 
        style={{height:1,width:'%100',backgroundColor:'black'}}> 

      </View>
    );
  }

  render() {

    let { container } = styles
    let { dataSource, isLoading } = this.state
    return (

      <View style={styles.flatlist}>
        <FlatList 
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeperator={this.renderSeprator}
        />
      </View>
    )


  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  image:{
    width:50,
    height:50,
    paddingLeft:20
  },
  flatlist:{
    flex:1,
    marginLeft:10,
    marginTop: 30
  },
  currencyInfo:{
    marginLeft:15
  },
  currencyName:{
    fontWeight:'bold'
  }

});
