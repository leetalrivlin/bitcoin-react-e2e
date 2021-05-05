const axios = require('axios').default;

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
};

function getRate(coins) {
  return axios
    .get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function getMarketPrice() {
  return axios
    .get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
    .then((res) => {
      return res.data.values;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getConfirmedTransactions() {
  const transactionsData = require('../data/transactions.json');
  return transactionsData.values;
}
