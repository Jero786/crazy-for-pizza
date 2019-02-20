// Libs
import numeral from 'numeral';
import {reduce, map, filter} from 'lodash/collection';
import {get} from 'lodash/object';

// Action types
import {
    ADD_ORDER_TO_CART,
    REMOVE_ORDER_TO_CART
} from '../constants';

export const initialState = {
    totalCart: 0,               // the total amount of all orders in the cart
    orders: [],                 // amount of pizzas ordered,
    cartIndex: 0,               // a index to be able delete them.
    totalPriceOrders: 0,
    messageError: undefined,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_ORDER_TO_CART: {
            const cartIndex = get(state, 'cartIndex') + 1;
            const newOrder = {cartIndex, ...action.payload};
            const existingOrder = get(state, 'orders');
            existingOrder.push(newOrder);

            return {
                ...state,
                orders: existingOrder,
                totalPriceOrders: _calculateNewTotal(existingOrder),
                cartIndex,
            };
            break;
        }

        case REMOVE_ORDER_TO_CART: {
            const orders = get(state, 'orders');
            const ordersUpdated = filter(orders, order => order.cartIndex !== get(action, 'payload'));
            return {
                ...state,
                orders: ordersUpdated || [],
                totalPriceOrders: _calculateNewTotal(ordersUpdated)
            };
            break;
        }

        default: {
            return state;
            break;
        }
    }

    return state;
};

/**
 * Given all orders from the cart, calculate the total price of the entire cart.
 * @param state
 * @returns {*}
 * @private
 */
function _calculateNewTotal(ordersUpdated) {
    if (!ordersUpdated) {
        return 0;
    }
    const totalToppingsOrders = map(ordersUpdated, order => {
        return order.totalPrice;
    });
    return reduce(totalToppingsOrders, (total, price) => numeral(total).add(price).value(), 0);
}

