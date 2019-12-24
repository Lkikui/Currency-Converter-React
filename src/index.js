import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { get } from 'axios';

class App extends React.Component {
    state = {
        exchangeRates: [],
        foreignCurrencies: [],
        selectedCurrency: '',
    }

    componentDidMount() {
        // api: https://api.exchangeratesapi.io/latest?base=USD
        get('https://api.exchangeratesapi.io/latest?base=USD').then(response => {
            // destructure, sets as empty obj. when no data
            const { data: { rates: currencies } = {} } = response;
            
            // currency object (including currency and their rates)
            this.setState({ exchangeRates: currencies });

            // currencies
            const foreignCurrencies = Object.keys(currencies);
            this.setState({ foreignCurrencies });
        });
    }

    render() {
        console.log(this.state);

        const exchangeTo = this.state.foreignCurrencies.map((currency, key) => (
            <option key={currency} value={currency}>
                {currency}{' '}
            </option>
        ));

        return(
            <div className="App">
                <h1>Exchange Rates</h1>
                <br />

                <div className="baseCurrency">
                    <h2>Base Currency</h2>
                    USD:
                    <input type="text" name="baseAmount" id=""/>
                    <br />
                    Exchange to:
                    <select name="" id="">
                        {exchangeTo}
                    </select>
                    <button>Convert!</button>
                </div>

                <div className="convertedCurrency">
                    <h2>Converted Currency</h2>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
