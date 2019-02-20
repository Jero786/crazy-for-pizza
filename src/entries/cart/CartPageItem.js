// Libs
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {reduce, map} from 'lodash/collection';

function CartPageItem({order, removeOrderToCart}) {
    const {totalPrice, name, amount, selectedToppings, cartIndex} = order;
    const toppingsName = map(selectedToppings, selectedTopping => selectedTopping.name);
    const toppingsDescription = toppingsName.join(', ');
    const toppingsDescriptionDisplay = toppingsDescription.substring(0, toppingsDescription.length - 1) + '.';

    return (
        <div className="cart-item__content">
            <div className="cart-item__content-title">
                {name}
            </div>

            <div className="cart-item__content-description">
                Toppings: {toppingsDescriptionDisplay}
            </div>

            <div className="cart-item__content-order">
                <div className="cart-item__content-cart-price">
                    <div className="cart-item__content-cart-price-amount">
                <span className="cart-item__content-cart-price-label">
            count:
          </span>
                        <span className="cart-item__content-cart-price-value">
                            {amount}
          </span>
                    </div>
                    <span className="cart-item__content-cart-price-label">
            U$S
          </span>
                    <span className="cart-item__content-cart-price-value">
                        {totalPrice}
          </span>
                </div>
                <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    onClick={() => removeOrderToCart(cartIndex)}
                >
                    delete
                    <i className="material-icons">remove_shopping_cart</i>
                </button>
            </div>
        </div>
    );
}

CartPageItem.propTypes = {
    order: PropTypes.object,
};
CartPageItem.defaultProps = {};

export default memo(CartPageItem);
