// Resources
import './CartPage.scss';

// Libs
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import {get} from 'lodash/object';

// Components
import ListItemFooter from '../../commons/components/list-item/ListItemFooter';
import ListItem from '../../commons/components/list-item/ListItem';
import CartPageItem from './CartPageItem';

// Actions
import {removeOrderToCart} from './actions';

function CartPage({orders, totalPriceOrders, history, removeOrderToCart}) {

    if (!orders || !orders.length) {
        return (
            <div className="empty-card bg-white card">
                <h1 htmlFor="">Empty Cart  :-(</h1>
                <button onClick={() => history.push('/home')}
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                    <i className="material-icons">arrow_back_ios</i> Back to order
                </button>
            </div>
        )
    }

    return (
        <div className="flex-column">
            <div className="cart-item__wrapper margin-center card">
                {orders.map((order) =>
                    <ListItem key={`cart-item-${get(order, 'cartIndex')}`}>
                        <CartPageItem
                            order={order}
                            removeOrderToCart={removeOrderToCart}
                        />
                    </ListItem>
                )}
                <ListItemFooter
                    price={totalPriceOrders}
                    buttonText="BUY NOW!"
                    buttonIcon="shopping_cart"
                    onClickButton={() => {
                        history.push('/order-success');
                    }}
                />
            </div>
        </div>
    );
}

CartPage.propTypes = {};
CartPage.defaultProps = {};

const mapStateToProps = (state) => {
    const cartReducer = state.cartReducer;
    return {
        totalPriceOrders: get(cartReducer, 'totalPriceOrders'),
        orders: get(cartReducer, 'orders')
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeOrderToCart: bindActionCreators(removeOrderToCart, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));
