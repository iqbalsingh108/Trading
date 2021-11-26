import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import axios from 'axios';
import momemt from 'moment';
import CryptoJS from 'crypto-js';
import {Dropdown} from 'react-native-element-dropdown';

const BASE_URL = 'https://api.wazirx.com';
const API_KEY =
  'miXnrVdQbkao0Mr9zYsxDrA4TLJS9OfmxKi4jR6hi4HSHhIlsOPUSVi2a9dm9rA5';
const SECRET_KEY = 'ncC8JII2pclYk5H1MQ2vPRPZxroN7NEsNxbqZ9CJ';

const Reviews = () => {
  const [myOrder, setMyOrder] = useState([]);
  const [myFunds, setMyFunds] = useState([]);
  const [historicalTrades, setHistoricalTrades] = useState([]);
  const [tickers, setTickers] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const headers = {
    'X-Api-Key': API_KEY,
  };

  const headers1 = {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  useEffect(() => {
    let dataQueryString = 'recvWindow1=20000&timestamp=' + Date.now();
    let dataQueryString1 =
      `symbol=${
        selectedCoin ? selectedCoin + 'inr' : 'btcinr'
      }&startTime=1590148051000&limit=100&recvWindow=20000&timestamp=` +
      Date.now();

    let signature = CryptoJS.HmacSHA256(dataQueryString, SECRET_KEY).toString(
      CryptoJS.enc.Hex,
    );
    let signature1 = CryptoJS.HmacSHA256(dataQueryString1, SECRET_KEY).toString(
      CryptoJS.enc.Hex,
    );

    let url =
      BASE_URL +
      `/sapi/v1/funds` +
      '?' +
      dataQueryString +
      '&signature=' +
      signature;

    let url1 =
      BASE_URL +
      `/sapi/v1/allOrders` +
      '?' +
      dataQueryString1 +
      '&signature=' +
      signature1;

    axios
      .get(url, {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setMyFunds(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 000');
      });

    axios
      .get(url1, {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setMyOrder(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 111');
      });

    axios
      .get(`${BASE_URL}/sapi/v1/tickers/24hr`, {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setTickers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 000');
      });
  }, []);

  const myOrderApi = () => {
    setMyOrder([]);
    let dataQueryString1 =
      `symbol=${
        selectedCoin ? selectedCoin + 'inr' : 'btcinr'
      }&startTime=1590148051000&limit=100&recvWindow=20000&timestamp=` +
      Date.now();
    let signature1 = CryptoJS.HmacSHA256(dataQueryString1, SECRET_KEY).toString(
      CryptoJS.enc.Hex,
    );
    let url1 =
      BASE_URL +
      `/sapi/v1/allOrders` +
      '?' +
      dataQueryString1 +
      '&signature=' +
      signature1;
    axios
      .get(url1, {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setMyOrder(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 111');
      });
  };

  const myFundApi = () => {
    setMyFunds([]);
    let dataQueryString = 'recvWindow1=20000&timestamp=' + Date.now();
    let signature = CryptoJS.HmacSHA256(dataQueryString, SECRET_KEY).toString(
      CryptoJS.enc.Hex,
    );
    let url =
      BASE_URL +
      `/sapi/v1/funds` +
      '?' +
      dataQueryString +
      '&signature=' +
      signature;
    axios
      .get(url, {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setMyFunds(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 000');
      });
  };

  const newOrderApi = () => {
    const queryString = require('query-string');
    const dataQueryString2 = queryString.stringify({
      symbol: selectedCoin ? selectedCoin + 'inr' : '',
      side: 'buy',
      type: 'limit',
      price: fromPrice ? fromPrice : '0',
      quantity: '1',
      recvWindow: '10000',
      timestamp: Date.now(),
    });

    let signature2 = CryptoJS.HmacSHA256(dataQueryString2, SECRET_KEY).toString(
      CryptoJS.enc.Hex,
    );

    const finalPayload = `${dataQueryString2}&signature=${signature2}`;
    let url2 = BASE_URL + `/sapi/v1/order/`;

    axios
      .post(url2, finalPayload, {
        headers: headers1,
      })
      .then(function (response) {
        // handle success
        console.log(response, 'response');
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 333');
      });
  };

  const historicalTradesApi = () => {
    let dataQueryString3 =
      `limit=10&symbol=${
        selectedCoin ? selectedCoin + 'inr' : 'btcinr'
      }&recvWindow=10000&timestamp=` + Date.now();
    let signature3 = CryptoJS.HmacSHA256(dataQueryString3, SECRET_KEY).toString(
      CryptoJS.enc.Hex,
    );
    let url3 =
      BASE_URL +
      `/sapi/v1/historicalTrades` +
      '?' +
      dataQueryString3 +
      '&signature=' +
      signature3;
    axios
      .get(url3, {
        headers: headers,
      })
      .then(function (response) {
        // handle success
        setHistoricalTrades(response?.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error.message, 'errorr 000');
      });
  };

  // console.log(myFunds, 'myFunds');
  // console.log(myOrder, 'myOrder');
  // console.log(tickers, 'tickers');

  const filterCoin =
    tickers &&
    tickers.length &&
    tickers.filter(item => item.quoteAsset === 'inr');

  // console.log(filterCoin, 'filterCoin');

  // console.log(historicalTrades, 'historicalTrades');

  console.log(fromPrice, 'fromPrice');
  console.log(toPrice, 'toPrice');

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SafeCardano Dashboard</Text>
      </View>
      <ScrollView style={styles.mainContainer}>
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          {filterCoin?.length !== 0 && (
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'white'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={filterCoin ? filterCoin : []}
              search
              maxHeight={300}
              labelField="baseAsset"
              valueField="baseAsset"
              placeholder={!isFocus ? 'Select Coin' : '...'}
              searchPlaceholder="Search Coin..."
              value={value}
              onFocus={() => {
                setHistoricalTrades([]);
                setFromPrice('');
                setToPrice('');
                setIsFocus(true);
              }}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                console.log(item, 'item');
                setValue(item.baseAsset);
                setSelectedCoin(item.baseAsset);
                setIsFocus(false);
                historicalTradesApi();
              }}
            />
          )}
          {historicalTrades && historicalTrades.length !== 0 && (
            <Text style={styles.cardTitle}>
              Latest {selectedCoin} price: {historicalTrades[0].price}
            </Text>
          )}
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>From</Text>
          <View>
            <TextInput
              placeholder="Enter Amount in inr..."
              placeholderTextColor="#a4aecf"
              style={styles.input}
              onChangeText={text => {
                setFromPrice(text);
                const toAmount = text / historicalTrades[0].price;
                setToPrice(toAmount);
              }}
              value={fromPrice}
              editable={selectedCoin !== ''}
            />
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>To</Text>
            <View style={styles.cardSubContainer}></View>
          </View>
          <View>
            <TextInput
              placeholder={`Get Amount in ${selectedCoin}...`}
              placeholderTextColor="#a4aecf"
              style={[styles.input, {marginTop: 10}]}
              onChangeText={text => {
                setToPrice(text);
                const toFrom = text * historicalTrades[0].price;
                setFromPrice(toFrom);
              }}
              value={toPrice}
              // defaultValue={toPrice}
              editable={selectedCoin !== ''}
              // editable={false}
            />
          </View>
        </View>
        <TouchableOpacity
          style={selectedCoin ? styles.swapButton : styles.swapButtonDisabled}
          onPress={newOrderApi}>
          <Text style={styles.swapBtnText}>Exchange</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>My Orders</Text>
          <TouchableOpacity
            style={styles.refreshContainer}
            onPress={myOrderApi}>
            <Text style={styles.refreshLabel}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={myOrder}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.myOrderContainer}>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Id: </Text>
                  <Text style={styles.assetValue}>{item?.id}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Created At: </Text>
                  <Text style={styles.assetValue}>
                    {momemt(item?.createdTime).format('Do MMM YY h:mm A')}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Updated At: </Text>
                  <Text style={styles.assetValue}>
                    {momemt(item?.updatedTime).format('Do MMM YY h:mm A')}
                  </Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Side: </Text>
                  <Text style={styles.assetValue}>{item?.side}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Status: </Text>
                  <Text style={styles.assetValue}>{item?.status}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Symbol: </Text>
                  <Text style={styles.assetValue}>{item?.symbol}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Type: </Text>
                  <Text style={styles.assetValue}>{item?.type}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Executed Qty: </Text>
                  <Text style={styles.assetValue}>{item?.executedQty}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Original Qty: </Text>
                  <Text style={styles.assetValue}>{item?.origQty}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Price: </Text>
                  <Text style={styles.assetValue}>{item?.price}</Text>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>My Funds</Text>
          <TouchableOpacity style={styles.refreshContainer} onPress={myFundApi}>
            <Text style={styles.refreshLabel}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={myFunds}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View style={styles.myfundContainer}>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Asset: </Text>
                  <Text style={styles.assetValue}>{item?.asset}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Free: </Text>
                  <Text style={styles.freeValue}>{item?.free}</Text>
                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.assetLabel}>Locked: </Text>
                  <Text style={styles.lockedValue}>{item?.locked}</Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 20,
  },
  header: {
    backgroundColor: '#1e4189',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#212121',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardSubContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
    alignItems: 'center',
  },
  myfundContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: Dimensions.get('window').width / 3 + 10,
    marginBottom: 40,
  },
  myOrderContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: Dimensions.get('window').width / 2 + 30,
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
  },
  swapButton: {
    backgroundColor: '#1e4189',
    width: Dimensions.get('window').width / 2,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  swapButtonDisabled: {
    backgroundColor: 'grey',
    width: Dimensions.get('window').width / 2,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  swapBtnText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  refreshContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  refreshLabel: {
    fontSize: 14,
    color: '#1e4189',
    fontWeight: 'bold',
  },
  assetLabel: {
    fontSize: 14,
    color: 'black',
  },
  assetValue: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  freeValue: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  lockedValue: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  input: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 30,
    backgroundColor: '#191919',
    borderRadius: 5,
    fontSize: 14,
    color: 'white',
  },

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '40%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'grey',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Reviews;
