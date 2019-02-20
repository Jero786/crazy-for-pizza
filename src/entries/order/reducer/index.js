// Libs
import numeral from 'numeral';
import {reduce, map, filter} from 'lodash/collection';
import {get} from 'lodash/object';

// Action types
import {
    DECREMENT_AMOUNT,
    FILL_INITIAL_STATE_ORDER,
    INCREMENT_AMOUNT,
    SELECT_TOPPING,
    CLEAN_STATE_ORDER
} from '../constants';

import {DEFAULT_DECIMAL_FORMAT} from '../../../commons/constants';

export const initialState = {
    amount: 1,              // amount of pizzas ordered
    selectedToppings: [],   // toppings order added
    maxToppings: 0,         // max allowed of toppings
    basePrice: 0,           // price without select any toppings (default topping selected don't affect)
    totalPrice: 0,          // initial state
    toppings: [],
    defaultSelected: undefined,
    messageError: undefined
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILL_INITIAL_STATE_ORDER: {
            return {
                ...state,
                selectedToppings: [action.payload.defaultSelected],
                defaultSelected: action.payload.defaultSelected,
                ...action.payload,
            };
            break;
        }

        case CLEAN_STATE_ORDER: {
            return initialState;
            break;
        }

        case INCREMENT_AMOUNT: {
            return _onIncrementAmount(state);
            break;
        }

        case DECREMENT_AMOUNT: {
            return _onDecrementAmount(state);
            break;
        }

        case SELECT_TOPPING: {
            const newState = _onSelectTopping(state, action);
            return {
                ...newState,
                totalPrice: calculateNewTotal(newState),
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
 * Calculate the total price of given order.
 * @param state
 * @returns {*}
 */
export function calculateNewTotal(state) {
    const {basePrice, amount = 1, selectedToppings = [], defaultSelected} = state;
    const selectedToppingsWithoutDefaultSelected = filter(selectedToppings, selectedTopping => get(selectedTopping, 'name') !== get(defaultSelected, 'name'));
    const prices = map(selectedToppingsWithoutDefaultSelected, toppings => toppings.price);
    const toppingsTotalPrice = reduce(prices, (total, price) => numeral(total).add(price).value());

    let total;
    if (toppingsTotalPrice) {
        total = numeral(basePrice).add(toppingsTotalPrice);
    } else {
        total = numeral(basePrice);
    }

    return numeral(total.value()).multiply(amount).format(DEFAULT_DECIMAL_FORMAT);
}

/**
 * Check if given topping name is already defined or not
 * @param toppingName
 * @param selectedToppings
 * @public
 * @returns {boolean}
 */
export function isSelectedTopping(toppingName, selectedToppings = []) {
    const selectedToppingsName = Array.from(selectedToppings).map((item) => item.name);
    return selectedToppingsName.includes(toppingName);
}

/**
 * Increment the amount of order items.
 * @param state
 * @returns {*}
 * @private
 */
function _onIncrementAmount(state) {
    if (get(state, 'amount') >= 1) {
        const newState = {
            ...state,
            amount: get(state, 'amount') + 1,
            messageError: undefined,
        };

        return {
            ...newState,
            totalPrice: calculateNewTotal(newState),
        };
    }
}

/**
 * Decrement the amount of order items.
 * @param state
 * @returns {*}
 * @private
 */
function _onDecrementAmount(state) {
    if (get(state, 'amount') === 1) {
        return {
            ...state,
            messageError: 'Minimum order amount is 1',
        }
    }

    if (get(state, 'amount') > 1) {
        const newState = {
            ...state,
            amount: get(state, 'amount') - 1,
            messageError: undefined,
        };
        return ({
            ...newState,
            totalPrice: calculateNewTotal(newState),
        });
    }
}

/**
 * Handler effect when a topping is selected in a toggler way.
 * @param state
 * @param action
 * @private
 * @returns {*}
 */
function _onSelectTopping(state, action) {
    let {maxToppings, selectedToppings} = state;
    const toppingSelected = action.payload.topping;
    const isMaxToppingsSelected = selectedToppings.length === maxToppings;
    const isAlreadyAssigned = isSelectedTopping(toppingSelected.name, selectedToppings);

    if (isMaxToppingsSelected && !isAlreadyAssigned) {
        // reach the max toppings selected
        return {
            ...state,
            messageError: `Max toppings allowed are ${maxToppings}`,
        };
    }

    if (isAlreadyAssigned) {
        return {
            ...state,
            selectedToppings: selectedToppings.filter(item => item.name !== toppingSelected.name) || [],
            messageError: undefined,
        };
    } else {
        selectedToppings.push(toppingSelected);
        return {
            ...state,
            selectedToppings,
            messageError: undefined,
        };
    }
}

/**
 * Return the default selected toppings.
 * @param state
 * @param action
 * @private
 * @returns {*}
 */
function _getDefaultSelectedToppings(state, action) {
    const selectedToppings = get(state, 'selectedToppings', []);
    selectedToppings.push(get(action, 'payload.defaultSelected'));
    return selectedToppings;
}
