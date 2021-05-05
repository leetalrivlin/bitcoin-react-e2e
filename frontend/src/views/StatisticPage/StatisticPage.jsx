import { Component } from 'react';
import { bitcoinService } from '../../services/bitcoinService';
import { Line } from 'react-chartjs-2';
import './StatisticPage.scss';

export class StatisticPage extends Component {
  state = {
    marketData: null,
    transactionsData: null,
  };

  componentDidMount() {
    this.marketData();
    this.transactionData();
  }

  async transactionData() {
    const data = bitcoinService.getConfirmedTransactions();
    const confirmedTransactions = data.map((coord) => coord.y);
    const transactionLabels = data.map((coord) =>
      new Date(coord.x).toLocaleTimeString()
    );
    const transactionsData = {
      labels: transactionLabels,
      datasets: [
        {
          label: 'Confirmed Transactions Per Day',
          data: confirmedTransactions,
          fill: false,
          backgroundColor: 'rgb(75, 154, 234)',
          borderColor: 'rgba(118, 151, 230, 0.2)',
        },
      ],
    };
    this.setState({ transactionsData });
  }

  async marketData() {
    const data = await bitcoinService.getMarketPrice();
    const marketPrice = data.map((coord) => coord.y);
    const marketPriceLabels = data.map((coord) =>
      new Date(coord.x).toLocaleTimeString()
    );
    const marketData = {
      labels: marketPriceLabels,
      datasets: [
        {
          label: 'Market Price (USD)',
          data: marketPrice,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    this.setState({ marketData });
  }

  render() {
    const { marketData, transactionsData } = this.state;
    return (
      <div className="main-layout statistic-page">
        {marketData && <Line data={marketData}/>}
        {transactionsData && <Line data={transactionsData}/>}
      </div>
    );
  }
}
