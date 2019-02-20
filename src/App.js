// Resources
import './commons/styles/style.scss';
import './App.scss';

// Libs
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {get} from 'lodash/object';

// Pages
import HomePage from './entries/home/HomePage';
import WelcomePage from './entries/welcome/WelcomePage';
import OrderPage from './entries/order/OrderPage';
import CartPage from './entries/cart/CartPage';
import OrderSuccess from './entries/order-success/OrderSuccess';

// Components
import Header from './commons/components/header/Header';

class App extends Component {
    render() {
        const {orders, totalPriceOrders} = this.props;
        return (
            <Router>
                <div className="app-container">
                    <Header
                        totalPrice={totalPriceOrders}
                        amountOrders={orders.length}
                    />

                    <div className="app-container__body">
                        <Route exact path="/" component={WelcomePage}/>
                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/order/:size" component={OrderPage}/>
                        <Route exact path="/cart" component={CartPage}/>
                        <Route exact path="/order-success" component={OrderSuccess}/>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    const cartReducer = state.cartReducer;
    return {
        totalPriceOrders: get(cartReducer, 'totalPriceOrders'),
        orders: get(cartReducer, 'orders')
    }
};

export default connect(mapStateToProps)(App);
